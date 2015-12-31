from django import forms
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from models import Event, Comment

class EventForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = '__all__'

class EventStarForm(forms.Form):
    event_id = forms.IntegerField()

    def clean(self):
        cleaned_data = super(EventStarForm, self).clean()

        try:
            event_id = cleaned_data['event_id']
            event = Event.objects.get(id = event_id)
        except KeyError:
            raise forms.ValidationError('Invalid input.')
        except ObjectDoesNotExist:
            raise forms.ValidationError('No event found with matching id.')

class RegistrationForm(forms.ModelForm):
    confirm_password = forms.CharField()

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password']

    def clean(self):
        cleaned_data = super(RegistrationForm, self).clean()

        # Confirms the two password fields match
        try:
            password = cleaned_data['password']
        except KeyError:
            raise forms.ValidationError('Empty password.')
        try:
            confirm_password = cleaned_data['confirm_password']
        except KeyError:
            raise forms.ValidationError('Except confirm password.')

        if password != confirm_password:
            raise forms.ValidationError('Passwords did not match.')

    # Customize form validation for the username field
    def clean_username(self):
        username = self.cleaned_data['username']

        # Checks username is not already taken
        try:
            if User.objects.get(username = username):
                raise forms.ValidationError('Username is already in use.')
        except User.DoesNotExist:
            return username
