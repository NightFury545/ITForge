import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Trash2, Plus, X } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MultiSelect } from '@/components/ui/multi-select';
import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Налаштування профілю',
        href: '/settings/profile',
    },
];

interface ProfileForm {
    name: string;
    email: string;
    avatar: string;
    bio: string;
    birthday: string;
    portfolio_urls: string[];
    skills: string[];
    user_type: string;
}

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;
    const [newPortfolioUrl, setNewPortfolioUrl] = useState('');

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<ProfileForm>({
        name: auth.user.name,
        email: auth.user.email,
        avatar: auth.user.avatar || '',
        bio: auth.user.bio || '',
        birthday: auth.user.birthday || '',
        portfolio_urls: auth.user.portfolio_urls || [],
        skills: auth.user.skills || [],
        user_type: auth.user.user_type || 'developer',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setData('avatar', event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAvatarButtonClick = () => {
        const fileInput = document.getElementById('avatar') as HTMLInputElement;
        if (fileInput) {
            fileInput.click();
        }
    };

    const addPortfolioUrl = () => {
        if (newPortfolioUrl.trim() && !data.portfolio_urls.includes(newPortfolioUrl.trim())) {
            setData('portfolio_urls', [...data.portfolio_urls, newPortfolioUrl.trim()]);
            setNewPortfolioUrl('');
        }
    };

    const removePortfolioUrl = (url: string) => {
        setData('portfolio_urls', data.portfolio_urls.filter(u => u !== url));
    };

    const skillOptions = [
        'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular',
        'Node.js', 'Python', 'Django', 'Laravel', 'PHP',
        'Java', 'Kotlin', 'Swift', 'Go', 'Rust',
        'HTML', 'CSS', 'SASS', 'Tailwind', 'Bootstrap',
        'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL'
    ];

    const userTypes = [
        { value: 'developer', label: 'Розробник' },
        { value: 'client', label: 'Клієнт' }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Налаштування профілю" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall 
                        title="Інформація профілю" 
                        description="Оновіть інформацію вашого профілю" 
                    />

                    <form onSubmit={submit} className="space-y-6">
                        {/* Аватар */}
                        <div className="grid gap-2">
                            <Label>Фото профілю</Label>
                            <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={data.avatar} />
                                    <AvatarFallback>{auth.user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <input
                                    type="file"
                                    id="avatar"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                />
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={handleAvatarButtonClick}
                                >
                                    Змінити фото
                                </Button>
                            </div>
                            <InputError className="mt-2" message={errors.avatar} />
                        </div>

                        {/* Ім'я */}
                        <div className="grid gap-2">
                            <Label htmlFor="name">Ім'я</Label>
                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Повне ім'я"
                            />
                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        {/* Email */}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Електронна пошта</Label>
                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                placeholder="Електронна пошта"
                            />
                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        {/* Біографія */}
                        <div className="grid gap-2">
                            <Label htmlFor="bio">Біографія</Label>
                            <textarea
                                id="bio"
                                className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={data.bio}
                                onChange={(e) => setData('bio', e.target.value)}
                                placeholder="Розкажіть про себе"
                            />
                            <InputError className="mt-2" message={errors.bio} />
                        </div>

                        {/* День народження */}
                        <div className="grid gap-2">
                            <Label htmlFor="birthday">День народження</Label>
                            <Input
                                id="birthday"
                                type="date"
                                value={data.birthday}
                                onChange={(e) => setData('birthday', e.target.value)}
                                max={new Date().toISOString().split('T')[0]}
                            />
                            <InputError className="mt-2" message={errors.birthday} />
                        </div>

                        {/* Тип користувача */}
                        <div className="grid gap-2">
                            <Label>Тип користувача</Label>
                            <select
                                value={data.user_type}
                                onChange={(e) => setData('user_type', e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {userTypes.map((type) => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                            <InputError className="mt-2" message={errors.user_type} />
                        </div>

                        {/* Навички */}
                        <div className="grid gap-2">
                            <Label>Навички</Label>
                            <MultiSelect
                                options={skillOptions}
                                selected={data.skills}
                                onChange={(selected) => setData('skills', selected)}
                                placeholder="Оберіть ваші навички"
                            />
                            <InputError className="mt-2" message={errors.skills} />
                        </div>

                        {/* Портфоліо */}
                        <div className="grid gap-2">
                            <Label>Посилання на портфоліо</Label>
                            <div className="flex gap-2">
                                <Input
                                    type="url"
                                    value={newPortfolioUrl}
                                    onChange={(e) => setNewPortfolioUrl(e.target.value)}
                                    placeholder="Додати посилання на портфоліо"
                                    className="flex-1"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={addPortfolioUrl}
                                    disabled={!newPortfolioUrl.trim()}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="mt-2 space-y-2">
                                {data.portfolio_urls.map((url) => (
                                    <div key={url} className="flex items-center justify-between rounded-md bg-gray-100 px-3 py-2 dark:bg-gray-800">
                                        <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                                            {url}
                                        </a>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6"
                                            onClick={() => removePortfolioUrl(url)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <InputError className="mt-2" message={errors.portfolio_urls} />
                        </div>

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="text-muted-foreground -mt-4 text-sm">
                                    Ваша електронна пошта не підтверджена.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Натисніть тут, щоб надіслати лист для підтвердження знову.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        Нове посилання для підтвердження було надіслане на вашу електронну пошту.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Зберегти</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Збережено</p>
                            </Transition>
                        </div>
                    </form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}