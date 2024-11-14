import unittest
import requests

class AuthTests(unittest.TestCase):
    BASE_URL = "http://localhost:3000/api"

    def test_register_user(self):
        response = requests.post(f"{self.BASE_URL}/register", json={
            "name": "testuser",
            "email": "testuser@gmail.com",
            "password": "testpass"
        })
        self.assertEqual(response.status_code, 201)
        self.assertIn("message", response.json())

    def test_login_user(self):
        response = requests.post(f"{self.BASE_URL}/userExists", json={
            "name": "testuser",
            "email": "testuser@gmail.com",
            "password": "testpass"
        })
        self.assertEqual(response.status_code, 200)
       

    def test_login_invalid_user(self):
        response = requests.post(f"{self.BASE_URL}/userExists", json={
            "username": "invaliduser",
            "email": "testuer@gmail.com",
            "password": "wrongpass"
        })
        self.assertEqual(response.status_code, 401)
       
