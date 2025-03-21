import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { type User } from '@/types';
import DeveloperCard from '@/components/developer-card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Developers',
        href: '/developers',
    },
];

export default function DevelopersPage() {
    const { props } = usePage() as { props: { users: { data: User[] } } };
    const developers: User[] = props.users?.data || [];
    console.log(developers);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Developers" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold">Розробники</h1>
                <div className="flex flex-col items-center gap-6">
                    {developers.map((developer) => {
                        return (
                            <DeveloperCard
                                key={developer.id}
                                developer={{
                                    id: developer.id,
                                    name: developer.name,
                                    email: developer.email,
                                    avatar: developer.avatar,
                                    bio: developer.bio ?? 'Опис відсутній',
                                    skills: developer.skills || [],
                                    role: developer.role,
                                    user_type: developer.user_type,
                                    email_verified_at: developer.email_verified_at,
                                    created_at: developer.created_at,
                                    updated_at: developer.updated_at,
                                }}
                                projectsCount={developer.projects_count}
                                averageRating={developer.average_rating}
                            />
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}
