// src/components/Chat.tsx

import React, { useState, useEffect, useRef } from 'react';
import api from '../utils/api';

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  timestamp: string;
  sender_name: string;
}

interface User {
  id: number;
  name: string;
}

interface FetchUsersResponse {
  success: boolean;
  users: User[];
  message?: string;
}

interface FetchMessagesResponse {
  success: boolean;
  messages: Message[];
  message?: string;
}

interface SendMessageResponse {
  success: boolean;
  message: string;
}

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetches users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetches messages when selectedUser changes
  useEffect(() => {
    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser]);

  // Fetches users function
  const fetchUsers = async () => {
    try {
      const response = await api.get<FetchUsersResponse>('getUsers.php');

      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        setError(response.data.message || 'Failed to fetch users.');
      }
    } catch (err: any) {
      setError('An error occurred while fetching users.');
    }
  };

  // Fetches messages function
  const fetchMessages = async () => {
    if (!selectedUser) return;
    try {
      const response = await api.get<FetchMessagesResponse>('getMessages.php', {
        params: {
          other_user_id: selectedUser.id,
        },
      });

      if (response.data.success) {
        setMessages(response.data.messages);
        scrollToBottom();
      } else {
        setError(response.data.message || 'Failed to fetch messages.');
      }
    } catch (err: any) {
      setError('An error occurred while fetching messages.');
    }
  };

  // Handles sending a message
  const handleSendMessage = async () => {
    if (!message.trim() || !selectedUser) return;

    try {
      const response = await api.post<SendMessageResponse>('sendMessage.php', {
        receiver_id: selectedUser.id,
        message: message,
      });

      if (response.data.success) {
        setMessage('');
        fetchMessages();
      } else {
        setError(response.data.message || 'Failed to send message.');
      }
    } catch (err: any) {
      setError('An error occurred while sending the message.');
    }
  };

  return (
    <div className="flex max-w-4xl mx-auto mt-8">
      {/* Users List */}
      <div className="w-1/3 bg-white shadow-md rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className={`p-2 cursor-pointer ${
                selectedUser?.id === user.id ? 'bg-blue-100' : ''
              }`}
              onClick={() => setSelectedUser(user)}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </div>
      {/* Chat Window */}
      <div className="w-2/3 bg-white shadow-md rounded p-4 ml-4 flex flex-col">
        {selectedUser ? (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Chat with {selectedUser.name}
            </h2>
            <div className="flex-1 overflow-y-auto mb-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-2 ${
                    msg.sender_id === Number(localStorage.getItem('user_id'))
                      ? 'text-right'
                      : 'text-left'
                  }`}
                >
                  <p
                    className={`inline-block p-2 rounded ${
                      msg.sender_id === Number(localStorage.getItem('user_id'))
                        ? 'bg-blue-200'
                        : 'bg-gray-200'
                    }`}
                  >
                    {msg.message}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(msg.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 px-3 py-2 border rounded"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-600">Select a user to start chatting.</p>
        )}
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default Chat;
