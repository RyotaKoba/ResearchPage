document.addEventListener('DOMContentLoaded', function() {
    const archiveList = document.querySelector('.archive-list');
    const pdfEmbed = document.querySelector('.pdf-embed');
    const pdfLink = document.querySelector('.pdf-link');
    const previewContainer = document.querySelector('.preview-container');

    // Determine which JSON file to load based on the current page
    const currentPage = document.body.id; // Make sure to set this ID in your HTML
    const jsonFile = currentPage === 'b4-page' ? './data/b4-archive-data.json' : './data/m1-archive-data.json';

    // Function to create archive items
    function createArchiveItem(item) {
        const div = document.createElement('div');
        div.className = 'archive-item';
        div.setAttribute('data-pdf', item.pdfUrl);
        div.innerHTML = `
            <div class="item-content">
                <p class="pdf-description">${item.description}</p>
                <h4 class="pdf-title">${item.title}</h4>
            </div>
            <div class="item-arrow">&gt;</div>
            <div class="item-details">
                <h4>Memo</h4>
                <p>${item.details}</p>
            </div>
        `;
        return div;
    }

    // Load JSON data and create archive items
    fetch(jsonFile)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(item => {
                const archiveItem = createArchiveItem(item);
                archiveList.appendChild(archiveItem);
            });

            // Add click event listeners to the newly created items
            const archiveItems = document.querySelectorAll('.archive-item');
            archiveItems.forEach(item => {
                item.addEventListener('click', function() {
                    const pdfUrl = this.dataset.pdf;
                    const wasActive = this.classList.contains('active');
                    
                    // Close all items
                    archiveItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                    });

                    // If the clicked item wasn't active before, open it and show preview
                    if (!wasActive) {
                        this.classList.add('active');
                        pdfEmbed.src = pdfUrl;
                        pdfLink.href = pdfUrl;
                        previewContainer.style.display = 'block';
                    } else {
                        // If it was active, we've closed it, so hide the preview
                        pdfEmbed.src = '';
                        pdfLink.href = '';
                        previewContainer.style.display = 'none';
                    }
                });
            });
        })
        .catch(error => {
            console.error('Error loading archive data:', error);
            archiveList.innerHTML = '<p>資料の読み込みに失敗しました。後でもう一度お試しください。</p>';
        });
});