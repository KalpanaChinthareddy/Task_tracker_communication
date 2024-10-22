import unittest
from app import app, db, Task  # Adjust import based on your app structure

class TaskTestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app = app.test_client()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_create_task(self):
        response = self.app.post('/tasks', data={
            'title': 'Test Task',
            'description': 'Test Description',
            'due_date': '2024-12-31'
        })
        self.assertEqual(response.status_code, 201)  # Check for successful task creation

    def test_update_task(self):
        # First create a task
        self.app.post('/tasks', data={
            'title': 'Test Task',
            'description': 'Test Description',
            'due_date': '2024-12-31'
        })
        response = self.app.put('/tasks/1', data={
            'title': 'Updated Task',
            'description': 'Updated Description'
        })
        self.assertEqual(response.status_code, 200)  # Check for successful update

    def test_delete_task(self):
        # First create a task
        self.app.post('/tasks', data={
            'title': 'Test Task',
            'description': 'Test Description',
            'due_date': '2024-12-31'
        })
        response = self.app.delete('/tasks/1')  # Assuming the ID is 1
        self.assertEqual(response.status_code, 204)  # Check for successful deletion

if __name__ == '__main__':
    unittest.main()
