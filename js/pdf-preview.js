document.addEventListener('DOMContentLoaded', function() {
    const archiveItems = document.querySelectorAll('.archive-item');
    const pdfEmbed = document.querySelector('.pdf-embed');
    const pdfLink = document.querySelector('.pdf-link');
    const previewContainer = document.querySelector('.preview-container');

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
});