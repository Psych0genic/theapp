import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) navigate('/chat');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded space-y-4">
        <h2 className="text-xl">Login</h2>
        <input className="w-full p-2 bg-gray-700" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="w-full p-2 bg-gray-700" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="bg-blue-600 w-full p-2 rounded">Login</button>
      </form>
    </div>
  );
}
