document.getElementById('fileInput').addEventListener('change', async function (event) {
  const file = event.target.files[0];
  if (file && file.name.endsWith('.wdoc')) {
    const reader = new FileReader();

    reader.onload = async function (e) {
      try {
        // Charger le fichier ZIP avec JSZip
        const zip = await JSZip.loadAsync(e.target.result);

        // Vérifier si `index.html` existe
        if (!zip.file('index.html')) {
          alert('Invalid wdoc : index.html not found.');
          return;
        }
        console.log('files inside the zip', zip.files);

        // Read the `index.html` content
        const indexHtml = await zip.file('index.html').async('string');

        // Preprocess the HTML to sanitize it
        const sanitizedHtml = await sanitizeHtml(indexHtml, zip);
        // Afficher le contenu dans l'iframe
        const viewer = document.getElementById('viewer');
        viewer.srcdoc = sanitizedHtml;
      } catch (error) {
        console.error('error while reading wdoc :', error);
        alert('Issue reading wdoc.');
      }
    };

    reader.readAsArrayBuffer(file);
  } else {
    alert('Please select a valid wdoc.');
  }
});

// Function to sanitize HTML
async function sanitizeHtml(html, zip) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Remove all <script> tags
  const scripts = doc.querySelectorAll('script');
  scripts.forEach((script) => script.remove());

  // Handle external images
  const images = doc.querySelectorAll('img');
  let confirmationDone = false;
  let imgAllowed = false;
  for (const img of images) {
    const src = img.getAttribute('src');
    if (
      src &&
      !src.startsWith('data:') &&
      !src.startsWith(window.location.origin) &&
      !src.startsWith('/')
    ) {
      if (!confirmationDone) {
        imgAllowed = confirm(`Document try to load external content, allow it?`);
        confirmationDone = true;
      }
      if (!imgAllowed) {
        img.remove(); // Remove the image if permission is denied
        return;
      }
    }
    console.log('subsrc', src.substring(1));
    if (zip.files[src] || zip.files[src.substring(1)]) {
      const file = zip.files[src] ? zip.files[src] : zip.files[src.substring(1)];
      const blob = await file.async('blob');
      const blobUrl = URL.createObjectURL(blob);
      img.setAttribute('src', blobUrl);
    }
  }

  // Return the sanitized HTML as a string
  return doc.documentElement.outerHTML;
}
