from django.db import models
from qtech.mixins.models import TimeStampMixin

from file_server.models import FileManager

# Create your models here.

VARIANTS = [
    ('color', 'COLOR'),
    ('size', 'SIZE'),
    ('warranty', 'WARRANTY'),
    ('brand', 'BRAND'),
]


class Category(TimeStampMixin):
    title = models.CharField(max_length=40, unique=True)
    description = models.TextField()
    image = models.ManyToManyField(FileManager, related_name='category', null=True, blank=True)

    def __str__(self):
        return self.title


class Variant(TimeStampMixin):
    title = models.CharField(max_length=40, unique=True, choices=VARIANTS)
    description = models.TextField()
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.title


class Product(TimeStampMixin):
    title = models.CharField(max_length=255)
    sku = models.SlugField(max_length=255, unique=True)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='product_category')
    image = models.ManyToManyField(FileManager, related_name='product', null=True, blank=True)

    def __str__(self):
        return self.title


class ProductVariant(TimeStampMixin):
    title = models.CharField(max_length=20)
    variant = models.ForeignKey(Variant, on_delete=models.CASCADE, related_name='product_variants', )

    class Meta:
        unique_together = ('title', 'variant',)

    def __str__(self):
        return '--'.join([self.variant.title, self.title])


class ProductVariantPrice(TimeStampMixin):
    product_variant_size = models.ForeignKey(ProductVariant, on_delete=models.CASCADE, null=True, blank=True,
                                             related_name='product_variant_size')
    product_variant_color = models.ForeignKey(ProductVariant, on_delete=models.CASCADE, null=True, blank=True,
                                              related_name='product_variant_color')
    product_variant_brand = models.ForeignKey(ProductVariant, on_delete=models.CASCADE, null=True, blank=True,
                                              related_name='product_variant_brand')
    product_variant_warranty = models.ForeignKey(ProductVariant, on_delete=models.CASCADE, null=True, blank=True,
                                                 related_name='product_variant_warranty')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_variant_price')
    price = models.FloatField()
    stock = models.FloatField()

    class Meta:
        unique_together = (
            'product_variant_color', 'product_variant_color',
            'product_variant_size', 'product_variant_size',
            'product_variant_warranty', 'product_variant_warranty',
            'product_variant_brand', 'product_variant_brand',
            'product'
        )

    def __str__(self):
        variant_values = [
            getattr(self, f'product_variant_{variant}').title if getattr(self, f'product_variant_{variant}') else '//'
            for variant in ['size', 'color', 'brand', 'warranty']]
        return '--'.join([self.product.title] + variant_values)
