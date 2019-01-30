from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import BasePermission, AllowAny, IsAdminUser, IsAuthenticated
from django.core.mail import EmailMultiAlternatives

from . import models, serializers
from datetime import datetime
import time

from bluecots_ico.users import models as user_models

class Initialdata(APIView):
    permission_classes = [AllowAny]
    def get(self, request, format=None):
        wallet_address = models.WalletAddress.objects.all()
        serializer = serializers.WalletAddressSerializer(wallet_address, many=True)
        result_ico_wallet_list = serializer.data

        info = models.InvestmentInfo.objects.get(key_string='bluecots')
        serializer = serializers.InvestementInfoSerializer(info)
        result_investment = serializer.data

        found_whitepaper = models.WhitePaper.objects.all()
        serializer = serializers.WhitePaperSerializer(found_whitepaper, many=True)
        result_whitepaper_list = serializer.data        

        timeStampPresaleStart = models.Round.objects.get(round_type='presale').start.timestamp()
        timeStampPresaleEnd = models.Round.objects.get(round_type='presale').end.timestamp()
        timeStampRoundAStart = models.Round.objects.get(round_type='rounda').start.timestamp()
        timeStampRoundAEnd = models.Round.objects.get(round_type='rounda').end.timestamp()
        timeStampRoundBStart = models.Round.objects.get(round_type='roundb').start.timestamp()
        timeStampRoundBEnd = models.Round.objects.get(round_type='roundb').end.timestamp()
        timeStampRoundCStart = models.Round.objects.get(round_type='roundc').start.timestamp()
        timeStampRoundCEnd = models.Round.objects.get(round_type='roundc').end.timestamp()
        now = datetime.now().timestamp()        
        if now < timeStampPresaleStart:
            rounds = models.Round.objects.get(round_type='notstartd')
        elif now > timeStampPresaleStart and now < timeStampPresaleEnd:
            rounds = models.Round.objects.get(round_type='presale')
        elif now < timeStampRoundAStart:
            rounds = models.Round.objects.get(round_type='prerounda')
        elif now < timeStampRoundAEnd:
            rounds = models.Round.objects.get(round_type='rounda')
        elif now < timeStampRoundBStart:
            rounds = models.Round.objects.get(round_type='preroundb')
        elif now < timeStampRoundBEnd:
            rounds = models.Round.objects.get(round_type='roundb')
        elif now < timeStampRoundBStart:
            rounds = models.Round.objects.get(round_type='preroundc')
        else:
            rounds = models.Round.objects.get(round_type='roundc')

        serializer = serializers.RoundScheduleSerializer(rounds)
        result_current_round = serializer.data

        round_list = models.Round.objects.all()        
        serializer = serializers.RoundScheduleSerializer(round_list, many=True)
        result_round_list = serializer.data

        rounds = models.Round.objects.all()
        serializer = serializers.RoundSupplySerializer(rounds, many=True)
        result_round_supply_list = serializer.data

        rounds = models.Round.objects.all()
        serializer = serializers.RoundBonusSerializer(rounds, many=True)
        result_round_bonus_list = serializer.data


        result = {
            'ico_wallet_list',
            'investment',
            'whitepaper_list',
            'current_round',
            'round_list',
            'round_supply_list',
            'round_bonus_list',
        }
        ret_data = {
            'status': '1',
            'message': 'Succes to get initialdata',
            'result': {
                'ico_wallet_list' : result_ico_wallet_list,
                'investment' : result_investment,
                'whitepaper_list' : result_whitepaper_list,
                'current_round' : result_current_round,
                'round_list' : result_round_list,
                'round_supply_list' : result_round_supply_list,
                'round_bonus_list' : result_round_bonus_list,
            },
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class SubscribeList(APIView):
    permission_classes = [AllowAny]
    def get(self, request, format=None):
        subscribe_list = models.Subscribe.objects.all()        
        serializer = serializers.SubscribeSerializer(subscribe_list, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get subscribe list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)

    def put(self, request, format=None):
        requested_email = request.data.get('email', None)
        if requested_email == "":
            ret_data = {
                'status': '0',
                'message': 'Email string is empty.',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)
        try:
            found_email = models.Subscribe.objects.get(email=requested_email)
            ret_data = {
                'status': '1',
                'message': 'Email already be registed.',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_200_OK)
        except models.Subscribe.DoesNotExist:
            subscribe = models.Subscribe.objects.create(
                email=requested_email,
            )
            subscribe.save()
            found_email = models.Subscribe.objects.get(email=requested_email)
            serializer = serializers.SubscribeSerializer(found_email)
            ret_data = {
                'status': '1',
                'message': 'Succes to put subscribe list',
                'result': serializer.data,
            }
            return Response(data=ret_data, status=status.HTTP_200_OK)
            
class RoundList(APIView):
    permission_classes = [AllowAny]
    def get(self, request, format=None):
        round_list = models.Round.objects.all()        
        serializer = serializers.RoundScheduleSerializer(round_list, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get round list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)

class CurrentRound(APIView):
    permission_classes = [AllowAny]
    def get(self, request, format=None):
        timeStampPresaleStart = models.Round.objects.get(round_type='presale').start.timestamp()
        timeStampPresaleEnd = models.Round.objects.get(round_type='presale').end.timestamp()
        timeStampRoundAStart = models.Round.objects.get(round_type='rounda').start.timestamp()
        timeStampRoundAEnd = models.Round.objects.get(round_type='rounda').end.timestamp()
        timeStampRoundBStart = models.Round.objects.get(round_type='roundb').start.timestamp()
        timeStampRoundBEnd = models.Round.objects.get(round_type='roundb').end.timestamp()
        timeStampRoundCStart = models.Round.objects.get(round_type='roundc').start.timestamp()
        timeStampRoundCEnd = models.Round.objects.get(round_type='roundc').end.timestamp()
        now = datetime.now().timestamp()
        
        if now < timeStampPresaleStart:
            rounds = models.Round.objects.get(round_type='notstartd')
        elif now > timeStampPresaleStart and now < timeStampPresaleEnd:
            rounds = models.Round.objects.get(round_type='presale')
        elif now < timeStampRoundAStart:
            rounds = models.Round.objects.get(round_type='prerounda')
        elif now < timeStampRoundAEnd:
            rounds = models.Round.objects.get(round_type='rounda')
        elif now < timeStampRoundBStart:
            rounds = models.Round.objects.get(round_type='preroundb')
        elif now < timeStampRoundBEnd:
            rounds = models.Round.objects.get(round_type='roundb')
        elif now < timeStampRoundBStart:
            rounds = models.Round.objects.get(round_type='preroundc')
        else:
            rounds = models.Round.objects.get(round_type='roundc')

        serializer = serializers.RoundScheduleSerializer(rounds)
        ret_data = {
            'status': '1',
            'message': 'Succes to get current round',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class RoundSupplyList(APIView):
    permission_classes = [AllowAny]
    def get(self, request, format=None):
        rounds = models.Round.objects.all()
        serializer = serializers.RoundSupplySerializer(rounds, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get round supply list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class RoundSupply(APIView):
    permission_classes = [AllowAny]
    def get(self, request, round_type, format=None):
        try:
            round_type = models.Round.objects.get(round_type=round_type)
        except models.Round.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get round supply',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)
        
        serializer = serializers.RoundSupplySerializer(round_type)
        ret_data = {
            'status': '1',
            'message': 'Succes to get round supply',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class RoundBonusList(APIView):
    permission_classes = [AllowAny]
    def get(self, request, format=None):
        rounds = models.Round.objects.all()
        serializer = serializers.RoundBonusSerializer(rounds, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get round bonus list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class RoundBonus(APIView):
    permission_classes = [AllowAny]
    def get(self, request, round_type, format=None):
        try:
            round_type = models.Round.objects.get(round_type=round_type)
        except models.Round.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get round bonus',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)
        
        serializer = serializers.RoundBonusSerializer(round_type)
        ret_data = {
            'status': '1',
            'message': 'Succes to get round bonus',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class VolumeBonusList(APIView):
    permission_classes = [AllowAny]
    def get(self, request, format=None):
        volumeBonusList = models.VolumeBonus.objects.all()
        serializer = serializers.VolumeBonusSerializer(volumeBonusList, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get volume bonus list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class VolumeBonus(APIView):
    permission_classes = [AllowAny]
    def get(self, request, volume_type, format=None):
        try:
            volume_bonus = models.VolumeBonus.objects.get(volume_bonus_type=volume_type)
        except models.VolumeBonus.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get volume bonus',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)
        
        serializer = serializers.VolumeBonusSerializer(volume_bonus)
        ret_data = {
            'status': '1',
            'message': 'Succes to get volume bonus',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class IcoWalletList(APIView):
    permission_classes = [AllowAny]
    def get(self, request, format=None):
        wallet_address = models.WalletAddress.objects.all()
        serializer = serializers.WalletAddressSerializer(wallet_address, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get ico wallet list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class InvestmentInfo(APIView):    
    permission_classes = [AllowAny]
    def get(self, request, format=None):
        info = models.InvestmentInfo.objects.get(key_string='bluecots')
        serializer = serializers.InvestementInfoSerializer(info)
        ret_data = {
            'status': '1',
            'message': 'Succes to get investment infomation',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class WhitePaperList(APIView):
    permission_classes = [AllowAny]
    def get(self, request, format=None):
        try:
            found_whitepaper = models.WhitePaper.objects.all()
        except models.WhitePaper.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get whitepaper list',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.WhitePaperSerializer(found_whitepaper, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get whitepaper list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class WhitePaper(APIView):
    permission_classes = [AllowAny]
    def get(self, request, language_type, format=None):
        try:
            whitePaper = models.WhitePaper.objects.get(language=language_type)
        except models.WhitePaper.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get whitepaper',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.WhitePaperSerializer(whitePaper)
        ret_data = {
            'status': '1',
            'message': 'Succes to get whitepaper',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class SendEmail(APIView):
    permission_classes = [AllowAny]
    def put(self, request, format=None):
        email = request.data.get('email', None)
        name = request.data.get('name', None)
        message = request.data.get('message', None)
        if email == "":
            ret_data = {
                'status': '0',
                'message': 'Email string is empty.',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)
        if name == "":
            ret_data = {
                'status': '0',
                'message': 'name string is empty.',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)
        if message == "":
            ret_data = {
                'status': '0',
                'message': 'message string is empty.',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        request_message_text = '1. Email sender\n' + email + '\n\n' + '2. User name\n' + name + '\n\n' + '3. Message\n' + message

        mail_subject = '[' + name + ']' + ' Question from ico homepage'
        to_email = "doramong0926@gmail.com"
        from_email = email
        email_contents = EmailMultiAlternatives(mail_subject, request_message_text, from_email=from_email, to=[to_email])
        email_contents.send()

        ret_data = {
                'status': '1',
                'message': 'Success to send email',
                'result': email,
        }
        return Response(data=ret_data ,status=status.HTTP_200_OK)
