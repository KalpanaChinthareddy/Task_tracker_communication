import requests
import unittest

class ProjectTests(unittest.TestCase):
    BASE_URL = "http://localhost:3000/api/projects"
    
    def setUp(self):
        # Create a project before each test method
        response = requests.post(f"{self.BASE_URL}", json={
            "name": "New Project",
            "description": "Project description"
        })
        self.assertEqual(response.status_code, 201)
        self.project_id = response.json().get("project", {}).get("_id")
    
    def test_create_project(self):
        # Project creation is handled by setUp() so we just check the ID
        self.assertIsNotNone(self.project_id, "Project ID should be available.")
    
    def test_get_projects(self):
        response = requests.get(f"{self.BASE_URL}")
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json(), list)
    
    def test_delete_project(self):
        # Ensure the project ID is available after creation
        self.assertIsNotNone(self.project_id, "Project ID not available for deletion.")
        
        # Proceed with deletion if ID is available
        response = requests.delete(f"{self.BASE_URL}/{self.project_id}")
        self.assertEqual(response.status_code, 200)