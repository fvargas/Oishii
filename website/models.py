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
    user = models.ForeignKey(User, related_name = 'my_events')
    title = models.CharField(max_length = 90)
    host = models.CharField(max_length = 40)
    event_description = models.CharField(max_length = 300)
    menu_description = models.CharField(max_length = 200)
    location_description = models.CharField(max_length = 150)
    latitude = models.DecimalField(max_digits = 19, decimal_places = 16)
    longitude = models.DecimalField(max_digits = 19, decimal_places = 16)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    stars = models.IntegerField(blank = True, default = 0)
    star_givers = models.ManyToManyField(User)
    timestamp = models.DateTimeField(auto_now_add = True)

class Comment(models.Model):
    content = models.CharField(max_length = 160)
    user = models.ForeignKey(User)
    timestamp = models.DateTimeField(auto_now_add = True)
    event = models.ForeignKey(Event)

    def __unicode__(self):
        return self.content

    class Meta:
        ordering = ['timestamp']
