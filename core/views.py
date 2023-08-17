from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from django.contrib.auth.models import User
import bleach
from core.serializers import (
    UserSerializer, TaskSerializer,
    NoteSerializer, NoteCategorySerializer,
    CalendarEventSerializer
)
from core.models import (
    Task, NoteCategory,
    Note, CalendarEvent
)


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(username=self.request.user.username)


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(user=user)

    def perform_create(self, serializer):
        task_text = self.request.data.get('task_text', '')
        sanitized_task_text = bleach.clean(task_text)

        serializer.save(user=self.request.user, task_text=sanitized_task_text)


class NoteCategoryViewSet(viewsets.ModelViewSet):
    serializer_class = NoteCategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return NoteCategory.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(user=user)

    def perform_create(self, serializer):
        description = self.request.data.get('description', '')
        sanitized_description = bleach.clean(description)

        serializer.save(user=self.request.user,
                        description=sanitized_description)


class CalendarEventViewSet(viewsets.ModelViewSet):
    serializer_class = CalendarEventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return CalendarEvent.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
