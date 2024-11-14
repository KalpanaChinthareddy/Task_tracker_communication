import unittest
import requests

BASE_URL = "http://localhost:3000/api"  # Replace with your actual base URL

class ChatApiTestCase(unittest.TestCase):

    def test_get_chat_details(self):
   
        chat_id = "6735632be39a52f43bb37e5f"  # Replace with an actual test ID
        response = requests.get(f"{BASE_URL}/chats/{chat_id}")
        self.assertEqual(response.status_code, 200)
      
    def test_get_chat_details_invalid_id(self):
        # Test retrieving chat details with an invalid chat ID
        chat_id = "6735632be39a52f43bb37e5g"
        response = requests.get(f"{BASE_URL}/chats/{chat_id}")
        self.assertEqual(response.status_code, 500)
    def test_search_contact(self):
        # Test searching for a contact by query
        user_id = "66fec32894c2799f219ba320"
        query = "user2"
        response = requests.get(f"{BASE_URL}/users/searchContact/${query}", params={"query": query})
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json(), list)
        if response.json():
            self.assertIn("contactId", response.json()[0])
            self.assertIn("name", response.json()[0])
      
    def test_update_chat(self):
        # Test updating a chat with a valid ID and data
        chat_id = "6735632be39a52f43bb37e5f"
        update_data = {
            "title": "Updated Chat Title"
        }
        response = requests.post(f"{BASE_URL}/chats/{chat_id}/update", json=update_data)
        self.assertEqual(response.status_code, 200)
      

   

