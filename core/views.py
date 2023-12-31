from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
import bleach
from core.serializers import (
    TokenPairSerializer,
    UserSerializer, TaskSerializer,
    NoteSerializer, NoteCategorySerializer,
    CalendarEventSerializer
)
from core.models import (
    Task, NoteCategory,
    Note, CalendarEvent
)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = TokenPairSerializer


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(username=self.request.user.username)


@api_view(['POST'])
@permission_classes([AllowAny])
def create_user(request):
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        username = serializer.validated_data.get('username')
        email = serializer.validated_data.get('email')

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=HTTP_400_BAD_REQUEST)

        user = serializer.save()
        return Response({"message": "User created successfully"}, status=HTTP_201_CREATED)

    return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(user=user)

    def perform_create(self, serializer):
        task_text = self.request.data.get('taskText', '')
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
