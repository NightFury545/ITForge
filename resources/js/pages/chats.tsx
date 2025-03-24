import ChatWindow from '@/components/chat-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Chat } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Chat',
        href: '/chats',
    },
];

interface Props {
    chats: Chat[];
}

export default function ChatPage({ chats }: Props) {
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const [chatMessages, setChatMessages] = useState<Record<string, string[]>>({});

    useEffect(() => {
        if (chats.length > 0) {
            setActiveChatId(chats[0].id);
        }
    }, [chats]);

    useEffect(() => {
        if (!activeChatId) return;

        const activeChat = chats.find((chat) => chat.id === activeChatId);
        if (activeChat) {
            setChatMessages((prev) => ({
                ...prev,
                [activeChatId]: activeChat.messages && Array.isArray(activeChat.messages) ? activeChat.messages.map((msg) => msg.message) : [],
            }));

            // Підключення до каналу через Echo
            window.Echo.channel(`chat.${activeChatId}`).listen('message.sent', (event) => {
                setChatMessages((prev) => ({
                    ...prev,
                    [activeChatId]: [...(prev[activeChatId] || []), event.message],
                }));
            });
        }
    }, [activeChatId, chats]);

    const activeChat = chats.find((chat) => chat.id === activeChatId);

    const handleSendMessage = async (message: string) => {
        if (activeChatId) {
            try {
                // Надсилаємо повідомлення через API
                const response = await axios.post(
                    '/messages',
                    {
                        message,
                        chat_id: activeChatId,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true, // Передаємо токен сесії через cookie
                    },
                );

                if (response.status === 200) {
                    const updatedMessage = response.data;

                    setChatMessages((prev) => ({
                        ...prev,
                        [activeChatId]: [...(prev[activeChatId] || []), updatedMessage.message],
                    }));

                    // Оновлюємо останнє повідомлення в списку чатів
                    const updatedChats = chats.map((chat) =>
                        chat.id === activeChatId
                            ? {
                                ...chat,
                                last_message: message,
                                last_message_at: new Date().toISOString(),
                            }
                            : chat,
                    );

                    // Якщо потрібно, тут можна відправити оновлені чати на сервер
                }
            } catch (error) {
                console.error('Помилка при відправці повідомлення', error);
            }
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Chat" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 md:flex-row">
                {/* Список чатів */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border w-full rounded-xl border p-4 md:w-1/4">
                    <h2 className="mb-4 text-xl font-semibold">Чати</h2>
                    <div className="space-y-2">
                        {chats
                            .sort((a, b) => b.last_message_at.localeCompare(a.last_message_at))
                            .map((chat) => (
                                <div
                                    key={chat.id}
                                    className={`flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                        chat.id === activeChatId ? 'bg-gray-100 dark:bg-gray-700' : ''
                                    }`}
                                    onClick={() => setActiveChatId(chat.id)} // Перемикаємо активний чат
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600">
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Avatar>
                                                    {chat.avatar ? (
                                                        <AvatarImage src={chat.avatar} alt={chat.name} />
                                                    ) : (
                                                        <AvatarFallback>{chat.name ? chat.name[0].toUpperCase() : 'U'}</AvatarFallback>
                                                    )}
                                                </Avatar>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{chat.name}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="truncate font-medium">{chat.name}</h3>
                                        <p className="truncate text-sm text-gray-500">{chat.last_message}</p>
                                    </div>
                                    <span className="text-xs text-gray-500">{chat.last_message_at}</span>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Вікно переговорів */}
                {activeChat && (
                    <ChatWindow
                        activeChat={activeChat}
                        onSendMessage={handleSendMessage}
                        messages={chatMessages[activeChatId] || []}
                    />
                )}
            </div>
        </AppLayout>
    );
}
