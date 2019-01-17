from rest_framework import serializers
from . import models
import time

class TimestampField(serializers.Field):
    def to_representation(self, value):
        return int(time.mktime(value.timetuple()))


class UsernameSerializer(serializers.ModelSerializer):    
    class Meta:
        model = models.User
        fields = (
            'username',
        )


class InviteeSerializer(serializers.ModelSerializer):    
    class Meta:
        model = models.User
        fields = (
            'username',
            'email',
            'kyc_status',
        )

class UserTypeSerializer(serializers.ModelSerializer):    
    class Meta:
        model = models.User
        fields = (
            'username',
            'user_type',
            'is_superuser',
            'is_staff',
        )

class TempStringSerializer(serializers.ModelSerializer):    
    class Meta:
        model = models.User
        fields = (
            'username',
            'temp_string',
            'user_type',
            'is_superuser',
            'is_staff',
        )     

class UserProfileSerializer(serializers.ModelSerializer):
    invitation = UsernameSerializer()
    invitees = UsernameSerializer(many=True)
    class Meta:
        model = models.User
        fields = (
            'username',
            'country',
            'mobile_number',
            'mobile_country',
            'email',
            'first_name',
            'last_name',
            'referral_address',
            'invitation',
            'invitees',
            'invitees_count',
            'kyc_status',
            'kyc_agreement1',
            'kyc_agreement2',
            'wallet_address',
            'photo_type',
            'photo',
            'user_type',
            'is_superuser',
            'is_staff',
        )

class UserKycSerializer(serializers.ModelSerializer):
    updated_at = TimestampField()
    class Meta:
        model = models.User
        fields = (
            'username',
            'kyc_status',
            'kyc_reject_reason',
            'country',
            'mobile_number',
            'mobile_country',
            'kyc_agreement1',
            'kyc_agreement2',
            'email',
            'first_name',
            'last_name',
            'wallet_address',
            'photo_type',
            'photo',
            'updated_at',
            'is_whitelisted',
        )


class NotificationSerializer(serializers.ModelSerializer):
    to = UsernameSerializer()
    created_at = TimestampField()
    updated_at = TimestampField()
    class Meta:
        model = models.Notification
        fields = (
            'to',
            'notification_type',
            'message',
            'created_at',
            'updated_at',
        )

class SignupTermsSerializer(serializers.ModelSerializer):
    creator = UsernameSerializer()
    created_at = TimestampField()
    updated_at = TimestampField()
    class Meta:
        model = models.SignupTerms
        fields = (
            'creator',
            'agreement',
            'created_at',
            'updated_at',
        )

# class CustomRegisterSerializer(serializers.Serializer):
#     username = serializers.CharField(
#         max_length=get_username_max_length(),
#         min_length=allauth_settings.USERNAME_MIN_LENGTH,
#         required=allauth_settings.USERNAME_REQUIRED
#     )
#     email = serializers.EmailField(required=allauth_settings.EMAIL_REQUIRED)
#     password1 = serializers.CharField(write_only=True)
#     password2 = serializers.CharField(write_only=True)
#     fullname = serializers.CharField(write_only=True)

#     def validate_username(self, username):
#         username = get_adapter().clean_username(username)
#         return username

#     def validate_email(self, email):
#         email = get_adapter().clean_email(email)
#         if allauth_settings.UNIQUE_EMAIL:
#             if email and email_address_exists(email):
#                 raise serializers.ValidationError(
#                     _("A user is already registered with this e-mail address."))
#         return email

#     def validate_password1(self, password):
#         return get_adapter().clean_password(password)

#     def validate(self, data):
#         if data['password1'] != data['password2']:
#             raise serializers.ValidationError(_("The two password fields didn't match."))
#         return data

#     def custom_signup(self, request, user):
#         pass

#     def get_cleaned_data(self):
#         return {
#             'username': self.validated_data.get('username', ''),
#             'password1': self.validated_data.get('password1', ''),
#             'email': self.validated_data.get('email', ''),
#             'fullname': self.validated_data.get('fullname', ''), #get fullname
#         }

#     def save(self, request):
#         adapter = get_adapter()
#         user = adapter.new_user(request)
#         self.cleaned_data = self.get_cleaned_data()
#         user.username = self.cleaned_data['fullname'] #set fullname as username
#         adapter.save_user(request, user, self)
#         self.custom_signup(request, user)
#         setup_user_email(request, user, [])
#         return user


