from django.conf.urls import url
from django.contrib.auth.views import logout

import views

urlpatterns = [
    url(r'^$', views.home, name='website_home'),
    url(r'^register$', views.register, name='website_register'),
    url(r'^login$', views.login_page, name='website_login'),
    url(r'^fetch-events$', views.get_events, name='website_get_events'),
    url(r'^toggle-star$', views.toggle_event_star, name='website_toggle_star'),
    url(r'^create-event$', views.create_event, name='website_create_event'),
    url(r'^scoreboard$', views.scoreboard, name='website_scoreboard'),
    url(r'^authenticate$', views.login_user, name='website_authenticate'),
    url(r'^logout$', views.logout_user, name='website_logout'),
    url(r'^faq$', views.faq, name='website_faq'),
]
