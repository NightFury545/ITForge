import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { type Chat } from '@/types';

const mockChats: Record<string, Chat> = {
  '1': {
    id: '1',
    name: 'Андрій',
    lastMessage: 'Привіт! Як справи?',
    lastMessageTime: '10:15',
    avatar: 'A',
  },
  '2': {
    id: '2',
    name: 'Марія',
    lastMessage: 'Чекаю на відповідь...',
    lastMessageTime: '09:45',
    avatar: 'M',
  },
  '3': {
    id: '3',
    name: 'Олександр',
    lastMessage: 'Дякую за допомогу!',
    lastMessageTime: '09:30',
    avatar: 'O',
  },
};

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Chats', href: '/chats' },
  { title: 'Chat', href: '#' },
];

export default function ChatPage({ id }: { id: string }) {
  const [messages, setMessages] = useState<string[]>([]);
  const chat = mockChats[id];

  const handleSendMessage = (message: string) => {
    setMessages(prev => [...prev, message]);
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
      <div className="flex flex-col h-full p-4">
        {/* Шапка чату */}
        <div className="flex items-center gap-3 mb-4 p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
          <Link 
            href="/chats" 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            ←
          </Link>
          <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
            <span className="text-sm">{chat.avatar}</span>
          </div>
          <div>
            <h2 className="font-semibold">{chat.name}</h2>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>
        

      </div>
    </AppLayout>
  );
}