from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # Изменили 'home' на 'index'
    path('categories/', views.category_list, name='category_list'),
    path('categories/<slug:slug>/', views.category_detail, name='category_detail'),
    path('product/<slug:category_slug>/<slug:product_slug>/', views.product_detail, name='product_detail'),
]
