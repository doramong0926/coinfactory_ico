from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model
from bluecots_ico.users.forms import UserChangeForm, UserCreationForm
from . import models

User = get_user_model()

@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    fieldsets = (('User', {'fields': ('user_type', 'temp_string', 'kyc_status', 'kyc_reject_reason', 'kyc_agreement1', 'kyc_agreement2', 'wallet_address', 'country', 'mobile_country', 'mobile_number', 'photo_type', 'photo', 'referral_address', 'invitation', 'invitees')}),) + auth_admin.UserAdmin.fieldsets
    list_display = (
        "username", 
        'created_at',
        "user_type", 
        "email",
        'kyc_status',
        "invitation",     
        "invitees_count",
        'wallet_address',
        "referral_address",   
        "is_superuser",
        "is_staff",
        'updated_at',
    )
    search_fields = ["username", "email", 'wallet_address']
    list_filter = (
        'user_type',        
        'is_staff',
        'invitation',
        'kyc_status',
    )


@admin.register(models.Notification)
class NotificationAdmin(admin.ModelAdmin):    
    list_display = (
        'to',
        'notification_type',
        'message',
        'created_at',
        'updated_at',
    )

@admin.register(models.SignupTerms)
class SignupTermsAdmin(admin.ModelAdmin):
    list_display = (
        'creator',
        'agreement',
        'created_at',
        'updated_at',
    )
