import unittest
from app import app, db, User  # Adjust import based on your app structure

class AuthTestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'  # In-memory database for testing
        self.app = app.test_client()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_user_registration(self):
        response = self.app.post('/register', data={
            'username': 'testuser',
            'password': 'testpass',
            'email': 'test@example.com'
        })
        self.assertEqual(response.status_code, 201)  # Check for successful creation

    def test_user_login(self):
        # First register a user
        self.app.post('/register', data={
            'username': 'testuser',
            'password': 'testpass',
            'email': 'test@example.com'
        })
        response = self.app.post('/login', data={
            'username': 'testuser',
            'password': 'testpass'
        })
        self.assertEqual(response.status_code, 200)  # Check for successful login

    def test_invalid_login(self):
        response = self.app.post('/login', data={
            'username': 'wronguser',
            'password': 'wrongpass'
        })
        self.assertEqual(response.status_code, 401)  # Check for unauthorized

if __name__ == '__main__':
    unittest.main()
