from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from django.utils.encoding import python_2_unicode_compatible
import os
from versatileimagefield.fields import VersatileImageField

@python_2_unicode_compatible
class TimeStampModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        abstract = True


@python_2_unicode_compatible
class User(AbstractUser, TimeStampModel):
    def create_notification(to, notification_type, message = None):
        notification = Notification.objects.create(
            to=to,
            notification_type=notification_type,
            message=message,
        )
        notification.save()

    def photo_file_name(instance, filename):
        ext = filename.split('.')[-1]
        filename = '%s_%s.%s' % (instance.username, 'photo', ext)
        return os.path.join('kyc', filename)

    USER_TYPE = (
        ('admin', 'Admin'),
        ('manager', 'Manager'),
        ('user', 'User'),
    )

    STATUS_TYPE = (
        ('ready', 'Ready'),
        ('approving', 'Approving'),
        ('approved', 'Approved'),
        ('pending', 'Pending'),
        ('rejected', 'Rejected'),
        ('completed', 'Completed'),
    )

    PHOTO_TYPE = {
        ('passport', 'Passport'),
        ('id_card', 'ID Card'),
        ('drive_license', 'Drive License'),
    }

    STATUS_REJECT_REASON = {
        ('none', 'None'),
        ('photo', 'Photo'),
        ('mobile_number', 'Mobile number'),
        ('country', 'Country'),
    }

    # First Name and Last Name do not cover name patterns
    # around the globe.
    user_type = models.CharField(max_length=10, choices=USER_TYPE, blank=True, null=True)
    referral_address = models.CharField(max_length=255, blank=False, null=True)
    invitees = models.ManyToManyField("self", blank=True)
    invitation = models.ForeignKey(
        "self", 
        on_delete=models.PROTECT,
        blank=True,
        null=True
    )
    wallet_address = models.CharField(max_length=254, blank=True)
    photo_type = models.CharField(max_length=50, choices=PHOTO_TYPE, blank=True, default='passport')
    photo = VersatileImageField(upload_to=photo_file_name, blank=True)
    photo_bill_file_name = VersatileImageField(upload_to=photo_file_name, blank=True)
    photo_passport_file_name = VersatileImageField(upload_to=photo_file_name, blank=True)
    kyc_status = models.CharField(max_length=10, choices=STATUS_TYPE, blank=False, default='ready')
    kyc_agreement1 = models.BooleanField(blank=False, default=False)
    kyc_agreement2 = models.BooleanField(blank=False, default=False)
    country = models.CharField(max_length=254, blank=True)
    mobile_number = models.CharField(max_length=254, blank=True, null=True)
    mobile_country = models.CharField(max_length=254, blank=True, null=True)
    kyc_reject_reason = models.CharField(max_length=254, choices=STATUS_REJECT_REASON, blank=False, default='none', null=True)
    temp_string = models.CharField(max_length=254, blank=True, null=True)
    is_whitelisted = models.BooleanField(blank=False, default=False)

    def __str__(self):
        return self.username

    @property
    def invitees_count(self):
        return User.objects.filter(invitation__username=self.username).count()

    # @property
    # def invitees_count(self):
    #     return self.invitees.all().count()-1
    
    
class Notification(TimeStampModel):
    NOTICE_TYPE = (
        ('notice', 'Notice'),
        ('kyc', 'Kyc'),
        ('referral', 'Referral'),
    )
    to = models.ForeignKey(User, on_delete=models.PROTECT, related_name='to', blank=False)
    notification_type = models.CharField(max_length=20, choices=NOTICE_TYPE, blank=False)
    message = models.TextField(blank=False)

    class Meta:
        ordering = ['-created_at']


class SignupTerms(TimeStampModel):
    creator = models.ForeignKey(User, on_delete=models.PROTECT, related_name='creator', blank=False)
    agreement = models.BooleanField(blank=False, default=False)

    class Meta:
        ordering = ['-created_at']
