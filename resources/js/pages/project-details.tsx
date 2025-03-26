import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Проєкти',
        href: '/projects',
    }
];

export default function ProjectDetails() {
    const [showBidForm, setShowBidForm] = useState(false);
    const [bidAmount, setBidAmount] = useState('');
    const [bidComment, setBidComment] = useState('');
    const [bids, setBids] = useState([
        { id: 1, bidder: 'Іван Петров', amount: '12 000 ₴', time: '2 години тому', comment: 'Готовий розпочати роботу негайно' },
        { id: 2, bidder: 'Марія Сидорова', amount: '15 000 ₴', time: '5 годин тому', comment: 'Досвід роботи з європейськими клієнтами' },
    ]);

    const handleCreateBid = () => {
        if (bidAmount.trim()) {
            const newBid = {
                id: bids.length + 1,
                bidder: 'Ви',
                amount: `${bidAmount} ₴`,
                time: 'щойно',
                comment: bidComment
            };
            setBids([newBid, ...bids]);
            setBidAmount('');
            setBidComment('');
            setShowBidForm(false);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Деталі проєкту" />
            <div className="bg-gray-50 p-8 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                <div className="mx-auto max-w-6xl">
                    {/* Заголовок проєкту */}
                    <h1 className="mb-6 text-3xl font-bold dark:text-white">UX/UI дизайн. Редизайн діючого українського сайту та адаптація для європейського ринку.</h1>
                    
                    {/* Категорія */}
                    <div className="mb-8">
                        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            Дизайн інтерфейсів (UI/UX)
                        </span>
                    </div>

                    {/* Таблиця етапів */}
                    <div className="mb-8 overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
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
                    <div className="mb-8 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                        <h2 className="mb-4 text-xl font-semibold dark:text-white">Опис проєкту</h2>
                        <p className="mb-4 dark:text-gray-300">
                            Шукаємо дизайнера для редизайну сайту (e-commerce). Основна мета - адаптувати український сайт під європейського користувача, підвищити конверсію шляхом більш ефективного візуального представлення інформації.
                        </p>
                        <h3 className="mb-2 font-medium dark:text-white">Що потрібно зробити:</h3>
                        <ul className="mb-4 list-disc pl-6 dark:text-gray-300">
                            <li>Оновити сайт, адаптувавши під вимоги європейського користувача та зробити його більш привабливим та інформативним.</li>
                            <li>Розробити карусель банерів, що передають ключові цінності.</li>
                            <li>Додати варіант відображення відгуків на сайт</li>
                        </ul>
                        <p className="dark:text-gray-300">
                            Чекаємо на відгуки від дизайнерів із досвідом у UX/UI та розумінням того, як дизайн впливає на конверсію.
                        </p>
                    </div>

                    {/* Інформація про замовника */}
                    <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-semibold dark:text-white">Замовник</h3>
                            <p className="mb-2 dark:text-gray-300">Вадим Печенюк</p>
                            <p className="text-gray-600 dark:text-gray-400">Вінниця 6</p>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-semibold dark:text-white">Проєкт опублікований</h3>
                            <p className="mb-2 dark:text-gray-300">2 години 46 хвилин тому</p>
                            <p className="mb-2 dark:text-gray-300">1 день 21 година</p>
                            <p className="text-gray-600 dark:text-gray-400">116 переглядів</p>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-semibold dark:text-white">До закриття</h3>
                            <p className="text-gray-600 dark:text-gray-400">13 днів 21 година</p>
                        </div>
                    </div>

                    {/* Мітки */}
                    <div className="mb-8 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                        <h3 className="mb-4 text-lg font-semibold dark:text-white">Мітки</h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-300">редизайн</span>
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-300">e-commerce</span>
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-300">візуалізація</span>
                        </div>
                    </div>

                    {/* Секція ставок */}
                    <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                        <h2 className="mb-6 text-xl font-semibold dark:text-white">Ставки</h2>
                        
                        {!showBidForm ? (
                            <button
                                onClick={() => setShowBidForm(true)}
                                className="mb-6 flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                            >
                                <PlusIcon className="h-5 w-5" />
                                Додати ставку
                            </button>
                        ) : (
                            <div className="mb-6 rounded-lg bg-gray-100 p-4 dark:bg-gray-700">
                                <h3 className="mb-3 text-lg font-medium dark:text-white">Ваша ставка</h3>
                                <div className="mb-3">
                                    <label className="mb-1 block text-sm font-medium dark:text-gray-300">Сума (₴)</label>
                                    <input
                                        type="number"
                                        value={bidAmount}
                                        onChange={(e) => setBidAmount(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                        placeholder="Введіть суму"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1 block text-sm font-medium dark:text-gray-300">Коментар (необов'язково)</label>
                                    <textarea
                                        value={bidComment}
                                        onChange={(e) => setBidComment(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                        rows={3}
                                        placeholder="Додайте коментар до вашої ставки"
                                    ></textarea>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => setShowBidForm(false)}
                                        className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600"
                                    >
                                        Скасувати
                                    </button>
                                    <button
                                        onClick={handleCreateBid}
                                        className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                                    >
                                        Підтвердити ставку
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            {bids.map((bid) => (
                                <div key={bid.id} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarFallback>{bid.bidder[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className="font-medium dark:text-white">{bid.bidder}</h4>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{bid.time}</p>
                                            </div>
                                        </div>
                                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{bid.amount}</span>
                                    </div>
                                    {bid.comment && (
                                        <div className="mt-2 rounded bg-gray-100 p-2 text-sm dark:bg-gray-700 dark:text-gray-300">
                                            {bid.comment}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}