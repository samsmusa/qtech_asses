from django.contrib import admin
from django.utils.html import format_html

# Register your models here.
from . import models
from file_server import models as FileServerModel

# Register your models here.
# admin.site.register(models.Product)
admin.site.register(models.Variant)


class CategoryImageInline(admin.TabularInline):
    model = models.Category.image.through
    readonly_fields = ['thumbnail']

    def thumbnail(self, instance):
        if instance.id is not None:
            return format_html(f'<img src="{instance.filemanager.file.url}" style="height:50px;" />')
        return ''


class ProductImageInline(admin.TabularInline):
    model = models.Product.image.through
    readonly_fields = ['thumbnail']

    def thumbnail(self, instance):
        # print(instance.file.url)
        if instance.id is not None:
            return format_html(f'<img src="{instance.filemanager.file.url}" style="height:50px;" />')
        return ''


@admin.register(models.Product)
class ProductAdmin(admin.ModelAdmin):
    # autocomplete_fields = ['category']
    inlines = [ProductImageInline]


@admin.register(models.ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "variant"]


@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["id", "title"]
    inlines = [CategoryImageInline]


@admin.register(models.ProductVariantPrice)
class ProductVariantPriceAdmin(admin.ModelAdmin):
    list_display = ["id", "product_variant_size", "product_variant_color", "product_variant_brand",
                    "product_variant_warranty"]
