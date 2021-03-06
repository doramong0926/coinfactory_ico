# Generated by Django 2.0.9 on 2018-12-14 22:32

import bluecots_ico.users.models
from django.db import migrations, models
import versatileimagefield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_auto_20181215_0726'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='photo',
            field=versatileimagefield.fields.VersatileImageField(blank=True, upload_to=bluecots_ico.users.models.User.photo_file_name),
        ),
        migrations.AlterField(
            model_name='user',
            name='photo_type',
            field=models.CharField(blank=True, choices=[('passport', 'Passport'), ('id_card', 'ID Card'), ('drive_license', 'Drive License')], default='passport', max_length=10),
        ),
    ]
