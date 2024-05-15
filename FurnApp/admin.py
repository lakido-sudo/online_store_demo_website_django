from django.contrib import admin
from .models import Product, Order, UserProfile, Category, Subcategory


class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'description')
    prepopulated_fields = {'slug': ('title',)}


admin.site.register(Product, ProductAdmin)


class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}


admin.site.register(Category, CategoryAdmin)


class SubcategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    list_filter = ('category',)
    prepopulated_fields = {'slug': ('name',)}


admin.site.register(Subcategory, SubcategoryAdmin)


class OrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'quantity', 'order_date')


admin.site.register(Order, OrderAdmin)


class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone_number')


admin.site.register(UserProfile, UserProfileAdmin)
