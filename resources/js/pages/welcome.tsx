import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const categories = [
        {
            id: 'programming',
            name: 'Програмування',
            image: '/storage/images/programming.jpg',
            description:
                'Від веб-розробки до системного програмування. Знайдіть фахівців у Python, Java, C++, PHP та інших мовах. Спеціалісти з фреймворків як Laravel, React та Vue.js.',
            stats: 'Понад 850 активних проєктів',
        },
        {
            id: 'design',
            name: 'Дизайн та арт',
            image: '/storage/images/design.jpg',
            description:
                'UI/UX дизайн, графічний дизайн, ілюстрація, 3D-моделювання. Створення логотипів, брендбуків, анімації та інших візуальних рішень.',
            stats: 'Понад 420 активних проєктів',
        },
        {
            id: 'services',
            name: 'Послуги',
            image: '/storage/images/services.jpg',
            description: 'IT-консалтинг, технічна підтримка, адміністрування серверів, хмарні рішення, впровадження CRM та ERP систем.',
            stats: 'Понад 310 активних проєктів',
        },
        {
            id: 'photo',
            name: 'Фото, аудіо та відео',
            image: '/storage/images/photo.jpg',
            description: 'Професійна обробка фото та відео, створення рекламних роликів, аудіо-продакшн, моушн-дизайн та візуальні ефекти.',
            stats: 'Понад 290 активних проєктів',
        },
        {
            id: 'marketing',
            name: 'Просування',
            image: '/storage/images/marketing.jpg',
            description: 'SMM, SEO, контекстна реклама, таргетована реклама, маркетингові дослідження, аналітика та стратегії просування.',
            stats: 'Понад 380 активних проєктів',
        },
        {
            id: 'engineering',
            name: 'Архітектура та інжиніринг',
            image: '/storage/images/engineering.jpg',
            description: "CAD/CAE системи, інженерні розрахунки, проєктування механізмів, електричних систем та промислових об'єктів.",
            stats: 'Понад 220 активних проєктів',
        },
        {
            id: 'mobile',
            name: 'Мобільні додатки',
            image: '/storage/images/mobile.jpg',
            description:
                'Розробка iOS та Android додатків, крос-платформні рішення (Flutter, React Native), оптимізація продуктивності мобільних застосунків.',
            stats: 'Понад 470 активних проєктів',
        },
        {
            id: 'admin',
            name: 'Адміністрування',
            image: '/storage/images/admin.jpg',
            description:
                'Налаштування та підтримка серверів (Linux, Windows), мережева інфраструктура, кібербезпека, резервне копіювання та відновлення даних.',
            stats: 'Понад 340 активних проєктів',
        },
    ];

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    const successStories = [
        {
            id: 1,
            title: 'Створення платформи для стартапу',
            description: 'Команда з 4 розробників за 3 місяці створила повноцінну SaaS платформу для автоматизації бізнес-процесів малого бізнесу.',
            result: 'Клієнт отримав готовий продукт, який зараз використовують понад 200 компаній.',
            technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
        },
        {
            id: 2,
            title: 'Редизайн корпоративного сайту',
            description: 'Провели повний редизайн та переписали фронтенд для великої фінансової компанії, збільшивши конверсію на 35%.',
            result: 'Клієнт отримав сучасний адаптивний сайт з покращеною UX-архітектурою.',
            technologies: ['Figma', 'Vue.js', 'TailwindCSS', 'Laravel'],
        },
        {
            id: 3,
            title: 'Розробка мобільного додатку',
            description: 'Створення крос-платформного додатку для доставки їжі з інтеграцією платежних систем та геолокації.',
            result: 'Додаток вийшов у топ-10 завантажень у своїй категорії в App Store та Google Play.',
            technologies: ['Flutter', 'Firebase', 'Stripe API', 'Google Maps API'],
        },
    ];

    const platformStats = [
        { value: '15,000+', label: 'Зареєстрованих фахівців' },
        { value: '8,500+', label: 'Успішно завершених проєктів' },
        { value: '95%', label: 'Клієнтів, які повертаються' },
        { value: '4.9/5', label: 'Середня оцінка якості' },
    ];

    const pricingPlans = [
        {
            name: 'Стартовий',
            price: 'Безкоштовно',
            features: ['5 проєктів одночасно', 'Базові інструменти управління', 'Стандартна підтримка', 'Комісія 10%'],
            bestFor: 'Фрілансери та малі проєкти',
        },
        {
            name: 'Професійний',
            price: '$29/міс',
            features: ['20 проєктів одночасно', 'Розширені інструменти аналітики', 'Пріоритетна підтримка', 'Комісія 7%', 'Персональний менеджер'],
            bestFor: 'Професійні фрілансери та агенції',
        },
        {
            name: 'Бізнес',
            price: '$99/міс',
            features: ['Необмежена кількість проєктів', 'API доступ', 'Експрес-підтримка 24/7', 'Комісія 5%', 'Додаткові інструменти колаборації'],
            bestFor: 'Великі компанії та корпоративні клієнти',
        },
    ];

    return (
        <>
            <Head title="ITForge">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div className="flex w-full flex-col items-center">
                {/* Головний блок */}
                <div className="flex min-h-screen w-full flex-col items-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                    <div className="flex w-full max-w-6xl flex-col items-center px-4 py-6 md:px-6 md:py-8">
                        {/* Header */}
                        <header className="flex w-full items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800 md:text-2xl dark:text-white">🚀 ITForge</h2>
                            <div className="flex space-x-2 md:space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white transition hover:bg-blue-700 md:px-4 md:py-2 md:text-sm"
                                    >
                                        <span className="hidden md:inline">Панель управління</span>
                                        <span className="md:hidden">Панель</span>
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md border border-blue-600 px-3 py-1 text-xs font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white md:px-4 md:py-2 md:text-sm"
                                        >
                                            Увійти
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white transition hover:bg-blue-700 md:px-4 md:py-2 md:text-sm"
                                        >
                                            <span className="hidden md:inline">Реєстрація</span>
                                            <span className="md:hidden">Реєстр.</span>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </header>

                        {/* Hero section */}
                        <div className="flex h-[calc(100vh-120px)] items-center justify-center md:h-[calc(100vh-160px)]">
                            <div className="text-center">
                                <h1 className="mb-4 text-2xl leading-tight font-bold text-gray-800 md:mb-6 md:text-4xl dark:text-white">
                                    Ефективна платформа для замовлення та розробки IT-проєктів
                                </h1>
                                <p className="mx-auto mb-6 max-w-2xl text-base text-gray-600 md:mb-8 md:text-lg dark:text-gray-300">
                                    Об'єднуємо компанії та професійних розробників для створення технологічних рішень будь-якої складності. Працюємо з
                                    2025 року, допомогли реалізувати понад 8,500 успішних проєктів.
                                </p>
                                {auth.user ? (
                                    <Link
                                        href={route('projects.index')}
                                        className="inline-block rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 md:px-6 md:py-3 md:text-lg"
                                    >
                                        Перейти до замовлень
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-green-700 md:px-6 md:py-3 md:text-lg"
                                    >
                                        Почати співпрацю
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Статистика платформи */}
                <div className="w-full bg-white py-8 md:py-12 dark:bg-gray-800">
                    <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
                            {platformStats.map((stat, index) => (
                                <div key={index} className="p-4 text-center">
                                    <p className="text-2xl font-bold text-blue-600 md:text-3xl dark:text-blue-400">{stat.value}</p>
                                    <p className="mt-2 text-sm text-gray-600 md:text-base dark:text-gray-300">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Як це працює */}
                <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 py-8 md:py-12 dark:from-gray-800 dark:to-gray-700">
                    <div className="w-full max-w-6xl px-4 md:px-6">
                        <section className="flex flex-col items-center">
                            <h2 className="mb-8 text-center text-2xl font-semibold text-gray-800 md:mb-12 md:text-3xl dark:text-white">
                                Як працює платформа?
                            </h2>

                            {/* Mobile version (1 column) */}
                            <div className="mx-auto grid w-full max-w-md grid-cols-1 gap-4 md:hidden">
                                {[
                                    {
                                        icon: '📌',
                                        title: 'Створення замовлення',
                                        color: 'text-blue-600',
                                        text: 'Детальний опис проєкту, визначення термінів та бюджету. Можливість завантажити технічне завдання або провести консультацію з нашими експертами.',
                                    },
                                    {
                                        icon: '🎯',
                                        title: 'Підбір виконавця',
                                        color: 'text-green-600',
                                        text: 'Перевірені розробники з високим рейтингом та портфоліо. Система автоматично підбирає найкращих кандидатів за вашими критеріями.',
                                    },
                                    {
                                        icon: '🚀',
                                        title: 'Реалізація та здача',
                                        color: 'text-purple-600',
                                        text: 'Контроль ходу виконання через наші інструменти, тестування та фінальна передача. Захищені платежі після успішного завершення етапів.',
                                    },
                                ].map((item, index) => (
                                    <div key={index} className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                                        <h3 className={`text-lg font-bold ${item.color} dark:${item.color.replace('600', '400')}`}>
                                            {item.icon} {item.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{item.text}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Desktop version (3 columns with equal height) */}
                            <div className="hidden w-full grid-cols-1 gap-6 md:grid md:grid-cols-3">
                                {[
                                    {
                                        icon: '📌',
                                        title: 'Створення замовлення',
                                        color: 'text-blue-600',
                                        text: 'Детальний опис проєкту, визначення термінів та бюджету. Можливість завантажити технічне завдання або провести консультацію з нашими експертами.',
                                        details: [
                                            'Опис вимог до проєкту',
                                            'Встановлення бюджету та термінів',
                                            'Вибір типу співпраці (фіксована ціна або почасова оплата)',
                                        ],
                                    },
                                    {
                                        icon: '🎯',
                                        title: 'Підбір виконавця',
                                        color: 'text-green-600',
                                        text: 'Перевірені розробники з високим рейтингом та портфоліо. Система автоматично підбирає найкращих кандидатів за вашими критеріями.',
                                        details: [
                                            'Автоматичний підбір фахівців',
                                            'Перегляд портфоліо та відгуків',
                                            'Особисте співбесіда з кандидатами',
                                        ],
                                    },
                                    {
                                        icon: '🚀',
                                        title: 'Реалізація та здача',
                                        color: 'text-purple-600',
                                        text: 'Контроль ходу виконання через наші інструменти, тестування та фінальна передача. Захищені платежі після успішного завершення етапів.',
                                        details: ['Регулярні звіти про прогрес', 'Тестування та внесення правок', 'Фінальна здача та оплата'],
                                    },
                                ].map((item, index) => (
                                    <div key={index} className="flex h-full flex-col rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                                        <h3 className={`text-xl font-bold ${item.color} dark:${item.color.replace('600', '400')}`}>
                                            {item.icon} {item.title}
                                        </h3>
                                        <p className="mt-2 text-gray-600 dark:text-gray-300">{item.text}</p>
                                        <ul className="mt-4 space-y-2">
                                            {item.details.map((detail, i) => (
                                                <li key={i} className="flex items-start">
                                                    <span className="mr-2 text-green-500">✓</span>
                                                    <span className="text-sm text-gray-600 dark:text-gray-300">{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>

                {/* Категорії */}
                <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 py-8 md:py-12 dark:from-gray-900 dark:to-gray-800">
                    <div className="w-full max-w-6xl px-4 md:px-6">
                        <section className="flex flex-col items-center">
                            <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800 md:mb-8 md:text-3xl dark:text-white">
                                Шукайте роботу серед <span className="text-green-500">1736</span> відкритих фриланс-проєктів
                            </h2>

                            {/* Mobile version (horizontal scroll) */}
                            <div className="mb-6 w-full overflow-x-auto pb-3 md:hidden">
                                <div className="mx-auto flex w-max space-x-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`rounded-md px-4 py-2 text-sm whitespace-nowrap ${
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
                            <div className="hidden w-full justify-center gap-8 md:flex">
                                <div className="w-1/3 max-w-xs">
                                    <ul className="space-y-2">
                                        {categories.map((category) => (
                                            <li
                                                key={category.id}
                                                onClick={() => setSelectedCategory(category)}
                                                className={`cursor-pointer rounded-md p-3 ${
                                                    selectedCategory.id === category.id
                                                        ? 'bg-gray-200 font-medium text-blue-600 dark:bg-gray-700 dark:text-blue-400'
                                                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span>{category.name}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="w-2/3 max-w-2xl">
                                    <div className="overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800">
                                        <img src={selectedCategory.image} alt={selectedCategory.name} className="h-64 w-full object-cover md:h-96" />
                                        <div className="p-4 md:p-6">
                                            <h3 className="mb-2 text-lg font-semibold text-gray-800 md:text-xl dark:text-white">
                                                {selectedCategory.name}
                                            </h3>
                                            <p className="mb-4 text-gray-600 dark:text-gray-300">{selectedCategory.description}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-blue-600 dark:text-blue-400">{selectedCategory.stats}</span>
                                                <Link
                                                    href={route('projects.index')}
                                                    className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white transition hover:bg-blue-700"
                                                >
                                                    Переглянути проєкти
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile image */}
                            <div className="mx-auto w-full max-w-md overflow-hidden rounded-lg bg-white shadow-md md:hidden dark:bg-gray-800">
                                <img src={selectedCategory.image} alt={selectedCategory.name} className="h-48 w-full object-cover" />
                                <div className="p-4">
                                    <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">{selectedCategory.name}</h3>
                                    <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">{selectedCategory.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-blue-600 dark:text-blue-400">{selectedCategory.stats}</span>
                                        <Link
                                            href={route('projects.index')}
                                            className="rounded bg-blue-600 px-2 py-1 text-xs font-medium text-white transition hover:bg-blue-700"
                                        >
                                            Проєкти
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Успішні історії */}
                <div className="w-full bg-gray-100 py-8 md:py-12 dark:bg-gray-900">
                    <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
                        <section className="flex flex-col items-center">
                            <h2 className="mb-8 text-center text-2xl font-semibold text-gray-800 md:mb-12 md:text-3xl dark:text-white">
                                Успішні історії співпраці
                            </h2>

                            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
                                {successStories.map((story) => (
                                    <div key={story.id} className="overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800">
                                        <div className="p-6">
                                            <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-white">{story.title}</h3>
                                            <p className="mb-4 text-gray-600 dark:text-gray-300">{story.description}</p>
                                            <div className="mb-4">
                                                <h4 className="mb-1 font-semibold text-gray-700 dark:text-gray-200">Результат:</h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">{story.result}</p>
                                            </div>
                                            <div>
                                                <h4 className="mb-1 font-semibold text-gray-700 dark:text-gray-200">Використані технології:</h4>
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    {story.technologies.map((tech, index) => (
                                                        <span
                                                            key={index}
                                                            className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 text-center">
                                <Link
                                    href={route('projects.index')}
                                    className="inline-block rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-green-700 md:text-base"
                                >
                                    Переглянути всі проєкти
                                </Link>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Наші переваги */}
                <div className="w-full bg-white py-8 md:py-12 dark:bg-gray-800">
                    <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
                        <section className="flex flex-col items-center">
                            <h2 className="mb-8 text-center text-2xl font-semibold text-gray-800 md:mb-12 md:text-3xl dark:text-white">
                                Чому обирають нашу платформу?
                            </h2>

                            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
                                {[
                                    {
                                        icon: '🚀',
                                        title: 'Швидкий старт',
                                        description: 'Початок роботи за кілька хвилин. Простий інтерфейс та зрозумілий процес створення проєктів.',
                                        color: 'text-blue-600',
                                    },
                                    {
                                        icon: '💼',
                                        title: 'Професійна спільнота',
                                        description:
                                            'Доступ до бази перевірених фахівців з різних галузей IT. Середній досвід виконавців - 5+ років.',
                                        color: 'text-green-600',
                                    },
                                    {
                                        icon: '🛡️',
                                        title: 'Гарантії безпеки',
                                        description: 'Захищені платежі, юридичний супровід та система арбітражу для вирішення спорів.',
                                        color: 'text-purple-600',
                                    },
                                ].map((advantage, index) => (
                                    <div key={index} className="flex flex-col items-center rounded-lg bg-gray-50 p-6 shadow-sm dark:bg-gray-700">
                                        <span className={`mb-4 text-3xl ${advantage.color}`}>{advantage.icon}</span>
                                        <h3 className="mb-2 text-center text-xl font-semibold text-gray-800 dark:text-white">{advantage.title}</h3>
                                        <p className="text-center text-gray-600 dark:text-gray-300">{advantage.description}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 grid w-full max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
                                {[
                                    { value: '24/7', label: 'Підтримка' },
                                    { value: '5+', label: 'Років на ринку' },
                                    { value: '98%', label: 'Задоволених клієнтів' },
                                    { value: '1 год', label: 'Середній час відгуку' },
                                ].map((stat, index) => (
                                    <div key={index} className="rounded-lg bg-blue-50 p-4 text-center dark:bg-gray-700">
                                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</p>
                                        <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 text-center">
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
                                >
                                    Приєднатися до платформи
                                    <svg
                                        className="ml-2 h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Безпека */}
                <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400 py-8 md:py-12 dark:from-gray-900 dark:to-gray-800">
                    <div className="w-full max-w-6xl px-4 md:px-6">
                        <section className="flex flex-col items-center">
                            <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800 md:mb-8 md:text-3xl dark:text-white">
                                Безпечне та надійне середовище
                            </h2>

                            {/* Mobile version */}
                            <div className="mx-auto w-full max-w-md space-y-4 md:hidden">
                                <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                                    <p className="font-medium text-blue-600 dark:text-blue-400">🔒 Захищені платежі</p>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                        Всі транзакції захищені сучасними методами шифрування. Виплати проводяться через перевірені платежні системи з
                                        двофакторною автентифікацією.
                                    </p>
                                </div>
                                <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                                    <p className="font-medium text-green-600 dark:text-green-400">⚖️ Чесна система рейтингів</p>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                        Прозора система оцінок та відгуків для всіх учасників. Модерація всіх відгуків для запобігання маніпуляціям.
                                    </p>
                                </div>
                                <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                                    <p className="font-medium text-purple-600 dark:text-purple-400">📜 Юридична підтримка</p>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                        Договори та юридичний супровід для кожного проєкту. Конфлікти вирішуються за допомогою арбітражу платформи.
                                    </p>
                                </div>
                            </div>

                            {/* Desktop version */}
                            <div className="hidden w-full flex-col items-center md:flex">
                                <p className="mb-8 max-w-3xl text-center text-lg text-gray-600 dark:text-gray-300">
                                    Ваша безпека — наш пріоритет. Ми забезпечуємо прозорі умови співпраці та захист фінансових транзакцій.
                                    Використовуємо банківський рівень шифрування даних та регулярні аудити безпеки.
                                </p>
                                <div className="grid w-full max-w-4xl grid-cols-3 gap-6">
                                    {[
                                        {
                                            icon: '🔒',
                                            title: 'Захищені платежі',
                                            color: 'text-blue-600',
                                            description: 'Шифрування SSL/TLS, двофакторна автентифікація, регулярні аудити безпеки платежних систем.',
                                        },
                                        {
                                            icon: '⚖️',
                                            title: 'Чесні рейтинги',
                                            color: 'text-green-600',
                                            description: "Об'єктивна система оцінювання, модерація відгуків, захист від накручування рейтингів.",
                                        },
                                        {
                                            icon: '📜',
                                            title: 'Юридична підтримка',
                                            color: 'text-purple-600',
                                            description: 'Типові договори, арбітраж спорів, консультації з правових питань IT-сфери.',
                                        },
                                    ].map((item, index) => (
                                        <div key={index} className="flex flex-col rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                                            <p className={`text-2xl ${item.color} dark:${item.color.replace('600', '400')} font-bold`}>{item.icon}</p>
                                            <p className="mt-2 text-center text-lg font-medium">{item.title}</p>
                                            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-8 max-w-3xl text-center text-gray-600 dark:text-gray-300">
                                    Ми прагнемо забезпечити найвищий рівень безпеки для наших користувачів. Наша платформа відповідає міжнародним
                                    стандартам GDPR та PCI DSS.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Футер */}
                <footer className="flex w-full flex-col items-center bg-gray-800 py-8 md:py-12 dark:bg-gray-900">
                    <div className="w-full max-w-6xl px-4 md:px-6">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                            <div className="md:col-span-2">
                                <h2 className="mb-4 text-xl font-bold text-white md:text-2xl">🚀 ITForge</h2>
                                <p className="mb-4 text-sm text-gray-400 md:text-base">
                                    Професійний майданчик для розробників та замовників IT-послуг. Працюємо з 2025 року, об'єднали понад 15,000
                                    фахівців та 8,500 успішних проєктів.
                                </p>
                                <div className="flex space-x-4">
                                    {['facebook', 'twitter', 'linkedin', 'github'].map((social) => (
                                        <Link key={social} href="#" className="text-xl text-gray-400 hover:text-blue-500">
                                            <i className={`fab fa-${social}`}></i>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-4 font-semibold text-white">Для фрілансерів</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <Link href="/projects" className="text-sm text-gray-400 hover:text-blue-500 md:text-base">
                                            Пошук проєктів
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/settings/profile" className="text-sm text-gray-400 hover:text-blue-500 md:text-base">
                                            Створення портфоліо
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/developers" className="text-sm text-gray-400 hover:text-blue-500 md:text-base">
                                            Рейтинги та відгуки
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/chats" className="text-sm text-gray-400 hover:text-blue-500 md:text-base">
                                            Чати
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="mb-4 font-semibold text-white">Для замовників</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <Link href="/projects" className="text-sm text-gray-400 hover:text-blue-500 md:text-base">
                                            Створення проєкту
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/developers" className="text-sm text-gray-400 hover:text-blue-500 md:text-base">
                                            Пошук фахівців
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/deposit" className="text-sm text-gray-400 hover:text-blue-500 md:text-base">
                                            Поповнення балансу
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/dashboard" className="text-sm text-gray-400 hover:text-blue-500 md:text-base">
                                            Панель керування
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-8 border-t border-gray-700 pt-6">
                            <div className="flex flex-col items-center justify-between md:flex-row">
                                <p className="mb-4 text-xs text-gray-400 md:mb-0 md:text-sm">
                                    © {new Date().getFullYear()} ITForge. Всі права захищено.
                                </p>
                                <div className="flex space-x-6">
                                    <Link href="#" className="text-xs text-gray-400 hover:text-blue-500 md:text-sm">
                                        Політика конфіденційності
                                    </Link>
                                    <Link href="#" className="text-xs text-gray-400 hover:text-blue-500 md:text-sm">
                                        Умови використання
                                    </Link>
                                    <Link href="#" className="text-xs text-gray-400 hover:text-blue-500 md:text-sm">
                                        Cookie
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
