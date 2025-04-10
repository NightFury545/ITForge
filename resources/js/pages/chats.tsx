import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Chat } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

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
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Chats" />
            <div className="rounded-xl p-4">
                <h1 className="mb-6 text-2xl font-bold">Мої чати</h1>

                <div className="space-y-3">
                    {chats?.length > 0 ? (
                        chats.map((chat) => (
                            <Link
                                key={chat.id}
                                href={`/chats/${chat.id}`}
                                className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Avatar className="h-10.5 w-10.5">
                                            {chat.avatar ? (
                                                <AvatarImage src={chat.avatar} alt={chat.name} />
                                            ) : (
                                                <AvatarFallback className="text-lg">{chat.name ? chat.name[0].toUpperCase() : 'U'}</AvatarFallback>
                                            )}
                                        </Avatar>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{chat.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                                <div className="min-w-0 flex-1">
                                    <h3 className="truncate font-medium">{chat.name}</h3>
                                    <p className="truncate text-sm text-gray-500">{chat.last_message}</p>
                                </div>
                                <span className="text-xs text-gray-500">{chat.last_message_at ? formatDate(chat.last_message_at) : '—'}</span>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center">
                            <p className="text-gray-500 dark:text-gray-400">У вас ще немає чатів.</p>
                            <p className="text-gray-500 dark:text-gray-400">
                                Для того, щоб створити чат, перейдіть на профіль користувача та натисність на кнопку "Написати".
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
