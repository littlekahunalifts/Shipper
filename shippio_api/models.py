from django.db import models

# Model for an individual vessel
class Vessel(models.Model):
  naccs = models.CharField(primary_key=True, max_length=200)
  name =  models.CharField(max_length=200)
  owner_id = models.CharField(max_length=200)
  # for data-tracking purposes
  created_at = models.DateTimeField(blank=True, null=True)
  modified_at = models.DateTimeField(blank=True, null=True)

# Model for the current voyage for a vessel
class Voyage(models.Model):
  naccs = models.CharField(primary_key=True, max_length=200)
  departure_location = models.CharField(default="TBA", max_length=200)
  arrival_location = models.CharField(default="TBA", max_length=200)
  departure_time = models.DateTimeField(blank=True, null=True)
  arrival_time = models.DateTimeField(blank=True, null=True)
  # for data-tracking purposes
  created_at = models.DateTimeField(blank=True, null=True)
  modified_at = models.DateTimeField(blank=True, null=True)