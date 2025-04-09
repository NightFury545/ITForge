import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Project, type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { Filter, ArrowUpDown, ChevronDown } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { useState, useRef } from 'react';
import { MultiSelect } from '@/components/ui/multi-select';
import { ProjectCard } from '@/components/project-card';
import { Slider as MuiSlider } from '@mui/material';
import { styled } from '@mui/material/styles';
import techStack from '@/data/tech-stack.json';

const MaterialSlider = styled(MuiSlider)(({ theme }) => ({
    color: '#3a8589',
    height: 4,
    padding: '15px 0',
    '& .MuiSlider-thumb': {
        height: 20,
        width: 20,
        backgroundColor: '#fff',
        boxShadow: '0 0 2px 0px rgba(0, 0, 0, 0.1)',
        '&:focus, &:hover, &.Mui-active': {
            boxShadow: '0px 0px 3px 1px rgba(0, 0, 0, 0.1)',
        },
        '&:before': {
            boxShadow: '0px 0px 1px 0px rgba(0,0,0,0.2)',
        },
    },
    '& .MuiSlider-valueLabel': {
        fontSize: 12,
        fontWeight: 'normal',
        top: -6,
        backgroundColor: 'unset',
        color: theme.palette.text.primary,
        '&:before': {
            display: 'none',
        },
        '& *': {
            background: 'transparent',
            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
        },
    },
    '& .MuiSlider-track': {
        border: 'none',
        height: 4,
    },
    '& .MuiSlider-rail': {
        opacity: 0.5,
        backgroundColor: '#bfbfbf',
        height: 4,
    },
}));

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Проєкти',
        href: '/projects',
    },
];

