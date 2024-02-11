from rest_framework import serializers
from .models import Vessel, Voyage

# serializer for all data involving a single Vessel
class VesselSerializer(serializers.ModelSerializer):
  class Meta:
    model = Vessel
    fields = ['naccs', 'name', 'owner_id', 'created_at', 'modified_at']


# serializer for all data involving a single Voyage
class VoyageSerializer(serializers.ModelSerializer):
  class Meta:
    model = Voyage
    fields = ['naccs',
              'departure_location',
              'arrival_location',
              'departure_time',
              'arrival_time',
              'created_at',
              'modified_at']