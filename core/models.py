from django.db import models
from django.contrib.auth.models import User


class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    task_text = models.CharField(max_length=255)


class NoteCategory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    color = models.CharField(max_length=50)

    def __str__(self):
        return str(self.name)


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ForeignKey(NoteCategory, on_delete=models.PROTECT)

    @property
    def category_obj(self):
        if self.category:
            try:
                return NoteCategory.objects.get(name=self.category, user=self.user)
            except NoteCategory.DoesNotExist:
                pass
        return None


class CalendarEvent(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    start = models.DateTimeField()
    end = models.DateTimeField()
    title = models.CharField(max_length=255)
