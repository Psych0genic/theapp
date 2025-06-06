import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

export default function ChatPage() {
  const { token } = useAuth();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const [threads, setThreads] = useState([]);
  const [threadId, setThreadId] = useState(null);
  
  const createThread = async () => {
  try {
    const res = await fetch('/api/threads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const newThread = await res.json();

    // Update thread list and switch to new thread
    setThreads(prev => [newThread, ...prev]);
    setThreadId(newThread._id);
    setMessages([]); // clear message view
  } catch (err) {
    console.error('Failed to create new thread:', err);
  }
};
  
  useEffect(() => {
  const fetchThreads = async () => {
    try {
      const res = await fetch('/api/threads', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      setThreads(data);

      // Automatically select the first thread (if available)
      if (data.length > 0) {
        setThreadId(data[0]._id);
      }
    } catch (err) {
      console.error('Failed to fetch threads:', err);
    }
  };

  fetchThreads();
}, []);

useEffect(() => {
  if (!threadId) return;

  const fetchHistory = async () => {
    try {
      const res = await fetch(`/api/chat/history?thread=${threadId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (data.history) {
        setMessages(data.history.map(msg => ({
          role: msg.role,
          content: msg.content
        })));
      }
    } catch (err) {
      console.error('Failed to fetch chat history:', err);
    }
  };

  fetchHistory();
}, [threadId]);

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
      body: JSON.stringify({ message: input, threadId })
    });

    const data = await res.json();
    if (data.response) {
      setMessages(prev => [...prev, { role: 'ai', content: data.response }]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex flex-col items-center">
    <select
  value={threadId || ''}
  onChange={e => setThreadId(e.target.value)}
  className="mb-4 p-2 bg-gray-800 text-white w-full max-w-xl"
>
  {threads.map(t => (
    <option key={t._id} value={t._id}>
      {t.title}
    </option>
  ))}
</select>
      <div className="w-full max-w-xl">
  {/* ✅ Step 2: New Thread Button */}
  <button
    onClick={createThread}
    className="mb-2 p-2 bg-cyan-700 text-white w-full rounded"
  >
    + New Thread
  </button>

  {/* Thread dropdown */}
  <select
    value={threadId || ''}
    onChange={e => setThreadId(e.target.value)}
    className="mb-4 p-2 bg-gray-800 text-white w-full"
  >
    {threads.map(t => (
      <option key={t._id} value={t._id}>
        {t.title}
      </option>
    ))}
  </select>
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
