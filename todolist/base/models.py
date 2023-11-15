from django.db import models
from django.contrib.auth.models import User


class Task(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank = True)
    title = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    complete = models.BooleanField(default=False)
    create = models.DateTimeField(auto_now_add=True)
    statuses = (
        ('0', 'Waiting'),
        ('1', 'On hold'),
        ('2', 'Working on it'),
        ('3', 'Done'),
    )
    status = models.CharField(max_length=15, choices=statuses, default='waiting')
    if status == '3':
        complete = True
    elif complete == True:
        status = '3'
    def __str__(self):
        return self.title


    class Meta:
        ordering = ['complete']
