# Generated by Django 3.2.4 on 2021-08-04 23:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('backend', '0005_alter_account_password'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='email',
            field=models.EmailField(blank=True, max_length=254),
        ),
        migrations.AlterField(
            model_name='account',
            name='url',
            field=models.URLField(blank=True),
        ),
        migrations.AlterField(
            model_name='vault',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='vaults', to=settings.AUTH_USER_MODEL),
        ),
    ]
