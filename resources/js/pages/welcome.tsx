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
            description: 'Від веб-розробки до системного програмування. Знайдіть фахівців у Python, Java, C++, PHP, Ruby та інших мовах. Спеціалісти з фреймворків як Laravel, Django, React, Angular та Vue.js.',
            stats: 'Понад 850 активних проектів'
        },
        { 
            id: 'design', 
            name: 'Дизайн та арт', 
            image: '/storage/images/design.jpg',
            description: 'UI/UX дизайн, графічний дизайн, ілюстрація, 3D-моделювання. Створення логотипів, брендбуків, анімації та інших візуальних рішень.',
            stats: 'Понад 420 активних проектів'
        },
        { 
            id: 'services', 
            name: 'Послуги', 
            image: '/storage/images/services.jpg',
            description: 'IT-консалтинг, технічна підтримка, адміністрування серверів, хмарні рішення, впровадження CRM та ERP систем.',
            stats: 'Понад 310 активних проектів'
        },
        { 
            id: 'photo', 
            name: 'Фото, аудіо та відео', 
            image: '/storage/images/photo.jpg',
            description: 'Професійна обробка фото та відео, створення рекламних роликів, аудіо-продакшн, моушн-дизайн та візуальні ефекти.',
            stats: 'Понад 290 активних проектів'
        },
        { 
            id: 'marketing', 
            name: 'Просування', 
            image: '/storage/images/marketing.jpg',
            description: 'SMM, SEO, контекстна реклама, таргетована реклама, маркетингові дослідження, аналітика та стратегії просування.',
            stats: 'Понад 380 активних проектів'
        },
        { 
            id: 'engineering', 
            name: 'Архітектура та інжиніринг', 
            image: '/storage/images/engineering.jpg',
            description: 'CAD/CAE системи, інженерні розрахунки, проектування механізмів, електричних систем та промислових об\'єктів.',
            stats: 'Понад 220 активних проектів'
        },
        { 
            id: 'mobile', 
            name: 'Мобільні додатки', 
            image: '/storage/images/mobile.jpg',
            description: 'Розробка iOS та Android додатків, крос-платформні рішення (Flutter, React Native), оптимізація продуктивності мобільних застосунків.',
            stats: 'Понад 470 активних проектів'
        },
        { 
            id: 'admin', 
            name: 'Адміністрування', 
            image: '/storage/images/admin.jpg',
            description: 'Налаштування та підтримка серверів (Linux, Windows), мережева інфраструктура, кібербезпека, резервне копіювання та відновлення даних.',
            stats: 'Понад 340 активних проектів'
        },
    ];

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    const successStories = [
        {
            id: 1,
            title: "Створення платформи для стартапу",
            description: "Команда з 4 розробників за 3 місяці створила повноцінну SaaS платформу для автоматизації бізнес-процесів малого бізнесу.",
            result: "Клієнт отримав готовий продукт, який зараз використовують понад 200 компаній.",
            technologies: ["React", "Node.js", "MongoDB", "AWS"]
        },
        {
            id: 2,
            title: "Редизайн корпоративного сайту",
            description: "Провели повний редизайн та переписали фронтенд для великої фінансової компанії, збільшивши конверсію на 35%.",
            result: "Клієнт отримав сучасний адаптивний сайт з покращеною UX-архітектурою.",
            technologies: ["Figma", "Vue.js", "TailwindCSS", "Laravel"]
        },
        {
            id: 3,
            title: "Розробка мобільного додатку",
            description: "Створення крос-платформного додатку для доставки їжі з інтеграцією платежних систем та геолокації.",
            result: "Додаток вийшов у топ-10 завантажень у своїй категорії в App Store та Google Play.",
            technologies: ["Flutter", "Firebase", "Stripe API", "Google Maps API"]
        }
    ];

    const platformStats = [
        { value: "15,000+", label: "Зареєстрованих фахівців" },
        { value: "8,500+", label: "Успішно завершених проектів" },
        { value: "95%", label: "Клієнтів, які повертаються" },
        { value: "4.9/5", label: "Середня оцінка якості" }
    ];

    const pricingPlans = [
        {
            name: "Стартовий",
            price: "Безкоштовно",
            features: [
                "5 проектів одночасно",
                "Базові інструменти управління",
                "Стандартна підтримка",
                "Комісія 10%"
            ],
            bestFor: "Фрілансери та малі проекти"
        },
        {
            name: "Професійний",
            price: "$29/міс",
            features: [
                "20 проектів одночасно",
                "Розширені інструменти аналітики",
                "Пріоритетна підтримка",
                "Комісія 7%",
                "Персональний менеджер"
            ],
            bestFor: "Професійні фрілансери та агенції"
        },
        {
            name: "Бізнес",
            price: "$99/міс",
            features: [
                "Необмежена кількість проектів",
                "API доступ",
                "Експрес-підтримка 24/7",
                "Комісія 5%",
                "Додаткові інструменти колаборації"
            ],
            bestFor: "Великі компанії та корпоративні клієнти"
        }
    ];

    return (
        <>
            <Head title="ITForge">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div className="flex flex-col items-center w-full">
                {/* Головний блок */}
                <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center">
                    <div className="w-full max-w-6xl px-4 py-6 md:px-6 md:py-8 flex flex-col items-center">
                        {/* Header */}
                        <header className="w-full flex justify-between items-center">
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
                            <div className="text-center">
                                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white leading-tight mb-4 md:mb-6">
                                    Ефективна платформа для замовлення та розробки IT-проєктів
                                </h1>
                                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
                                    Об'єднуємо компанії та професійних розробників для створення технологічних рішень будь-якої складності. 
                                    Працюємо з 2018 року, допомогли реалізувати понад 8,500 успішних проектів.
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

                {/* Статистика платформи */}
                <div className="w-full bg-white dark:bg-gray-800 py-8 md:py-12">
                    <div className="w-full max-w-6xl px-4 md:px-6 mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                            {platformStats.map((stat, index) => (
                                <div key={index} className="text-center p-4">
                                    <p className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</p>
                                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-2">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Як це працює */}
                <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 py-8 md:py-12 flex flex-col items-center justify-center">
                    <div className="w-full max-w-6xl px-4 md:px-6">
                        <section className="flex flex-col items-center">
                            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white text-center mb-8 md:mb-12">
                                Як працює платформа?
                            </h2>
                            
                            {/* Mobile version (1 column) */}
                            <div className="w-full md:hidden grid grid-cols-1 gap-4 max-w-md mx-auto">
                                {[
                                    { 
                                        icon: '📌', 
                                        title: 'Створення замовлення', 
                                        color: 'text-blue-600', 
                                        text: 'Детальний опис проєкту, визначення термінів та бюджету. Можливість завантажити технічне завдання або провести консультацію з нашими експертами.' 
                                    },
                                    { 
                                        icon: '🎯', 
                                        title: 'Підбір виконавця', 
                                        color: 'text-green-600', 
                                        text: 'Перевірені розробники з високим рейтингом та портфоліо. Система автоматично підбирає найкращих кандидатів за вашими критеріями.' 
                                    },
                                    { 
                                        icon: '🚀', 
                                        title: 'Реалізація та здача', 
                                        color: 'text-purple-600', 
                                        text: 'Контроль ходу виконання через наші інструменти, тестування та фінальна передача. Захищені платежі після успішного завершення етапів.' 
                                    },
                                ].map((item, index) => (
                                    <div key={index} className="p-4 bg-white dark:bg-gray-800 shadow-sm rounded-lg">
                                        <h3 className={`text-lg font-bold ${item.color} dark:${item.color.replace('600', '400')}`}>
                                            {item.icon} {item.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Desktop version (3 columns with equal height) */}
                            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                                {[
                                    { 
                                        icon: '📌', 
                                        title: 'Створення замовлення', 
                                        color: 'text-blue-600', 
                                        text: 'Детальний опис проєкту, визначення термінів та бюджету. Можливість завантажити технічне завдання або провести консультацію з нашими експертами.',
                                        details: [
                                            "Опис вимог до проекту",
                                            "Встановлення бюджету та термінів",
                                            "Вибір типу співпраці (фіксована ціна або почасова оплата)"
                                        ]
                                    },
                                    { 
                                        icon: '🎯', 
                                        title: 'Підбір виконавця', 
                                        color: 'text-green-600', 
                                        text: 'Перевірені розробники з високим рейтингом та портфоліо. Система автоматично підбирає найкращих кандидатів за вашими критеріями.',
                                        details: [
                                            "Автоматичний підбір фахівців",
                                            "Перегляд портфоліо та відгуків",
                                            "Особисте співбесіда з кандидатами"
                                        ]
                                    },
                                    { 
                                        icon: '🚀', 
                                        title: 'Реалізація та здача', 
                                        color: 'text-purple-600', 
                                        text: 'Контроль ходу виконання через наші інструменти, тестування та фінальна передача. Захищені платежі після успішного завершення етапів.',
                                        details: [
                                            "Регулярні звіти про прогрес",
                                            "Тестування та внесення правок",
                                            "Фінальна здача та оплата"
                                        ]
                                    },
                                ].map((item, index) => (
                                    <div key={index} className="flex flex-col p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg h-full">
                                        <h3 className={`text-xl font-bold ${item.color} dark:${item.color.replace('600', '400')}`}>
                                            {item.icon} {item.title}
                                        </h3>
                                        <p className="mt-2 text-gray-600 dark:text-gray-300">{item.text}</p>
                                        <ul className="mt-4 space-y-2">
                                            {item.details.map((detail, i) => (
                                                <li key={i} className="flex items-start">
                                                    <span className="text-green-500 mr-2">✓</span>
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
                <div className="w-full min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-900 dark:to-gray-800 py-8 md:py-12 flex flex-col items-center justify-center">
                    <div className="w-full max-w-6xl px-4 md:px-6">
                        <section className="flex flex-col items-center">
                            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white text-center mb-6 md:mb-8">
                                Шукайте роботу серед <span className="text-green-500">1736</span> відкритих фриланс-проєктів
                            </h2>
                            
                            {/* Mobile version (horizontal scroll) */}
                            <div className="w-full md:hidden mb-6 overflow-x-auto pb-3">
                                <div className="flex space-x-2 w-max mx-auto">
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
                            <div className="hidden md:flex w-full gap-8 justify-center">
                                <div className="w-1/3 max-w-xs">
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
                                                <div className="flex justify-between items-center">
                                                    <span>{category.name}</span>
                                                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                                                        {category.stats}
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div className="w-2/3 max-w-2xl">
                                    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                                        <img 
                                            src={selectedCategory.image} 
                                            alt={selectedCategory.name}
                                            className="w-full h-64 md:h-96 object-cover"
                                        />
                                        <div className="p-4 md:p-6">
                                            <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-2">
                                                {selectedCategory.name}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                                {selectedCategory.description}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-blue-600 dark:text-blue-400">
                                                    {selectedCategory.stats}
                                                </span>
                                                <Link 
                                                    href={route('projects.index')} 
                                                    className="text-sm font-medium text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition"
                                                >
                                                    Переглянути проекти
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Mobile image */}
                            <div className="w-full md:hidden max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                                <img 
                                    src={selectedCategory.image} 
                                    alt={selectedCategory.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                        {selectedCategory.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                        {selectedCategory.description}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-blue-600 dark:text-blue-400">
                                            {selectedCategory.stats}
                                        </span>
                                        <Link 
                                            href={route('projects.index')} 
                                            className="text-xs font-medium text-white bg-blue-600 px-2 py-1 rounded hover:bg-blue-700 transition"
                                        >
                                            Проекти
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Успішні історії */}
                <div className="w-full bg-gray-100 dark:bg-gray-900 py-8 md:py-12">
                    <div className="w-full max-w-6xl px-4 md:px-6 mx-auto">
                        <section className="flex flex-col items-center">
                            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white text-center mb-8 md:mb-12">
                                Успішні історії співпраці
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                                {successStories.map((story) => (
                                    <div key={story.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{story.title}</h3>
                                            <p className="text-gray-600 dark:text-gray-300 mb-4">{story.description}</p>
                                            <div className="mb-4">
                                                <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-1">Результат:</h4>
                                                <p className="text-gray-600 dark:text-gray-300 text-sm">{story.result}</p>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-1">Використані технології:</h4>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {story.technologies.map((tech, index) => (
                                                        <span key={index} className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
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
                                    className="inline-block px-5 py-2 text-sm md:text-base font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
                                >
                                    Переглянути всі проекти
                                </Link>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Тарифи */}
                <div className="w-full bg-white dark:bg-gray-800 py-8 md:py-12">
                    <div className="w-full max-w-6xl px-4 md:px-6 mx-auto">
                        <section className="flex flex-col items-center">
                            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white text-center mb-8 md:mb-12">
                                Варіанти співпраці
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                                {pricingPlans.map((plan, index) => (
                                    <div 
                                        key={index} 
                                        className={`rounded-lg shadow-md overflow-hidden ${
                                            index === 1 ? "ring-2 ring-blue-500 transform md:-translate-y-2" : ""
                                        }`}
                                    >
                                        <div className={`p-6 ${
                                            index === 1 ? "bg-blue-50 dark:bg-gray-700" : "bg-white dark:bg-gray-800"
                                        }`}>
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{plan.name}</h3>
                                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">{plan.price}</p>
                                            
                                            <ul className="space-y-3 mb-6">
                                                {plan.features.map((feature, i) => (
                                                    <li key={i} className="flex items-start">
                                                        <span className="text-green-500 mr-2">✓</span>
                                                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            
                                            <div className="text-center">
                                                <Link 
                                                    href={route('register')} 
                                                    className={`inline-block px-4 py-2 text-sm font-medium rounded-lg ${
                                                        index === 1 
                                                            ? "bg-blue-600 text-white hover:bg-blue-700" 
                                                            : "bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500"
                                                    }`}
                                                >
                                                    Обрати тариф
                                                </Link>
                                            </div>
                                            
                                            {plan.bestFor && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                                                    Ідеально підходить для: {plan.bestFor}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-8 text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                <p>Всі тарифи включають доступ до повного функціоналу платформи. Комісія стягується тільки з успішно завершених проектів.</p>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Безпека */}
                <div className="w-full min-h-screen bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-900 dark:to-gray-800 py-8 md:py-12 flex flex-col items-center justify-center">
                    <div className="w-full max-w-6xl px-4 md:px-6">
                        <section className="flex flex-col items-center">
                            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white text-center mb-6 md:mb-8">
                                Безпечне та надійне середовище
                            </h2>
                            
                            {/* Mobile version */}
                            <div className="w-full md:hidden space-y-4 max-w-md mx-auto">
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                                    <p className="text-blue-600 dark:text-blue-400 font-medium">🔒 Захищені платежі</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                        Всі транзакції захищені сучасними методами шифрування. Виплати проводяться через перевірені платежні системи з двофакторною автентифікацією.
                                    </p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                                    <p className="text-green-600 dark:text-green-400 font-medium">⚖️ Чесна система рейтингів</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                        Прозора система оцінок та відгуків для всіх учасників. Модерація всіх відгуків для запобігання маніпуляціям.
                                    </p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                                    <p className="text-purple-600 dark:text-purple-400 font-medium">📜 Юридична підтримка</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                        Договори та юридичний супровід для кожного проєкту. Конфлікти вирішуються за допомогою арбітражу платформи.
                                    </p>
                                </div>
                            </div>
                            
                            {/* Desktop version */}
                            <div className="hidden md:flex flex-col items-center w-full">
                                <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-8 max-w-3xl">
                                    Ваша безпека — наш пріоритет. Ми забезпечуємо прозорі умови співпраці та захист фінансових транзакцій. 
                                    Використовуємо банківський рівень шифрування даних та регулярні аудити безпеки.
                                </p>
                                <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
                                    {[
                                        { 
                                            icon: '🔒', 
                                            title: 'Захищені платежі', 
                                            color: 'text-blue-600',
                                            description: 'Шифрування SSL/TLS, двофакторна автентифікація, регулярні аудити безпеки платежних систем.'
                                        },
                                        { 
                                            icon: '⚖️', 
                                            title: 'Чесні рейтинги', 
                                            color: 'text-green-600',
                                            description: 'Об\'єктивна система оцінювання, модерація відгуків, захист від накручування рейтингів.'
                                        },
                                        { 
                                            icon: '📜', 
                                            title: 'Юридична підтримка', 
                                            color: 'text-purple-600',
                                            description: 'Типові договори, арбітраж спорів, консультації з правових питань IT-сфери.'
                                        },
                                    ].map((item, index) => (
                                        <div key={index} className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                                            <p className={`text-2xl ${item.color} dark:${item.color.replace('600', '400')} font-bold`}>
                                                {item.icon}
                                            </p>
                                            <p className="font-medium mt-2 text-center text-lg">{item.title}</p>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 text-center">
                                                {item.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 text-center mt-8 max-w-3xl">
                                    Ми прагнемо забезпечити найвищий рівень безпеки для наших користувачів. 
                                    Наша платформа відповідає міжнародним стандартам GDPR та PCI DSS.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Футер */}
                <footer className="w-full bg-gray-800 dark:bg-gray-900 py-8 md:py-12 flex flex-col items-center">
                    <div className="w-full max-w-6xl px-4 md:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="md:col-span-2">
                                <h2 className="text-xl md:text-2xl font-bold text-white mb-4">🚀 ITForge</h2>
                                <p className="text-gray-400 text-sm md:text-base mb-4">
                                    Професійний майданчик для розробників та замовників IT-послуг. 
                                    Працюємо з 2018 року, об'єднали понад 15,000 фахівців та 8,500 успішних проектів.
                                </p>
                                <div className="flex space-x-4">
                                    {['facebook', 'twitter', 'linkedin', 'github'].map((social) => (
                                        <Link 
                                            key={social} 
                                            href="#" 
                                            className="text-gray-400 hover:text-blue-500 text-xl"
                                        >
                                            <i className={`fab fa-${social}`}></i>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-white font-semibold mb-4">Для фрілансерів</h3>
                                <ul className="space-y-2">
                                    <li><Link href="#" className="text-gray-400 hover:text-blue-500 text-sm md:text-base">Пошук проектів</Link></li>
                                    <li><Link href="#" className="text-gray-400 hover:text-blue-500 text-sm md:text-base">Створення портфоліо</Link></li>
                                    <li><Link href="#" className="text-gray-400 hover:text-blue-500 text-sm md:text-base">Рейтинги та відгуки</Link></li>
                                    <li><Link href="#" className="text-gray-400 hover:text-blue-500 text-sm md:text-base">Форум спільноти</Link></li>
                                    <li><Link href="#" className="text-gray-400 hover:text-blue-500 text-sm md:text-base">Курси та навчання</Link></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="text-white font-semibold mb-4">Для замовників</h3>
                                <ul className="space-y-2">
                                    <li><Link href="#" className="text-gray-400 hover:text-blue-500 text-sm md:text-base">Створення проекту</Link></li>
                                    <li><Link href="#" className="text-gray-400 hover:text-blue-500 text-sm md:text-base">Пошук фахівців</Link></li>
                                    <li><Link href="#" className="text-gray-400 hover:text-blue-500 text-sm md:text-base">Безпека платежів</Link></li>
                                    <li><Link href="#" className="text-gray-400 hover:text-blue-500 text-sm md:text-base">Юридична підтримка</Link></li>
                                    <li><Link href="#" className="text-gray-400 hover:text-blue-500 text-sm md:text-base">Кейси та історії</Link></li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-gray-700">
                            <div className="flex flex-col md:flex-row justify-between items-center">
                                <p className="text-gray-400 text-xs md:text-sm mb-4 md:mb-0">
                                    © {new Date().getFullYear()} ITForge. Всі права захищено.
                                </p>
                                <div className="flex space-x-6">
                                    <Link href="#" className="text-gray-400 hover:text-blue-500 text-xs md:text-sm">Політика конфіденційності</Link>
                                    <Link href="#" className="text-gray-400 hover:text-blue-500 text-xs md:text-sm">Умови використання</Link>
                                    <Link href="#" className="text-gray-400 hover:text-blue-500 text-xs md:text-sm">Cookie</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
