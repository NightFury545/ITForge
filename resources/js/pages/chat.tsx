import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Chat, type Message } from '@/types';
import { ChevronLeftIcon, EllipsisHorizontalIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { Head, Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useMemo, useRef, useState } from 'react';

interface ChatPageProps {
    chat: Chat;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Chats', href: '/chats' },
    { title: 'Chat', href: '#' },
];

export default function ChatPage({ chat }: ChatPageProps) {
    const [messages, setMessages] = useState<Message[]>(chat.messages || []);
    const [isSending, setIsSending] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { auth } = usePage().props;
    console.log(chat.messages);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (!chat?.id) return;

        const channel = window.Echo.private(`chat.${chat.id}`).listen('.message.sent', (event: Message) => {
            setMessages((prev) => [...prev, event]);
            console.log(event);
        });

        return () => {
            channel.stopListening('.message.sent');
            window.Echo.leave(`chat.${chat.id}`);
        };
    }, [chat?.id]);
    const handleSendMessage = async () => {
        if (!inputRef.current?.value.trim() || !chat?.id || isSending) return;

        try {
            setIsSending(true)
            await axios.post('/messages', {
                chat_id: chat.id,
                message: inputRef.current.value,
            });
            inputRef.current.value = '';
            setIsSending(false)
        } catch (error) {
            console.error('Помилка відправки повідомлення:', error);
            setIsSending(false)
        }
    };

    const groupMessagesByDate = (messages: Message[]) => {
        return messages.reduce((acc: { [date: string]: Message[] }, message) => {
            const messageDate = new Date(message.created_at).toLocaleDateString();
            if (!acc[messageDate]) {
                acc[messageDate] = [];
            }
            acc[messageDate].push(message);
            return acc;
        }, {});
    };

    const messagesByDate = useMemo(() => groupMessagesByDate(messages), [messages]);

    const messagesList = useMemo(() => {
        return Object.keys(messagesByDate).map((date) => (
            <div key={date}>
                <div className="my-4 text-center text-sm text-gray-500">{date}</div>
                {messagesByDate[date].map((msg) => (
                    <div key={msg.id} className={`mb-6 flex ${msg.sender_id === auth.user.id ? 'justify-end' : 'justify-start'}`}>

                        {/* Контейнер для аватарки та імені */}
                        {msg.sender_id !== auth.user.id && (
                            <div className="mr-3 flex flex-col items-center">
                                <Avatar className="h-10 w-10">
                                    {msg.avatar ? (
                                        <AvatarImage src={msg.avatar} alt={msg.sender_name} />
                                    ) : (
                                        <AvatarFallback>{msg.sender_name?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                                    )}
                                </Avatar>
                            </div>
                        )}

                        {/* Контейнер для повідомлення */}
                        <div className="flex flex-col">
                            {/* Ім'я над повідомленням */}
                            {msg.sender_id === auth.user.id ? (
                                <span className="mb-1 text-right text-xs font-medium text-gray-600 dark:text-gray-400">{auth.user.name}</span>
                            ) : (
                                <span className="mb-1 text-left text-xs font-medium text-gray-600 dark:text-gray-400">{msg.sender_name}</span>
                            )}

                            <div
                                className={`rounded-lg p-3 max-w-sm ${
                                    msg.sender_id === auth.user.id ? 'bg-blue-500 text-white' : 'bg-white shadow-sm dark:bg-gray-700'
                                }`}
                            >
                                <p className={`break-words ${msg.sender_id === auth.user.id ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}>
                                    {msg.message}
                                </p>
                                <p className={`mt-1 text-xs ${msg.sender_id === auth.user.id ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'}`}>
                                    {new Date(msg.created_at).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Контейнер для аватарки та імені (праворуч для своїх повідомлень) */}
                        {msg.sender_id === auth.user.id && (
                            <div className="ml-3 flex flex-col items-center">
                                <Avatar className="h-10 w-10">
                                    {/* Трохи більша аватарка */}
                                    {auth.user.avatar ? (
                                        <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                    ) : (
                                        <AvatarFallback>{auth.user.name?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                                    )}
                                </Avatar>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        ));
    }, [messagesByDate, auth.user.id, auth.user.avatar, auth.user.name]);

    if (!chat) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Chat not found" />
                <div className="flex h-full items-center justify-center">
                    <div className="max-w-md p-6 text-center">
                        <h2 className="mb-2 text-xl font-bold">Чат не знайдено</h2>
                        <p className="mb-4 text-gray-500">На жаль, цей чат не існує або був видалений</p>
                        <Link
                            href="/chats"
                            className="inline-flex items-center rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
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
            <div className="flex items-center justify-between border-b bg-white p-3 dark:bg-gray-800">
                <div className="flex items-center space-x-3">
                    <Link href="/chats" className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <ChevronLeftIcon className="h-5 w-5" />
                    </Link>
                    <Avatar className="h-10 w-10">
                        {chat.avatar ? (
                            <AvatarImage src={chat.avatar} alt={chat.name} />
                        ) : (
                            <AvatarFallback className="text-lg">{chat.name?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                        )}
                    </Avatar>
                    <div className="min-w-0 flex-1">
                        <h2 className="truncate text-base font-semibold dark:text-white">{chat.name || 'Чат'}</h2>
                    </div>
                </div>
                <button className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <EllipsisHorizontalIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
            </div>

            {/* Область повідомлень */}
            <div className="scrollbar-hidden max-h-[calc(100vh-150px)] flex-1 overflow-y-auto p-3">
                {messagesList}
                <div ref={messagesEndRef} />
            </div>

            {/* Форма введення */}
            <div className="border-t bg-white p-3 dark:bg-gray-800">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                    }}
                    className="flex items-center space-x-2"
                >
                    <input
                        type="text"
                        ref={inputRef}
                        placeholder="Написати повідомлення..."
                        className="flex-1 rounded-full border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    <button type="submit" className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600">
                        <PaperAirplaneIcon className="h-5 w-5" />
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
