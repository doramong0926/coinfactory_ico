# Generated by Django 2.0.9 on 2019-01-08 17:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0019_auto_20181220_1726'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='mobile_country',
            field=models.CharField(blank=True, max_length=254, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='kyc_reject_reason',
            field=models.CharField(choices=[('mobile_number', 'Mobile number'), ('photo', 'Photo'), ('country', 'Country'), ('none', 'None')], default='none', max_length=254, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='photo_type',
            field=models.CharField(blank=True, choices=[('id_card', 'ID Card'), ('passport', 'Passport'), ('drive_license', 'Drive License')], default='passport', max_length=50),
        ),
    ]