export default function Projects() {
    const { props } = usePage<{
        projects: { data: Project[] },
        filters: {
            title?: string,
            tech_stack?: string[],
            budget?: { from?: number, to?: number },
            deadline?: string,
            status?: string[],
            sort?: string
        }
    }>();

    const initialProjects: Project[] = props.projects?.data || [];
    const initialFilters = props.filters || {};

    // Filter states
    const [searchTerm, setSearchTerm] = useState(initialFilters.title || '');
    const [techStackFilter, setTechStackFilter] = useState<string[]>(initialFilters.tech_stack || []);
    const [priceRange, setPriceRange] = useState<[number, number]>([
        initialFilters.budget?.from || 0,
        initialFilters.budget?.to || 10000
    ]);
    const [deadlineFilter, setDeadlineFilter] = useState(initialFilters.deadline || '');
    const [statusFilter, setStatusFilter] = useState<string[]>(initialFilters.status || []);
    const [sortOption, setSortOption] = useState<'budget' | '-budget' | '-created_at' | 'created_at'>(
        initialFilters.sort as any || '-created_at'
    );
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

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

    // Apply filters without page reload
    const applyFilters = () => {
        const params: any = {};

        if (searchTerm) params['filter[title]'] = searchTerm;
        if (techStackFilter.length > 0) params['filter[tech_stack]'] = techStackFilter.join(',');
        if (priceRange[0] > 0 || priceRange[1] < 10000) {
            params['filter[budget][from]'] = priceRange[0];
            params['filter[budget][to]'] = priceRange[1];
        }
        if (deadlineFilter) params['filter[deadline]'] = deadlineFilter;
        if (statusFilter.length > 0) params['filter[status]'] = statusFilter.join(',');
        if (sortOption) params['sort'] = sortOption;

        router.get('/projects', params, {
            preserveState: true,
            replace: true,
        });
    };

    const handleCreateProject = () => {
        post('/projects', {
            preserveScroll: true,
            onSuccess: () => {
                setIsFormVisible(false);
                setData({
                    title: '',
                    description: '',
                    budget: '',
                    requirements: '',
                    tech_stack: [],
                    bids_deadline: '',
                    project_deadline: '',
                });
                // Refresh the projects list after creation
                router.reload({ only: ['projects'] });
            },
        });
    };

    const handleDateInputClick = (ref: React.RefObject<HTMLInputElement>) => {
        if (ref.current) {
            ref.current.showPicker();
        }
    };

    const resetFilters = () => {
        setSearchTerm('');
        setTechStackFilter([]);
        setPriceRange([0, 10000]);
        setDeadlineFilter('');
        setStatusFilter([]);
        setSortOption('-created_at');
        router.get('/projects', {}, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Проєкти</h1>
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2"
                        >
                            <Filter className="h-4 w-4" />
                            <span>Фільтри</span>
                        </Button>
                        <Button onClick={() => setIsFormVisible(!isFormVisible)}>
                            {isFormVisible ? 'Сховати форму' : 'Створити проєкт'}
                        </Button>
                    </div>
                </div>

                {/* Filters panel */}
                {showFilters && (
                    <div className="flex flex-col gap-4 rounded-lg border p-4 dark:border-gray-700">
                        <div className="flex flex-wrap items-center gap-4">
                            {/* Search */}
                            <div className="flex-1 min-w-[200px]">
                                <Input
                                    type="text"
                                    placeholder="Пошук проектів..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Technologies */}
                            <div className="flex-1 min-w-[200px]">
                                <Label>Технології</Label>
                                <MultiSelect
                                    options={techStack}
                                    selected={techStackFilter}
                                    onChange={setTechStackFilter}
                                />
                            </div>

                            {/* Price */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="flex items-center gap-1">
                                        <span>Ціна: {priceRange[0]}-{priceRange[1]}$</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-64 p-4">
                                    <MaterialSlider
                                        min={0}
                                        max={10000}
                                        step={100}
                                        value={priceRange}
                                        onChange={(_, newValue) => setPriceRange(newValue as [number, number])}
                                        valueLabelDisplay="auto"
                                        valueLabelFormat={(value) => `${value}$`}
                                    />
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Deadline */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="flex items-center gap-1">
                                        <span>{deadlineFilter ? `До ${deadlineFilter}` : 'Дедлайн'}</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="p-2">
                                    <Input
                                        type="date"
                                        value={deadlineFilter}
                                        onChange={(e) => setDeadlineFilter(e.target.value)}
                                        className="w-full"
                                    />
                                    {deadlineFilter && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setDeadlineFilter('')}
                                            className="mt-2 w-full"
                                        >
                                            Очистити
                                        </Button>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Status */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="flex items-center gap-1">
                                        <span>
                                            {statusFilter.length === 0 ? 'Статус' :
                                                statusFilter.length === 1 ? (
                                                    statusFilter[0] === 'Активно' ? 'Активно' :
                                                        statusFilter[0] === 'В процесі' ? 'В процесі' : 'Завершено'
                                                ) : `${statusFilter.length} статуси`}
                                        </span>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-48">
                                    {['Активно', 'В процесі', 'Завершено'].map((status) => (
                                        <DropdownMenuCheckboxItem
                                            key={status}
                                            checked={statusFilter.includes(status)}
                                            onCheckedChange={(checked) => {
                                                setStatusFilter(prev =>
                                                    checked ? [...prev, status] : prev.filter(s => s !== status)
                                                );
                                            }}
                                        >
                                            {status === 'Активно' && 'Активно'}
                                            {status === 'В процесі' && 'В процесі'}
                                            {status === 'Завершено' && 'Завершено'}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Sorting */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="flex items-center gap-2">
                                        <ArrowUpDown className="h-4 w-4" />
                                        <span>
                                            {sortOption === 'budget' && 'Від дешевих'}
                                            {sortOption === '-budget' && 'Від дорогих'}
                                            {sortOption === '-created_at' && 'Нові'}
                                            {sortOption === 'created_at' && 'Старі'}
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => setSortOption('budget')}>
                                        Від дешевих
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortOption('-budget')}>
                                        Від дорогих
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortOption('-created_at')}>
                                        Спочатку нові
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortOption('created_at')}>
                                        Спочатку старі
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Reset filters */}
                            <Button
                                variant="ghost"
                                onClick={resetFilters}
                                className="ml-auto"
                            >
                                Скинути фільтри
                            </Button>

                            {/* Apply filters */}
                            <Button
                                variant="default"
                                onClick={applyFilters}
                            >
                                Застосувати фільтри
                            </Button>
                        </div>
                    </div>
                )}

                {/* Project creation form */}
                {isFormVisible && (
                    <div className="flex flex-col gap-4 rounded-lg border p-4 transition-all duration-500">
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
                                options={techStack}
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
                )}

                {/* Projects list */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {initialProjects.length > 0 ? (
                        initialProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                id={project.id}
                                title={project.title}
                                description={project.description}
                                budget={project.budget}
                                tech_stack={project.tech_stack}
                                status={project.status}
                                user={{
                                    name: project.client?.name || 'Невідомий',
                                    avatar: project.client?.avatar,
                                }}
                            />
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center">
                            <p className="text-gray-500 dark:text-gray-400">Проектів не знайдено</p>
                        </div>
                    )}
                </div>
            </div>

            <style>
                {`
                    .date-picker::-webkit-calendar-picker-indicator {
                        filter: invert(1);
                    }
                    .date-picker::-webkit-datetime-edit {
                        color: white;
                    }
                `}
            </style>
        </AppLayout>
    );
}
