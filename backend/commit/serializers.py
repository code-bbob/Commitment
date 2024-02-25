from rest_framework import serializers
from .models import Commit, Group
from userauth.serializers import UserInfoSerializer
from .utils import calculate_streak

class CommitSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(read_only=True)
    class Meta:
        model = Commit
        fields = ['user','type','title','content','date']

class GroupSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(read_only=True,many=True)#the serializer normally expects a single instance and without many=true it is gonna suppose the data is a single instance and look for email field but since it is a list it is not gonna find it normally resulting in an attribute error.  
    commit = CommitSerializer(read_only=True,many=True)
    streak = serializers.SerializerMethodField()
    class Meta:
        model = Group
        fields = '__all__'
    def get_streak(self, obj):
        user = obj.user
        group = obj
        userstreaks=[]
        for user in group.user.all():
            streakset = Commit.objects.filter(user=user,type="Group").order_by('date').values('date').distinct()
            userstreaks.append(calculate_streak(streakset))
        streak = min(userstreaks)
        return streak