from django.contrib import admin
from .models import Organisation, Goods


@admin.register(Organisation)
class OrganisationAdmin(admin.ModelAdmin):
    list_display = ['org_name']


@admin.register(Goods)
class GoodsAdmin(admin.ModelAdmin):
    list_display = ['good_name']