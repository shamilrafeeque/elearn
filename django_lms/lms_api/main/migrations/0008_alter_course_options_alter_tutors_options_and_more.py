# Generated by Django 4.1.2 on 2022-11-03 17:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0007_chapter'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='course',
            options={'verbose_name_plural': '3.Courses'},
        ),
        migrations.AlterModelOptions(
            name='tutors',
            options={'verbose_name_plural': '1.Tutotrs'},
        ),
        migrations.CreateModel(
            name='Assignments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('assignmentsPDF', models.FileField(upload_to='tutor/assignments')),
                ('chapter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.chapter')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('tutor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.tutors')),
            ],
            options={
                'verbose_name_plural': '5.Assignments',
            },
        ),
    ]
