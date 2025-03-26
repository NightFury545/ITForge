import { useState, useEffect, useRef } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Chat, type Message } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { PaperAirplaneIcon, ChevronLeftIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ChatPageProps {
    chat: Chat;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Chats', href: '/chats' },
    { title: 'Chat', href: '#' },
];

export default function ChatPage({ chat }: ChatPageProps) {
    const [messages, setMessages] = useState<Message[]>(chat.messages || []);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { auth } = usePage().props;
    console.log(chat);
    console.log(chat.name);
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (!chat?.id) return;

        window.Echo.channel(`chat.${chat.id}`).listen('message.sent', (event: Message) => {
            setMessages((prev) => [...prev, event]);
        });

        return () => {
            window.Echo.leaveChannel(`chat.${chat.id}`);
        };
    }, [chat]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = async () => {
        if (!input.trim() || !chat?.id) return;

        try {
            await axios.post('/messages', {
                chat_id: chat.id,
                text: input,
            });
            setInput('');
        } catch (error) {
            console.error('Помилка відправки повідомлення:', error);
        }
    };

    if (!chat) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Chat not found" />
                <div className="flex items-center justify-center h-full">
                    <div className="text-center p-6 max-w-md">
                        <h2 className="text-xl font-bold mb-2">Чат не знайдено</h2>
                        <p className="text-gray-500 mb-4">На жаль, цей чат не існує або був видалений</p>
                        <Link
                            href="/chats"
                            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Повернутися до списку чатів
                        </Link>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Чат з ${chat.name || 'користувачем'}`} />

            {/* Хедер чату */}
            <div className="flex items-center justify-between p-3 border-b bg-white dark:bg-gray-800">
                <div className="flex items-center space-x-3">
                    <Link
                        href="/chats"
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <ChevronLeftIcon className="h-5 w-5" />
                    </Link>
                    <Avatar className="h-10 w-10">
                        {chat.avatar ? (
                            <AvatarImage src={chat.avatar} alt={chat.name} />
                        ) : (
                            <AvatarFallback className="text-lg">
                                {chat.name?.[0]?.toUpperCase() || 'U'}
                            </AvatarFallback>
                        )}
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <h2 className="font-semibold text-base truncate dark:text-white">
                            {chat.name || 'Чат'}
                        </h2>
                    </div>
                </div>
                <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <EllipsisHorizontalIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
            </div>

            {/* Область повідомлень */}
            <div className="flex-1 p-3 overflow-y-auto">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex mb-3 ${msg.sender_id === auth.user.id ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className="max-w-xs lg:max-w-md">
                            {msg.sender_id !== auth.user.id && msg.sender_name && (
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                    {msg.sender_name}
                                </div>
                            )}
                            <div
                                className={`p-3 rounded-lg ${
                                    msg.sender_id === auth.user.id
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white dark:bg-gray-700 shadow-sm'
                                }`}
                            >
                                <p className={msg.sender_id === auth.user.id ? 'text-white' : 'text-gray-800 dark:text-gray-200'}>
                                    {msg.text}
                                </p>
                                <p className={`text-xs mt-1 ${
                                    msg.sender_id === auth.user.id
                                        ? 'text-blue-200'
                                        : 'text-gray-500 dark:text-gray-400'
                                }`}>
                                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Форма введення */}
            <div className="p-3 border-t bg-white dark:bg-gray-800">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                    }}
                    className="flex items-center space-x-2"
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                        placeholder="Написати повідомлення..."
                        className="flex-1 border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className={`p-2 rounded-full ${
                            input.trim()
                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                : 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        <PaperAirplaneIcon className="h-5 w-5" />
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
