import unittest
from app import app, db, Chat  # Adjust import based on your app structure

class ChatTestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app = app.test_client()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_create_chat(self):
        response = self.app.post('/chats', data={
            'members': ['user1', 'user2'],  # Example user IDs
            'isGroup': True,
            'name': 'Test Group Chat'
        })
        self.assertEqual(response.status_code, 201)  # Check for successful chat creation

    def test_send_message(self):
        # First create a chat
        self.app.post('/chats', data={
            'members': ['user1', 'user2'],
            'isGroup': True,
            'name': 'Test Group Chat'
        })
        response = self.app.post('/chats/1/messages', data={
            'sender': 'user1',  # Example user ID
            'text': 'Hello!'
        })
        self.assertEqual(response.status_code, 201)  # Check for successful message sending

if __name__ == '__main__':
    unittest.main()
