from django.conf.urls import include, url
import website.urls

urlpatterns = [
    url(r'', include(website.urls)),
]
