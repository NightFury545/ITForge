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
    phone: string;
    country: string;
    social_links: string[];
    work_experience: string;
}

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;
    const [newPortfolioUrl, setNewPortfolioUrl] = useState('');
    const [newSocialLink, setNewSocialLink] = useState('');

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<ProfileForm>({
        name: auth.user.name,
        email: auth.user.email,
        avatar: auth.user.avatar || '',
        bio: auth.user.bio || '',
        birthday: auth.user.birthday || '',
        portfolio_urls: auth.user.portfolio_urls || [],
        skills: auth.user.skills || [],
        user_type: auth.user.user_type || 'developer',
        phone: auth.user.phone || '',
        country: auth.user.country || '',
        social_links: auth.user.social_links || [],
        work_experience: auth.user.work_experience || '',
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

    const addSocialLink = () => {
        if (newSocialLink.trim() && !data.social_links.includes(newSocialLink.trim())) {
            setData('social_links', [...data.social_links, newSocialLink.trim()]);
            setNewSocialLink('');
        }
    };

    const removeSocialLink = (url: string) => {
        setData('social_links', data.social_links.filter(u => u !== url));
    };

    const skillOptions = [
        // Мови програмування (40+)
        'JavaScript', 'TypeScript', 'Python', 'Ruby', 'PHP', 'Java', 'Kotlin', 'C#', 'Go', 'Rust', 
        'Dart', 'Elixir', 'Clojure', 'Scala', 'Perl', 'Lua', 'Haskell', 'OCaml', 'Erlang', 'F#', 
        'Swift', 'Objective-C', 'R', 'Julia', 'Groovy', 'D', 'Nim', 'Zig', 'Crystal', 
        'CoffeeScript', 'ReasonML', 'PureScript', 'Ballerina', 'WebAssembly', 'Bash', 'PowerShell', 'SQL', 'PL/SQL', 'T-SQL',
      
        // Фронтенд (50+)
        'React', 'Vue', 'Angular', 'Svelte', 'Solid.js', 'Alpine.js', 'Ember.js', 'Lit', 'Preact', 'Stencil', 
        'Meteor', 'Aurelia', 'Mithril', 'Riot.js', 'Marko', 'Stimulus', 'HTMX', 'Qwik', 'Astro', 'Next.js', 
        'Nuxt.js', 'Gatsby', 'Remix', 'SvelteKit', 'Eleventy', 'Hugo', 'Jekyll', 'Docusaurus', 'VitePress', 'Hexo', 
        'Blazor', 'Web Components', 'Shadow DOM', 'Custom Elements', 'PWA', 'AMP', 'Web Workers', 'Service Workers', 
        'IndexedDB', 'Web Storage', 'WebSockets', 'WebRTC', 'WebGL', 'Canvas API', 'Web Audio API', 'Geolocation API', 
        'Payment Request API', 'Web Share API', 'WebXR', 'Web NFC',
      
        // Бекенд (60+)
        'Node.js', 'Express', 'NestJS', 'Fastify', 'Koa', 'AdonisJS', 'Hapi', 'LoopBack', 'Moleculer', 'FeathersJS', 
        'Django', 'Flask', 'FastAPI', 'Sanic', 'Bottle', 'Pyramid', 'Tornado', 'CherryPy', 'Ruby on Rails', 'Sinatra', 
        'Hanami', 'Grape', 'Laravel', 'Symfony', 'CodeIgniter', 'CakePHP', 'Yii', 'Phalcon', 'Slim', 'Zend Framework', 
        'Phoenix (Elixir)', 'Gin (Go)', 'Fiber (Go)', 'Echo (Go)', 'Beego (Go)', 'Revel (Go)', 'Actix (Rust)', 'Rocket (Rust)', 
        'Warp (Rust)', 'Spring Boot', 'Micronaut', 'Quarkus', 'Vert.x', 'Play Framework', 'Akka', '.NET Core', 'ASP.NET', 
        'NancyFX', 'ServiceStack', 'Dapr', 'Serverless Framework', 'ColdFusion', 'Deno', 'Bun', 'Cloudflare Workers', 
        'Firebase Functions', 'AWS Lambda', 'Google Cloud Functions', 'Azure Functions',
      
        // Мобільна розробка (30+)
        'React Native', 'Flutter', 'SwiftUI', 'Jetpack Compose', 'Kotlin Multiplatform', 'Xamarin', 'Ionic', 'Capacitor', 
        'NativeScript', 'MAUI', 'PhoneGap', 'Cordova', 'PWA', 'Expo', 'KMM (Kotlin)', 'Appcelerator Titanium', 'Onsen UI', 
        'Framework7', 'Quasar Framework', 'NativeBase', 'Tamagui', 'Glide', 'Fastlane', 'Appium', 'Detox', 'Espresso', 
        'XCUITest', 'Sentry (Mobile)', 'Firebase Crashlytics', 'Google Mobile Ads',
      
        // Бази даних (40+)
        'PostgreSQL', 'MySQL', 'SQLite', 'MariaDB', 'Microsoft SQL Server', 'Oracle', 'CockroachDB', 'TiDB', 'MongoDB', 
        'Redis', 'Cassandra', 'DynamoDB', 'Firebase Firestore', 'CouchDB', 'Neo4j', 'ArangoDB', 'RethinkDB', 'FaunaDB', 
        'SurrealDB', 'InfluxDB', 'TimescaleDB', 'ClickHouse', 'Elasticsearch', 'Solr', 'Meilisearch', 'Algolia', 'Prisma', 
        'Sequelize', 'TypeORM', 'Drizzle', 'SQLAlchemy', 'Hibernate', 'Entity Framework', 'Mongoose', 'Eloquent', 
        'ActiveRecord', 'Doctrine', 'WatermelonDB', 'Realm', 'ObjectBox', 'PouchDB',
      
        // Хмарні технології (50+)
        'AWS (S3, EC2, Lambda, RDS, etc.)', 'Google Cloud', 'Azure', 'Firebase', 'DigitalOcean', 'Heroku', 'Vercel', 
        'Netlify', 'Cloudflare', 'Linode', 'Render', 'Fly.io', 'Railway', 'Supabase', 'Appwrite', 'Hasura', 'Nhost', 
        'AWS Amplify', 'AWS CDK', 'AWS SAM', 'AWS ECS', 'AWS EKS', 'AWS Fargate', 'AWS SNS/SQS', 'AWS Sagemaker', 
        'Google Cloud Run', 'Google Kubernetes Engine', 'Azure App Service', 'Azure Functions', 'Azure Cosmos DB', 
        'Cloudflare Workers', 'Cloudflare Pages', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Pulumi', 'Crossplane', 
        'Helm', 'Prometheus', 'Grafana', 'Loki', 'Jaeger', 'Istio', 'Linkerd', 'Consul', 'Vault', 'ArgoCD', 'Tekton', 
        'Jenkins', 'Spinnaker',
      
        // AI/ML & Data Science (40+)
        'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'OpenCV', 'spaCy', 'NLTK', 'Hugging Face', 'LangChain', 
        'LlamaIndex', 'Rasa', 'MLflow', 'Weka', 'Jupyter', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly', 
        'Dask', 'Ray', 'Apache Spark', 'Apache Flink', 'Apache Beam', 'Apache Kafka', 'BigQuery', 'Snowflake', 
        'Databricks', 'Tableau', 'Power BI', 'Looker', 'Metabase', 'Apache Superset', 'H2O.ai', 'Fast.ai', 'ONNX', 
        'Core ML', 'TensorRT', 'Dialogflow', 'IBM Watson',
      
        // Блокчейн & Web3 (30+)
        'Solidity', 'Ethereum', 'Bitcoin', 'Polkadot', 'Cosmos', 'Hyperledger', 'Web3.js', 'Ethers.js', 'Hardhat', 
        'Truffle', 'Foundry', 'Brownie', 'IPFS', 'Filecoin', 'The Graph', 'Alchemy', 'Moralis', 'Infura', 'Chainlink', 
        'OpenZeppelin', 'Ganache', 'Remix IDE', 'MetaMask', 'WalletConnect', 'Uniswap', 'Aave', 'Compound', 'DAO', 
        'NFT', 'DeFi', 'ZK-SNARKs',
      
        // Ігрова розробка (30+)
        'Unity', 'Unreal Engine', 'Godot', 'Phaser', 'Three.js', 'Babylon.js', 'PlayCanvas', 'Cocos2d-x', 'MonoGame', 
        'LibGDX', 'PixiJS', 'ImpactJS', 'Construct', 'GameMaker Studio', 'RPG Maker', 'LÖVE', 'Defold', 'Corona SDK', 
        'Amazon Lumberyard', 'CryEngine', 'Source Engine', 'OpenGL', 'Vulkan', 'DirectX', 'WebGPU', 'Raylib', 'SFML', 
        'SDL', 'OpenAL', 'FMOD',
      
        // DevOps & CI/CD (30+)
        'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Jenkins', 'CircleCI', 'Travis CI', 'GitHub Actions', 'GitLab CI/CD', 
        'ArgoCD', 'Tekton', 'Spinnaker', 'Drone', 'TeamCity', 'Bamboo', 'Azure DevOps', 'Codefresh', 'Flux', 'Harness', 
        'Skaffold', 'Tilt', 'Telepresence', 'Kustomize', 'Kubectl', 'Helm', 'Docker Compose', 'Podman', 'Buildah', 
        'Skopeo', 'Kaniko',
      
        // Тестування (30+)
        'Jest', 'Vitest', 'Mocha', 'Chai', 'Jasmine', 'Karma', 'Cypress', 'Playwright', 'Selenium', 'Puppeteer', 
        'Testing Library', 'Detox', 'Appium', 'Espresso', 'XCUITest', 'JUnit', 'TestNG', 'Mockito', 'WireMock', 
        'Postman', 'Insomnia', 'SoapUI', 'Karate', 'RestAssured', 'Locust', 'JMeter', 'Gatling', 'k6', 'SonarQube', 
        'OWASP ZAP',
      
        // UI/UX & Дизайн (40+)
        'Figma', 'Adobe XD', 'Sketch', 'InVision', 'Zeplin', 'Framer', 'Webflow', 'Blender', 'Spline', 'Canva', 
        'Photoshop', 'Illustrator', 'After Effects', 'Premiere Pro', 'Cinema 4D', 'Maya', '3ds Max', 'Substance Painter', 
        'Unity UI', 'Unreal UMG', 'Chakra UI', 'Material UI', 'Ant Design', 'Tailwind CSS', 'Bootstrap', 'Bulma', 
        'Foundation', 'Semantic UI', 'Styled Components', 'Emotion', 'SASS', 'LESS', 'PostCSS', 'CSS Modules', 
        'CSS-in-JS', 'Vanilla Extract', 'Storybook', 'Figma API', 'Design Systems', 'Accessibility (a11y)',
      
        // Інше (50+)
        'Linux', 'Bash', 'Zsh', 'PowerShell', 'Nginx', 'Apache', 'HAProxy', 'Traefik', 'Caddy', 'WebSockets', 
        'gRPC', 'GraphQL', 'REST', 'OpenAPI', 'Swagger', 'PostgREST', 'tRPC', 'WebAssembly', 'Electron', 'Tauri', 
        'NW.js', 'Progressive Web Apps', 'Web Extensions', 'Web Components', 'Microfrontends', 'JAMstack', 'Headless CMS', 
        'Strapi', 'Contentful', 'Sanity', 'Ghost', 'WordPress', 'Drupal', 'Joomla', 'Shopify', 'Magento', 'WooCommerce', 
        'OAuth', 'JWT', 'OpenID Connect', 'SAML', 'LDAP', 'WebAuthn', 'OAuth 2.0', 'HTTP/2', 'HTTP/3', 'QUIC', 
        'gzip', 'Brotli', 'WebP', 'AVIF'
      ];

    const countryOptions = [
        'Україна', 'Польща', 'Німеччина', 'США', 'Великобританія',
        'Канада', 'Франція', 'Іспанія', 'Італія', 'Швеція'
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

                        {/* Телефон */}
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Телефон</Label>
                            <Input
                                id="phone"
                                type="tel"
                                className="mt-1 block w-full"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="+380 XX XXX XX XX"
                            />
                            <InputError className="mt-2" message={errors.phone} />
                        </div>

                        {/* Країна */}
                        <div className="grid gap-2">
                            <Label htmlFor="country">Країна</Label>
                            <select
                                id="country"
                                value={data.country}
                                onChange={(e) => setData('country', e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">Оберіть країну</option>
                                {countryOptions.map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                            <InputError className="mt-2" message={errors.country} />
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

                        {/* Досвід роботи */}
                        <div className="grid gap-2">
                            <Label htmlFor="work_experience">Досвід роботи</Label>
                            <textarea
                                id="work_experience"
                                className="flex h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={data.work_experience}
                                onChange={(e) => setData('work_experience', e.target.value)}
                                placeholder="Опишіть ваш досвід роботи"
                            />
                            <InputError className="mt-2" message={errors.work_experience} />
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

                        {/* Соціальні мережі */}
                        <div className="grid gap-2">
                            <Label>Соціальні мережі</Label>
                            <div className="flex gap-2">
                                <Input
                                    type="url"
                                    value={newSocialLink}
                                    onChange={(e) => setNewSocialLink(e.target.value)}
                                    placeholder="Додати посилання на соцмережу"
                                    className="flex-1"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={addSocialLink}
                                    disabled={!newSocialLink.trim()}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="mt-2 space-y-2">
                                {data.social_links.map((url) => (
                                    <div key={url} className="flex items-center justify-between rounded-md bg-gray-100 px-3 py-2 dark:bg-gray-800">
                                        <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                                            {url}
                                        </a>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6"
                                            onClick={() => removeSocialLink(url)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <InputError className="mt-2" message={errors.social_links} />
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