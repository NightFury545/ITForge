import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import UsersTable from '@/components/user-table';
import AppLayout from '@/layouts/app-layout';
import { Bid, type BreadcrumbItem, Chat, Message, Project, User } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { JSX } from 'react';

interface Contract {
    id: string;
    project_id: string;
    client_id: string;
    developer_id: string;
    amount: number;
    status: string;
    created_at: string;
    updated_at: string;
    project?: Project;
    client?: User;
    developer?: User;
}

interface Transaction {
    id: string;
    user: User;
    contract: Contract[];
    type: string;
    amount: number;
    status: string;
    created_at: string;
    updated_at: string;
}

interface PerformanceProfileProps {
    projects: Project[];
    users: User[];
    transactions: Transaction[];
    bids: Bid[];
    chats: Chat[];
    messages: Message[];
    contracts: Contract[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Адмін панель',
        href: '/admin',
    },
];

export default function PerformanceProfile({
    projects = [],
    users = [],
    transactions = [],
    bids = [],
    chats = [],
    messages = [],
    contracts = [],
}: PerformanceProfileProps) {
    const handleDelete = (type: string, id: string) => {
        if (confirm(`Ви впевнені, що хочете видалити цей ${type}?`)) {
            router.delete(`/${type}/${id}`);
        }
    };

    const renderTable = (title: string, items: any[], columns: string[], renderRow: (item: any) => JSX.Element) => {
        return (
            <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold">{title}</h3>
                <Card>
                    <CardContent className="pt-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableHead key={column}>{column}</TableHead>
                                    ))}
                                    <TableHead className="text-right">Дії</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>{items.map((item) => renderRow(item))}</TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        );
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Панель керування', href: '/dashboard' }]}>
            <Head title="Адмін панель" />

            <div className="mt-3 mr-3 mb-3 ml-3 space-y-6">
                {/* Projects Table */}
                {renderTable('Всі проєкти', projects, ['Проєкт', 'Клієнт', 'Статус', 'Бюджет', 'Дедлайн'], (project) => (
                    <TableRow key={project.id}>
                        <TableCell className="max-w-[128px] truncate font-medium">{project.title}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                {project.user_avatar && <img src={project.user_avatar} alt={project.user_name} className="h-6 w-6 rounded-full" />}
                                <span>{project.client.name}</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge variant={project.status === 'Виконано' ? 'default' : project.status === 'В процесі' ? 'secondary' : 'outline'}>
                                {project.status.replace('_', ' ')}
                            </Badge>
                        </TableCell>
                        <TableCell>${(+project.budget).toFixed(2)}</TableCell>
                        <TableCell>{new Date(project.project_deadline).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete('projects', project.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}

                {/* Users Table */}
                <UsersTable users={users} handleDelete={handleDelete} />

                {/* Contracts Table */}
                {renderTable('Контракти', contracts, ['ID проекту', 'Клієнт', 'Розробник', 'Сума', 'Статус'], (contract) => (
                    <TableRow key={contract.id}>
                        <TableCell className="font-medium">{contract.project_id}</TableCell>
                        <TableCell>{contract.client?.name || contract.client_id}</TableCell>
                        <TableCell>{contract.developer?.name || contract.developer_id}</TableCell>
                        <TableCell>${(+contract.amount).toFixed(2)}</TableCell>
                        <TableCell>
                            <Badge variant="outline">{contract.status}</Badge>
                        </TableCell>
                    </TableRow>
                ))}

                {/* Transactions Table */}
                {renderTable('Транзакції', transactions, ['Користувач', 'Тип', 'Сума', 'Статус', 'Дата'], (transaction) => (
                    <TableRow key={transaction.id}>
                        <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                                {transaction?.user?.avatar && (
                                    <img src={transaction.user.avatar} alt={transaction.user.name} className="h-6 w-6 rounded-full" />
                                )}
                                <span>{transaction?.user?.name}</span>
                            </div>
                        </TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>${(+transaction.amount).toFixed(2)}</TableCell>
                        <TableCell>
                            <Badge variant="outline">{transaction.status}</Badge>
                        </TableCell>
                        <TableCell>{new Date(transaction.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                ))}

                {/* Bids Table */}
                {renderTable('Ставки', bids, ['Проєкт', 'Розробник', 'Сума', 'Статус', 'Дата'], (bid) => (
                    <TableRow key={bid.id}>
                        <TableCell className="font-medium">{bid.project_id}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                {bid.developer_avatar && <img src={bid.developer_avatar} alt={bid.developer_name} className="h-6 w-6 rounded-full" />}
                                <span>{bid.developer.name || bid.developer_id}</span>
                            </div>
                        </TableCell>
                        <TableCell>${(+bid.amount)?.toFixed(2)}</TableCell>
                        <TableCell>
                            <Badge variant="outline">{bid.status}</Badge>
                        </TableCell>
                        <TableCell>{bid.created_at && new Date(bid.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                ))}

                {/* Chats Table */}
                {renderTable('Чати', chats, ['ID', 'Клієнт', 'Розробник', 'Останнє повідомлення', 'Дата'], (chat) => (
                    <TableRow key={chat.id}>
                        <TableCell className="font-medium">{chat.id}</TableCell>
                        <TableCell className="font-medium">{chat.client.name}</TableCell>
                        <TableCell className="font-medium">{chat.developer.name}</TableCell>
                        <TableCell className="max-w-[64px] truncate">{chat.last_message}</TableCell>
                        <TableCell>{new Date(chat.last_message_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete('chats', chat.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}

                {/* Messages Table */}
                {renderTable('Повідомлення', messages, ['Чат', 'Відправник', 'Повідомлення', 'Дата'], (message) => (
                    <TableRow key={message.id}>
                        <TableCell className="font-medium">{message.chat_id}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                {message.avatar && <img src={message.avatar} alt={message.sender_name} className="h-6 w-6 rounded-full" />}
                                <span>{message.sender.name}</span>
                            </div>
                        </TableCell>
                        <TableCell className="max-w-[64px] truncate">{message.message}</TableCell>
                        <TableCell>{new Date(message.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete('messages', message.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </div>
        </AppLayout>
    );
}
