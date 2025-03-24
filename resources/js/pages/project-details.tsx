import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Проєкти',
        href: '/projects',
    }
];

export default function ProjectDetails() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Деталі проєкту" />
            <div className="bg-gray-50 p-8 text-gray-800">
                <div className="mx-auto max-w-6xl">
                    {/* Заголовок проєкту */}
                    <h1 className="mb-6 text-3xl font-bold">UX/UI дизайн. Редизайн діючого українського сайту та адаптація для європейського ринку.</h1>
                    
                    {/* Категорія */}
                    <div className="mb-8">
                        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-800">
                            Дизайн інтерфейсів (UI/UX)
                        </span>
                    </div>

                    {/* Таблиця етапів */}
                    <div className="mb-8 overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="px-4 py-3 text-left">публікація</th>
                                    <th className="px-4 py-3 text-left">приймання ставок</th>
                                    <th className="px-4 py-3 text-left">погодження умов</th>
                                    <th className="px-4 py-3 text-left">резервування</th>
                                    <th className="px-4 py-3 text-left">виконання проєкту</th>
                                    <th className="px-4 py-3 text-left">обмін відгуками</th>
                                </tr>
                            </thead>
                        </table>
                    </div>

                    {/* Опис проєкту */}
                    <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-xl font-semibold">Опис проєкту</h2>
                        <p className="mb-4">
                            Шукаємо дизайнера для редизайну сайту (e-commerce). Основна мета - адаптувати український сайт під європейського користувача, підвищити конверсію шляхом більш ефективного візуального представлення інформації.
                        </p>
                        <h3 className="mb-2 font-medium">Що потрібно зробити:</h3>
                        <ul className="mb-4 list-disc pl-6">
                            <li>Оновити сайт, адаптувавши під вимоги європейського користувача та зробити його більш привабливим та інформативним.</li>
                            <li>Розробити карусель банерів, що передають ключові цінності.</li>
                            <li>Додати варіант відображення відгуків на сайт</li>
                        </ul>
                        <p>
                            Чекаємо на відгуки від дизайнерів із досвідом у UX/UI та розумінням того, як дизайн впливає на конверсію.
                        </p>
                    </div>

                    {/* Інформація про замовника */}
                    <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <h3 className="mb-4 text-lg font-semibold">Замовник</h3>
                            <p className="mb-2">Вадим Печенюк</p>
                            <p className="text-gray-600">Вінниця 6</p>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <h3 className="mb-4 text-lg font-semibold">Проєкт опублікований</h3>
                            <p className="mb-2">2 години 46 хвилин тому</p>
                            <p className="mb-2">1 день 21 година</p>
                            <p className="text-gray-600">116 переглядів</p>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <h3 className="mb-4 text-lg font-semibold">До закриття</h3>
                            <p className="text-gray-600">13 днів 21 година</p>
                        </div>
                    </div>

                    {/* Мітки */}
                    <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold">Мітки</h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">редизайн</span>
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">e-commerce</span>
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">візуалізація</span>
                        </div>
                    </div>

                    {/* Форма для ставок */}
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-xl font-semibold">Зареєструватися та виконати проєкт</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="px-4 py-3 text-left">Ставки</th>
                                        <th className="px-4 py-3 text-left">Обговорення</th>
                                        <th className="px-4 py-3 text-left">типово</th>
                                        <th className="px-4 py-3 text-left">дата</th>
                                        <th className="px-4 py-3 text-left">онлайн</th>
                                        <th className="px-4 py-3 text-left">рейтинг</th>
                                        <th className="px-4 py-3 text-left">вартість</th>
                                        <th className="px-4 py-3 text-left">час виконання</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}