document.addEventListener('DOMContentLoaded', function() {
    const catalogButton = document.querySelector('.catalog-button');
    const catalogContainer = document.getElementById('catalog');

    catalogButton.addEventListener('click', function() {
        if (catalogContainer.style.display === 'none') {
            catalogContainer.style.display = 'flex';
        } else {
            catalogContainer.style.display = 'none';
        }
    });
});
