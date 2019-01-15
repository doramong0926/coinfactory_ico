from django.urls import path

from . import views

app_name = "icoInfos"
urlpatterns = [
    path("investment/", view=views.InvestmentInfo.as_view(), name="investment"),
    path("ico_wallet_list/", view=views.IcoWalletList.as_view(), name="ico_wallet_list"),
    path("round_list/", view=views.RoundList.as_view(), name="round_list"),
    path("volume_bonus_list/", view=views.VolumeBonusList.as_view(), name="volume_bonus_list"),
    path("round_bonus_list/", view=views.RoundBonusList.as_view(), name="round_bonus_list"),
    path("whitepaper_list/", view=views.WhitePaperList.as_view(), name="whitepaper_list"),
    path("round_supply_list/", view=views.RoundSupplyList.as_view(), name="round_supply_list"),
    path("current_round/", view=views.CurrentRound.as_view(), name="current_round"),
    path("subscribe_list/", view=views.SubscribeList.as_view(), name="subscribe_list"),
    path("send_email/", view=views.SendEmail.as_view(), name="send_email"),    
    path("<str:language_type>/whitepaper/", view=views.WhitePaper.as_view(), name="whitepaper"),
    path("<str:volume_type>/volume_bonus/", view=views.VolumeBonus.as_view(), name="volume_bonus"),
    path("<str:round_type>/round_bonus/", view=views.RoundBonus.as_view(), name="round_bonus"),
    path("<str:round_type>/round_supply/", view=views.RoundSupply.as_view(), name="round_supply"),
]
