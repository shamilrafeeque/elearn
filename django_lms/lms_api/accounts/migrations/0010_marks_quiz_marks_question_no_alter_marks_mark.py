# Generated by Django 4.1.2 on 2022-11-18 14:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0009_totalmarks'),
    ]

    operations = [
        migrations.AddField(
            model_name='marks',
            name='Quiz',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='marks',
            name='question_no',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='marks',
            name='mark',
            field=models.IntegerField(null=True),
        ),
    ]
