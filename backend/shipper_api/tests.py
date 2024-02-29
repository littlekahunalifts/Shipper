from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory
from .views import VesselListAPIView, VesselAPIView, VoyageAPIView
from django.urls import reverse

class VesselViewTestCase(APITestCase):
  def setUp(self):
    self.url = reverse('vessels')

  # test if view is accessible
  def test_vessel_list(self):
    response = self.client.get(self.url)

    self.assertEqual(response.status_code, status.HTTP_200_OK)

  # tests if newly entered vessel is appropriately added to the GET
  def test_vessel_list_update(self):
    sample_post = {
      "naccs": "ABC123",
      "name": "Test #1",
      "owner_id": "Owner #1"
    }
    response = self.client.post(self.url, sample_post)
    response = self.client.get(self.url)
    self.assertEqual(len(response.data), 1)

class VesselCreateTestCase(APITestCase):
  def setUp(self):
    self.url = reverse('vessels')
  
  # test if post API is accessible
  def test_vessel_post(self):
    response = self.client.get(self.url)

    self.assertEqual(response.status_code, status.HTTP_200_OK)

  # test basic input of single vessel,
  def test_post_creation(self):
    sample_post = {
      "naccs": "ABC123",
      "name": "Test #1",
      "owner_id": "Owner #1"
    }
    response = self.client.post(self.url, sample_post)
    
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)

  def test_duplicate_post_creation(self):
    sample_post = {
      "naccs": "ABC123",
      "name": "Test #1",
      "owner_id": "Owner #1"
    }
    response = self.client.post(self.url, sample_post)
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    response = self.client.post(self.url, sample_post)
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class VesselPatchTestCase(APITestCase):
  def setUp(self):
    self.post_url = reverse('vessels')
    self.patch_url = reverse('vessel_info', kwargs={"naccs": "ABC123"})

  # simple check that put is working
  def test_put_creation(self):
    sample_post = {
      "naccs": "ABC123",
      "name": "Test #1",
      "owner_id": "Owner #1"
    }
    response = self.client.post(self.post_url, sample_post)
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    sample_patch = {
      "name": "Update #1",
      "owner_id": "Owner Update #1"
    }
    response = self.client.patch(self.patch_url, sample_patch)
    self.assertEqual(response.status_code, status.HTTP_200_OK)

  # test that put can't happen w/o vessel existing
  def test_put_no_vessel(self):
    sample_patch = {
      "name": "Update #1",
      "owner_id": "Owner Update #1"
    }
    response = self.client.patch(self.patch_url, sample_patch)
    self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class VoyageViewTestCase(APITestCase):
  def setUp(self):
    self.url = reverse('vessels')
    self.voyage_url = reverse('voyage', kwargs={"naccs": "ABC123"})

  def test_invalid_voyage_view(self):
    response = self.client.get(self.voyage_url)

    self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

  def test_valid_voyage_view(self):
    sample_post = {
      "naccs": "ABC123",
      "name": "Test #1",
      "owner_id": "Owner #1"
    }
    response = self.client.post(self.url, sample_post)
    response = self.client.get(self.voyage_url)

    self.assertEqual(response.data['results'], "This vessel is currently not on a voyage.")
    self.assertEqual(response.status_code, status.HTTP_200_OK)

