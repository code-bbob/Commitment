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
from datetime import timedelta

# Create your views here.

class CommitView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        queryset = Commit.objects.filter(user=user)
        serializer = CommitSerializer(queryset, many=True)
        data={
            'data':serializer.data,
            'streak':5
        }
        return Response(data)