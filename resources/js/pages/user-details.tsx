import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, User } from '@/types';
import { Head } from '@inertiajs/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User',
        href: '/user',
    },
];

export default function UserInfo({ user }: { user: User }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Info" />
            <div className="flex h-full flex-col gap-8  p-8 text-gray-100">
                <h1 className="text-3xl font-bold text-gray-100">Профіль користувача</h1>

                {/* Відображення інформації про користувача */}
                <div className="mx-auto w-full max-w-6xl">
                    <div className="mb-8 text-center">
                        <Avatar className="mx-auto mb-4 h-24 w-24">
                            <AvatarImage src={user.avatar || 'https://github.com/shadcn.png'} alt="User Avatar" />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h2 className="text-2xl font-bold text-gray-100">{user.name}</h2>
                        <p className="text-lg text-gray-300">{user.email}</p>
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
                                        <p className="text-gray-100">{user.name}</p>
                                    </div>
                                    <div>
                                        <Label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                                            Електронна пошта
                                        </Label>
                                        <p className="text-gray-100">{user.email}</p>
                                    </div>
                                    <div>
                                        <Label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-300">
                                            Телефон
                                        </Label>
                                        <p className="text-gray-100">{user.phone || 'Не вказано'}</p>
                                    </div>
                                    <div>
                                        <Label htmlFor="location" className="mb-2 block text-sm font-medium text-gray-300">
                                            Місцезнаходження
                                        </Label>
                                        <p className="text-gray-100">{user.location || 'Не вказано'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Рейтинг */}
                            <div className="rounded-lg bg-gray-800 p-6 shadow-sm">
                                <h3 className="mb-6 text-xl font-semibold text-gray-100">Рейтинг</h3>
                                <div className="flex items-center">
                                    <span className="text-2xl font-bold text-gray-100">4.7</span>
                                    <span className="ml-2 text-gray-300">/ 5.0</span>
                                </div>
                            </div>

                            {/* Кількість виконаних проєктів */}
                            <div className="rounded-lg bg-gray-800 p-6 shadow-sm">
                                <h3 className="mb-6 text-xl font-semibold text-gray-100">Виконані проєкти</h3>
                                <div className="text-2xl font-bold text-gray-100">42</div>
                            </div>

                            {/* Навички (мови) */}
                            <div className="rounded-lg bg-gray-800 p-6 shadow-sm">
                                <h3 className="mb-6 text-xl font-semibold text-gray-100">Навички</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="rounded-full bg-blue-900 px-4 py-1 text-sm text-blue-300">JavaScript</span>
                                    <span className="rounded-full bg-green-900 px-4 py-1 text-sm text-green-300">Python</span>
                                    <span className="rounded-full bg-purple-900 px-4 py-1 text-sm text-purple-300">React</span>
                                    <span className="rounded-full bg-yellow-900 px-4 py-1 text-sm text-yellow-300">Node.js</span>
                                </div>
                            </div>
                        </div>

                        {/* Правий стовпчик */}
                        <div className="space-y-8">
                            {/* Біографія */}
                            <div className="rounded-lg bg-gray-800 p-6 shadow-sm">
                                <h3 className="mb-6 text-xl font-semibold text-gray-100">Біографія</h3>
                                <div className="space-y-4">
                                    <p className="text-gray-100">
                                        {user.bio || 'Користувач ще не додав біографію.'}
                                    </p>
                                </div>
                            </div>

                            {/* Портфоліо */}
                            <div className="rounded-lg bg-gray-800 p-6 shadow-sm">
                                <h3 className="mb-6 text-xl font-semibold text-gray-100">Портфоліо</h3>
                                <div className="space-y-4">
                                    <div className="text-gray-100">
                                        <a href="https://example.com/portfolio" className="text-blue-400 hover:underline">
                                            Посилання на портфоліо
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Соціальні мережі */}
                            <div className="rounded-lg bg-gray-800 p-6 shadow-sm">
                                <h3 className="mb-6 text-xl font-semibold text-gray-100">Соціальні мережі</h3>
                                <div className="space-y-4">
                                    <div className="text-gray-100">
                                        <a href="https://linkedin.com/in/example" className="text-blue-400 hover:underline">
                                            LinkedIn
                                        </a>
                                    </div>
                                    <div className="text-gray-100">
                                        <a href="https://github.com/example" className="text-blue-400 hover:underline">
                                            GitHub
                                        </a>
                                    </div>
                                    <div className="text-gray-100">
                                        <a href="https://twitter.com/example" className="text-blue-400 hover:underline">
                                            Twitter
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Досвід роботи */}
                            <div className="rounded-lg bg-gray-800 p-6 shadow-sm">
                                <h3 className="mb-6 text-xl font-semibold text-gray-100">Досвід роботи</h3>
                                <div className="space-y-4">
                                    <div className="text-gray-100">
                                        <p className="font-semibold">Frontend Developer</p>
                                        <p className="text-sm text-gray-300">SoftServe (2022-теперішній час)</p>
                                        <p className="text-sm text-gray-300">Розробка веб-додатків на React та Node.js.</p>
                                    </div>
                                    <div className="text-gray-100">
                                        <p className="font-semibold">Стажер</p>
                                        <p className="text-sm text-gray-300">EPAM (2021-2022)</p>
                                        <p className="text-sm text-gray-300">Вивчення основ веб-розробки та робота над невеликими проектами.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Сертифікати */}
                            <div className="rounded-lg bg-gray-800 p-6 shadow-sm">
                                <h3 className="mb-6 text-xl font-semibold text-gray-100">Сертифікати</h3>
                                <div className="space-y-4">
                                    <div className="text-gray-100">
                                        <p className="font-semibold">React Advanced</p>
                                        <p className="text-sm text-gray-300">Coursera (2023)</p>
                                    </div>
                                    <div className="text-gray-100">
                                        <p className="font-semibold">JavaScript Fundamentals</p>
                                        <p className="text-sm text-gray-300">Udemy (2022)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Відгуки */}
                    <div className="mt-8">
                        <div className="rounded-lg bg-gray-800 p-6 shadow-sm">
                            <h3 className="mb-6 text-xl font-semibold text-gray-100">Відгуки</h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="rounded-lg border border-gray-700 bg-gray-700 p-4">
                                    <p className="text-gray-100">"Дуже якісна робота, рекомендую!"</p>
                                    <p className="text-sm text-gray-300">- Іван Петренко</p>
                                </div>
                                <div className="rounded-lg border border-gray-700 bg-gray-700 p-4">
                                    <p className="text-gray-100">"Професіонал своєї справи, все зроблено вчасно."</p>
                                    <p className="text-sm text-gray-300">- Олена Коваленко</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}