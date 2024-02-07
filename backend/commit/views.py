from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from .serializers import CommitSerializer
from .models import Commit
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
        serializer = CommitSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=user)
            return Response({"msg":"successful"},status=status.HTTP_200_OK)