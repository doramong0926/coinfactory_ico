# Generated by Django 2.0.9 on 2018-12-14 19:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='kyc_agreement',
            new_name='kyc_agreement1',
        ),
        migrations.AddField(
            model_name='user',
            name='kyc_agreement2',
            field=models.BooleanField(default=False),
        ),
    ]
