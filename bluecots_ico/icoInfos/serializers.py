from rest_framework import serializers
from . import models
import time

class TimestampField(serializers.Field):
    def to_representation(self, value):
        return int(time.mktime(value.timetuple()))
        

class SubscribeSerializer(serializers.ModelSerializer):
    created_at = TimestampField()
    class Meta:
        model = models.Subscribe
        fields = (
            'email',
            'created_at',
        )


class RoundSupplySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Round
        fields = (
            'round_type',
            'supply',
        )


class RoundScheduleSerializer(serializers.ModelSerializer):
    start = TimestampField()
    end = TimestampField()
    class Meta:
        model = models.Round
        fields = (
            'round_type',
            'start',
            'end',
            'is_completed',
            'bonus_rate',
        )


class RoundBonusSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Round
        fields = (
            'round_type',
            'bonus_rate',
        )


class VolumeBonusSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.VolumeBonus
        fields = (
            'volume_bonus_type',
            'amount',
            'bonus_rate'
        )



class WalletAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.WalletAddress
        fields = (
            'wallet_type',
            'address',
        )
        

class InvestementInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.InvestmentInfo
        fields = (
            'exchange_price',
            'minimum_investment_eth',
            'raferral_bonus_rate',
            'softcap',
            'hardcap',
            'total_supply',
            'eth_price',
        )

class ReferralBounsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.InvestmentInfo
        fields = (
            'raferral_bonus_rate',
        )


class WhitePaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.WhitePaper
        fields = (
            'language',
            'file_path',
        )
