import { cn } from '@/lib/utils';
import { autoUpdate, flip, offset, shift, size, useFloating } from '@floating-ui/react';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { BellIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { ContractList } from './contract-notifications-list';
import { SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';

interface NotificationContract {
    id: string;
    message: string;
    project: {
        title: string;
        project_deadline: string;
    };
    amount: number;
    created_at: string;
    is_read: boolean;
}

export function NotificationsBell() {
    const { auth } = usePage().props;
    const [contracts, setContracts] = useState<NotificationContract[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const { refs, floatingStyles } = useFloating({
        placement: 'bottom-end',
        middleware: [
            offset(10),
            flip({ padding: 10 }),
            shift({ padding: 5 }),
            size({
                apply({ availableWidth, availableHeight, elements }) {
                    Object.assign(elements.floating.style, {
                        maxWidth: `${Math.min(availableWidth - 20, 384)}px`,
                        maxHeight: `${Math.min(availableHeight - 20, 500)}px`,
                        width: 'auto',
                        minWidth: '280px'
                    });
                },
                padding: 10
            })
        ],
        whileElementsMounted: autoUpdate,
    });

    useEffect(() => {
        if (!auth.user) return;

        const fetchNotifications = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('/notifications', { withCredentials: true });
                setContracts(response.data.contracts);
                setUnreadCount(response.data.unread_count);
            } catch (error) {
                console.error('Помилка завантаження сповіщень:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotifications();
    }, [auth.user]);

    const handleBellClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const willShow = !showNotifications;
        setShowNotifications(willShow);

        if (willShow && unreadCount > 0) {
            try {
                await axios.post('/notifications/mark-as-read', {}, { withCredentials: true });
                setUnreadCount(0);
                setContracts(prev => prev.map(c => ({ ...c, is_read: true })));
            } catch (error) {
                console.error('Помилка оновлення статусу:', error);
            }
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (refs.floating.current && !refs.floating.current.contains(event.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [refs.floating]);

    return (
        <SidebarMenuItem>
            <div className="relative">
                <SidebarMenuButton
                    ref={(node) => {
                        buttonRef.current = node;
                        refs.setReference(node);
                    }}
                    onClick={handleBellClick}
                    className="relative hover:bg-primary/10 transition-colors group"
                    aria-label="Сповіщення"
                >
                    <div className="relative">
                        <BellIcon className="h-5 w-5 group-hover:text-primary" />
                        {unreadCount > 0 && (
                            <span className={cn(
                                "absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground",
                                "flex items-center justify-center text-xs font-medium",
                                "animate-ping-once"
                            )}>
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </span>
                        )}
                    </div>
                    <span className="group-data-[collapsible=icon]:hidden ml-2 group-hover:text-primary">
                        Сповіщення
                    </span>
                </SidebarMenuButton>

                {showNotifications && (
                    <div
                        ref={refs.setFloating}
                        style={floatingStyles}
                        className={cn(
                            "z-50 rounded-xl border bg-popover text-popover-foreground shadow-xl",
                            "transform transition-all duration-200 ease-out",
                            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
                            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                            "md:w-96 w-[90vw] max-w-[calc(100vw-40px)]"
                        )}
                    >
                        <div className="sticky top-0 border-b bg-popover/95 backdrop-blur-sm p-3 sm:p-4 font-medium flex justify-between items-center">
                            <span className="text-base sm:text-lg font-semibold">Сповіщення</span>
                            {unreadCount > 0 && (
                                <span className="bg-primary text-primary-foreground text-xs sm:text-sm px-2 sm:px-2.5 py-1 rounded-full">
                                    {unreadCount} нових
                                </span>
                            )}
                        </div>

                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center p-6 sm:p-8 gap-2">
                                <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-t-2 border-b-2 border-primary"></div>
                                <span className="text-sm sm:text-base text-muted-foreground">Завантаження...</span>
                            </div>
                        ) : (
                            <ContractList contracts={contracts} />
                        )}
                    </div>
                )}
            </div>
        </SidebarMenuItem>
    );
}
