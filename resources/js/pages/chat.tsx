import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import ChatWindow from '@/components/chat-card';
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
      <div className="flex flex-col h-full">
        <div className="p-4 border-b flex items-center gap-3">
          <Link 
            href="/chats" 
            className="md:hidden p-2 rounded-full hover:bg-gray-100"
          >
            ←
          </Link>
          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-sm">{chat.avatar}</span>
          </div>
          <h2 className="font-semibold">{chat.name}</h2>
        </div>
        
        <ChatWindow 
          activeChat={chat}
          onSendMessage={handleSendMessage}
          messages={messages}
        />
      </div>
    </AppLayout>
  );
}