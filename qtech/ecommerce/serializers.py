from asyncore import write
from rest_framework import serializers
from rest_framework.response import Response
from file_server import models, serializers as fileSerializer
from . import models


class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductVariant
        fields = ('id', 'title')


class VariantSerializer(serializers.ModelSerializer):
    # variant = serializers.SerializerMethodField(method_name='get_variant')
    variant = ProductVariantSerializer(source='product_variants', many=True)

    class Meta:
        model = models.Variant
        fields = ('id', 'variant')

    def get_variant(self, obj):
        return obj.product_variants.values_list('title', flat=True)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = '__all__'


class ProductVariantPriceSerializer(serializers.ModelSerializer):
    size = serializers.StringRelatedField(source='product_variant_size.title')
    color = serializers.StringRelatedField(source='product_variant_color.title')
    brand = serializers.StringRelatedField(source='product_variant_brand.title')

    # variant = serializers.StringRelatedField(source='product_variant.variant.title')

    class Meta:
        model = models.ProductVariantPrice
        fields = ("id", 'price', 'stock', 'size', 'color', 'brand')


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    image = fileSerializer.FileManagerSerializer(many=True)
    more = ProductVariantPriceSerializer(source="product_variant_price", many=True)

    class Meta:
        model = models.Product
        fields = "__all__"


class ADDProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = "__all__"


class ProductVariantBrandPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductVariantPrice
        fields = '__all__'
