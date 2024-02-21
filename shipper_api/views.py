from django.shortcuts import render
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import datetime, timezone
import pytz
from .models import Vessel, Voyage
from .serializers import VesselSerializer, VoyageSerializer


'''
VesselListAPIView:

Class is intended for the following interactions:
- viewing all existing vessels in the DB
- adding a new vessel to the DB
'''
class VesselListAPIView(APIView):
  def get(self, request, *args, **kwargs):
    '''
    List all vessels currently registered in our DB.
    '''
    vessels = Vessel.objects.all()
    if len(vessels) > 0:
      serializer = VesselSerializer(vessels, many=True)
      data = serializer.data
    else:
      data = {"results": "There are currently no vessels in the database."}
    return Response(data, status=status.HTTP_200_OK)

  def post(self, request, *args, **kwargs):
    '''
    Add a new vessel to the current list within our DB.
    '''
    current_time_utc = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%fZ')
    
    data = {
      'naccs': request.data.get('naccs'),
      'name': request.data.get('name'),
      'owner_id': request.data.get('owner_id'),
      'created_at': current_time_utc,
    }
    serializer = VesselSerializer(data=data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
'''
VesselAPIView:

Class is intended for the following interactions:
- updating a single vessel's information
'''
class VesselAPIView(APIView):
  def patch(self, request, *args, **kwargs):
    '''
    Updates a specific vessel's owner id or name as needed.
    '''
    naccs = self.kwargs.get('naccs')
    name = request.data.get('name')
    owner_id = request.data.get('owner_id')
    current_time_utc = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%fZ')
    
    try:
      vessel = Vessel.objects.get(naccs=naccs)
    except Vessel.DoesNotExist:
      data = {"results": "There are currently no vessels that match this NACCS, please try again."}
      return Response(data, status=status.HTTP_404_NOT_FOUND)

    data = request.data.copy()

    current_time_utc = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%fZ')
    data.update({'modified_at': current_time_utc})

    serializer = VesselSerializer(vessel, data=data, partial=True)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
'''
VoyageAPIView:

Class is intended for the following interactions:
- viewing the current voyage for a specified vessel 
- adding a new voyage to an existing vessel in the DB
- updating an existing voyage for an existing vessel
'''
class VoyageAPIView(APIView):
  def get(self, request, *args, **kwargs):
    '''
    List the current vessel's voyage registered in our DB.
    '''
    naccs = self.kwargs.get('naccs')

    try:
      vessel = Vessel.objects.get(naccs=naccs)
    except Vessel.DoesNotExist:
      data = {"results": "There are currently no vessels that match this NACCS, please try again."}
      return Response(data, status=status.HTTP_404_NOT_FOUND)

    # wrap in try/catch block - we should be able to access this even if there's no voyage
    try:
      voyage = Voyage.objects.get(naccs=naccs)
      serializer = VoyageSerializer(voyage)
      data = serializer.data
    except Voyage.DoesNotExist:
      data = {"results": "This vessel is currently not on a voyage."}
    return Response(data, status=status.HTTP_200_OK)

  def post(self, request, *args, **kwargs):
    '''
    Add a new voyage to the current vessel within our DB.
    '''
    departure_time = time_format(request.data.get('departure_time'))
    arrival_time = time_format(request.data.get('arrival_time'))

    if departure_time == -1 or arrival_time == -1:
      data = {"Error": "The departure or arrival time is incorrectly formatted, please format as YYYY-MM-DD hh:mm with hh:mm using 24-hour format."}
      return Response(data, status=status.HTTP_400_BAD_REQUEST)
    
    # checking time for departure/arrival to see if it's appropriate
    if departure_time and arrival_time and arrival_time <= departure_time:
        data = {"Error": "The departure time must be before the arrival time. Please correct input and try again."}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

    


    current_time_utc = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%fZ')
    data = {
      'naccs': self.kwargs.get('naccs'),
      'departure_location': request.data.get('departure_location'),
      'arrival_location': request.data.get('arrival_location'),
      'departure_time': departure_time,
      'arrival_time': arrival_time,
      'created_at': current_time_utc,
    }
   
    serializer = VoyageSerializer(data=data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  def patch(self, request, *args, **kwargs):
    '''
    Update a single voyage's information in the DB
    '''
    try:
      vessel = Vessel.objects.get(naccs=self.kwargs.get('naccs'))
    except Vessel.DoesNotExist:
      data = {"results": "There are currently no vessels that match this NACCS, please try again."}
      return Response(data, status=status.HTTP_404_NOT_FOUND)

    data = request.data.copy()

    departure_time = time_format(data.get('departure_time'))
    arrival_time = time_format(data.get('arrival_time'))

    if departure_time == -1 or arrival_time == -1:
      data = {"Error": "The departure or arrival time is incorrectly formatted, please format as YYYY-MM-DD hh:mm with hh:mm using 24-hour format."}
      return Response(data, status=status.HTTP_400_BAD_REQUEST)
    
    # checking time for departure/arrival to see if it's appropriate
    if departure_time and arrival_time and arrival_time <= departure_time:
        data = {"Error": "The departure time must be before the arrival time. Please correct input and try again."}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

    if departure_time:
      data.update({
        'departure_time': departure_time
      })
    if arrival_time:
      data.update({
        'arrival_time': arrival_time
      })

    try:
      voyage = Voyage.objects.get(naccs=self.kwargs.get('naccs'))
    except Voyage.DoesNotExist:
      data = {"results": "This vessel is currently not on a voyage."}
      return Response(data, status=status.HTTP_400_BAD_REQUEST)

    current_time_utc = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%fZ')
    data.update({'modified_at': current_time_utc})

    data = data
    
    serializer = VoyageSerializer(voyage, data=data, partial=True)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def time_format(time):
  # format for input on departure/arrival times
    if time is None:
      return None

    date_format = "%Y-%m-%d %H:%M"
    try:
        dt = datetime.strptime(time, date_format)
        dt_utc = pytz.utc.localize(dt)
    except ValueError:
      return -1
    return dt_utc