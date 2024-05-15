from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import Category, Product

from django.shortcuts import render


def home(request):
    return render(request, 'home.html')


def category_list(request):
    categories = Category.objects.all()
    data = [{'name': category.name, 'slug': category.slug, 'subcategories': list(category.subcategories.all().values('name', 'slug'))} for category in categories]
    return JsonResponse(data, safe=False)


def category_detail(request, slug):
    category = get_object_or_404(Category, slug=slug)
    products = Product.objects.filter(category=category)
    data = {
        'name': category.name,
        'description': category.description,
        'products': [{'name': product.name, 'slug': product.slug} for product in products]
    }
    return JsonResponse(data)


def product_detail(request, category_slug, product_slug):
    category = get_object_or_404(Category, slug=category_slug)
    product = get_object_or_404(Product, slug=product_slug, category=category)
    data = {
        'name': product.name,
        'price': str(product.price),
        'description': product.description,
        'image': product.image.url if product.image else '',
        'stock': product.stock,
        'is_featured': product.is_featured
    }
    return JsonResponse(data)
