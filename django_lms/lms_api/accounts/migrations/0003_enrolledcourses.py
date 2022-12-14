# Generated by Django 4.1.2 on 2022-11-05 06:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_alter_account_is_active'),
    ]

    operations = [
        migrations.CreateModel(
            name='EnrolledCourses',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=30)),
                ('email', models.EmailField(max_length=254)),
                ('mobile', models.IntegerField(max_length=10, null=True, unique=True)),
            ],
        ),
    ]
