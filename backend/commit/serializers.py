from rest_framework import serializers
from .models import Commit, Group
from userauth.serializers import UserInfoSerializer

class CommitSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(read_only=True)
    class Meta:
        model = Commit
        fields = ['user','title','content','date']

class GroupSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(read_only=True,many=True)#the serializer normally expects a signle instance and without many=true it is gonna supose the data is a single instance and look for email field but since it is a list it is not gonna find it normally resulting in an attribute error.
    class Meta:
        model = Group
        fields = '__all__'
