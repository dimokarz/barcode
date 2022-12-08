from django.db import models


class Organisation(models.Model):
    class Meta:
        verbose_name = 'организацию'
        verbose_name_plural = 'организация'

    org_name = models.CharField(max_length=50, verbose_name='Организация')
    org_address = models.CharField(max_length=200, verbose_name='Адрес')

    def __str__(self):
        return self.org_name


class Goods(models.Model):
    class Meta:
        verbose_name = 'номенклатуру'
        verbose_name_plural = 'номенклатура'

    good_name = models.CharField(max_length=100, verbose_name='Наименование')
    good_article = models.IntegerField(verbose_name='Артикул')
    goods_plu = models.IntegerField(verbose_name='PLU')
    goods_constituent = models.CharField(max_length=100, verbose_name='Состав')
    goods_conditions = models.CharField(max_length=200, verbose_name='Условия хранения')
    goods_period = models.IntegerField(verbose_name='Срок хранения')
    goods_nutrition = models.CharField(max_length=200, verbose_name='Пищевая ценность')
    goods_weight = models.IntegerField(verbose_name='Масса')
    goods_text = models.CharField(max_length=100, verbose_name='Текст')

    def __str__(self):
        return self.good_name
