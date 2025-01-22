// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Chat from './components/chat';
import Navbar from './components/Navbar';
import AssignmentForm from './components/AssignmentForm';
import References from './components/References';
import UploadReference from './components/UploadReference';
import FriendSuggestions from './components/FriendSuggestions';

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<ProtectedRoute component={Home} />} />
            <Route
              path="/profile"
              element={<ProtectedRoute component={Profile} />}
            />
            <Route path="/chat" element={<ProtectedRoute component={Chat} />} />
            <Route
              path="/assignments"
              element={<ProtectedRoute component={AssignmentForm} />}
            />
            <Route
              path="/references"
              element={<ProtectedRoute component={References} />}
            />
            <Route
              path="/upload-reference"
              element={<ProtectedRoute component={UploadReference} />}
            />
            <Route
              path="/friend-suggestions"
              element={<ProtectedRoute component={FriendSuggestions} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

// Protected Route Component
interface ProtectedRouteProps {
  component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
}) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <Component /> : <Login />;
};

export default App;
