from django.contrib import admin
from django.urls import path
from .views import (
  VesselListAPIView,
  VesselAPIView,
  VoyageAPIView
  )

# all patterns associated with the API for this project
# VesselListAPIView -> view/creation of vessels in DB
# VesselAPIView -> updating vessel in DB
# VoyageAPIView -> view/creation/updating of vessel's voyages in DB
urlpatterns = [
  path('api/', VesselListAPIView.as_view(), name="vessels"),
  path('api/<str:naccs>/', VesselAPIView.as_view(), name="vessel_info"),
  path('api/<str:naccs>/voyage', VoyageAPIView.as_view(), name="voyage"),
]