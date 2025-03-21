import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Project, type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react'; // Додано usePage
import { Filter } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useState, useRef } from 'react';
import { MultiSelect } from '@/components/ui/multi-select';
import { ProjectCard } from '@/components/project-card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects',
        href: '/projects',
    },
];

export default function Projects() {
    const { props } = usePage() as { props: { projects: { data: Project[] } } };
    const projects: Project[] = props.projects.data || [];

    const [isFormVisible, setIsFormVisible] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        budget: '',
        requirements: '',
        tech_stack: [] as string[],
        bids_deadline: '',
        project_deadline: '',
    });

    const bidsDeadlineRef = useRef<HTMLInputElement>(null);
    const projectDeadlineRef = useRef<HTMLInputElement>(null);

    const handleCreateProject = () => {
        post('/projects', {
            preserveScroll: true,
            onSuccess: () => setIsFormVisible(false),
        });
    };

    const handleDateInputClick = (ref: React.RefObject<HTMLInputElement>) => {
        if (ref.current) {
            ref.current.showPicker();
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Проєкти</h1>
                    <div className="flex items-center gap-4">
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

                        <Button onClick={() => setIsFormVisible(!isFormVisible)}>
                            {isFormVisible ? 'Сховати форму' : 'Створити новий проєкт'}
                        </Button>
                    </div>
                </div>

                {/* Форма створення нового проєкту */}
                <div
                    className={`flex flex-col gap-4 p-4 border rounded-lg transition-all duration-500 ${isFormVisible ? 'opacity-100 transform translate-y-0 block' : 'opacity-0 transform translate-y-4 hidden'
                        }`}
                >
                    <h2 className="text-xl font-bold">Створити новий проєкт</h2>

                    <div className="space-y-2">
                        <Label>Назва проєкту</Label>
                        <Input
                            type="text"
                            placeholder="Назва"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        {errors.title && <p className="text-red-500">{errors.title}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Опис проєкту</Label>
                        <Input
                            type="text"
                            placeholder="Опис"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        {errors.description && <p className="text-red-500">{errors.description}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Ціна проєкту ($)</Label>
                        <Input
                            type="number"
                            placeholder="Ціна"
                            value={data.budget}
                            onChange={(e) => setData('budget', e.target.value)}
                        />
                        {errors.budget && <p className="text-red-500">{errors.budget}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Вимоги</Label>
                        <Input
                            type="text"
                            placeholder="Вимоги"
                            value={data.requirements}
                            onChange={(e) => setData('requirements', e.target.value)}
                        />
                        {errors.requirements && <p className="text-red-500">{errors.requirements}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Технологічний стек</Label>
                        <MultiSelect
                            options={['React', 'Vue.js', 'Node.js', 'PHP', 'Laravel', 'MySQL']}
                            selected={data.tech_stack}
                            onChange={(selected) => setData('tech_stack', selected)}
                        />
                        {errors.tech_stack && <p className="text-red-500">{errors.tech_stack}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Дедлайн прийому заявок</Label>
                        <Input
                            type="date"
                            value={data.bids_deadline}
                            onChange={(e) => setData('bids_deadline', e.target.value)}
                            ref={bidsDeadlineRef}
                            onClick={() => handleDateInputClick(bidsDeadlineRef)}
                            className="date-picker"
                        />
                        {errors.bids_deadline && <p className="text-red-500">{errors.bids_deadline}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Дедлайн проєкту</Label>
                        <Input
                            type="date"
                            value={data.project_deadline}
                            onChange={(e) => setData('project_deadline', e.target.value)}
                            ref={projectDeadlineRef}
                            onClick={() => handleDateInputClick(projectDeadlineRef)}
                            className="date-picker"
                        />
                        {errors.project_deadline && <p className="text-red-500">{errors.project_deadline}</p>}
                    </div>

                    <Button onClick={handleCreateProject} disabled={processing}>
                        {processing ? 'Збереження...' : 'Створити'}
                    </Button>
                </div>

                {/* Відображення списку проектів за допомогою ProjectCard */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            title={project.title}
                            description={project.description}
                            budget={project.budget}
                            tech_stack={project.tech_stack}
                            status={project.status}
                            user={{
                                name: project.client.name,
                                avatar: project.client.avatar
                            }}
                        />
                    ))}
                </div>
            </div>

            <style>
                {`
                    .date-picker::-webkit-calendar-picker-indicator {
                        filter: invert(1); // Робить іконку календаря білою
                    }
                    .date-picker::-webkit-datetime-edit {
                        color: white; // Робить текст білим
                    }
                `}
            </style>
        </AppLayout>
    );
}
