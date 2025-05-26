import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded space-y-4">
        <h2 className="text-xl">Register</h2>
        <input className="w-full p-2 bg-gray-700" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="w-full p-2 bg-gray-700" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="bg-green-600 w-full p-2 rounded">Register</button>
      </form>
    </div>
  );
}
