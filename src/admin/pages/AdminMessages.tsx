import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/Store';
import { sendAdminReply, markAsRead } from '../../store/slices/messagesSlice';
import AdminLayout from '../components/AdminLayout';
import { Box } from '@mui/material';
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
    if (conversations.length > 0 && activeId === null) setActiveId(conversations[0].id);
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
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.tour.toLowerCase().includes(search.toLowerCase());
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
      <Box sx={{ mb: 4 }}>
        <Box sx={{ fontSize: 24, fontWeight: 900, color: 'text.primary', letterSpacing: '-0.5px' }}>Messages</Box>
        <Box sx={{ color: 'text.secondary', fontSize: 13, mt: 0.5 }}>Togo / Messages</Box>
      </Box>

      <Box sx={{
        display: 'flex', bgcolor: 'background.paper',
        borderRadius: 3, border: '1px solid', borderColor: 'divider',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        overflow: 'hidden', height: 'calc(100vh - 220px)', minHeight: 480,
      }}>

        
        <Box sx={{ width: 280, flexShrink: 0, borderRight: '1px solid', borderColor: 'divider', display: 'flex', flexDirection: 'column' }}>

          
          <Box sx={{ p: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ position: 'relative' }}>
              <SearchIcon sx={{ fontSize: 16, color: 'text.disabled', position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
              <Box
                component="input"
                type="text"
                placeholder="Search conversations..."
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                sx={{
                  width: '100%', pl: 4, pr: 1.5, py: 1, fontSize: 13,
                  border: '1px solid', borderColor: 'divider', borderRadius: 2,
                  outline: 'none', bgcolor: 'action.hover', color: 'text.primary',
                  '&:focus': { borderColor: '#fb5b52' },
                  '&::placeholder': { color: 'text.disabled' },
                }}
              />
            </Box>
          </Box>

          
          <Box sx={{ display: 'flex', gap: 1, px: 1.5, py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
            {(['all', 'unread'] as const).map(f => (
              <Box
                key={f}
                component="button"
                onClick={() => setFilter(f)}
                sx={{
                  px: 1.5, py: 0.5, borderRadius: 10, fontSize: 12, fontWeight: 700,
                  border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                  bgcolor: filter === f ? '#fb5b52' : 'transparent',
                  color: filter === f ? '#fff' : 'text.secondary',
                  '&:hover': filter !== f ? { bgcolor: 'action.hover' } : {},
                }}
              >
                {f === 'all' ? 'All Chats' : `Unread${conversations.filter(c => c.unread).length > 0 ? ` (${conversations.filter(c => c.unread).length})` : ''}`}
              </Box>
            ))}
          </Box>

         
          <Box sx={{ flex: 1, overflowY: 'auto' }}>
            {filtered.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 6, color: 'text.secondary', fontSize: 13 }}>
                No messages yet.<br />
                <Box component="span" sx={{ fontSize: 11 }}>Messages from the contact form will appear here.</Box>
              </Box>
            )}
            {filtered.map((c, i) => (
              <Box
                key={c.id}
                onClick={() => { setActiveId(c.id); dispatch(markAsRead(c.id)); }}
                sx={{
                  display: 'flex', alignItems: 'flex-start', gap: 1.5,
                  px: 2, py: 1.5, cursor: 'pointer',
                  borderBottom: '1px solid', borderColor: 'divider',
                  borderLeft: activeId === c.id ? '2px solid #fb5b52' : '2px solid transparent',
                  bgcolor: activeId === c.id ? 'rgba(251,91,82,0.06)' : 'transparent',
                  transition: 'all 0.15s',
                  '&:hover': { bgcolor: activeId === c.id ? 'rgba(251,91,82,0.06)' : 'action.hover' },
                }}
              >
                <Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: AVATAR_COLORS[i % AVATAR_COLORS.length], display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700, flexShrink: 0, mt: 0.25 }}>
                  {getInitials(c.name)}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ fontWeight: 700, color: 'text.primary', fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</Box>
                    <Box sx={{ fontSize: 10, color: 'text.disabled', flexShrink: 0, ml: 0.5 }}>{c.lastTime}</Box>
                  </Box>
                  <Box sx={{ fontSize: 11, color: '#fb5b52', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', mt: 0.25 }}>
                    {c.tour.length > 28 ? c.tour.slice(0, 28).toUpperCase() + '...' : c.tour.toUpperCase()}
                  </Box>
                  <Box sx={{ fontSize: 12, color: 'text.secondary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', mt: 0.25 }}>{c.lastMsg}</Box>
                </Box>
                {c.unread && <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#fb5b52', flexShrink: 0, mt: 1.5 }} />}
              </Box>
            ))}
          </Box>
        </Box>

       
        {active ? (
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

            
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: AVATAR_COLORS[conversations.findIndex(c => c.id === activeId) % AVATAR_COLORS.length], display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700 }}>
                  {getInitials(active.name)}
                </Box>
                <Box>
                  <Box sx={{ fontWeight: 900, color: 'text.primary', fontSize: 13 }}>{active.name}</Box>
                  <Box sx={{ fontSize: 12, fontWeight: 600, color: active.status === 'online' ? '#10b981' : 'text.disabled' }}>
                    {active.status === 'online' ? 'Online' : 'Offline'}
                  </Box>
                </Box>
              </Box>
            </Box>

           
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, py: 1.25, bgcolor: 'rgba(251,91,82,0.06)', borderBottom: '1px solid rgba(251,91,82,0.15)' }}>
              <Box sx={{ fontSize: 12, color: 'text.secondary' }}>
                <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>Inquiry: </Box>
                <Box component="span" sx={{ color: '#fb5b52', fontWeight: 600 }}>{active.tour}</Box>
              </Box>
              <Box component="button" sx={{ fontSize: 11, fontWeight: 700, color: '#fb5b52', border: 'none', bgcolor: 'transparent', cursor: 'pointer', whiteSpace: 'nowrap', ml: 2, '&:hover': { color: '#e04840' } }}>
                VIEW TOUR DETAILS ›
              </Box>
            </Box>

           
            <Box sx={{ flex: 1, overflowY: 'auto', px: 3, py: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {groupedMessages.map(group => (
                <Box key={group.date}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                    <Box sx={{ fontSize: 11, color: 'text.secondary', fontWeight: 600, bgcolor: 'action.hover', px: 2, py: 0.5, borderRadius: 10, border: '1px solid', borderColor: 'divider' }}>
                      {group.date}
                    </Box>
                  </Box>
                  {group.msgs.map(msg => (
                    <Box key={msg.id} sx={{ display: 'flex', mb: 1.5, justifyContent: msg.from === 'admin' ? 'flex-end' : 'flex-start' }}>
                      {msg.from === 'user' && (
                        <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: AVATAR_COLORS[conversations.findIndex(c => c.id === activeId) % AVATAR_COLORS.length], display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 700, flexShrink: 0, mr: 1, mt: 0.5 }}>
                          {getInitials(active.name)}
                        </Box>
                      )}
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: msg.from === 'admin' ? 'flex-end' : 'flex-start' }}>
                        <Box sx={{
                          px: 2, py: 1, borderRadius: msg.from === 'admin' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                          fontSize: 14, fontWeight: 500, maxWidth: 280, wordBreak: 'break-word',
                          bgcolor: msg.from === 'admin' ? '#fb5b52' : 'action.selected',
                          color: msg.from === 'admin' ? '#fff' : 'text.primary',
                        }}>
                          {msg.text}
                        </Box>
                        <Box sx={{ fontSize: 10, color: 'text.disabled', mt: 0.5, px: 0.5 }}>{msg.time}</Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              ))}
              <div ref={bottomRef} />
            </Box>

            <Box sx={{ px: 2, py: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'action.hover', border: '1px solid', borderColor: 'divider', borderRadius: 3, px: 2, py: 1 }}>
                <Box
                  component="input"
                  type="text"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  sx={{ flex: 1, bgcolor: 'transparent', border: 'none', outline: 'none', fontSize: 14, color: 'text.primary', '&::placeholder': { color: 'text.disabled' } }}
                />
                <Box
                  component="button"
                  onClick={sendMessage}
                  sx={{ width: 32, height: 32, borderRadius: 2, bgcolor: '#fb5b52', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0, transition: 'background 0.15s', '&:hover': { bgcolor: '#e04840' } }}
                >
                  <SendIcon sx={{ fontSize: 16 }} />
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary', fontSize: 14 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Box sx={{ fontSize: 40, mb: 1.5 }}>💬</Box>
              <Box sx={{ fontWeight: 600, color: 'text.primary' }}>No conversation selected</Box>
              <Box sx={{ fontSize: 12, mt: 0.5 }}>Messages from the contact form will appear here</Box>
            </Box>
          </Box>
        )}
      </Box>
    </AdminLayout>
  );
}
