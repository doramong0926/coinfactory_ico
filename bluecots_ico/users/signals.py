from allauth.account.signals import user_signed_up
from django.dispatch import receiver
from io import BytesIO
from urllib.request import urlopen
from django.core.files import File
import hashlib
from django.contrib.auth import get_user_model
User = get_user_model()

@receiver(user_signed_up)
def user_signed_up(request, user, **kwargs):    
    found_hash = hashlib.sha1(user.username.encode()).hexdigest() 
    user.referral_address = found_hash    

    received_referral_address = request.build_absolute_uri()
    index = received_referral_address.find('?ref=')
    received_referral_address = received_referral_address[index+5:]
    received_referral_address = received_referral_address.split('/')[0]

    try:
        found_invitation = User.objects.get(referral_address=received_referral_address)
        user.invitation=found_invitation
        found_invitation.invitees.add(user)        
        found_invitation.save()
        message = 'You got the 1 more invitee.'
        User.create_notification(found_invitation, 'referral', message)
        
    except User.DoesNotExist:
        print("not found refferral")

    user.save()
    