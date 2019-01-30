from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import BasePermission, AllowAny, IsAdminUser, IsAuthenticated

from django.core.mail import EmailMultiAlternatives
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.html import strip_tags
from django.template.loader import render_to_string

from . import models, serializers

from bluecots_ico.icoInfos import models as icoInfo_models
from bluecots_ico.icoInfos import serializers as icoInfo_serializers

import random
from twilio.rest import Client
from django.conf import settings

def isStaff(username):
    try:
        found_user = models.User.objects.get(username=username)
        if found_user.is_superuser == True:
            return True
        elif found_user.is_staff == True:
            return True
        else:
            return False
    except models.User.DoesNotExist:
        return False    

def isSuperUser(username):
    try:
        found_user = models.User.objects.get(username=username)
        if found_user.is_superuser == True:
            return True
        else:
            return False
    except models.User.DoesNotExist:
        return False    

class UserNotification(APIView):    
    def get(self, request, username, format=None):
        user = request.user
        try:
            found_user = models.User.objects.get(username=username)
        except models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user notification',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        if found_user.username != user.username and isStaff(username=user.username) == False:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user notification',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        found_notification = models.Notification.objects.filter(to__username=username)
        serializer = serializers.NotificationSerializer(found_notification, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get user notification',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)

class Signup_terms_list(APIView):
    def get(self, request, format=None):
        user = request.user
        if isStaff(username=user.username) == False:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user signup terms list',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)
        found_signup_terms = models.SignupTerms.objects.all()
        serializer = serializers.SignupTermsSerializer(found_signup_terms, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get user signup terms list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)

class NotificationList(APIView):    
    def get(self, request, format=None):
        user = request.user
        if isStaff(username=user.username) == False:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user notification list',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        found_notifications = models.Notification.objects.all()
        serializer = serializers.NotificationSerializer(found_notifications, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get user notification list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)

class UserType(APIView):    
    def get(self, request, username, format=None):
        user = request.user
        try:
            found_user = models.User.objects.get(username=username)
        except models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user type',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        if found_user.username != user.username and isStaff(username=user.username) == False:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user type',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        serializer = serializers.UserTypeSerializer(found_user)
        ret_data = {
            'status': '1',
            'message': 'Succes to get user type',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)
        
class TempString(APIView):    
    def get(self, request, username, format=None):
        user = request.user
        try:
            found_user = models.User.objects.get(username=username)
        except models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get temp string',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        if isSuperUser(username=user.username) == False:
            ret_data = {
                'status': '0',
                'message': 'Fail to get temp string',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        serializer = serializers.TempStringSerializer(found_user)
        ret_data = {
            'status': '1',
            'message': 'Succes to get temp string',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)

    def put(self, request, username, format=None):
        user = request.user
        try:
            found_user = models.User.objects.get(username=username)
        except models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to put temp string',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)
        if isSuperUser(username=user.username) == False:
            ret_data = {
                'status': '0',
                'message': 'Fail to put temp string',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = serializers.TempStringSerializer(found_user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                ret_data = {
                    'status': '1',
                    'message': 'Succes to put temp string',
                    'result': serializer.data,
                }
                return Response(data=ret_data, status=status.HTTP_200_OK)
            else:
                ret_data = {
                    'status': '0',
                    'message': 'Fail to put temp string',
                    'result': serializer.errors,
                }
                return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, username, format=None):
        user = request.user
        try:
            found_user = models.User.objects.get(username=username)
        except models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to delete temp string',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)
        
        if isSuperUser(username=user.username) == False:
            ret_data = {
                'status': '0',
                'message': 'Fail to delete temp string',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        found_user.temp_string=None
        found_user.save()

        ret_data = {
            'status': '1',
            'message': 'Succes to delete temp string',
            'result': '',
        }
        return Response(data=ret_data, status=status.HTTP_204_NO_CONTENT)

def create_notification(to, notification_type, message = None):
    notification = models.Notification.objects.create(
        to=to,
        notification_type=notification_type,
        message=message,
    )
    notification.save()


class UserProfile(APIView):
    def get_user(self, username):        
        try:
            found_user = models.User.objects.get(username=username)
            return found_user
        except models.User.DoesNotExist:
            return None

    def get(self, request, username, format=None):
        user = request.user
        found_user = self.get_user(username)
        if found_user is None:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user profile',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        if found_user.username != user.username and isStaff(username=user.username) == False:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user profile',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        serializer = serializers.UserProfileSerializer(found_user)
        ret_data = {
            'status': '1',
            'message': 'Succes to get user profile',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)

    def put(self, request, username, format=None):
        user = request.user
        found_user = self.get_user(username)
        if found_user is None:
            ret_data = {
                'status': '0',
                'message': 'Fail to put user profile',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)
        
        if found_user.username != user.username and isStaff(username=user.username) == False:
            ret_data = {
                'status': '0',
                'message': 'Fail to put user profile',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        else:
            serializer = serializers.UserProfileSerializer(found_user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                ret_data = {
                    'status': '1',
                    'message': 'Succes to put user profile',
                    'result': serializer.data,
                }
                return Response(data=ret_data, status=status.HTTP_200_OK)
            else:
                ret_data = {
                    'status': '0',
                    'message': 'Fail to put user profile',
                    'result': serializer.errors,
                }
                return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

class UserList(APIView):
    def get(self, request, format=None):
        user = request.user

        if isStaff(username=user.username) == False:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user List',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        try:
            found_userlist = models.User.objects.all()
        except models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user List',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)
        serializer = serializers.UserListSerializer(found_userlist, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get user List',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class UserInviteeList(APIView):
    def get(self, request, username, format=None):
        user = request.user
        try:
            found_user = models.User.objects.get(username=username)
        except models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user InviteeList',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        if isStaff(username=user.username) == False:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user InviteeList',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        try:
            found_invitees = found_user.invitees.all()
        except models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user InviteeList',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        if found_user.invitation is not None:
            found_invitees = found_invitees.exclude(username=found_user.invitation.username)

        serializer = serializers.InviteeSerializer(found_invitees, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to put user InviteeList',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class UserInvitation(APIView):
    def get(self, request, username, format=None):
        user = request.user
        try:
            found_user = models.User.objects.get(username=username)
        except models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user invitation',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        if isStaff(username=user.username) == False:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user invitation',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        serializer = serializers.InviteeSerializer(found_user.invitation)
        ret_data = {
            'status': '1',
            'message': 'Succes to get user invitation',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)

    def put(self, request, username, format=None):
        user = request.user
        try:
            found_user = models.User.objects.get(username=username)
        except models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to put user invitation',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        if found_user.invitation is not None:
            ret_data = {
                'status': '0',
                'message': 'Fail to put user invitation',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        try:
            found_invitation = models.User.objects.get(referral_address=request.data.get('referral_address', None))
        except models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to put user invitation',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        if isStaff(username=user.username) == False:
            ret_data = {
                'status': '0',
                'message': 'Fail to put user invitation',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        found_user.invitation=found_invitation
        found_user.save()
        found_invitation.invitees.add(found_user)        
        found_invitation.save()
        message = 'You got the 1 more invitee.'
        create_notification(found_invitation, 'referral', message)

        serializer = serializers.InviteeSerializer(found_invitation)
        ret_data = {
            'status': '1',
            'message': 'Succes to put user invitation',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)

    def delete(self, request, username, format=None):
        user = request.user

        if isStaff(username=user.username) == False:
            ret_data = {
                'status': '0',
                'message': 'Fail to delete user invitation',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        try:
            found_user = models.User.objects.get(username=username)
        except models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to delete user invitation',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        if found_user.invitation is None:
            ret_data = {
                'status': '0',
                'message': 'Fail to delete user invitation',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        try:
            user_to_invitaion = models.User.objects.get(username=found_user.invitation.username)
        except models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to delete user invitation',
                'result': '',
            }
            return Response(status=status.HTTP_404_NOT_FOUND)        

        found_user.invitation=None
        found_user.save()

        if user_to_invitaion.invitees is not None:
            user_to_invitaion.invitees.remove(found_user)
            user_to_invitaion.save()

        ret_data = {
            'status': '1',
            'message': 'Succes to delete user invitation',
            'result': '',
        }
        return Response(data=ret_data, status=status.HTTP_204_NO_CONTENT)


class ChangePassword(APIView):    
    def put(self, request, username, format=None):
        user = request.user
        try:
            found_user = models.User.objects.get(username=username)
        except models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to put password',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        if found_user.username != user.username and isStaff(username=user.username) == False:
            ret_data = {
                'status': '0',
                'message': 'Fail to put password',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        current_password = request.data.get('current_password', None)
        if current_password is None:
            ret_data = {
                'status': '0',
                'message': 'Fail to put password',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        passwords_match = user.check_password(current_password)
        if passwords_match is False:
            ret_data = {
                'status': '0',
                'message': 'Fail to put password',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        new_password = request.data.get('new_password', None)
        if new_password is None:
            ret_data = {
                'status': '0',
                'message': 'Fail to put password',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)
        
        user.set_password(new_password)
        user.save()
        ret_data = {
            'status': '1',
            'message': 'Succes to put password',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class KycList(APIView):
    def get(self, request, format=None):
        user = request.user
        if isStaff(username=user.username) is False:
            ret_data = {
                'status': '0',
                'message': 'Fail to get kyc list',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        try:
            userList = models.User.objects.all()
        except models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get kyc list',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.UserKycSerializer(userList, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get kyc list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)

class MobileVerification(APIView):
    def put(self, request, username, format=None):
        user = request.user        
        try:
            found_user = models.User.objects.get(username=username)
        except models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to put mobile_number',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        if found_user.username != user.username and isStaff(username=user.username) == False:
            ret_data = {
                'status': '0',
                'message': 'Fail to put mobile_number',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)
        
        if found_user.kyc_status != 'ready' and isStaff(username=user.username) == False:
            ret_data = {
                'status': '0',
                'message': 'Fail to put mobile_number',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        requested_mobile_number = request.data.get('mobile_number', None)
        requested_mobile_country = request.data.get('mobile_country', None)
        found_user_to_check_mobile_number = models.User.objects.filter(mobile_number=requested_mobile_number).count()
        if found_user_to_check_mobile_number is not 0 and found_user.mobile_country == requested_mobile_country and found_user.username != user.username :
            ret_data = {
                'status': '0',
                'message': 'This mobile number is already be used.',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)
        
        account_sid = str(settings.TWILIO_SID)
        auth_token = str(settings.TWILIO_TOKEN)
        from_number = str(settings.TWILIO_NUMBER)
        magic_number = int(settings.MOBILE_VERIFICATION_MAGIC_NUM)
        to_number = requested_mobile_country+requested_mobile_number
        verify_number = random.randint(1000, 9999)
        verify_string = str(verify_number).zfill(4)
        verify_number_for_react = verify_number-magic_number        
        verify_string_for_react = str(verify_number_for_react).zfill(4)
        message = "This is from bluecots.\n Your verification code is [" + verify_string + "]"
        
        try:
            client = Client(account_sid, auth_token)
            message = client.messages.create(to=to_number, from_=from_number, body=message)
        except :
            ret_data = {
                'status': '0',
                'message': 'Fail to put mobile_number. Please check twilio.',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        ret_data = {
            'status': '1',
            'message': 'Succes to put mobile_number',
            'result': verify_string_for_react,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)

class UserKycStatus(APIView):        
    def put(self, request, format=None):
        user = request.user        
        if isStaff(username=user.username) == False:
            ret_data = {
                'status': '0',
                'message': 'Fail to put kyc_status',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        requested_kycStatus = request.data.get('kyc_status', None)
        requested_userlist = request.data.get('userlist', None)

        for username in requested_userlist:
            try:
                found_user = models.User.objects.get(username=username)
            except models.User.DoesNotExist:
                ret_data = {
                    'status': '0',
                    'message': 'Fail to put kyc_status',
                    'result': '',
                }
                return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        for username in requested_userlist:
            try:
                found_user = models.User.objects.get(username=username)
                found_user.kyc_status = requested_kycStatus
                found_user.save()
            except models.User.DoesNotExist:
                ret_data = {
                    'status': '0',
                    'message': 'Fail to put kyc_status',
                    'result': '',
                }
                return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)
        
        ret_data = {
            'status': '1',
            'message': 'Succes to put kyc_status',
            'result': request.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class UserKyc(APIView):
    def get(self, request, username, format=None):
        user=request.user        
        try:
            found_user = models.User.objects.get(username=username)
        except models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get kyc',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        if found_user.username != user.username and isStaff(username=user.username) == False:
            ret_data = {
                'status': '0',
                'message': 'Fail to get kyc',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        serializer = serializers.UserKycSerializer(found_user)
        ret_data = {
            'status': '1',
            'message': 'Succes to get kyc',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)
        
    def put(self, request, username, format=None):
        user = request.user        
        try:
            found_user = models.User.objects.get(username=username)
        except models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to put kyc',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        if found_user.username != user.username and isStaff(username=user.username) == False:
            ret_data = {
                'status': '0',
                'message': 'Fail to put kyc',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)
        
        if found_user.kyc_status != 'ready' and isStaff(username=user.username) == False:
            ret_data = {
                'status': '0',
                'message': 'Fail to put kyc',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        requested_wallet_address = request.data.get('wallet_address', None)
        found_user_to_check_wallet_address = models.User.objects.filter(wallet_address=requested_wallet_address).count()
        if found_user_to_check_wallet_address is not 0 and found_user.username != user.username :
            ret_data = {
                'status': '0',
                'message': 'This wallet address is already be used.',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        requested_mobile_number = request.data.get('mobile_number', None)
        requested_mobile_country = request.data.get('mobile_country', None)
        found_user_to_check_mobile_number = models.User.objects.filter(mobile_number=requested_mobile_number).count()
        if found_user_to_check_mobile_number is not 0 and found_user.mobile_country == requested_mobile_country and found_user.username != user.username :
            ret_data = {
                'status': '0',
                'message': 'This mobile number is already be used.',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        serializer = serializers.UserKycSerializer(found_user, data=request.data, partial=True)
        requested_photo = request.data.get('photo', None)
        if requested_photo is not None and found_user.photo is not None:
            found_user.photo.delete(save=True)
        
        if serializer.is_valid():
            serializer.save()
            if requested_wallet_address is not None:
                found_user.kyc_status = "approving"
                found_user.save()

            ret_data = {
                'status': '1',
                'message': 'Succes to put kyc',
                'result': serializer.data,
            }
            return Response(data=ret_data, status=status.HTTP_200_OK)
        else:
            ret_data = {
                'status': '0',
                'message': 'Fail to put kyc',
                'result': serializer.errors,
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, username, format=None):
        user = request.user
        if isStaff(username=user.username) == False:
            ret_data = {
                'status': '0',
                'message': 'Fail to delete kyc',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        try:
            found_user = models.User.objects.get(username=username)
        except models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to delete kyc',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        found_user.kyc_status='ready'
        found_user.first_name=''
        found_user.last_name=''
        found_user.mobile_country=''
        found_user.mobile_number=''
        found_user.country=''
        found_user.wallet_address=''
        found_user.kyc_reject_reason='none'
        found_user.photo.delete(save=True)
        found_user.save()

        serializer = serializers.UserKycSerializer(found_user)
        ret_data = {
            'status': '1',
            'message': 'Success to delete kyc',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_204_NO_CONTENT)

class KycCount(APIView):
    def get(self, request, format=None):
        user = request.user
        if isStaff(username=user.username) is False:
            ret_data = {
                'status': '0',
                'message': 'Fail to get kyc count',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        userCnt = models.User.objects.all().count()
        readyCnt = models.User.objects.filter(kyc_status='ready').count()
        approvingCnt = models.User.objects.filter(kyc_status='approving').count()
        approvedCnt = models.User.objects.filter(kyc_status='approved').count()
        pendingCnt = models.User.objects.filter(kyc_status='pending').count()
        rejectedCnt = models.User.objects.filter(kyc_status='rejected').count()
        completedCnt = models.User.objects.filter(kyc_status='completed').count()

        kycCount = {
            'user': userCnt,
            'ready': readyCnt,
            'approving': approvingCnt,
            'approved': approvedCnt,
            'pending': pendingCnt,
            'rejected': rejectedCnt,
            'completed': completedCnt,
        }
        ret_data = {
            'status': '1',
            'message': 'Success to delete kyc',
            'result': kycCount,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class UserReferralBonus(APIView):
     def get(self, request, username, format=None):
        user = request.user
        try:
            found_user = models.User.objects.get(username=username)
        except models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user reffral bonus',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        if found_user.username != user.username and isStaff(username=user.username) == False:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user reffral bonus',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            info = icoInfo_models.InvestmentInfo.objects.get(key_string='bluecots')
            if found_user.invitation is None:
                newInfo = {
                    'raferral_bonus_rate' : 0
                }
            else:
                newInfo = {
                    'raferral_bonus_rate' : info.raferral_bonus_rate
                }
        except models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user reffral bonus',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        serializer = icoInfo_serializers.ReferralBounsSerializer(newInfo)
        ret_data = {
            'status': '1',
            'message': 'Success to get user reffral bonus',
            'result': serializer,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


# class EmailVerification(APIView):
#     def put(self, request, username, email, format=None):
#         user = request.user
#         try:
#             found_user = models.User.objects.get(username=username)
#         except models.User.DoesNotExist:
#             ret_data = {
#                 'status': '0',
#                 'message': 'Fail to find user.',
#                 'result':'',
#             }
#             return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

#         if found_user.username != user.username and isStaff(username=user.username) == False:
#             ret_data = {
#                 'status': '0',
#                 'message': 'Signature has expired.',
#                 'result':'',
#             }
#             return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)           

#         found_user_to_check_email = models.User.objects.filter(email=email).count()
#         if found_user_to_check_email is not 0 and found_user.email != email :
#             ret_data = {
#                 'status': '0',
#                 'message': 'This email is already be used.',
#                 'result': '',
#             }
#             return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

#         if found_user.email == email and found_user.is_email_verified == True:
#             ret_data = {
#                 'status': '0',
#                 'message': 'Email verification is already done.',
#                 'result': '',
#             }
#             return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)     

#         found_user.email=email
#         found_user.save()

#         request_message_html = render_to_string('users/request_email_verification.html', {
#             'user': found_user,
#             'domain': 'www.bluecots.io',
#             'imagePath': 's3.ap-northeast-2.amazonaws.com/bluecots-ico-bucket/static/images/email_verification',
#             'uid': urlsafe_base64_encode(force_bytes(user.pk)).decode('utf-8'),
#             'token': email_activation_token.make_token(found_user)
#         })

#         request_message_text = strip_tags(request_message_html)

#         mail_subject = 'Bluecots email verification.'
#         to_email = email
#         from_email = "<noreply@bluecots.io>"
#         email_contents = EmailMultiAlternatives(mail_subject, request_message_text, from_email=from_email, to=[to_email])
#         email_contents.attach_alternative(request_message_html, "text/html")
#         email_contents.send()

#         ret_data = {
#                 'status': '1',
#                 'message': 'Success to request email verification',
#                 'result': email,
#         }
#         return Response(data=ret_data ,status=status.HTTP_200_OK)

