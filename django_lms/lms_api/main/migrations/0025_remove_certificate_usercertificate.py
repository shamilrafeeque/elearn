# Generated by Django 4.1.2 on 2022-11-17 10:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0024_alter_certificate_options_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='certificate',
            name='usercertificate',
        ),
    ]
