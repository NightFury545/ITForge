import React, { useEffect, useRef, useState } from 'react';
import { BellIcon } from 'lucide-react';

export function NotificationsBell() {
    const [notifications, setNotifications] = useState<string[]>([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleBellClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowNotifications(!showNotifications);
    };

    return (
        <div ref={notificationsRef} className="relative">
            <button
                onClick={handleBellClick}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 relative"
            >
                <BellIcon className="h-5 w-5" />
                {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {notifications.length}
                    </span>
                )}
            </button>

            {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-md shadow-xl z-50 border border-gray-200 dark:border-gray-700">
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700 font-medium">
                        Сповіщення
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                                <div
                                    key={index}
                                    className="p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
                                >
                                    {notification}
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-gray-500 text-sm">
                                Немає нових сповіщень
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
