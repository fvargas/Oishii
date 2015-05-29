from django.conf.urls import patterns, include, url
import website.urls

urlpatterns = patterns('',
    url(r'', include(website.urls)),
)
