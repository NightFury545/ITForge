import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
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
        title: 'Developers',
        href: '/developers',
    },
];

export default function DevelopersPage() {
    const { props } = usePage() as { props: { users: { data: User[] } } };
    const initialDevelopers: User[] = props.users?.data || [];

    // Filter and sort states
    const [searchTerm, setSearchTerm] = useState('');
    const [skillsFilter, setSkillsFilter] = useState<string[]>([]);
    const [ratingRange, setRatingRange] = useState<[number, number]>([0, 5]);
    const [projectsRange, setProjectsRange] = useState<[number, number]>([0, 200]);
    const [sortOption, setSortOption] = useState<'rating-asc' | 'rating-desc' | 'projects-asc' | 'projects-desc' | 'name-asc' | 'name-desc'>('name-asc');
    const [showFilters, setShowFilters] = useState(false);

    // Filter developers
    const filteredDevelopers = initialDevelopers.filter(developer => {
        const matchesSearch = developer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (developer.bio && developer.bio.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesSkills = skillsFilter.length === 0 || 
                            skillsFilter.some(skill => (developer.skills || []).includes(skill));
        
        const matchesRating = (developer.average_rating || 0) >= ratingRange[0] && 
                           (developer.average_rating || 0) <= ratingRange[1];
        
        const matchesProjects = (developer.projects_count || 0) >= projectsRange[0] && 
                             (developer.projects_count || 0) <= projectsRange[1];
        
        return matchesSearch && matchesSkills && matchesRating && matchesProjects;
    });

    // Sort developers
    const sortedDevelopers = [...filteredDevelopers].sort((a, b) => {
        switch (sortOption) {
            case 'rating-asc': return (a.average_rating || 0) - (b.average_rating || 0);
            case 'rating-desc': return (b.average_rating || 0) - (a.average_rating || 0);
            case 'projects-asc': return (a.projects_count || 0) - (b.projects_count || 0);
            case 'projects-desc': return (b.projects_count || 0) - (a.projects_count || 0);
            case 'name-asc': return a.name.localeCompare(b.name);
            case 'name-desc': return b.name.localeCompare(a.name);
            default: return 0;
        }
    });

    const resetFilters = () => {
        setRatingRange([0, 5]);
        setProjectsRange([0, 200]);
        setSkillsFilter([]);
        setSearchTerm('');
    };

    // Get all unique skills for filtering
    const allSkills = Array.from(
        new Set(initialDevelopers.flatMap(dev => dev.skills || []))
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Developers" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
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

                {/* Filters panel */}
                {showFilters && (
                    <div className="flex flex-col gap-4 rounded-lg border p-4 dark:border-gray-700">
                        <div className="flex flex-wrap items-center gap-4">
                            {/* Search */}
                            <div className="flex-1 min-w-[200px]">
                                <Input
                                    type="text"
                                    placeholder="Пошук розробників..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Skills */}
                            <div className="flex-1 min-w-[200px]">
                                <Label>Навички</Label>
                                <MultiSelect
                                    options={allSkills}
                                    selected={skillsFilter}
                                    onChange={setSkillsFilter}
                                />
                            </div>

                            {/* Rating */}
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

                            {/* Projects count */}
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

                            {/* Sorting */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="flex items-center gap-2">
                                        <ArrowUpDown className="h-4 w-4" />
                                        <span>
                                            {sortOption === 'name-asc' && 'За ім\'ям (А-Я)'}
                                            {sortOption === 'name-desc' && 'За ім\'ям (Я-А)'}
                                            {sortOption === 'rating-asc' && 'За рейтингом (↑)'}
                                            {sortOption === 'rating-desc' && 'За рейтингом (↓)'}
                                            {sortOption === 'projects-asc' && 'За проектами (↑)'}
                                            {sortOption === 'projects-desc' && 'За проектами (↓)'}
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => setSortOption('name-asc')}>
                                        За ім'ям (А-Я)
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortOption('name-desc')}>
                                        За ім'ям (Я-А)
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortOption('rating-asc')}>
                                        За рейтингом (↑)
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortOption('rating-desc')}>
                                        За рейтингом (↓)
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortOption('projects-asc')}>
                                        За проектами (↑)
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortOption('projects-desc')}>
                                        За проектами (↓)
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
                        </div>
                    </div>
                )}

                {/* Developers list */}
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    {sortedDevelopers.length > 0 ? (
                        sortedDevelopers.map((developer) => (
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