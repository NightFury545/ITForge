import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import UserCard from '@/components/user-card'; // Імпорт компонента UserCard

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User',
        href: '/user',
    },
];

export default function User() {
    const user = {
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        avatarUrl: 'https://github.com/shadcn.png',
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User" />
            <div className="flex h-full flex-col gap-8 p-8 bg-gray-50 text-gray-800">
                <h1 className="text-3xl font-bold text-gray-900">Профіль користувача</h1>
                <UserCard user={user} /> {/* Використання компонента UserCard */}
            </div>
        </AppLayout>
    );
}