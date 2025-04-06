import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const categories = [
        { id: 'programming', name: 'Програмування', image: '/storage/images/programming.jpg' },
        { id: 'design', name: 'Дизайн та арт', image: '/storage/images/design.jpg' },
        { id: 'services', name: 'Послуги', image: '/storage/images/services.jpg' },
        { id: 'photo', name: 'Фото, аудіо та відео', image: '/storage/images/photo.jpg' },
        { id: 'marketing', name: 'Просування', image: '/storage/images/marketing.jpg' },
        { id: 'engineering', name: 'Архітектура та інжиніринг', image: '/storage/images/engineering.jpg' },
        { id: 'mobile', name: 'Мобільні додатки', image: '/storage/images/mobile.jpg' },
        { id: 'admin', name: 'Адміністрування', image: '/storage/images/admin.jpg' },
    ];

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    return (
        <>
            <Head title="ITForge">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div className="relative">
                {/* Головний блок */}
                <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                    <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
                        {/* Header */}
                        <header className="flex justify-between items-center">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">🚀 ITForge</h2>
                            <div className="flex space-x-2 md:space-x-4">
                                {auth.user ? (
                                    <Link 
                                        href={route('dashboard')} 
                                        className="px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                                    >
                                        <span className="hidden md:inline">Панель управління</span>
                                        <span className="md:hidden">Панель</span>
                                    </Link>
                                ) : (
                                    <>
                                        <Link 
                                            href={route('login')} 
                                            className="px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
                                        >
                                            Увійти
                                        </Link>
                                        <Link 
                                            href={route('register')} 
                                            className="px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                                        >
                                            <span className="hidden md:inline">Реєстрація</span>
                                            <span className="md:hidden">Реєстр.</span>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </header>

                        {/* Hero section */}
                        <div className="flex items-center justify-center h-[calc(100vh-120px)] md:h-[calc(100vh-160px)]">
                            <div className="text-center max-w-2xl mx-auto">
                                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white leading-tight mb-4 md:mb-6">
                                    Ефективна платформа для замовлення та розробки IT-проєктів
                                </h1>
                                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 md:mb-8">
                                    Об'єднуємо компанії та професійних розробників для створення технологічних рішень будь-якої складності.
                                </p>
                                {auth.user ? (
                                    <Link 
                                        href={route('projects.index')} 
                                        className="inline-block px-5 py-2 md:px-6 md:py-3 text-sm md:text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Перейти до замовлень
                                    </Link>
                                ) : (
                                    <Link 
                                        href={route('register')} 
                                        className="inline-block px-5 py-2 md:px-6 md:py-3 text-sm md:text-lg font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
                                    >
                                        Почати співпрацю
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Як це працює */}
                <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 py-8 md:py-12">
                    <div className="container mx-auto px-4 md:px-6">
                        <section className="max-w-4xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white text-center mb-8 md:mb-12">
                                Як працює платформа?
                            </h2>
                            
                            {/* Mobile version (1 column) */}
                            <div className="md:hidden grid grid-cols-1 gap-4">
                                {[
                                    { icon: '📌', title: 'Створення замовлення', color: 'text-blue-600', text: 'Детальний опис проєкту, визначення термінів та бюджету.' },
                                    { icon: '🎯', title: 'Підбір виконавця', color: 'text-green-600', text: 'Перевірені розробники з високим рейтингом та портфоліо.' },
                                    { icon: '🚀', title: 'Реалізація та здача', color: 'text-purple-600', text: 'Контроль ходу виконання, тестування та фінальна передача.' },
                                ].map((item, index) => (
                                    <div key={index} className="p-4 bg-white dark:bg-gray-800 shadow-sm rounded-lg">
                                        <h3 className={`text-lg font-bold ${item.color} dark:${item.color.replace('600', '400')}`}>
                                            {item.icon} {item.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Desktop version (3 columns) */}
                            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { icon: '📌', title: 'Створення замовлення', color: 'text-blue-600', text: 'Детальний опис проєкту, визначення термінів та бюджету.' },
                                    { icon: '🎯', title: 'Підбір виконавця', color: 'text-green-600', text: 'Перевірені розробники з високим рейтингом та портфоліо.' },
                                    { icon: '🚀', title: 'Реалізація та здача', color: 'text-purple-600', text: 'Контроль ходу виконання, тестування та фінальна передача.' },
                                    { icon: '📊', title: 'Аналіз результатів', color: 'text-blue-600', text: 'Регулярний звіт про хід виконання проєкту.' },
                                    { icon: '💼', title: 'Управління проєктами', color: 'text-green-600', text: 'Зручні інструменти для керування завданнями.' },
                                    { icon: '📈', title: 'Оптимізація процесів', color: 'text-purple-600', text: 'Постійне вдосконалення робочих процесів.' },
                                ].map((item, index) => (
                                    <div key={index} className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
                                        <h3 className={`text-xl font-bold ${item.color} dark:${item.color.replace('600', '400')}`}>
                                            {item.icon} {item.title}
                                        </h3>
                                        <p className="mt-2 text-gray-600 dark:text-gray-300">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>

                {/* Категорії */}
                <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-900 dark:to-gray-800 py-8 md:py-12">
                    <div className="container mx-auto px-4 md:px-6">
                        <section className="max-w-5xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-6 md:mb-8">
                                Шукайте роботу серед <span className="text-green-500">1736</span> відкритих фриланс-проєктів
                            </h2>
                            
                            {/* Mobile version (horizontal scroll) */}
                            <div className="md:hidden mb-6 overflow-x-auto pb-3">
                                <div className="flex space-x-2 w-max">
                                    {categories.map(category => (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`px-4 py-2 text-sm rounded-md whitespace-nowrap ${
                                                selectedCategory.id === category.id
                                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                                            }`}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Desktop version (vertical list) */}
                            <div className="hidden md:flex gap-8">
                                <div className="w-1/3">
                                    <ul className="space-y-2">
                                        {categories.map(category => (
                                            <li 
                                                key={category.id}
                                                onClick={() => setSelectedCategory(category)}
                                                className={`p-3 rounded-md cursor-pointer ${
                                                    selectedCategory.id === category.id
                                                        ? 'bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-medium'
                                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                                                }`}
                                            >
                                                {category.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div className="w-2/3">
                                    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                                        <img 
                                            src={selectedCategory.image} 
                                            alt={selectedCategory.name}
                                            className="w-full h-64 md:h-96 object-cover"
                                        />
                                        <div className="p-4 md:p-6">
                                            <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white">
                                                {selectedCategory.name}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Mobile image */}
                            <div className="md:hidden bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                                <img 
                                    src={selectedCategory.image} 
                                    alt={selectedCategory.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                        {selectedCategory.name}
                                    </h3>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Безпека */}
                <div className="min-h-screen bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-900 dark:to-gray-800 py-8 md:py-12">
                    <div className="container mx-auto px-4 md:px-6">
                        <section className="max-w-3xl mx-auto text-center">
                            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-6 md:mb-8">
                                Безпечне та надійне середовище
                            </h2>
                            
                            {/* Mobile version */}
                            <div className="md:hidden space-y-4">
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                                    <p className="text-blue-600 dark:text-blue-400 font-medium">🔒 Захищені платежі</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                        Всі транзакції захищені сучасними методами шифрування
                                    </p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                                    <p className="text-green-600 dark:text-green-400 font-medium">⚖️ Чесна система рейтингів</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                        Прозора система оцінок та відгуків для всіх учасників
                                    </p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                                    <p className="text-purple-600 dark:text-purple-400 font-medium">📜 Юридична підтримка</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                        Договори та юридичний супровід для кожного проєкту
                                    </p>
                                </div>
                            </div>
                            
                            {/* Desktop version */}
                            <div className="hidden md:block">
                                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                                    Ваша безпека — наш пріоритет. Ми забезпечуємо прозорі умови співпраці та захист фінансових транзакцій.
                                </p>
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                                        <p className="text-xl text-blue-600 dark:text-blue-400 font-bold">🔒</p>
                                        <p className="font-medium mt-2">Захищені платежі</p>
                                    </div>
                                    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                                        <p className="text-xl text-green-600 dark:text-green-400 font-bold">⚖️</p>
                                        <p className="font-medium mt-2">Чесні рейтинги</p>
                                    </div>
                                    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                                        <p className="text-xl text-purple-600 dark:text-purple-400 font-bold">📜</p>
                                        <p className="font-medium mt-2">Юридична підтримка</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mt-8">
                                    Ми прагнемо забезпечити найвищий рівень безпеки для наших користувачів.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Футер */}
                <footer className="w-full bg-gray-800 dark:bg-gray-900 py-8 md:py-12">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-6xl mx-auto">
                            <div className="flex flex-col md:flex-row justify-between items-center">
                                <div className="mb-6 md:mb-0 text-center md:text-left">
                                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2">🚀 ITForge</h2>
                                    <p className="text-gray-400 text-sm">
                                        Професійний майданчик для розробників та замовників IT-послуг
                                    </p>
                                </div>
                                
                                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                                    <Link href="#" className="text-gray-400 hover:text-blue-500 text-xs md:text-sm">
                                        Про нас
                                    </Link>
                                    <Link href="#" className="text-gray-400 hover:text-blue-500 text-xs md:text-sm">
                                        Умови
                                    </Link>
                                    <Link href="#" className="text-gray-400 hover:text-blue-500 text-xs md:text-sm">
                                        Політика
                                    </Link>
                                    <Link href="#" className="text-gray-400 hover:text-blue-500 text-xs md:text-sm">
                                        Контакти
                                    </Link>
                                </div>
                            </div>
                            
                            <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-xs md:text-sm">
                                <p>© {new Date().getFullYear()} ITForge. Всі права захищено.</p>
                                <div className="flex justify-center space-x-4 mt-3">
                                    {['facebook', 'twitter', 'linkedin', 'github'].map((social) => (
                                        <Link 
                                            key={social} 
                                            href="#" 
                                            className="hover:text-blue-500 text-base"
                                        >
                                            <i className={`fab fa-${social}`}></i>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
