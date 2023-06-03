from django_filters import rest_framework as filters
from . import models
from django.db.models import Q


class ProductFilter(filters.FilterSet):
    class Meta:
        model = models.Product
        fields = {
            'product_variant_price__product_variant_size_id': ['in'],
            'product_variant_price__product_variant_color_id': ['in'],
            'product_variant_price__product_variant_brand_id': ['in'],
            'product_variant_price__product_variant_warranty_id': ['in'],
            'product_variant_price__price': ['lt', 'gt'],
        }

    def filter_queryset(self, queryset):
        q_objects = Q()

        for key, value in self.data.items():
            if value:
                if key.endswith('__lt') or key.endswith('__gt'):
                    price = float(value)
                    q_objects &= Q(**{key: price})
                else:
                    ids = [int(k) for k in value.split(',') if k.isdigit()]
                    if ids:
                        q_objects |= Q(**{key: ids})
        print(q_objects)
        return queryset.filter(q_objects)
