import { type Chat } from '@/types';

interface ChatWindowProps {
    activeChat: Chat;
    messages: string[];
    onSendMessage: (message: string) => void;
}

export default function ChatWindow({ activeChat, messages, onSendMessage }: ChatWindowProps) {
    const [newMessage, setNewMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            onSendMessage(newMessage);
            setNewMessage('');
        }
    };

    return (
        <div className="flex flex-col flex-1">
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((msg, i) => (
                    <div key={i} className="mb-3">
                        <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-3 max-w-xs md:max-w-md">
                            {msg}
                        </div>
                    </div>
                ))}
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 border rounded-lg p-2"
                    placeholder="Написати повідомлення..."
                />
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    Надіслати
                </button>
            </form>
        </div>
    );
}