// pages/DevelopersPage.tsx
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { type User } from '@/types'; // Імпортуйте інтерфейс User
import DeveloperCard from '@/components/developer-card'; // Імпортуйте компонент DeveloperCard

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Developers',
        href: '/developers',
    },
];

// Приклад даних про розробників (це може бути отримано з API)
const developers: User[] = [
    {
        id: '1',
        name: 'Денис Чорнописький',
        email: 'c.chornopyskyi.denys@student.uzhnu.edu.ua',
        avatar: 'https://via.placeholder.com/150', // Приклад URL аватарки
        bio: 'Full-stack розробник з досвідом у Laravel та React.',
        skills: ['Laravel', 'React', 'TypeScript', 'Node.js'],
        role: 'Розробник',
        email_verified_at: '2025-03-12T21:18:34.000000Z',
        created_at: '2025-03-12T21:18:34.000000Z',
        updated_at: '2025-03-12T21:18:34.000000Z',
    },
    {
        id: '2',
        name: 'Олександр Петренко',
        email: 'oleksandr.petrenko@example.com',
        avatar: 'https://via.placeholder.com/150', // Приклад URL аватарки
        bio: 'Backend розробник з досвідом у Python та Django.',
        skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
        role: 'Backend Developer',
        email_verified_at: '2025-03-12T21:18:34.000000Z',
        created_at: '2025-03-12T21:18:34.000000Z',
        updated_at: '2025-03-12T21:18:34.000000Z',
    },
    {
        id: '3',
        name: 'Марія Іваненко',
        email: 'maria.ivanenko@example.com',
        avatar: 'https://via.placeholder.com/150', // Приклад URL аватарки
        bio: 'Frontend розробник з досвідом у Vue.js та Tailwind CSS.',
        skills: ['Vue.js', 'JavaScript', 'Tailwind CSS', 'HTML/CSS'],
        role: 'Frontend Developer',
        email_verified_at: '2025-03-12T21:18:34.000000Z',
        created_at: '2025-03-12T21:18:34.000000Z',
        updated_at: '2025-03-12T21:18:34.000000Z',
    },
];

export default function DevelopersPage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Developers" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold">Розробники</h1>
                <div className="flex flex-col items-center gap-6">
                    {developers.map((developer) => {
                        // Приклад кількості зроблених проектів
                        const projectsCount = 10; // Це може бути отримано з API

                        // Приклад рейтингу
                        const averageRating = 4.5; // Це може бути отримано з API

                        return (
                            <DeveloperCard
                                key={developer.id}
                                developer={developer}
                                projectsCount={projectsCount}
                                averageRating={averageRating}
                            />
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}