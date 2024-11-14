import unittest
import requests
from datetime import datetime

class TaskTests(unittest.TestCase):
    BASE_URL = "http://localhost:3000/api/projects/6733928ba1ac3c534d492425"

    def setUp(self):
        # Define a valid deadline
        deadline = datetime(2024, 12, 31, 23, 59).isoformat() 
        
        # Create a task before each test method
        response = requests.post(f"{self.BASE_URL}/tasks", json={
            "projectId": "6733928ba1ac3c534d492425",  # Use an existing project ID
            "title": "New Task",
            "description": "Task description",
            "assignedTo": "testuser",
            "status": "In Progress",
            "deadline": deadline  # Send the deadline as an ISO string
        })
        self.assertEqual(response.status_code, 201)
        self.task_id = response.json().get("task", {}).get("_id")  # Store the task ID for later tests

    def test_create_task(self):
        # Project creation and task creation is handled by setUp(), so we check if task_id is available
        self.assertIsNotNone(self.task_id, "Task ID should be available.")
    
    def test_get_tasks(self):
        response = requests.get(f"{self.BASE_URL}/tasks")
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json(), list)

    def test_update_task(self):
        # Ensure the task ID is available
        self.assertIsNotNone(self.task_id, "Task ID not available for update.")
        
        # Update the task using the stored task ID
        response = requests.put(f"{self.BASE_URL}/tasks/{self.task_id}", json={
            "title": "Updated Task",
            "description": "Updated description",
            "assignedTo": "testuser"
        })
        self.assertEqual(response.status_code, 200)
       

    def test_delete_task(self):
        # Ensure the task ID is available before deletion
        self.assertIsNotNone(self.task_id, "Task ID not available for deletion.")
        
        response = requests.delete(f"{self.BASE_URL}/tasks/{self.task_id}")
        self.assertEqual(response.status_code, 200)
        self.assertIn("message", response.json())  
