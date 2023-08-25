from django.contrib import admin
from .models import Task, NoteCategory, Note, CalendarEvent


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('user', 'task_text')


@admin.register(NoteCategory)
class NoteCategoryAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'color')


@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'category')
    list_filter = ('user', 'category__name')


@admin.register(CalendarEvent)
class CalendarEventAdmin(admin.ModelAdmin):
    list_display = ('user', 'start', 'end', 'title')
