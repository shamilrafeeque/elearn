# Generated by Django 4.1.2 on 2022-11-16 12:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0021_userquizanswers'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='userquizanswers',
            options={'verbose_name_plural': '9.User Quiz Answer Sheet'},
        ),
        migrations.RemoveField(
            model_name='userquizanswers',
            name='marks',
        ),
    ]
