from django.db.models import Count
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from ecommerce import serializers, models, filters


class VariantModelView(viewsets.ModelViewSet):
    queryset = models.Variant.objects.prefetch_related('product_variants').all()
    serializer_class = serializers.VariantSerializer
    # permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['title']
    # filterset_class = filters.ProductFilter


class CategoryModelView(viewsets.ModelViewSet):
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer
    # permission_classes = [IsAuthenticated]


class ProductModelView(viewsets.ModelViewSet):
    queryset = models.Product.objects.select_related('category').prefetch_related('image',
                                                                                  'product_variant_price').all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = filters.ProductFilter

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.annotate(total=Count('id'))
        return queryset

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT']:
            return serializers.ADDProductSerializer
        return serializers.ProductSerializer


class ProductVariantPriceModelView(viewsets.ModelViewSet):
    queryset = models.ProductVariantPrice.objects.select_related('product', 'product_variant_size',
                                                                 'product_variant_color', 'product_variant_brand').all()

    def get_serializer_class(self):
        # if self.request.method in ['POST', 'PUT']:
        #     return serializers.ADDProductSerializer
        return serializers.ProductVariantPriceSerializer
