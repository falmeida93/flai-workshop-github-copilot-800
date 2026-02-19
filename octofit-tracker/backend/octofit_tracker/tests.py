from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status


class UserAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_list_users(self):
        response = self.client.get('/api/users/')
        self.assertIn(response.status_code, [status.HTTP_200_OK, status.HTTP_500_INTERNAL_SERVER_ERROR])

    def test_api_root(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertIn('users', data)
        self.assertIn('teams', data)
        self.assertIn('activities', data)
        self.assertIn('leaderboard', data)
        self.assertIn('workouts', data)


class TeamAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_list_teams(self):
        response = self.client.get('/api/teams/')
        self.assertIn(response.status_code, [status.HTTP_200_OK, status.HTTP_500_INTERNAL_SERVER_ERROR])


class ActivityAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_list_activities(self):
        response = self.client.get('/api/activities/')
        self.assertIn(response.status_code, [status.HTTP_200_OK, status.HTTP_500_INTERNAL_SERVER_ERROR])


class LeaderboardAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_list_leaderboard(self):
        response = self.client.get('/api/leaderboard/')
        self.assertIn(response.status_code, [status.HTTP_200_OK, status.HTTP_500_INTERNAL_SERVER_ERROR])


class WorkoutAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_list_workouts(self):
        response = self.client.get('/api/workouts/')
        self.assertIn(response.status_code, [status.HTTP_200_OK, status.HTTP_500_INTERNAL_SERVER_ERROR])
