# Generated by Django 2.0.9 on 2018-12-20 06:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0014_auto_20181220_1515'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='kyc_reject_reason',
            field=models.CharField(choices=[('mobile_number', 'Mobile number'), ('photo', 'Photo'), ('none', 'None'), ('country', 'Country')], default='none', max_length=254, null=True),
        ),
    ]
