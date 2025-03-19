import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    // Категорії
    const categories = [
        { id: 'programming', name: 'Програмування', image: '/images/programming.jpg' },
        { id: 'design', name: 'Дизайн та арт', image: '/images/design.jpg' },
        { id: 'services', name: 'Послуги', image: '/images/services.jpg' },
        { id: 'photo', name: 'Фото, аудіо та відео', image: '/images/photo.jpg' },
        { id: 'marketing', name: 'Просування', image: '/images/marketing.jpg' },
        { id: 'engineering', name: 'Архітектура та інжиніринг', image: '/images/engineering.jpg' },
        { id: 'mobile', name: 'Мобільні додатки', image: '/images/mobile.jpg' },
        { id: 'admin', name: 'Адміністрування', image: '/images/admin.jpg' },
    ];

    // Стан для обраної категорії
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    return (
        <>
            <Head title="ITForge">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex flex-col">
                {/* Головний блок */}
                <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 text-[#1b1b18] dark:text-[#EDEDEC]">
                    <header className="w-full max-w-6xl mx-auto flex justify-between items-center p-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">🚀 ITForge </h2>
                        <div className="space-x-4">
                            {auth.user ? (
                                <Link href={route('dashboard')} className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="px-5 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition">
                                        Увійти
                                    </Link>
                                    <Link href={route('register')} className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
                                        Реєстрація
                                    </Link>
                                </>
                            )}
                        </div>
                    </header>

                    <main className="text-center mt-12 max-w-4xl mx-auto">
                        <h1 className="text-4xl font-bold text-gray-800 dark:text-white leading-tight">
                            Ефективна платформа для замовлення та розробки IT-проєктів
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                            Об’єднуємо компанії та професійних розробників для створення технологічних рішень будь-якої складності.
                        </p>
                        <div className="mt-6">
                            {auth.user ? (
                                <Link href={route('dashboard')} className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                                    Перейти до замовлень
                                </Link>
                            ) : (
                                <Link href={route('register')} className="px-6 py-3 text-lg font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition">
                                    Почати співпрацю
                                </Link>
                            )}
                        </div>
                    </main>
                </div>

                {/* Опис можливостей */}
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-6">
                    <section className="max-w-5xl mx-auto text-center">
                        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">Як працює платформа?</h2>
                        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                            Простий процес замовлення, прозорі умови співпраці та професійна комунікація.
                        </p>
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
                                <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">📌 Створення замовлення</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">Детальний опис проєкту, визначення термінів та бюджету.</p>
                            </div>
                            <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
                                <h3 className="text-xl font-bold text-green-600 dark:text-green-400">🎯 Підбір виконавця</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">Перевірені розробники з високим рейтингом та портфоліо.</p>
                            </div>
                            <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
                                <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400">🚀 Реалізація та здача</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">Контроль ходу виконання, тестування та фінальна передача.</p>
                            </div>
                        </div>
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
                                <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">📊 Аналіз результатів</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">Регулярний звіт про хід виконання проєкту.</p>
                            </div>
                            <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
                                <h3 className="text-xl font-bold text-green-600 dark:text-green-400">💼 Управління проєктами</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">Зручні інструменти для керування завданнями.</p>
                            </div>
                            <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
                                <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400">📈 Оптимізація процесів</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">Постійне вдосконалення робочих процесів.</p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Секція з категоріями */}
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-900 dark:to-gray-800 p-6">
                    <section className="max-w-5xl mx-auto flex flex-col md:flex-row">
                        <div className="md:w-1/3">
                            <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">Шукайте роботу серед <span className="text-green-500">1736</span> відкритих фриланс-проєктів</h2>
                            <ul className="space-y-3">
                                {categories.map(category => (
                                    <li 
                                        key={category.id}
                                        className={`cursor-pointer p-3 text-lg font-medium rounded-md transition ${
                                            selectedCategory.id === category.id ? 'text-blue-600 bg-gray-200 dark:bg-gray-700' : 'text-gray-600 dark:text-gray-300'
                                        }`}
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {category.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="md:w-2/3 flex items-center justify-center">
                            <img 
                                src={selectedCategory.image} 
                                alt={selectedCategory.name} 
                                className="w-full max-w-lg rounded-lg shadow-lg transition-all"
                            />
                        </div>
                    </section>
                </div>

                {/* Безпека та надійність */}
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-900 dark:to-gray-800 p-6">
                    <section className="max-w-5xl mx-auto text-center">
                        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">Безпечне та надійне середовище</h2>
                        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                            Ваша безпека — наш пріоритет. Ми забезпечуємо прозорі умови співпраці та захист фінансових транзакцій.
                        </p>
                        <ul className="mt-6 space-y-4">
                            <li className="text-lg text-gray-600 dark:text-gray-300">🔒 Захищені платежі</li>
                            <li className="text-lg text-gray-600 dark:text-gray-300">⚖️ Чесна система рейтингів та відгуків</li>
                            <li className="text-lg text-gray-600 dark:text-gray-300">📜 Юридична підтримка та гарантії</li>
                        </ul>
                        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                            Ми прагнемо забезпечити найвищий рівень безпеки для наших користувачів, щоб ви могли зосередитися на своїх проєктах.
                        </p>
                    </section>
                </div>

                {/* Футер */}
                <footer className="w-full bg-gray-800 dark:bg-gray-900 py-8">
                    <div className="max-w-6xl mx-auto px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-2xl font-bold text-white">🚀 ITForge </h2>
                            <p className="text-gray-400 text-sm mt-1">
                                Професійний майданчик для розробників та замовників IT-послуг.
                            </p>
                        </div>
                        <div className="flex space-x-6">
                            <Link href="#" className="text-gray-400 hover:text-blue-500 text-sm">
                                Про нас
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-blue-500 text-sm">
                                Умови користування
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-blue-500 text-sm">
                                Політика конфіденційності
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-blue-500 text-sm">
                                Контакти
                            </Link>
                        </div>
                    </div>
                    <div className="mt-6 border-t border-gray-700 text-center py-4 text-gray-400 text-sm">
                        <p>© {new Date().getFullYear()} ITForge. Всі права захищено.</p>
                        <div className="mt-2 flex justify-center space-x-4">
                            <Link href="#" className="hover:text-blue-500">
                                <i className="fab fa-facebook"></i>
                            </Link>
                            <Link href="#" className="hover:text-blue-500">
                                <i className="fab fa-twitter"></i>
                            </Link>
                            <Link href="#" className="hover:text-blue-500">
                                <i className="fab fa-linkedin"></i>
                            </Link>
                            <Link href="#" className="hover:text-blue-500">
                                <i className="fab fa-github"></i>
                            </Link>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}