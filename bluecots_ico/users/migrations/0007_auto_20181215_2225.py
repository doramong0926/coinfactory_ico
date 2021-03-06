# Generated by Django 2.0.9 on 2018-12-15 13:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_auto_20181215_0743'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='kyc_reject_reason',
            field=models.CharField(choices=[('photo', 'Photo'), ('country', 'Country'), ('mobile_number', 'Mobile number'), ('none', 'None')], default='none', max_length=254, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='photo_type',
            field=models.CharField(blank=True, choices=[('passport', 'Passport'), ('drive_license', 'Drive License'), ('id_card', 'ID Card')], default='passport', max_length=10),
        ),
    ]
