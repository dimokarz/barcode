from django.shortcuts import render
from django.http import JsonResponse
from .models import Organisation, Goods


def index(request):
    goods = Goods.objects.all().values()
    return render(request, 'index.html', {'goods': goods})


def selGood(request):
    currID = request.GET.get('id')[2:]
    selected = Goods.objects.filter(id=currID).values()
    return JsonResponse({'data': list(selected)})
