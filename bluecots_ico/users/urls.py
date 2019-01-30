from django.urls import path

from . import views

app_name = "users"
urlpatterns = [    
    path("kyc_count/", view=views.KycCount.as_view(), name="kyc_count"),
    path("kyc_list/", view=views.KycList.as_view(), name="kyc_list"),
    path("kyc_status/", view=views.UserKycStatus.as_view(), name="kyc_status"),
    path("notification_list/", view=views.NotificationList.as_view(), name="notification_list"),
    path("signup_terms_list/", view=views.Signup_terms_list.as_view(), name="signup_terms_list"),    
    path("user_list/", view=views.UserList.as_view(), name="user_list"),
    path("<str:username>/notification/", view=views.UserNotification.as_view(), name="notification"),
    path("<str:username>/password/", view=views.ChangePassword.as_view(), name="password"),
    path("<str:username>/kyc/", view=views.UserKyc.as_view(), name="kyc"),    
    path("<str:username>/mobile_number/", view=views.MobileVerification.as_view(), name="mobile_number"),
    path("<str:username>/profile/", view=views.UserProfile.as_view(), name="profile"),
    path("<str:username>/invitee/", view=views.UserInviteeList.as_view(), name="invitee"),
    path("<str:username>/invitation/", view=views.UserInvitation.as_view(), name="invitation"),
    path("<str:username>/referral_bonus/", view=views.UserReferralBonus.as_view(), name="referral_bonus"),
    path("<str:username>/usertype/", view=views.UserType.as_view(), name="usertype"),
    path("<str:username>/tempstring/", view=views.TempString.as_view(), name="tempstring"),
]