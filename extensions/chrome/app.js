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
          alert('Le fichier wdoc est invalide : index.html introuvable.');
          return;
        }

        // Lire le contenu de `index.html`
        const indexHtml = await zip.file('index.html').async('string');

        // Charger les autres ressources (CSS/JS) en mémoire
        const blobUrls = {};
        for (const fileName of Object.keys(zip.files)) {
          if (fileName !== 'index.html') {
            const fileContent = await zip.file(fileName).async('blob');
            blobUrls[fileName] = URL.createObjectURL(fileContent);
          }
        }

        // Remplacer les chemins relatifs dans `index.html` par les blobs
        let updatedHtml = indexHtml.replace(/src="([^"]+)"/g, (match, src) => {
          return blobUrls[src] ? `src="${blobUrls[src]}"` : match;
        });

        updatedHtml = updatedHtml.replace(/href="([^"]+)"/g, (match, href) => {
          return blobUrls[href] ? `href="${blobUrls[href]}"` : match;
        });

        // Afficher le contenu dans l'iframe
        const viewer = document.getElementById('viewer');
        viewer.srcdoc = updatedHtml;
      } catch (error) {
        console.error('Erreur lors de la lecture du fichier wdoc :', error);
        alert('Impossible de lire le fichier wdoc.');
      }
    };

    reader.readAsArrayBuffer(file); // Lire le fichier en tant que ArrayBuffer pour JSZip
  } else {
    alert('Veuillez sélectionner un fichier wdoc valide.');
  }
});
