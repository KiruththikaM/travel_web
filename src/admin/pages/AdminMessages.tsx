import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/Store';
import { sendAdminReply, markAsRead } from '../../store/slices/messagesSlice';
import AdminLayout from '../components/AdminLayout';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import type { Message } from '../../types';

const AVATAR_COLORS = ['#fb5b52', '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export default function AdminMessages() {
  const dispatch = useDispatch<AppDispatch>();
  const conversations = useSelector((state: RootState) => state.messages.conversations);

  const [activeId, setActiveId] = useState<number | null>(null);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [search, setSearch] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (conversations.length > 0 && activeId === null) {
      setActiveId(conversations[0].id);
    }
  }, [conversations, activeId]);

  const active = conversations.find(c => c.id === activeId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeId, active?.messages.length]);

  const sendMessage = () => {
    if (!input.trim() || !activeId) return;
    dispatch(sendAdminReply({ conversationId: activeId, text: input.trim() }));
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const filtered = conversations.filter(c => {
    const matchFilter = filter === 'all' || c.unread;
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.tour.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  
  const groupedMessages: { date: string; msgs: Message[] }[] = [];
  if (active) {
    active.messages.forEach(msg => {
      const last = groupedMessages[groupedMessages.length - 1];
      if (last && last.date === msg.date) last.msgs.push(msg);
      else groupedMessages.push({ date: msg.date, msgs: [msg] });
    });
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Messages</h1>
        <p className="text-slate-400 text-sm mt-0.5">Togo / Messages</p>
      </div>

      <div className="flex bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden" style={{ height: 'calc(100vh - 220px)', minHeight: 480 }}>

        
        <div className="w-72 flex-shrink-0 border-r border-slate-100 flex flex-col">
          <div className="p-3 border-b border-slate-100">
            <div className="relative">
              <SearchIcon sx={{ fontSize: 16, color: '#94a3b8', position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search conversations..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-red-400 bg-slate-50 placeholder-slate-400 text-slate-700"
              />
            </div>
          </div>

          <div className="flex gap-2 px-3 py-2 border-b border-slate-100">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${filter === 'all' ? 'bg-red-500 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              All Chats
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${filter === 'unread' ? 'bg-red-500 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              Unread
              {conversations.filter(c => c.unread).length > 0 && (
                <span className="ml-1 bg-white text-red-500 rounded-full px-1.5 text-[10px]">
                  {conversations.filter(c => c.unread).length}
                </span>
              )}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-sm">
                No messages yet.<br />
                <span className="text-xs">Messages from the contact form will appear here.</span>
              </div>
            )}
            {filtered.map((c, i) => (
              <div
                key={c.id}
                onClick={() => {
                  setActiveId(c.id);
                  dispatch(markAsRead(c.id));
                }}
                className={`flex items-start gap-3 px-4 py-3 cursor-pointer border-b border-slate-50 transition-colors
                  ${activeId === c.id ? 'bg-red-50 border-l-2 border-l-red-500' : 'hover:bg-slate-50'}`}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                >
                  {getInitials(c.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm truncate">{c.name}</span>
                    <span className="text-[10px] text-slate-400 flex-shrink-0 ml-1">{c.lastTime}</span>
                  </div>
                  <p className="text-[11px] text-red-500 font-semibold uppercase tracking-wide truncate leading-tight mt-0.5">
                    {c.tour.length > 30 ? c.tour.slice(0, 30).toUpperCase() + '...' : c.tour.toUpperCase()}
                  </p>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{c.lastMsg}</p>
                </div>
                {c.unread && <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-1.5" />}
              </div>
            ))}
          </div>
        </div>

        
        {active ? (
          <div className="flex-1 flex flex-col min-w-0">
           
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: AVATAR_COLORS[conversations.findIndex(c => c.id === activeId) % AVATAR_COLORS.length] }}
                >
                  {getInitials(active.name)}
                </div>
                <div>
                  <p className="font-black text-slate-800 text-sm leading-tight">{active.name}</p>
                  <p className={`text-xs font-semibold ${active.status === 'online' ? 'text-emerald-500' : 'text-slate-400'}`}>
                    {active.status === 'online' ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
            </div>

         
            <div className="flex items-center justify-between px-6 py-2.5 bg-red-50 border-b border-red-100">
              <p className="text-xs text-slate-600">
                <span className="font-bold text-slate-700">Inquiry: </span>
                <span className="text-red-500 font-semibold">{active.tour}</span>
              </p>
              <button className="text-xs font-bold text-red-500 hover:text-red-600 whitespace-nowrap ml-4">
                VIEW TOUR DETAILS ›
              </button>
            </div>

           
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-1">
              {groupedMessages.map(group => (
                <div key={group.date}>
                  <div className="flex items-center justify-center my-4">
                    <span className="text-xs text-slate-400 font-semibold bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                      {group.date}
                    </span>
                  </div>
                  {group.msgs.map(msg => (
                    <div key={msg.id} className={`flex mb-3 ${msg.from === 'admin' ? 'justify-end' : 'justify-start'}`}>
                      {msg.from === 'user' && (
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mr-2 mt-1"
                          style={{ backgroundColor: AVATAR_COLORS[conversations.findIndex(c => c.id === activeId) % AVATAR_COLORS.length] }}
                        >
                          {getInitials(active.name)}
                        </div>
                      )}
                      <div className={`flex flex-col ${msg.from === 'admin' ? 'items-end' : 'items-start'}`}>
                        <div className={`px-4 py-2 rounded-2xl text-sm font-medium max-w-xs break-words
                          ${msg.from === 'admin'
                            ? 'bg-red-500 text-white rounded-br-sm'
                            : 'bg-slate-100 text-slate-700 rounded-bl-sm'
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

          
            <div className="px-4 py-3 border-t border-slate-100">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder-slate-400"
                />
                <button
                  onClick={sendMessage}
                  className="w-8 h-8 rounded-lg bg-red-500 hover:bg-red-600 flex items-center justify-center text-white transition-colors flex-shrink-0"
                >
                  <SendIcon sx={{ fontSize: 16 }} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
            <div className="text-center">
              <p className="text-4xl mb-3">💬</p>
              <p className="font-semibold">No conversation selected</p>
              <p className="text-xs mt-1">Messages from the contact form will appear here</p>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
