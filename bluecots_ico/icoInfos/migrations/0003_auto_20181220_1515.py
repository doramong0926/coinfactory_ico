# Generated by Django 2.0.9 on 2018-12-20 06:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('icoInfos', '0002_subscribe'),
    ]

    operations = [
        migrations.AddField(
            model_name='investmentinfo',
            name='total_supply',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='round',
            name='round_type',
            field=models.CharField(choices=[('notstartd', 'Not-Started'), ('presale', 'Presale'), ('rounda', 'Round-A'), ('roundb', 'Round-B'), ('roundc', 'Round-C')], max_length=10),
        ),
    ]
