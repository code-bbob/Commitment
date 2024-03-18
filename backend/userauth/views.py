from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import  UserLoginSerializer, UserRegistrationSerializer, UserPasswordResetSerializer, UserChangePasswordSerializer,SendPasswordResetEmailSerializer, UserInfoSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
import random
from .utils import Util
from .models import User
from commit.models import Commit
from commit.serializers import CommitSerializer
from django.contrib.sessions.models import Session
from commit.permissions import IsAuthor, Custom
from .models import Otp
def generate_otp():
  random_number = random.randint(100000, 999999)
  return random_number

# Generate Token Manually
def get_tokens_for_user(user):

  refresh = RefreshToken.for_user(user)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }


class SignupView(APIView):
  def post(self, request, format=None):
    otp = str(generate_otp())
    email = request.data['email']
    Otp.objects.create(otp=otp, email=email)
    print(otp)
    # request.session['otp'] = otp
    data = {
        'subject':'OTP for regitration',
        'body': "Your otp is "+otp,
        'to_email':email
      } 
    Util.send_email(data)
    return Response({'msg':'sent otp'}, status=status.HTTP_200_OK)
  
class UserRegistrationView(APIView):
  def post(self,request, format=None):
    otpobtained=request.data['otp']
    stored_otp = Otp.objects.get(email=request.data['email']).otp
    print(stored_otp)
    if stored_otp:
      if otpobtained ==stored_otp:
        serializer = UserRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = get_tokens_for_user(user)
        object = Otp.objects.get(email=request.data['email'])
        object.delete()
        return Response({'token':token, 'msg':'Registration Successful'}, status=status.HTTP_201_CREATED)
      else:
        return Response({'msg': 'Otp doesnt match try again!'}, status=status.HTTP_400_BAD_REQUEST)
    else:
      return Response({'msg': 'Otp is not present in the system!'}, status=status.HTTP_400_BAD_REQUEST)
    
class UserLoginView(APIView):
  def post(self, request, format=None):
    serializer = UserLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.data.get('email')
    password = serializer.data.get('password')
    user = authenticate(email=email, password=password)
    if user is not None:
      token = get_tokens_for_user(user)
      return Response({'token':token, 'msg':'Login Success'}, status=status.HTTP_200_OK)
    else:
      return Response({'errors':{'non_field_errors':['Email or Password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)
    
  
class UserChangePasswordView(APIView):
  permission_classes = [IsAuthenticated]
  def post(self, request, format=None):
    # Manually define or retrieve the user
    user = request.user  
    if not user:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    # Check if the old password is provided in the request
    old_password = request.data.get('oldpassword', None)
    if not old_password:
        return Response({'error': 'Old password is required'}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the provided old password matches the actual password of the user
    if not user.check_password(old_password):
        return Response({'error': 'Old password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)

    # Continue with changing the password if the old password is correct
    serializer = UserChangePasswordSerializer(data=request.data, context={'user': user})
    serializer.is_valid(raise_exception=True)
    return Response({'msg': 'Password Changed Successfully'}, status=status.HTTP_200_OK)
  
  
class SendPasswordResetEmailView(APIView):
  def post(self, request, format=None):
    serializer = SendPasswordResetEmailSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset link send. Please check your Email'}, status=status.HTTP_200_OK)

class UserPasswordResetView(APIView):
  def post(self, request, uid, token, format=None):
    serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK)

class UserInfoView(APIView):
  permission_classes = [IsAuthenticated, IsAuthor]
  def get(self,request,*args, **kwargs):
    user=request.user
    id = self.kwargs.get('id')
    if id:
      user = User.objects.filter(uuid=id).first()
      commits = Commit.objects.filter(user = user)
      if user != request.user:
        commits = Commit.objects.filter(user=user, type="Public")
        print(f"haha{commits}")
      commit_serializer = CommitSerializer(commits, many=True)
      commits = commit_serializer.data
      print(f"hahahaha{commits}")
      user_serializer=UserInfoSerializer(user)
      userinfo = user_serializer.data
      return Response({"userinfo":userinfo,"commits":commits}, status=status.HTTP_200_OK)
    else:
      user_serializer=UserInfoSerializer(user)
      userinfo = user_serializer.data
      return Response(userinfo, status=status.HTTP_200_OK)

  
  # def patch(self,request):
  #   user = request.user
  #   serializer = UserInfoSerializer(user)
  #   if user:
  #     data = request.data
  #     new_username = request.data.get("username")
  #     if new_username:
  #       user.username = new_username
  #       user.save()
  #     return Response(serializer.data)
  #   else:
  #     return Response({"msg": "Invalid user"}, status=status.HTTP_400_BAD_REQUEST)

# class Test(APIView):
#   permission_classes = [Custom]
#   def get(self, request, *args, **kwargs):
#     instance = Commit.objects.first()
#     self.check_object_permissions(request, instance)
#     serializer = CommitSerializer(instance)
#     return Response(serializer.data)
