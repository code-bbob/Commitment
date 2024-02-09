from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from .serializers import CommitSerializer, GroupSerializer
from userauth.serializers import UserInfoSerializer
from .models import Commit, Group
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.db.models import Count
from datetime import timedelta,date

# Create your views here.

def calculate_streak(querysets):
    today=date.today()
    current_streak = 0
    for queryset in reversed(querysets):
        if queryset['date'] == today -timedelta(days=current_streak):
            current_streak += 1
        else:
            break
    return current_streak

class CommitView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        queryset = Commit.objects.filter(user=user).order_by('date')
        streakset = Commit.objects.filter(user=user).order_by('date').values('date').distinct()
        serializer = CommitSerializer(queryset, many=True)
        streak = calculate_streak(streakset)
        data={
            'data':serializer.data,
            'streak':streak
        }
        return Response(data)
    
    def post(self,request):
        data=request.data
        user=request.user
        # data["user"]= request.user
        serializer = CommitSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=user)
            return Response({"msg":"successful"},status=status.HTTP_200_OK)
        
# class CreateGroupView(APIView)
        
class GroupView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        user = request.user
        queryset = Group.objects.filter(user=user)
        if queryset:
            group_data=[]
            for group in queryset:
                if group:
                    userstreaks=[]
                    for user in group.user.all():
                        streakset = Commit.objects.filter(user=user).order_by('date').values('date').distinct()
                        userstreaks.append(calculate_streak(streakset))
                    streak = min(userstreaks)
                    serializer = GroupSerializer(group)
                    group_data.append({'data': serializer.data, 'streak': streak})
            return Response(group_data)
        else:
            return Response({'error': "No matching group found for the user"}, status=status.HTTP_404_NOT_FOUND)
        
    def post(self,request):
        action = request.data.get('action')
        if action == "create":
            return self.create_group(request)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def create_group(self,request):
        data=request.data
        user=request.user
        data.pop('action',None)
        serializer=GroupSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=[user])#we need to send a list here because models has manytomany field so it is gonna expect a list
            return Response(serializer.data, status=status.HTTP_201_CREATED)

