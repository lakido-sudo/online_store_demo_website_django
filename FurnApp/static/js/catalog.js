document.addEventListener('DOMContentLoaded', function() {
    const catalogButton = document.querySelector('.catalog-button');
    const catalogContainer = document.getElementById('catalog');
    const categoriesDiv = document.querySelector('.categories');
    const detailsDiv = document.querySelector('.details');

    catalogButton.addEventListener('click', function() {
        if (catalogContainer.style.display === 'none') {
            catalogContainer.style.display = 'flex';
            detailsDiv.style.display = 'flex'; // Показываем блок подкатегорий при открытии каталога
            // Загрузка данных категорий после разворачивания каталога
            fetch('/categories/')
                .then(response => response.json())
                .then(data => {
                    categoriesDiv.innerHTML = ''; // Очистка предыдущих категорий
                    detailsDiv.innerHTML = ''; // Очистка предыдущих подкатегорий

                    data.forEach(category => {
                        const categoryElement = document.createElement('div');
                        categoryElement.classList.add('category-block');
                        categoryElement.textContent = category.name;

                        categoryElement.addEventListener('click', function() {
                            const subcategories = category.subcategories;
                            const subcategoriesDiv = document.createElement('div');
                            subcategoriesDiv.classList.add('subcategories');

                            subcategories.forEach(subcategory => {
                                const subcategoryElement = document.createElement('div');
                                subcategoryElement.classList.add('subcategory-block');
                                subcategoryElement.textContent = subcategory.name;
                                subcategoriesDiv.appendChild(subcategoryElement);
                            });

                            detailsDiv.innerHTML = `
                                <h2>${category.name}</h2>
                                <p>${category.description}</p>
                                <h3>Подкатегории:</h3>
                            `;
                            detailsDiv.appendChild(subcategoriesDiv);
                        });

                        categoriesDiv.appendChild(categoryElement);
                    });
                });
        } else {
            catalogContainer.style.display = 'none';
            detailsDiv.style.display = 'none'; // Скрываем блок подкатегорий при закрытии каталога
        }
    });
});

