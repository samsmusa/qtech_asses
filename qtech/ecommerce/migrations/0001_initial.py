# Generated by Django 4.2 on 2023-06-04 15:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('file_server', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=40, unique=True)),
                ('description', models.TextField()),
                ('image', models.ManyToManyField(blank=True, null=True, related_name='category', to='file_server.filemanager')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=255)),
                ('sku', models.SlugField(max_length=255, unique=True)),
                ('description', models.TextField()),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_category', to='ecommerce.category')),
                ('image', models.ManyToManyField(blank=True, null=True, related_name='product', to='file_server.filemanager')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Variant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(choices=[('color', 'COLOR'), ('size', 'SIZE'), ('warranty', 'WARRANTY'), ('brand', 'BRAND')], max_length=40, unique=True)),
                ('description', models.TextField()),
                ('active', models.BooleanField(default=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ProductVariant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=20)),
                ('variant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_variants', to='ecommerce.variant')),
            ],
            options={
                'unique_together': {('title', 'variant')},
            },
        ),
        migrations.CreateModel(
            name='ProductVariantPrice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('price', models.FloatField()),
                ('stock', models.FloatField()),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_variant_price', to='ecommerce.product')),
                ('product_variant_brand', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='product_variant_brand', to='ecommerce.productvariant')),
                ('product_variant_color', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='product_variant_color', to='ecommerce.productvariant')),
                ('product_variant_size', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='product_variant_size', to='ecommerce.productvariant')),
                ('product_variant_warranty', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='product_variant_warranty', to='ecommerce.productvariant')),
            ],
            options={
                'unique_together': {('product_variant_color', 'product_variant_color', 'product_variant_size', 'product_variant_size', 'product_variant_warranty', 'product_variant_warranty', 'product_variant_brand', 'product_variant_brand', 'product')},
            },
        ),
    ]
