import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button'; // Додано для кнопки
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, User } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Користувач',
        href: '/user',
    },
];

export default function UserInfo({ user }: { user: User }) {
    const createChat = () => {
        router.post(
            route('chats.store'),
            { developer_id: user.id },
            {
                onSuccess: (page) => {
                    if (page.props.flash?.success) {
                        toast.success(page.props.flash?.success);
                    }
                },
                onError: (errors) => {
                    toast.error(errors.error || 'Не вдалося створити чат.');
                },
            },
        );
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Не вказано';
        return format(new Date(dateString), 'dd.MM.yyyy');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Info" />
            <div className="flex h-full flex-col gap-8 p-8 text-gray-100">
                <h1 className="text-3xl font-bold text-gray-100">Профіль користувача</h1>

                {/* Відображення інформації про користувача */}
                <div className="mx-auto w-full max-w-6xl">
                    <div className="mb-8 text-center">
                        <Avatar className="mx-auto mb-4 h-24 w-24">
                            <AvatarImage src={user.avatar || 'https://github.com/shadcn.png'} alt="User Avatar" />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h2 className="text-2xl font-bold text-gray-100">{user.name}</h2>

                        {/* Заміна електронної пошти на красиву кнопку для створення чату */}
                        <Button
                            onClick={createChat}
                            className="mt-4 cursor-pointer rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white shadow-md hover:bg-blue-700"
                        >
                            Написати
                        </Button>
                    </div>

                    {/* Основна інформація у двох стовпчиках */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {/* Лівий стовпчик */}
                        <div className="space-y-8">
                            {/* Особиста інформація */}
                            <div className="rounded-lg bg-gray-800 p-6 shadow-sm">
                                <h3 className="mb-6 text-xl font-semibold text-gray-100">Особиста інформація</h3>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300">
                                            Ім'я
                                        </Label>
                                        <p className="text-gray-100">{user.name || 'Не вказано'}</p>
                                    </div>
                                    <div>
                                        <Label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                                            Електронна пошта
                                        </Label>
                                        <p className="text-gray-100">{user.email || 'Не вказано'}</p>
                                    </div>
                                    <div>
                                        <Label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-300">
                                            Телефон
                                        </Label>
                                        <p className="text-gray-100">{user.phone || 'Не вказано'}</p>
                                    </div>
                                    <div>
                                        <Label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300">
                                            Дата народження
                                        </Label>
                                        <p className="text-gray-100">{formatDate(user.birthday) || 'Не вказано'}</p>
                                    </div>
                                    <div>
                                        <Label htmlFor="location" className="mb-2 block text-sm font-medium text-gray-300">
                                            Місцезнаходження
                                        </Label>
                                        <p className="text-gray-100">{user.country || 'Не вказано'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Рейтинг */}
                            <div className="rounded-lg bg-gray-800 p-6 shadow-sm">
                                <h3 className="mb-6 text-xl font-semibold text-gray-100">Рейтинг</h3>
                                <div className="flex items-center">
                                    <span className="text-2xl font-medium text-gray-300">{(+user.average_rating)?.toFixed(1) || '0'}</span>
                                    <span className="ml-1 text-sm text-gray-400">/ 5.0</span>
                                </div>
                            </div>

                            {/* Кількість виконаних проєктів */}
                            <div className="rounded-lg bg-gray-800 p-6 shadow-sm">
                                <h3 className="mb-6 text-xl font-semibold text-gray-100">Виконані проєкти</h3>
                                <div className="text-2xl font-bold text-gray-300">{user.projects_count || '0'}</div>
                            </div>

                            {/* Навички (мови) */}
                            <div className="rounded-lg bg-gray-800 p-6 shadow-sm">
                                <h3 className="mb-6 text-xl font-semibold text-gray-100">Навички</h3>
                                <div className="flex flex-wrap gap-2">
                                    {user.skills?.length > 0 ? (
                                        user.skills.map((skill, index) => (
                                            <span key={index} className="rounded-full bg-blue-900 px-4 py-1 text-sm text-blue-300">
                                                {skill}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-gray-100">Не вказано</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Правий стовпчик */}
                        <div className="space-y-8">
                            {/* Біографія */}
                            <div className="rounded-lg bg-gray-800 p-6 shadow-sm">
                                <h3 className="mb-6 text-xl font-semibold text-gray-100">Біографія</h3>
                                <div className="space-y-4">
                                    <p className="text-gray-100">{user.bio || 'Не вказано'}</p>
                                </div>
                            </div>

                            {/* Портфоліо */}
                            <div className="rounded-lg bg-gray-800 p-6 shadow-sm">
                                <h3 className="mb-6 text-xl font-semibold text-gray-100">Портфоліо</h3>
                                <div className="space-y-4">
                                    {user.portfolio_urls?.length > 0 ? (
                                        user.portfolio_urls.map((url, index) => (
                                            <div key={index} className="text-gray-100">
                                                <a href={url} className="text-blue-400 hover:underline">
                                                    {url}
                                                </a>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-100">Посилання не вказано</p>
                                    )}
                                </div>
                            </div>

                            {/* Соціальні мережі */}
                            <div className="rounded-lg bg-gray-800 p-6 shadow-sm">
                                <h3 className="mb-6 text-xl font-semibold text-gray-100">Соціальні мережі</h3>
                                <div className="space-y-4">
                                    {user.social_links?.length > 0 ? (
                                        user.social_links.map((link, index) => (
                                            <div key={index} className="text-gray-100">
                                                <a href={link} className="text-blue-400 hover:underline">
                                                    {link}
                                                </a>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-100">Посилання не вказано</p>
                                    )}
                                </div>
                            </div>

                            {/* Досвід роботи */}
                            <div className="rounded-lg bg-gray-800 p-6 shadow-sm">
                                <h3 className="mb-6 text-xl font-semibold text-gray-100">Досвід роботи</h3>
                                <div className="space-y-4">
                                    <p className="text-gray-100">{user.work_experience || 'Не вказано'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Відгуки */}
                    <div className="mt-8">
                        <div className="rounded-lg bg-gray-800 p-6 shadow-sm">
                            <h3 className="mb-6 text-xl font-semibold text-gray-100">Відгуки</h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {user?.reviews?.length > 0 ? (
                                    user.reviews.map((review) => (
                                        <div key={review.id} className="rounded-lg border border-gray-700 bg-gray-700 p-4">
                                            <div className="mb-2 flex items-center justify-between">
                                                <p className="text-gray-100">"{review.comment}"</p>
                                                <span className="ml-2 text-sm text-yellow-400">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                                                    ))}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-300">
                                                <Link href={`/users/${review.client?.name}`}>
                                                    - {review.client?.name}
                                                </Link>
                                            </p>
                                            {review?.contract?.project && (
                                                <a
                                                    href={`/projects/${review?.contract?.project.id}`}
                                                    className="mt-1 inline-block text-sm text-blue-400 hover:underline"
                                                >
                                                    Переглянути проєкт: {review?.contract?.project?.title}
                                                </a>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-400">Ще немає відгуків.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
