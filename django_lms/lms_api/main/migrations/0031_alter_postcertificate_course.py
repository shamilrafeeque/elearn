# Generated by Django 4.1.2 on 2022-11-18 16:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0030_postcertificate_course'),
    ]

    operations = [
        migrations.AlterField(
            model_name='postcertificate',
            name='course',
            field=models.IntegerField(null=True),
        ),
    ]