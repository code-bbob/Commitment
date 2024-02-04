from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from .serializers import CommitSerializer
from .models import Commit
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class CommitView(generics.ListAPIView):
    permission_classes=[IsAuthenticated]
    queryset = Commit.objects.all()
    print(queryset)
    serializer_class = CommitSerializer