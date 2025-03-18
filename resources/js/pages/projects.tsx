import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ProjectCard } from '@/components/project-card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Filter } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

// Додані дані для проектів, для прикладу
const projects = [
    {
        title: 'Проєкт 1',
        description: 'Опис проєкту 1  афаца фца фцафцафца ф афццццццццццццццццц аааааааааааааааа фввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввв',
        budget: 500,
        tech_stack: ['React', 'Node.js', 'Vue.js', 'PHP', 'MySQL', 'Laravel'],
        status: 'В процесі',
        user: { name: 'Іван', avatar: '/avatars/ivan.png' },
    },
    {
        title: 'Проєкт 2',
        description: 'Опис проєкту 2',
        budget: 1000,
        tech_stack: ['Vue.js', 'PHP'],
        status: 'Завершений',
        user: { name: 'Марія', avatar: '/avatars/maria.png' },
    },
];

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects',
        href: '/projects',
    },
];

export default function Projects() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);

    // Обробник для створення нового проекту
    const handleCreateProject = () => {
        console.log('Створено новий проєкт:', { title, description, budget });
        // Тут можна додати логіку для створення проекту на сервері
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Заголовок сторінки та кнопка створення */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Проєкти</h1>
                    <div className="flex items-center gap-4">
                        {/* Випадаюче меню для фільтрів */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Filter className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Від дешевих до дорогих</DropdownMenuItem>
                                <DropdownMenuItem>Від дорогих до дешевих</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Кнопка для відкриття/закриття форми */}
                        <Button onClick={() => setIsFormVisible(!isFormVisible)}>
                            {isFormVisible ? 'Сховати форму' : 'Створити новий проєкт'}
                        </Button>
                    </div>
                </div>

                {/* Форма для створення нового проєкту */}
                <div
                    className={`flex flex-col gap-4 p-4 border rounded-lg transition-all duration-500 ${
                        isFormVisible
                            ? 'opacity-100 transform translate-y-0 block'
                            : 'opacity-0 transform translate-y-4 hidden'
                    }`}
                >
                    <h2 className="text-xl font-bold">Створити новий проєкт</h2>
                    <div className="space-y-2">
                        <Label>Назва проєкту</Label>
                        <Input
                            type="text"
                            placeholder="Назва"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Опис проєкту</Label>
                        <Input
                            type="text"
                            placeholder="Опис"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Ціна проєкту ($)</Label>
                        <Input
                            type="number"
                            placeholder="Ціна"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                        />
                    </div>
                    <Button onClick={handleCreateProject}>Створити</Button>
                </div>

                {/* Сітка карток */}
                <div className="grid auto-rows-min gap-6 md:grid-cols-3">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