class VoyagePostTestCase(APITestCase):
  def setUp(self):
    self.url = reverse('vessels')
    self.voyage_url = reverse('voyage', kwargs={"naccs": "ABC123"})

  def test_invalid_voyage_post(self):
    sample_vessel = {
      "naccs": "ABC123",
      "name": "Test #1",
      "owner_id": "Owner #1"
    }
    response = self.client.post(self.url, sample_vessel)

    sample_voyage = {
      "departure_location": "NYC",
      "arrival_location": "LA",
      "departure_time": "today",
      "arrival_time": "2020-05-10 10:30"
    }
    response = self.client.post(self.voyage_url, sample_voyage)

    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    self.assertEqual(response.data['Error'], "The departure or arrival time is incorrectly formatted, please format as YYYY-MM-DD hh:mm with hh:mm using 24-hour format.")

  def test_invalid_voyage_post_2(self):
    sample_vessel = {
      "naccs": "ABC123",
      "name": "Test #1",
      "owner_id": "Owner #1"
    }
    response = self.client.post(self.url, sample_vessel)

    sample_voyage = {
      "departure_location": "NYC",
      "arrival_location": "LA",
      "departure_time": "2020-05-10 10:30",
      "arrival_time": "tomorrow"
    }
    response = self.client.post(self.voyage_url, sample_voyage)

    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    self.assertEqual(response.data['Error'], "The departure or arrival time is incorrectly formatted, please format as YYYY-MM-DD hh:mm with hh:mm using 24-hour format.")
    
  def test_invalid_voyage_post_3(self):
    sample_vessel = {
      "naccs": "ABC123",
      "name": "Test #1",
      "owner_id": "Owner #1"
    }
    response = self.client.post(self.url, sample_vessel)

    sample_voyage = {
      "departure_location": "NYC",
      "arrival_location": "LA",
      "departure_time": "2020-05-10 10:30",
      "arrival_time": "2020-05-10 09:30"
    }
    response = self.client.post(self.voyage_url, sample_voyage)

    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    self.assertEqual(response.data['Error'], "The departure time must be before the arrival time. Please correct input and try again.")

  def test_valid_voyage_post(self):
    sample_vessel = {
      "naccs": "ABC123",
      "name": "Test #1",
      "owner_id": "Owner #1"
    }
    response = self.client.post(self.url, sample_vessel)

    sample_voyage = {
      "departure_location": "NYC",
      "arrival_location": "LA",
      "departure_time": "2020-05-10 10:30",
      "arrival_time": "2020-05-10 11:30"
    }
    response = self.client.post(self.voyage_url, sample_voyage)

    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
class VoyagePatchTestCase(APITestCase):
  def setUp(self):
    self.url = reverse('vessels')
    self.voyage_url = reverse('voyage', kwargs={"naccs": "ABC123"})

  def test_invalid_voyage_patch(self):
    sample_voyage_patch = {
      "departure_location": "NYC",
      "arrival_location": "LA",
      "departure_time": "2020-05-10 10:30",
      "arrival_time": "2020-05-10 11:30"
    }
    response = self.client.patch(self.voyage_url, sample_voyage_patch)

    self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    
  def test_invalid_voyage_patch_2(self):
    sample_vessel = {
      "naccs": "ABC123",
      "name": "Test #1",
      "owner_id": "Owner #1"
    }
    response = self.client.post(self.url, sample_vessel)

    sample_voyage = {
      "departure_location": "NYC",
      "arrival_location": "LA",
      "departure_time": "2020-05-10 10:30",
      "arrival_time": "2020-05-10 11:30"
    }

    sample_patch = {
      "departure_location": "NYC",
      "arrival_location": "LA",
      "departure_time": "today",
      "arrival_time": "2020-05-10 11:30"
    }
    response = self.client.post(self.voyage_url, sample_voyage)
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    response = self.client.patch(self.voyage_url, sample_patch)
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
  def test_invalid_voyage_patch_3(self):
    sample_vessel = {
      "naccs": "ABC123",
      "name": "Test #1",
      "owner_id": "Owner #1"
    }
    response = self.client.post(self.url, sample_vessel)

    sample_voyage = {
      "departure_location": "NYC",
      "arrival_location": "LA",
      "departure_time": "2020-05-10 10:30",
      "arrival_time": "2020-05-10 11:30"
    }

    sample_patch = {
      "departure_location": "NYC",
      "arrival_location": "LA",
      "departure_time": "2020-05-10 11:30",
      "arrival_time": "false"
    }
    response = self.client.post(self.voyage_url, sample_voyage)
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    response = self.client.patch(self.voyage_url, sample_patch)
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

  def test_valid_voyage_patch(self):
    sample_vessel = {
      "naccs": "ABC123",
      "name": "Test #1",
      "owner_id": "Owner #1"
    }
    response = self.client.post(self.url, sample_vessel)

    sample_voyage = {
      "departure_location": "NYC",
      "arrival_location": "LA",
      "departure_time": "2020-05-10 10:30",
      "arrival_time": "2020-05-10 11:30"
    }

    sample_patch = {
      "departure_location": "NYC",
      "arrival_location": "LA",
      "departure_time": "2020-05-10 11:30",
      "arrival_time": "2020-05-11 09:30"
    }
    response = self.client.post(self.voyage_url, sample_voyage)
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    response = self.client.patch(self.voyage_url, sample_patch)
    self.assertEqual(response.status_code, status.HTTP_200_OK)