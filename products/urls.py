from django.urls import path, include
from .views import get_product, external_api_request

app_name = 'products'

urlpatterns = [
    path('<int:product_id>',get_product, name='product_detail'),
    path('external-api', external_api_request, name='external_api'),
]
