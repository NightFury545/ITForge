// components/ChatWindow.tsx
import { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { type Chat } from '@/types'; // Імпортуйте тип Chat

interface ChatWindowProps {
    activeChat: Chat;
    onSendMessage: (message: string) => void; // Функція для надсилання повідомлення
    messages: string[]; // Повідомлення для активного чату
}

export default function ChatWindow({ activeChat, onSendMessage, messages }: ChatWindowProps) {
    const [message, setMessage] = useState(''); // Стан для введення повідомлення

    // Функція для надсилання повідомлення
    const handleSendMessage = () => {
        if (message.trim()) {
            onSendMessage(message); // Викликаємо функцію для надсилання повідомлення
            setMessage(''); // Очищуємо поле введення
        }
    };

    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border p-4 w-full md:w-3/4">
            <h2 className="text-xl font-semibold mb-4">{activeChat.name}</h2>
            <div className="flex flex-col gap-4 h-[70vh] overflow-y-auto">
                {/* Повідомлення від іншого користувача */}
                <div className="flex items-start gap-2">
                    <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                        <span className="text-sm">{activeChat.avatar}</span>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg max-w-[70%]">
                        <p className="text-sm">{activeChat.lastMessage}</p>
                        <span className="text-xs text-gray-500">{activeChat.lastMessageTime}</span>
                    </div>
                </div>

                {/* Ваші повідомлення */}
                {messages.map((msg, index) => (
                    <div key={index} className="flex items-start gap-2 justify-end">
                        <div className="bg-blue-500 text-white p-3 rounded-lg max-w-[70%]">
                            <p className="text-sm">{msg}</p>
                            <span className="text-xs text-blue-200">Just now</span>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-sm text-white">Я</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Поле для введення повідомлення з іконкою надсилання */}
            <div className="mt-4 flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Напишіть повідомлення..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} // Оновлюємо стан при введенні
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendMessage(); // Надсилаємо повідомлення при натисканні Enter
                    }}
                    className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSendMessage} // Надсилаємо повідомлення при кліку
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    <PaperAirplaneIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}