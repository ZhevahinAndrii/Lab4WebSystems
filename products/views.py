from django.http import HttpRequest, JsonResponse
from django.shortcuts import render
import requests
from .models import Product
def get_product(request: HttpRequest, product_id:int):
    try:
        data: Product = Product.objects.get(id=product_id)
        print(f'{data=}')
        data = {'id': data.id, 'name': data.name, 'from_db':True}
    except Product.DoesNotExist:
        data = {'id': str(product_id),
            'name': f'{product_id} name',
            'from_db':False}
    return JsonResponse(
        data=data
    )

def external_api_request(request: HttpRequest):
    response = requests.get('https://jsonplaceholder.typicode.com/users')
    return JsonResponse(response.json(), safe=False)
