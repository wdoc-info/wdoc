# PDF Sucks for devs

If you ever had to work with PDF file format you definitely know what I mean:

- Want to extract a table? Good luck. People have even built AI solutions just to deal with this headache.
- Working with multiple languages? Exchanging templates? Might as well start from scratch.
- Need to edit a PDF? Enjoy paying for specialized, often proprietary tools.
- Using PDFs in AI workflows? Step one: wrestle the data into something usable.
- Opening the same doc on different devices? Forget adaptability—PDF isn't here for that.

# HTML to the rescue

We have now a format that is widely used and myriad of open source tools to play with it: The allmighty HTML.
The different engines have a similar rendering process so we should be able to match PDF quality.
With just some restrictions and a pagination you could easily create a new file format that could greatly improve the miserable life of developper.
I am fed up waiting for this format to appear so let's create it.

# WDOC: Simple Spec

WDOC files are just a zip archive containing an `index.html` as the starting point. That’s it.

### Core Principles:

1.  **HTML Inside**: Put all HTML content in a zip file with a `.wdoc` extension.
2.  **Paginated Content**: For print-ready, paginated documents, encapsulate content using:
    ```
    <section class="wdoc_page" format="A4">
    <!-- Your page content here -->
    </section>
    ```

# WDOC limitations

To ensure security and simplicity, some restrictions are in place:

- **No JavaScript**: We need a plugin system but want to avoid turning documents into malware and advertisement breeding grounds.
- **No External CSS**: All styles should be self-contained within the zip file.
- **Image Validation**: Users should approve external images to prevent pixel tracking.
- **Font Support**: A limited set of fonts, with the option to import from trusted sources like Google Fonts.

# What WDOC Needs to Succeed

For WDOC to become a real alternative to PDF, here’s what we’ll need:

- [ ] An app on each platform to read and edit wdoc files (maybe fork later on ligthweight reader + bigger editor) - flutter seems to be a good candidate for that
- [ ] 2 modes of writing, free flow where we take the content and create the wdoc-page elements and another mode where the creator is responsible for putting the wdoc-page tags
- [ ] An importer of pdf and word docs to cuckoo nest existing document solutions
- [ ] Support of google docs import (via save as a zipped file in google doc)
- [ ] A spec validator to ensure cross-browser rendering fidelity and guarantee WYSIWYG consistency + doc specs.
- [ ] Form handling with data storage/extraction, and support for file uploads (imagine docs containing other docs—wild).
- [ ] File annotation
- [ ] File versioning using an embedded git
- [ ] Password protection (e.g., encrypt the file and include a manifest.json for metadata).
- [ ] E-signature (maybe for this a company side of the spec to timestamp and validate signature) check XAdES
- [ ] A plugin system where additional functionality could be added. Need something à la htmx inside document to bypass the no javascript limitation
- [ ] A serious push to build awareness and adoption. The usual chicken-and-egg problem applies.

# Devs Will Prevail 💪

Let’s face it, business owners and stakeholders don’t care about file formats. PDFs "work" for them.

But for developers, the struggle is real. WDOC is our chance to take back control. It won’t be easy, but with a community of passionate devs, we can make it happen.
