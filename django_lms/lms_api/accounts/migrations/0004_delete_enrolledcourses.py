# Generated by Django 4.1.2 on 2022-11-05 06:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_enrolledcourses'),
    ]

    operations = [
        migrations.DeleteModel(
            name='EnrolledCourses',
        ),
    ]
