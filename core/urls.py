from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenRefreshView
)
from .views import CustomTokenObtainPairView
from core.views import (
    UserViewSet, create_user,
    TaskViewSet, NoteCategoryViewSet,
    NoteViewSet, CalendarEventViewSet
)

app_name = 'core'

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'note-categories', NoteCategoryViewSet,
                basename='note-categorie')
router.register(r'notes', NoteViewSet, basename='note')
router.register(r'calendar-events', CalendarEventViewSet,
                basename='calendar-event')

urlpatterns = [
    path('', include(router.urls)),
    path('create-user/', create_user, name='create_user'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
