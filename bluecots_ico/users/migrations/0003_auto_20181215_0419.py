# Generated by Django 2.0.9 on 2018-12-14 19:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20181215_0406'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='country',
            field=models.CharField(blank=True, max_length=254),
        ),
        migrations.AddField(
            model_name='user',
            name='mobile_number',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='photo_type',
            field=models.CharField(blank=True, choices=[('passport', 'Passport'), ('id_card', 'ID Card'), ('drive_license', 'Drive License')], default='passport', max_length=10),
        ),
    ]
