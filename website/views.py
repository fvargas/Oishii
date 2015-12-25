from django.shortcuts import render, redirect
from django.template.loader import render_to_string
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie
from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist

from models import *
from forms import *

@ensure_csrf_cookie
def home(request):
    context = { 'user': request.user, 'event_form': EventForm() }
    return render(request, 'App.html', context)

@ensure_csrf_cookie
def login_page(request):
    if request.user.is_authenticated():
        return redirect('website_home')

    return render(request, 'website/login-page.html')

@ensure_csrf_cookie
def scoreboard(request):
    context = { 'top_profiles': Profile.objects.all()[:20] }

    return render(request, 'website/scoreboard.html', context)

@transaction.atomic
def login_user(request):
    if request.method == 'GET':
        return redirect('website_home')
    if request.user.is_authenticated():
        return HttpResponse('')

    login_form = AuthenticationForm(data = request.POST)
    if not login_form.is_valid():
        return JsonResponse({ 'success': False })

    user = authenticate(username = login_form.cleaned_data['username'],
                        password = login_form.cleaned_data['password'])
    if not user:
        return JsonResponse({ 'success': False })

    login(request, user)

    response = {
        'success': True,
        'navHTML': render_to_string('website/nav-links.html', { 'user': user }),
        'sideNavHTML': render_to_string('website/side-nav-links.html', { 'user': user })
    }
    return JsonResponse(response)

@transaction.atomic
def logout_user(request):
    logout(request)

    if request.method == 'GET':
        return redirect('website_home')

    response = {
        'navHTML': render_to_string('website/nav-links.html', { 'user': request.user }),
        'sideNavHTML': render_to_string('website/side-nav-links.html', { 'user': request.user }),
        'loginModal': render_to_string('website/login.html')
    }

    return JsonResponse(response)

def get_events(request):
    events = Event.objects.all()

    events_data = []
    for event in events:
        if not request.user.is_authenticated():
            is_starred = False
        else:
            try:
                event.star_givers.all().get(id = request.user.id)
            except ObjectDoesNotExist:
                is_starred = False
            else:
                is_starred = True

        events_data.append({
            'title': event.title,
            'latitude': event.latitude,
            'longitude': event.longitude,
            'id': event.id,
            'html': render_to_string('website/event.html', { 'event': event, 'is_starred': is_starred })
        })

    return JsonResponse({ 'events': events_data })

@transaction.atomic
def create_event(request):
    if not request.method == 'POST':
        return redirect('website_home')
    if not request.user.is_authenticated():
        return JsonResponse({})

    user = request.user
    event = Event(user = user)
    event_form = EventForm(request.POST, instance = event)

    if not event_form.is_valid():
        # Signal error in form information
        return JsonResponse({})

    event_form.save()

    event_data = {
        'id': event.id,
        'title': event_form.cleaned_data['title'],
        'latitude': event_form.cleaned_data['latitude'],
        'longitude': event_form.cleaned_data['longitude'],
        'html': render_to_string('website/event.html', { 'event': event })
    }

    return JsonResponse(event_data)

@transaction.atomic
@ensure_csrf_cookie
def register(request):
    if request.user.is_authenticated():
        return redirect('website_home')

    # Display registration page if GET request
    if request.method == 'GET':
        context = { 'user': request.user, 'form': RegistrationForm() }
        return render(request, 'website/register.html', context)

    form = RegistrationForm(request.POST)

    if not form.is_valid():
        return JsonResponse({})

    new_user = User.objects.create_user(username = form.cleaned_data['username'],
                                        email = form.cleaned_data['email'],
                                        password = form.cleaned_data['password'],
                                        first_name = form.cleaned_data['first_name'],
                                        last_name = form.cleaned_data['last_name'])
    new_profile = Profile(user = new_user)
    new_profile.save()

    new_user = authenticate(username = form.cleaned_data['username'],
                            password = form.cleaned_data['password'])
    login(request, new_user)

    response = {
        'welcome': render_to_string('website/welcome.html', { 'user': request.user }),
        'navHTML': render_to_string('website/nav-links.html', { 'user': request.user }),
        'sideNavHTML': render_to_string('website/side-nav-links.html', { 'user': request.user })
    }

    return JsonResponse(response)

@transaction.atomic
def toggle_event_star(request):
    if not request.method == 'POST':
        return HttpResponse('website_home')
    if not request.user.is_authenticated():
        return HttpResponse('unauthenticated')

    form = EventStarForm(request.POST)
    if not form.is_valid():
        return HttpResponse('invalid')

    event_id = form.cleaned_data['event_id']
    event = Event.objects.get(id = event_id)

    try:
        # This user has starred this event previously
        event.star_givers.all().get(id = request.user.id)
        # Unstar the event
        # Decrement event stars by one
        event.star_givers.remove(request.user)
        event.stars = event.stars - 1
        event.save()

        # Decrement event creator rating by one
        profile = event.user.profile
        profile.rating = profile.rating - 1
        profile.save()

        return HttpResponse('unstarred')
    except ObjectDoesNotExist:
        # Increment event stars by one
        event.star_givers.add(request.user)
        event.stars = event.stars + 1
        event.save()

        # Increment event creator rating by one
        profile = event.user.profile
        profile.rating = profile.rating + 1
        profile.save()

        return HttpResponse('starred')

    return HttpResponse('error')

def faq(request):
    return render(request, 'website/faq.html')
