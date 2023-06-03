from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'variants', views.VariantModelView, basename='variant')
router.register(r'categories', views.CategoryModelView, basename='category')
router.register(r'products', views.ProductModelView, basename='products')
router.register(r'product_variants_price', views.ProductVariantPriceModelView, basename='products_variant_price')


urlpatterns = [

] + router.urls
