# Generated by Django 4.1.2 on 2022-11-18 16:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0029_certificate_course'),
    ]

    operations = [
        migrations.AddField(
            model_name='postcertificate',
            name='course',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
