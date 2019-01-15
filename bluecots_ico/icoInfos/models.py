from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from bluecots_ico.users import models as user_models

@python_2_unicode_compatible
class TimeStampModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        abstract = True

@python_2_unicode_compatible
class Subscribe(TimeStampModel):
    email =  models.CharField(max_length=50, blank=True, null=True)        

@python_2_unicode_compatible
class InvestmentInfo(models.Model):
    key_string =  models.CharField(max_length=50, blank=False, null=True)
    exchange_price = models.FloatField(blank=False)
    raferral_bonus_rate = models.IntegerField(blank=False, null=True)
    minimum_investment_eth = models.FloatField(blank=False)
    softcap = models.IntegerField(blank=False, null=True)
    hardcap = models.IntegerField(blank=False, null=True)
    total_supply = models.IntegerField(blank=False, null=True)
    eth_price = models.FloatField(blank=False, null=True)

@python_2_unicode_compatible
class WalletAddress(models.Model):
    WALLET_TYPE = (
        ('ico', 'Ico'),
        ('contract', 'Contract'),
        ('owner', 'Owner'),
    )
    wallet_type = models.CharField(max_length=254, choices=WALLET_TYPE , blank=False, null=True)
    address = models.CharField(max_length=254, blank=False, null=True)


@python_2_unicode_compatible
class Round(TimeStampModel):
    ROUND_TYPE = (
        ('presale', 'Presale'),
        ('rounda', 'Round-A'),
        ('roundb', 'Round-B'),
        ('roundc', 'Round-C'),
        ('notstartd', 'Not-Started'),
        ('prerounda', 'Pre-Round-A'),
        ('preroundb', 'Pre-Round-B'),
        ('preroundc', 'Pre-Round-C'),
    )
    round_type = models.CharField(max_length=10, choices=ROUND_TYPE, blank=False)
    supply = models.IntegerField(blank=True, null=True)
    bonus_rate = models.IntegerField(blank=True, null=True)
    start = models.DateTimeField(blank=True, null=True)
    end = models.DateTimeField(blank=True, null=True)
    is_completed = models.BooleanField(blank=False)
    started_block_height = models.IntegerField(blank=True, null=True)


@python_2_unicode_compatible
class VolumeBonus(models.Model):
    VOLUME_BONUS_TYPE = (
        ('volumea', 'Volume-A'),
        ('volumeb', 'Volume-B'),
        ('volumec', 'Volume-C'),
    )
    volume_bonus_type = models.CharField(max_length=10, choices=VOLUME_BONUS_TYPE, blank=False)
    amount = models.IntegerField(blank=False)
    bonus_rate = models.IntegerField(blank=False)


@python_2_unicode_compatible
class WhitePaper(models.Model):
    LANGUAGE_TYPE = (
        ('kor', 'Kor'),
        ('eng', 'Eng'),
    )
    language = models.CharField(max_length=50, choices=LANGUAGE_TYPE, blank=False)
    file_path = models.FileField(upload_to='whitePaper/', max_length=100, blank=False)


    