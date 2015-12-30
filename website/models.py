from django.db import models

# User class for built-in authentication module
from django.contrib.auth.models import User

import os

DEFAULT_PROFILE_PICTURE = '' # os.environ.get('PICTURE_DEFAULT')

class Profile(models.Model):
    user = models.OneToOneField(User, primary_key = True)
    rating = models.IntegerField(blank = True, default = 0)
    picture_url = models.CharField(max_length = 512, default = DEFAULT_PROFILE_PICTURE)
    latitude = models.DecimalField(max_digits = 12, decimal_places = 12, null = True, blank = True)
    longitude = models.DecimalField(max_digits = 12, decimal_places = 12, null = True, blank = True)

    def __unicode__(self):
        return self.user.username

    class Meta:
        ordering = ['-rating']

class Event(models.Model):
    title = models.CharField(max_length=200)
    host = models.CharField(max_length=200)
    food = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    start = models.DateTimeField()
    end = models.DateTimeField()
    description = models.CharField(max_length=500, blank=True)
    latitude = models.CharField(max_length=40)
    longitude = models.CharField(max_length=40)
    created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    """
    user = models.ForeignKey(User, related_name = 'my_events')
    stars = models.IntegerField(blank = True, default = 0)
    star_givers = models.ManyToManyField(User)
    """

class Comment(models.Model):
    content = models.CharField(max_length = 160)
    user = models.ForeignKey(User)
    timestamp = models.DateTimeField(auto_now_add = True)
    event = models.ForeignKey(Event)

    def __unicode__(self):
        return self.content

    class Meta:
        ordering = ['timestamp']
