from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
from core.models import Task, NoteCategory, Note, CalendarEvent


class TokenPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        raw_username = attrs["username"]
        users = User.objects.filter(email=raw_username)
        if (users):
            attrs['username'] = users.first().username
        data = super(TokenPairSerializer, self).validate(attrs)
        return data


class UserSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="core:user-detail")

    class Meta:
        model = User
        fields = ["url", "username", "email"]


class TaskSerializer(serializers.ModelSerializer):
    taskText = serializers.CharField(source='task_text')

    class Meta:
        model = Task
        exclude = ['task_text', 'user']


class NoteCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteCategory
        exclude = ['user']


class NoteSerializer(serializers.ModelSerializer):
    categoryId = serializers.PrimaryKeyRelatedField(
        source='category', queryset=NoteCategory.objects.all())

    class Meta:
        model = Note
        exclude = ['category', 'user']


class CalendarEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalendarEvent
        exclude = ['user']
