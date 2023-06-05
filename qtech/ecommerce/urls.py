from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register(r'variants', views.VariantModelView, basename='variant')
router.register(r'categories', views.CategoryModelView, basename='category')
router.register(r'products', views.ProductModelView, basename='products')
router.register(r'product_variants_price', views.ProductVariantPriceModelView, basename='products_variant_price')
category = routers.NestedDefaultRouter(router, 'categories', lookup='category')
category.register('products', views.ProductCategoryModelView, basename='category-product')


urlpatterns = [

] + router.urls + category.urls
