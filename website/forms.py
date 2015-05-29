from django import forms
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from models import Event, Comment


# Required for setting custom form labels
from django.utils.translation import ugettext_lazy as _

DATE_INPUT_FORMATS = ['%d %B, %Y']

class EventForm(forms.ModelForm):
    start_date = forms.DateTimeField(input_formats = DATE_INPUT_FORMATS)
    end_date = forms.DateTimeField(input_formats = DATE_INPUT_FORMATS)

    class Meta:
        model = Event
        fields = ['title', 'host', 'event_description', 'menu_description',
                  'location_description', 'latitude', 'longitude',
                  'start_date', 'end_date']
        labels = {
            'event_description': _('Event Description'),
            'menu_description': _('Menu Description'),
            'location_description': _('Location Description'),
            'start_date': _('Start Date'),
            'end_date': _('End Date'),
        }

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
