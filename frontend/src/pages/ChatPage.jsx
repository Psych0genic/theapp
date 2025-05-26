import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const { token } = useAuth();

  const sendMessage = async (e) => {
    e.preventDefault();
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();
    if (data.response) {
      setMessages(prev => [...prev, { role: 'ai', content: data.response }]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex flex-col items-center">
      <div className="w-full max-w-xl space-y-2 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`p-2 rounded ${msg.role === 'user' ? 'bg-blue-700 text-right' : 'bg-purple-700'}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="w-full max-w-xl flex">
        <input className="flex-1 p-2 bg-gray-700" value={input} onChange={e => setInput(e.target.value)} />
        <button className="bg-blue-600 px-4">Send</button>
      </form>
    </div>
  );
}
