# Generated by Django 3.2.4 on 2021-07-15 19:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_remove_account_category'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='account',
            options={'ordering': ['account_name']},
        ),
        migrations.AlterModelOptions(
            name='vault',
            options={'ordering': ['vault_name']},
        ),
    ]
