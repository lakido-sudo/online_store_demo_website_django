document.addEventListener('DOMContentLoaded', function() {
    const catalogButton = document.querySelector('.catalog-button');
    const catalogContainer = document.getElementById('catalog');
    const categoriesDiv = document.querySelector('.categories');
    const categoryElements = [];

    catalogButton.addEventListener('click', function() {
        if (catalogContainer.style.display === 'none') {
            catalogContainer.style.display = 'flex';
            // Загрузка данных категорий после разворачивания каталога
            fetch('/categories/')
                .then(response => response.json())
                .then(data => {
                    categoriesDiv.innerHTML = ''; // Очистка предыдущих категорий

                    data.forEach(category => {
                        const categoryElement = document.createElement('div');
                        categoryElement.classList.add('category-block');
                        categoryElement.textContent = category.name;

                        const subcategoriesDiv = document.createElement('div');
                        subcategoriesDiv.classList.add('subcategories');

                        categoryElement.addEventListener('click', function() {
                            if (categoryElement.classList.contains('selected')) {
                                categoryElement.classList.remove('selected');
                                subcategoriesDiv.style.display = 'none';
                            } else {
                                categoryElement.classList.add('selected');
                                subcategoriesDiv.style.display = 'block';
                            }

                            // Очистить предыдущие подкатегории
                            subcategoriesDiv.innerHTML = '';

                            // Загрузить подкатегории для выбранной категории
                            const subcategories = category.subcategories;
                            subcategories.forEach(subcategory => {
                                const subcategoryElement = document.createElement('div');
                                subcategoryElement.classList.add('subcategory-block');
                                subcategoryElement.textContent = subcategory.name;
                                subcategoriesDiv.appendChild(subcategoryElement);
                            });
                        });

                        categoriesDiv.appendChild(categoryElement);
                        categoriesDiv.appendChild(subcategoriesDiv);
                        categoryElements.push(categoryElement);
                        categoryElements.push(subcategoriesDiv);
                    });
                });
        } else {
            catalogContainer.style.display = 'none';
        }
    });
});

