# Generated by Django 2.0.13 on 2019-05-10 11:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todolist', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='status',
            field=models.CharField(default='not_complete', max_length=200),
            preserve_default=False,
        ),
    ]