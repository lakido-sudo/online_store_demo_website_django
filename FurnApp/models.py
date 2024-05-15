from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    """Объект продукт"""
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, default='default-slug')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    image = models.ImageField(upload_to='product_images', null=True, blank=True)
    category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='products', default=1)
    subcategory = models.ForeignKey('Subcategory', on_delete=models.CASCADE, related_name='products', null=True,
                                    blank=True)
    sku = models.CharField(max_length=50, unique=True, default='')
    stock = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(unique=True, default='default-slug')
    description = models.TextField(blank=True)
    parent_category = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='child_categories')

class Subcategory(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(unique=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='subcategories')



class Order(models.Model):
    """Объект ордер"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    order_date = models.DateTimeField(auto_now_add=True)


class UserProfile(models.Model):
    """Объект профайл пользователя"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone_number = models.CharField(max_length=15, unique=True, null=True, blank=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"
