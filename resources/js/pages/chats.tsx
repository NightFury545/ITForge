import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { type Chat, type BreadcrumbItem } from '@/types';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ChatsPageProps {
    chats: Chat[];
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Чати', href: '/chats' }];

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

function formatDate(dateString: string): string {
    if (!dateString) return '—';
    const utcDate = parseISO(dateString);
    const localDate = toZonedTime(utcDate, userTimeZone);
    return format(localDate, 'dd.MM.yyyy HH:mm');
}

export default function ChatsPage({ chats }: ChatsPageProps) {
    console.log(chats);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Chats" />
            <div className="rounded-xl p-4">
                <h1 className="text-2xl font-bold mb-6">Мої чати</h1>

                <div className="space-y-3">
                    {chats.map((chat) => (
                        <Link
                            key={chat.id}
                            href={`/chats/${chat.id}`}
                            className="flex items-center gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <Tooltip>
                                <TooltipTrigger>
                                    <Avatar className="h-10.5 w-10.5">
                                        {chat.avatar ? (
                                            <AvatarImage src={chat.avatar} alt={chat.name} />
                                        ) : (
                                            <AvatarFallback className="text-lg">
                                                {chat.name ? chat.name[0].toUpperCase() : 'U'}
                                            </AvatarFallback>
                                        )}
                                    </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{chat.name}</p>
                                </TooltipContent>
                            </Tooltip>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium truncate">{chat.name}</h3>
                                <p className="text-sm text-gray-500 truncate">{chat.last_message}</p>
                            </div>
                            <span className="text-xs text-gray-500">
                                {chat.last_message_at ? formatDate(chat.last_message_at) : '—'}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
