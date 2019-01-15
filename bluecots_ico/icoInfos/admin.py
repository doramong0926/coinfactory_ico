from django.contrib import admin
from . import models

@admin.register(models.Subscribe)
class SubscribeAdmin(admin.ModelAdmin):
    list_display = (    
        'email',
        'created_at',
    )

@admin.register(models.InvestmentInfo)
class InvestmentInfoAdmin(admin.ModelAdmin):
    list_display = (    
        'key_string',
        'exchange_price',
        'eth_price',
        'minimum_investment_eth',
        'total_supply',
        'softcap',
        'hardcap',
        'raferral_bonus_rate',                
    )


@admin.register(models.WalletAddress)
class WalletAddressAdmin(admin.ModelAdmin):
    list_display = (     
        'wallet_type',
        'address',
    )
    
@admin.register(models.Round)
class RoundAdmin(admin.ModelAdmin):
    list_filter = (
        'round_type',        
        'is_completed',
    )

    list_display = (        
        'id',
        'round_type',
        'supply',
        'bonus_rate',
        'start',
        'end',
        'is_completed',
        'started_block_height',
        'created_at',
        'updated_at',
    )


@admin.register(models.VolumeBonus)
class VolumeAdmin(admin.ModelAdmin):
    list_display = (        
        'id',
        'volume_bonus_type',
        'amount',
        'bonus_rate',
    )


@admin.register(models.WhitePaper)
class WhitePaperAdmin(admin.ModelAdmin):
    list_display = (        
        'id',
        'language',
        'file_path',
    )
