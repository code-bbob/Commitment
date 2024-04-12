from rest_framework import serializers
from .models import Commit, Group
from userauth.serializers import UserInfoSerializer
from .utils import calculate_streak

class CommitSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(read_only=True)
    likes = UserInfoSerializer(read_only=True,many=True)
    has_liked = serializers.SerializerMethodField()
    class Meta:
        model = Commit
        fields = ['user','type','title','content','date','code','likes','has_liked']
    def get_has_liked(self, obj):
        user = self.context.get('user')
        if user in obj.likes.all():
            return True
        return False

class GroupSerializer(serializers.ModelSerializer):
    members = UserInfoSerializer(read_only=True,many=True)#the serializer normally expects a single instance and without many=true it is gonna suppose the data is a single instance and look for email field but since it is a list it is not gonna find it normally resulting in an attribute error.  
    commit = CommitSerializer(read_only=True,many=True)
    streak = serializers.SerializerMethodField()
    members_no = serializers.SerializerMethodField()
    class Meta:
        model = Group
        fields = '__all__'
    def get_streak(self, obj):
        group = obj
        userstreaks=[]
        for member in group.members.all():
            streakset = Commit.objects.filter(user=member,type="Group").order_by('date').values('date').distinct()
            userstreaks.append(calculate_streak(streakset))
        streak = min(userstreaks)
        return streak
    
    def get_members_no(self, obj):
        no = 0
        group = obj
        for user in group.members.all():
            no += 1
        return no