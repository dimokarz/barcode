# Generated by Django 4.1.4 on 2022-12-08 18:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_remove_goods_goods_temperature'),
    ]

    operations = [
        migrations.AddField(
            model_name='goods',
            name='goods_weight',
            field=models.IntegerField(default=3, verbose_name='Масса'),
            preserve_default=False,
        ),
    ]
