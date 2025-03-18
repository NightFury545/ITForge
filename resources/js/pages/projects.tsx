import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ProjectCard } from '@/components/project-card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react'; // Додаємо usePage для отримання даних користувача
import { Filter } from 'lucide-react'; // Іконка фільтра
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu'; // Компоненти для випадаючого меню

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects',
        href: '/projects',
    },
];

interface Project {
    id: number;
    title: string;
    description: string;
    author: {
        name: string;
        avatar: string;
        bio: string;
    };
    price: number;
    createdAt: string; // Додаємо поле для дати створення
}

export default function Projects() {
    const { auth } = usePage<SharedData>().props; // Отримуємо дані авторизованого користувача
    const [projects, setProjects] = useState<Project[]>([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [filter, setFilter] = useState<'price-asc' | 'price-desc' | 'date-asc' | 'date-desc'>('date-desc');

    // Завантаження проєктів з localStorage при першому рендері
    useEffect(() => {
        const savedProjects = localStorage.getItem('projects');
        if (savedProjects) {
            setProjects(JSON.parse(savedProjects));
        }
    }, []);

    // Збереження проєктів у localStorage при їх зміні
    useEffect(() => {
        localStorage.setItem('projects', JSON.stringify(projects));
    }, [projects]);

    const handleCreateProject = () => {
        const newProject = {
            id: projects.length + 1,
            title,
            description,
            author: {
                name: auth.user?.name || 'Гість', // Використовуємо ім'я авторизованого користувача
                avatar: auth.user?.avatar || 'https://via.placeholder.com/150', // Використовуємо аватарку користувача
                bio: auth.user?.bio || 'Професійний розробник з 5-річним досвідом.', // Використовуємо біо користувача
            },
            price,
            createdAt: new Date().toISOString(), // Додаємо поточну дату
        };
        setProjects([...projects, newProject]);
        setTitle('');
        setDescription('');
        setPrice(0);
        setShowCreateForm(false);
    };

    // Функція для фільтрації та сортування проєктів
    const getFilteredProjects = () => {
        return [...projects].sort((a, b) => {
            if (filter === 'price-asc') return a.price - b.price;
            if (filter === 'price-desc') return b.price - a.price;
            if (filter === 'date-asc') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            if (filter === 'date-desc') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            return 0;
        });
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
                                    <Filter className="h-4 w-4" /> {/* Іконка фільтра */}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onSelect={() => setFilter('date-desc')}>
                                    Новіші
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setFilter('date-asc')}>
                                    Старіші
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setFilter('price-asc')}>
                                    Від дешевих до дорогих
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setFilter('price-desc')}>
                                    Від дорогих до дешевих
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Кнопка створення нового проєкту */}
                        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
                            {showCreateForm ? 'Скасувати' : 'Створити новий проєкт'}
                        </Button>
                    </div>
                </div>

                {/* Форма для створення нового проєкту */}
                {showCreateForm && (
                    <div className="flex flex-col gap-4 p-4 border rounded-lg">
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
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                            />
                        </div>
                        <Button onClick={handleCreateProject}>Створити</Button>
                    </div>
                )}

                {/* Сітка карток */}
                <div className="grid auto-rows-min gap-6 md:grid-cols-3">
                    {getFilteredProjects().map(project => (
                        <ProjectCard
                            key={project.id}
                            title={project.title}
                            description={project.description}
                            author={project.author}
                            price={project.price}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}