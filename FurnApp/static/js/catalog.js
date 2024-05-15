document.addEventListener('DOMContentLoaded', function() {
    const catalogButton = document.querySelector('.catalog-button');
    const catalogContainer = document.getElementById('catalog');
    const categoriesDiv = document.querySelector('.categories');
    const subcategoriesDiv = document.querySelector('.subcategories');

    catalogButton.addEventListener('click', function() {
        if (catalogContainer.style.display === 'none') {
            catalogContainer.style.display = 'flex';
            // Загрузка данных категорий после разворачивания каталога
            fetch('/categories/')
                .then(response => response.json())
                .then(data => {
                    categoriesDiv.innerHTML = ''; // Очистка предыдущих категорий
                    subcategoriesDiv.innerHTML = ''; // Очистка предыдущих подкатегорий

                    data.forEach(category => {
                        const categoryElement = document.createElement('div');
                        categoryElement.classList.add('category-block');
                        categoryElement.textContent = category.name;

                        categoryElement.addEventListener('click', function() {
                            // Удалить класс selected со всех блоков категорий
                            const categoryBlocks = document.querySelectorAll('.category-block');
                            categoryBlocks.forEach(block => block.classList.remove('selected'));

                            // Добавить класс selected к выбранному блоку категории
                            this.classList.add('selected');

                            // Загрузить подкатегории для выбранной категории
                            const subcategories = category.subcategories;
                            subcategoriesDiv.innerHTML = `
                                <h2>${category.name}</h2>
                                <div class="subcategory-blocks">
                                    ${subcategories.map(subcategory => `
                                        <div class="subcategory-block">${subcategory.name}</div>
                                    `).join('')}
                                </div>
                            `;
                        });


                        categoriesDiv.appendChild(categoryElement);
                    });
                });
        } else {
            catalogContainer.style.display = 'none';
        }
    });
});

