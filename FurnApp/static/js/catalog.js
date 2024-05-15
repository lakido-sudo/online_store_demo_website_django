document.addEventListener('DOMContentLoaded', function() {
    const catalogButton = document.querySelector('.catalog-button');
    const catalogContainer = document.getElementById('catalog');
    const categoriesDiv = document.querySelector('.categories');

    catalogButton.addEventListener('click', function() {
        if (catalogContainer.style.display === 'none') {
            catalogContainer.style.display = 'flex';
            // Загрузите данные категорий после разворачивания каталога
            fetch('/categories/')
                .then(response => response.json())
                .then(data => {
                    categoriesDiv.innerHTML = ''; // Очистите предыдущие категории
                    data.forEach(category => {
                        const categoryElement = document.createElement('div');
                        categoryElement.textContent = category.name;
                        categoryElement.addEventListener('click', function() {
                            // Загрузите детальную информацию о категории при клике на категорию
                            fetch(`/categories/${category.slug}/`)
                                .then(response => response.json())
                                .then(categoryData => {
                                    const detailsDiv = document.querySelector('.details');
                                    detailsDiv.innerHTML = `
                                        <h2>${categoryData.name}</h2>
                                        <p>${categoryData.description}</p>
                                        <h3>Продукты:</h3>
                                        <ul>
                                            ${categoryData.products.map(product => `
                                                <li><a href="/product/${category.slug}/${product.slug}/">${product.name}</a></li>
                                            `).join('')}
                                        </ul>
                                    `;
                                });
                        });
                        categoriesDiv.appendChild(categoryElement);
                    });
                });
        } else {
            catalogContainer.style.display = 'none';
        }
    });
});

