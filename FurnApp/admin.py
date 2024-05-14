from django.contrib import admin
from .models import Product, Order, UserProfile


class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'description')


class OrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'quantity', 'order_date')


class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone_number')


admin.site.register(Product, ProductAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(UserProfile, UserProfileAdmin)
