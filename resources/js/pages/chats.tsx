import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { type Chat } from '@/types';

const mockChats: Chat[] = [
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

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Chats', href: '/chats' },
];

export default function ChatsPage() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Chats" />
      <div className="rounded-xl p-4">
        <h1 className="text-2xl font-bold mb-6">Мої чати</h1>
        
        <div className="space-y-3">
          {mockChats
            .sort((a, b) => b.lastMessageTime.localeCompare(a.lastMessageTime))
            .map((chat) => (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                  <span className="text-sm">{chat.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{chat.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                </div>
                <span className="text-xs text-gray-500">{chat.lastMessageTime}</span>
              </Link>
            ))}
        </div>
      </div>
    </AppLayout>
  );
}