# Generated by Django 2.0.9 on 2018-12-15 17:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_auto_20181215_2225'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='kyc_reject_reason',
            field=models.CharField(choices=[('photo', 'Photo'), ('none', 'None'), ('country', 'Country'), ('mobile_number', 'Mobile number')], default='none', max_length=254, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='photo_type',
            field=models.CharField(blank=True, choices=[('passport', 'Passport'), ('id_card', 'ID Card'), ('drive_license', 'Drive License')], default='passport', max_length=10),
        ),
    ]
