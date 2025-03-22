// pages/ChatPage.tsx
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import ChatWindow from '@/components/chat-card'; // Імпортуємо компонент ChatWindow
import { type Chat } from '@/types'; // Імпортуємо тип Chat

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Chat',
        href: '/chats',
    },
];

// Приклад даних про чати
const initialChats: Chat[] = [
    {
        id: '1',
        name: 'Андрій',
        lastMessage: 'Привіт! Як справи?',
        lastMessageTime: '10:15',
        avatar: 'A',
    },
    {
        id: '2',
        name: 'Марія',
        lastMessage: 'Чекаю на відповідь...',
        lastMessageTime: '09:45',
        avatar: 'M',
    },
    {
        id: '3',
        name: 'Олександр',
        lastMessage: 'Дякую за допомогу!',
        lastMessageTime: '09:30',
        avatar: 'O',
    },
];

export default function ChatPage() {
    const [activeChatId, setActiveChatId] = useState(initialChats[0].id); // Стан для активного чату
    const [chats, setChats] = useState(initialChats); // Стан для списку чатів
    const [chatMessages, setChatMessages] = useState<Record<string, string[]>>({}); // Стан для повідомлень кожного чату

    // Знаходимо активний чат за ID
    const activeChat = chats.find((chat) => chat.id === activeChatId);

    // Функція для надсилання повідомлення до активного чату
    const handleSendMessage = (message: string) => {
        if (activeChatId) {
            // Оновлюємо повідомлення для активного чату
            setChatMessages((prev) => ({
                ...prev,
                [activeChatId]: [...(prev[activeChatId] || []), message],
            }));

            // Оновлюємо останнє повідомлення в списку чатів
            setChats((prevChats) =>
                prevChats.map((chat) =>
                    chat.id === activeChatId
                        ? { ...chat, lastMessage: message, lastMessageTime: new Date().toLocaleTimeString() }
                        : chat
                )
            );
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Chat" />
            <div className="flex h-full flex-1 flex-col md:flex-row gap-4 rounded-xl p-4">
                {/* Список чатів (ліва частина) */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border p-4 w-full md:w-1/4">
                    <h2 className="text-xl font-semibold mb-4">Чати</h2>
                    <div className="space-y-2">
                        {/* Сортуємо чати за часом останнього повідомлення (найновіші зверху) */}
                        {chats
                            .sort((a, b) => b.lastMessageTime.localeCompare(a.lastMessageTime))
                            .map((chat) => (
                                <div
                                    key={chat.id}
                                    className={`flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer ${
                                        chat.id === activeChatId ? 'bg-gray-100 dark:bg-gray-700' : ''
                                    }`}
                                    onClick={() => setActiveChatId(chat.id)} // Перемикаємо активний чат
                                >
                                    <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                                        <span className="text-sm">{chat.avatar}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium truncate">{chat.name}</h3>
                                        <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                                    </div>
                                    <span className="text-xs text-gray-500">{chat.lastMessageTime}</span>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Вікно переговорів (права частина) */}
                {activeChat && (
                    <ChatWindow
                        activeChat={activeChat}
                        onSendMessage={handleSendMessage} // Передаємо функцію для надсилання повідомлення
                        messages={chatMessages[activeChatId] || []} // Повідомлення для активного чату
                    />
                )}
            </div>
        </AppLayout>
    );
}