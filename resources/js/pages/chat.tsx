import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Chat, type Message } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { createToggleGroupScope } from '@radix-ui/react-toggle-group';

interface ChatPageProps {
    chat: Chat;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Chats', href: '/chats' },
    { title: 'Chat', href: '#' },
];

export default function ChatPage({ chat }: ChatPageProps) {
    const [messages, setMessages] = useState<Message[]>(chat.messages);
    const [input, setInput] = useState('');
    const { auth } = usePage().props;
    console.log(chat);
    useEffect(() => {
        if (!chat) return;

        window.Echo.channel(`chat.${chat.id}`).listen('message.sent', (event: Message) => {
            setMessages((prev) => [...prev, event]);
        });

        return () => {
            window.Echo.leaveChannel(`chat.${chat.id}`);
        };
    }, [chat]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        await axios.post('/messages', {
            chat_id: chat.id,
            text: input,
        });

        setInput('');
    };

    if (!chat) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Chat not found" />
                <div className="p-4 text-center">
                    <p>Чат не знайдено</p>
                    <Link href="/chats" className="text-blue-600 hover:underline">
                        Повернутися до списку чатів
                    </Link>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Chat with ${chat.name}`} />
            <div className="flex flex-col h-screen p-4">
                {/* Шапка чату */}
                <div className="flex items-center gap-3 mb-4 p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <Link href="/chats" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                        ←
                    </Link>
                    <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                        <span className="text-sm">{chat.avatar || 'U'}</span>
                    </div>
                    <div>
                        <h2 className="font-semibold">{chat.name}</h2>
                    </div>
                </div>

                {/* Вікно повідомлень */}
                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`p-2 rounded-lg w-max max-w-xs ${
                                msg.sender_id === auth.user.id ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                            }`}
                        >
                            <p>{msg.text}</p>
                        </div>
                    ))}
                </div>

                {/* Форма відправки */}
                <div className="flex items-center gap-2 mt-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                        placeholder="Напишіть повідомлення..."
                    />
                    <button
                        onClick={handleSendMessage}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Відправити
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}
