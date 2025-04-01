import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';
import { type User } from '@/types';
import DeveloperCard from '@/components/developer-card';
import { useState } from 'react';
import { Filter, ArrowUpDown, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { MultiSelect } from '@/components/ui/multi-select';
import { Slider as MuiSlider } from '@mui/material';
import { styled } from '@mui/material/styles';

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
        title: 'Розробники',
        href: '/developers',
    },
];

export default function DevelopersPage() {
    const { props } = usePage<{
        users: { data: User[] },
        filters: {
            name?: string,
            skills?: string[],
            rating?: { from?: number, to?: number },
            projects?: { from?: number, to?: number },
            sort?: string
        }
    }>();

    const initialDevelopers: User[] = props.users?.data || [];
    const initialFilters = props.filters || {};

    // Стани фільтрів
    const [searchTerm, setSearchTerm] = useState(initialFilters.name || '');
    const [skillsFilter, setSkillsFilter] = useState<string[]>(initialFilters.skills || []);
    const [ratingRange, setRatingRange] = useState<[number, number]>([
        initialFilters.rating?.from || 0,
        initialFilters.rating?.to || 5
    ]);
    const [projectsRange, setProjectsRange] = useState<[number, number]>([
        initialFilters.projects?.from || 0,
        initialFilters.projects?.to || 200
    ]);
    const [sortOption, setSortOption] = useState<'name' | '-name' | 'average_rating' | '-average_rating' | 'projects_count' | '-projects_count'>(
        initialFilters.sort as any || 'name'
    );
    const [showFilters, setShowFilters] = useState(false);

    // Отримання унікальних навичок
    const allSkills = Array.from(
        new Set(initialDevelopers.flatMap(dev => dev.skills || []))
    );

    // Застосування фільтрів
    const applyFilters = () => {
        const params: any = {};

        if (searchTerm) params['filter[name]'] = searchTerm;
        if (skillsFilter.length > 0) params['filter[skills]'] = skillsFilter.join(',');
        if (ratingRange[0] > 0 || ratingRange[1] < 5) {
            params['filter[rating][from]'] = ratingRange[0];
            params['filter[rating][to]'] = ratingRange[1];
        }
        if (projectsRange[0] > 0 || projectsRange[1] < 200) {
            params['filter[projects][from]'] = projectsRange[0];
            params['filter[projects][to]'] = projectsRange[1];
        }
        if (sortOption !== 'name') params['sort'] = sortOption;

        router.get('/developers', params, {
            preserveState: true,
            replace: true,
        });
    };

    // Скидання фільтрів
    const resetFilters = () => {
        setSearchTerm('');
        setSkillsFilter([]);
        setRatingRange([0, 5]);
        setProjectsRange([0, 200]);
        setSortOption('name');
        router.get('/developers', {}, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Developers" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Заголовок та кнопка фільтрів */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Розробники</h1>
                    <Button
                        variant="outline"
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2"
                    >
                        <Filter className="h-4 w-4" />
                        <span>Фільтри</span>
                    </Button>
                </div>

                {/* Панель фільтрів */}
                {showFilters && (
                    <div className="flex flex-col gap-4 rounded-lg border p-4 dark:border-gray-700">
                        <div className="flex flex-wrap items-center gap-4">
                            {/* Пошук */}
                            <div className="flex-1 min-w-[200px]">
                                <Input
                                    type="text"
                                    placeholder="Пошук розробників..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Навички */}
                            <div className="flex-1 min-w-[200px]">
                                <Label>Навички</Label>
                                <MultiSelect
                                    options={allSkills}
                                    selected={skillsFilter}
                                    onChange={setSkillsFilter}
                                />
                            </div>

                            {/* Рейтинг */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="flex items-center gap-1">
                                        <span>Рейтинг: {ratingRange[0]}-{ratingRange[1]}</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-64 p-4">
                                    <MaterialSlider
                                        min={0}
                                        max={5}
                                        step={0.1}
                                        value={ratingRange}
                                        onChange={(_, newValue) => setRatingRange(newValue as [number, number])}
                                        valueLabelDisplay="auto"
                                        valueLabelFormat={(value) => `${value}★`}
                                    />
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Кількість проектів */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="flex items-center gap-1">
                                        <span>Проекти: {projectsRange[0]}-{projectsRange[1]}</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-64 p-4">
                                    <MaterialSlider
                                        min={0}
                                        max={200}
                                        step={1}
                                        value={projectsRange}
                                        onChange={(_, newValue) => setProjectsRange(newValue as [number, number])}
                                        valueLabelDisplay="auto"
                                        valueLabelFormat={(value) => `${value}`}
                                    />
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Сортування */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="flex items-center gap-2">
                                        <ArrowUpDown className="h-4 w-4" />
                                        <span>
                                            {sortOption === 'name' && 'За ім\'ям (А-Я)'}
                                            {sortOption === '-name' && 'За ім\'ям (Я-А)'}
                                            {sortOption === 'average_rating' && 'За рейтингом (↑)'}
                                            {sortOption === '-average_rating' && 'За рейтингом (↓)'}
                                            {sortOption === 'projects_count' && 'За проектами (↑)'}
                                            {sortOption === '-projects_count' && 'За проектами (↓)'}
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => setSortOption('name')}>
                                        За ім'ям (А-Я)
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortOption('-name')}>
                                        За ім'ям (Я-А)
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortOption('average_rating')}>
                                        За рейтингом (↑)
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortOption('-average_rating')}>
                                        За рейтингом (↓)
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortOption('projects_count')}>
                                        За проектами (↑)
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortOption('-projects_count')}>
                                        За проектами (↓)
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Кнопки */}
                            <Button
                                variant="ghost"
                                onClick={resetFilters}
                                className="ml-auto"
                            >
                                Скинути фільтри
                            </Button>
                            <Button
                                variant="default"
                                onClick={applyFilters}
                            >
                                Застосувати фільтри
                            </Button>
                        </div>
                    </div>
                )}

                {/* Список розробників */}
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    {initialDevelopers.length > 0 ? (
                        initialDevelopers.map((developer) => (
                            <DeveloperCard
                                key={developer.id}
                                developer={developer}
                                projectsCount={developer.projects_count}
                                averageRating={developer.average_rating}
                            />
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center">
                            <p className="text-gray-500 dark:text-gray-400">Розробників не знайдено</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
