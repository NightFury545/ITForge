import UserCard from '@/components/user-card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, User } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User',
        href: '/user',
    },
];

export default function UserDetails({ user }: {user: User}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User" />
            <div className="flex h-full flex-col gap-8 bg-gray-50 p-8 text-gray-800">
                <h1 className="text-3xl font-bold text-gray-900">Профіль користувача</h1>
                <UserCard user={user} />
            </div>
        </AppLayout>
    );
}
