'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hello! 👋 I am CornorTech AI. How can I assist you today?',
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize conversationId and load history
    useEffect(() => {
        const storedId = localStorage.getItem('chat_conversation_id');
        if (storedId) {
            setConversationId(storedId);
            // Fetch chat history
            const fetchHistory = async () => {
                try {
                    const res = await fetch(`/api/chat?conversationId=${storedId}`);
                    if (!res.ok) return;
                    
                    const data = await res.json();
                    if (data.success && data.messages && data.messages.length > 0) {
                        const history: Message[] = data.messages.map((m: any) => ({
                            id: m.id,
                            text: m.content,
                            sender: m.role === 'USER' ? 'user' : 'bot',
                            timestamp: new Date(m.createdAt || Date.now()),
                        }));
                        setMessages(history);
                    }
                } catch (error) {
                    console.error("Failed to load chat history", error);
                }
            };
            fetchHistory();
        }
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue.trim(),
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage.text }),
            });

            const data = await response.json();

            // Save new conversation ID if provided
            if (data.conversationId && !conversationId) {
                setConversationId(data.conversationId);
                localStorage.setItem('chat_conversation_id', data.conversationId);
            }

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: data.reply ?? 'Sorry, I encountered an error. Please try again.',
                sender: 'bot',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error:', error);
            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 2).toString(),
                    text: 'Connection error. Please try again later.',
                    sender: 'bot',
                    timestamp: new Date(),
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            {/* ── Floating Trigger Button ── */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center z-[999] text-white shadow-xl focus:outline-none"
                style={{
                    background: '#9333EA',
                    boxShadow: '0 8px 32px #9333EA55, 0 2px 8px rgba(0,0,0,0.25)'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle chat"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.svg
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </motion.svg>
                    ) : (
                        <motion.svg
                            key="chat"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </motion.svg>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* ── Chat Modal ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] sm:w-[380px] h-[580px] max-h-[calc(100vh-8rem)] flex flex-col rounded-2xl overflow-hidden z-[998] bg-white/80 backdrop-blur-2xl border border-white/40 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.2)]"
                    >
                        {/* ══ HEADER ══ */}
                        <div className="relative px-6 py-5 shrink-0 bg-white/40 backdrop-blur-md border-b border-gray-100/50 flex items-center justify-between z-10">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white shadow-inner">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="font-semibold text-gray-900 text-sm tracking-tight leading-none mb-1">CornorTech AI</h3>
                                    <span className="text-[11px] text-gray-500 font-medium leading-none">We typically reply in seconds</span>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 rounded-full bg-gray-100/80 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
                                aria-label="Close chat"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </button>
                        </div>

                        {/* ── Messages Area ── */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-5 scroll-smooth custom-scrollbar bg-gray-50/50">
                            {messages.map((message, index) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index === messages.length - 1 ? 0.05 : 0 }}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {message.sender === 'bot' && (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white shrink-0 mr-2 mt-auto shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
                                        </div>
                                    )}
                                    <div
                                        className={`relative max-w-[80%] px-4 py-3 text-[14px] leading-relaxed shadow-sm ${
                                            message.sender === 'user'
                                                ? 'bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white rounded-2xl rounded-br-sm'
                                                : 'bg-white text-gray-700 rounded-2xl rounded-bl-sm border border-gray-100'
                                        }`}
                                    >
                                        {message.text}
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white shrink-0 mr-2 mt-auto shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
                                    </div>
                                    <div className="bg-white px-5 py-4 rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm flex items-center gap-1.5">
                                        <motion.div className="w-1.5 h-1.5 bg-violet-500 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }} />
                                        <motion.div className="w-1.5 h-1.5 bg-violet-500 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, delay: 0.15, repeat: Infinity, ease: "easeInOut" }} />
                                        <motion.div className="w-1.5 h-1.5 bg-violet-500 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, delay: 0.3, repeat: Infinity, ease: "easeInOut" }} />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} className="h-2" />
                        </div>

                        {/* ── Input Area ── */}
                        <div className="shrink-0 p-4 bg-white/90 backdrop-blur-md border-t border-gray-100/50">
                            <div className="relative flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl p-1.5 focus-within:ring-2 focus-within:ring-violet-500/20 focus-within:border-violet-500/50 transition-all shadow-sm">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Type your message..."
                                    disabled={isLoading}
                                    className="w-full h-10 px-3 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                                />
                                <motion.button
                                    onClick={handleSendMessage}
                                    disabled={isLoading || !inputValue.trim()}
                                    className="w-10 h-10 shrink-0 rounded-xl bg-violet-600 text-white flex items-center justify-center disabled:opacity-40 disabled:bg-gray-400 transition-colors"
                                    whileHover={{ scale: inputValue.trim() ? 1.05 : 1 }}
                                    whileTap={{ scale: inputValue.trim() ? 0.95 : 1 }}
                                    aria-label="Send message"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="translate-x-[1px] translate-y-[-1px]"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                                </motion.button>
                            </div>
                            <div className="text-center mt-3 mb-1">
                                <span className="text-[10px] text-gray-400 font-medium">
                                    Powered by <span className="text-violet-500 font-semibold tracking-wide">CornorTech AI</span>
                                </span>
                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>

            {/* Global style for custom scrollbar */}
            <style dangerouslySetInnerHTML={{__html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e5e7eb;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #d1d5db;
                }
            `}} />
        </>
    );
};

export default ChatWidget;