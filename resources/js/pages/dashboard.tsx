import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell, Legend,
    Pie,
    PieChart, RadialBar, RadialBarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

interface PerformanceProfileProps {
    siteStats?: {
        totalUsers: number;
        totalProjects: number;
        totalChats: number;
        totalTransactions: number;
        newUsersLastWeek: number;
        totalDeposits: number,
        totalPayments: number,
        totalWithdrawals: number,
        pendingWithdrawals: number;
        inProgressProjects: number;
        openedProjects: number;
        completedProjects: number;
        projectsCreatedOverTime: [
            {
                date: string;
                projects: number;
            }
        ]
    };
    profile?: {
        position?: string;
        skills?: string[];
        currentProjects?: {
            id: string;
            name: string;
            budget: number;
            status: string;
        }[];
        walletBalance?: number;
        earnings?: {
            total: number;
            spent: number;
            lastMonthEarned: number;
            lastMonthSpent: number;
            deposit: number;
            lastMonthDeposit: number;
        };
    };
    projects?: {
        id: string;
        title: string;
        status: string;
        budget: number;
        deadline: string;
    }[];
    bids?: {
        id: string;
        project_id: string;
        project_title: string;
        amount: number;
        status: string;
        created_at: string;
    }[];
    contracts?: {
        id: string;
        project_id: string;
        project_title: string;
        amount: number;
        status: string;
        start_date: string;
        end_date: string;
    }[];
    transactions?: {
        id: string;
        type: string;
        amount: number;
        status: string;
        created_at: string;
    }[];
}

const defaultProps = {
    siteStats: {
        totalUsers: 0,
        totalProjects: 0,
        totalChats: 0,
        totalTransactions: 0,
        newUsersLastWeek: 0,
        totalDeposits: 0,
        totalPayments: 0,
        totalWithdrawals: 0,
        pendingWithdrawals: 0,
        inProgressProjects: 0,
        openedProjects: 0,
        completedProjects: 0,
    },
    profile: {
        position: 'Developer',
        skills: [],
        currentProjects: [],
        walletBalance: 0,
        earnings: {
            total: 0,
            spent: 0,
            lastMonthEarned: 0,
            lastMonthSpent: 0,
            deposit: 0,
            lastMonthDeposit: 0,
        },
    },
    projects: [],
    bids: [],
    contracts: [],
    transactions: [],
};

export default function PerformanceProfile({
    siteStats = defaultProps.siteStats,
    profile = defaultProps.profile,
    projects = defaultProps.projects,
    bids = defaultProps.bids,
    contracts = defaultProps.contracts,
    transactions = defaultProps.transactions,
}: PerformanceProfileProps) {
    const siteStatsData = [
        { name: 'Кількість користувачів', value: siteStats.totalUsers },
        { name: 'Кількість проєктів', value: siteStats.totalProjects },
        { name: 'Кількість чатів', value: siteStats.totalChats },
    ];

    const earningsData = [
        { name: 'Депозит', value: siteStats.totalDeposits },
        { name: 'Переказ', value: siteStats.totalPayments },
        { name: 'Виплата', value: siteStats.totalWithdrawals },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    return (
        <AppLayout breadcrumbs={[{ title: 'Панель керування', href: '/dashboard' }]}>
            <Head title="Performance Profile" />

            <div className="mt-3 mr-3 mb-3 ml-3 space-y-6">
                {/* Site Statistics Header */}
                <div className="space-y-3">
                    <h2 className="text-2xl font-semibold tracking-tight">Статистика сайту</h2>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="font-normal">
                            Кількість користувачів: {siteStats.totalUsers}
                        </Badge>
                        <Badge variant="secondary" className="font-normal">
                            Кількість проєктів: {siteStats.totalProjects}
                        </Badge>
                        <Badge variant="secondary" className="font-normal">
                            Кількість нових користувачів (Тиждень): {siteStats.newUsersLastWeek}
                        </Badge>
                    </div>
                </div>

                {/* Site Stats Overview */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <StatCard label="Кількість користувачів" value={siteStats.totalUsers} trend="up" />
                    <StatCard label="Кількість проєктів" value={siteStats.totalProjects} />
                    <StatCard label="Кількість чатів" value={siteStats.totalChats} />
                    <StatCard label="Кількість транзакцій" value={siteStats.totalTransactions} />
                </div>

                {/* Site Analytics Section */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <ChartCard title="Огляд сайту" description="Розподіл ключових показників" compact>
                        <div className="flex h-64">
                            {/* Donut Chart */}
                            <div className="w-1/2">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={siteStatsData.filter((item) => item.value > 0)}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            innerRadius={50}
                                            paddingAngle={2}
                                            dataKey="value"
                                            label={false}
                                        >
                                            {siteStatsData
                                                .filter((item) => item.value > 0)
                                                .map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#fff" strokeWidth={1} />
                                                ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Color indicators with values */}
                            <div className="flex w-1/2 flex-col justify-center pl-4">
                                {siteStatsData.map((item, index) => {
                                    const total = siteStatsData.reduce((sum, i) => sum + i.value, 0);
                                    const percent = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;

                                    return (
                                        <div key={index} className="mb-3 flex items-center">
                                            <div
                                                className="mr-2 h-3 w-3 flex-shrink-0 rounded-full"
                                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                            />
                                            <div className="text-sm text-gray-700">
                                                <span className="font-medium">{item.name}</span>: {item.value} ({percent}%)
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </ChartCard>

                    <ChartCard title="Проекти, створені з часом" description="Кількість проектів, створених на кожну дату">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={siteStats.projectsCreatedOverTime} margin={{ top: 10, right: 20, left: 0, bottom: 30 }}>
                                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />

                                <XAxis dataKey="date" tick={{ fill: '#fff', fontSize: 8 }} angle={-45} textAnchor="end" interval={1} />
                                <YAxis tick={{ fill: '#fff' }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1a202c',
                                        color: '#fff',
                                        borderRadius: '8px',
                                        padding: '8px 12px',
                                    }}
                                />
                                <Bar dataKey="projects" fill="#4F46E5" radius={[6, 6, 0, 0]} animationDuration={1000} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard
                        title="Загальний обсяг грошей"
                        description="Порівняння загальних сум депозитів, переказів і виплат за останній період."
                    >
                        <ResponsiveContainer width="90%" height={300}>
                            <BarChart data={earningsData} margin={{ top: 20, right: 0, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                                <XAxis dataKey="name" tick={{ fill: '#fff', fontSize: 10 }} />
                                <YAxis domain={[0, Math.max(...earningsData.map((d) => d.value), 10)]} tick={{ fill: '#fff' }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                                        color: '#fff',
                                        borderRadius: '6px',
                                        padding: '8px 12px',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
                                    }}
                                    cursor={{ fill: 'rgba(0, 0, 0, 0.2)' }}
                                />
                                <Bar dataKey="value" fill="#4F46E5" radius={[10, 10, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                {/* Wallet Balance Section */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Баланс гаманця</CardTitle>
                                    <CardDescription>Наявні кошти</CardDescription>
                                </div>
                                <Badge variant="default" className="px-4 py-1 text-lg">
                                    ${profile.walletBalance?.toLocaleString()}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4 grid grid-cols-3 gap-4">
                                <div className="space-y-1">
                                    <p className="text-muted-foreground text-sm">Всього зароблено</p>
                                    <p className="font-semibold">${profile.earnings?.total?.toLocaleString()}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-muted-foreground text-sm">Всього витрачено</p>
                                    <p className="font-semibold">${profile.earnings?.spent?.toLocaleString()}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-muted-foreground text-sm">Всього поповнено</p>
                                    <p className="font-semibold">${profile.earnings?.deposit.toLocaleString()}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-muted-foreground text-sm">Останній місяць (зароблено)</p>
                                    <p className="font-semibold">${profile.earnings?.lastMonthEarned?.toLocaleString()}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-muted-foreground text-sm">Останній місяць (витрачено)</p>
                                    <p className="font-semibold">${profile.earnings?.lastMonthSpent?.toLocaleString()}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-muted-foreground text-sm">Останній місяць (поповнено)</p>
                                    <p className="font-semibold">${profile.earnings?.lastMonthDeposit?.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Button variant="default" asChild>
                                    <Link href="/deposit">Депозит</Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/withdraw">Зняти кошти</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Показники ефективності</CardTitle>
                            <CardDescription>Ключові показники</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <MetricItem
                                label="Активні проєкти"
                                value={
                                    siteStats.totalProjects > 0
                                        ? (((siteStats.inProgressProjects ?? 0) / siteStats.totalProjects) * 100).toFixed(1)
                                        : 0
                                }
                            />
                            <MetricItem
                                label="Відкриті проєкти"
                                value={
                                    siteStats.totalProjects > 0 ? (((siteStats.openedProjects ?? 0) / siteStats.totalProjects) * 100).toFixed(1) : 0
                                }
                            />
                            <MetricItem
                                label="Завершені проєкти"
                                value={
                                    siteStats.totalProjects > 0
                                        ? (((siteStats.completedProjects ?? 0) / siteStats.totalProjects) * 100).toFixed(1)
                                        : 0
                                }
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Personal Projects Section */}
                <SectionWithViewAll title="Мої проєкти" href="/projects">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Проєкт</TableHead>
                                <TableHead>Статус</TableHead>
                                <TableHead>Бюджет</TableHead>
                                <TableHead>Дедлайн</TableHead>
                                <TableHead className="text-right">Дії</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.slice(0, 5).map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell className="font-medium">{project.title}</TableCell>
                                    <TableCell>
                                        <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                                            {project.status.replace('_', ' ')}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>${(+project.budget).toFixed(2)}</TableCell>
                                    <TableCell>{new Date(project.deadline).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/projects/${project.id}`}>Переглянути</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </SectionWithViewAll>

                {/* Bids Section */}
                <SectionWithViewAll title="Мої ставки" href="/bids">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Проєкт</TableHead>
                                <TableHead>Сума</TableHead>
                                <TableHead>Статус</TableHead>
                                <TableHead>Дата</TableHead>
                                <TableHead className="text-right">Дії</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bids.slice(0, 5).map((bid) => (
                                <TableRow key={bid.id}>
                                    <TableCell className="font-medium">{bid.project_title}</TableCell>
                                    <TableCell>${bid.amount}</TableCell>
                                    <TableCell>
                                        <Badge variant={bid.status === 'accepted' ? 'default' : 'outline'}>{bid.status}</Badge>
                                    </TableCell>
                                    <TableCell>{new Date(bid.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/projects/${bid.project_id}`}>Переглянути</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </SectionWithViewAll>

                {/* Contracts Section */}
                <SectionWithViewAll title="My Contracts" href="/contracts">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Проєкт</TableHead>
                                <TableHead>Сума</TableHead>
                                <TableHead>Статус</TableHead>
                                <TableHead>Period</TableHead>
                                <TableHead className="text-right">Дії</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contracts.slice(0, 5).map((contract) => (
                                <TableRow key={contract.id}>
                                    <TableCell className="font-medium">{contract.project_title}</TableCell>
                                    <TableCell>${contract.amount}</TableCell>
                                    <TableCell>
                                        <Badge variant={contract.status === 'active' ? 'default' : 'secondary'}>{contract.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(contract.start_date).toLocaleDateString()} - {new Date(contract.end_date).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/contracts/${contract.id}`}>Переглянути</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </SectionWithViewAll>

                {/* Transactions Section */}
                <SectionWithViewAll title="Recent Transactions" href="/transactions">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.slice(0, 5).map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell className="capitalize">{transaction.type}</TableCell>
                                    <TableCell className={transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'}>
                                        ${transaction.amount}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={transaction.status === 'completed' ? 'default' : 'outline'}>{transaction.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">{new Date(transaction.created_at).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </SectionWithViewAll>
            </div>
        </AppLayout>
    );
}

// Reusable Components
function StatCard({ label, value, unit = '', trend }: { label: string; value: string | number; unit?: string; trend?: 'up' | 'down' }) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardDescription className="text-sm">{label}</CardDescription>
                <div className="flex items-end justify-between">
                    <CardTitle className="text-2xl">
                        {value}
                        {unit && <span className="text-muted-foreground text-base">{unit}</span>}
                    </CardTitle>
                    {trend && <span className={`text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>{trend === 'up' ? '↑' : '↓'}</span>}
                </div>
            </CardHeader>
        </Card>
    );
}

function ChartCard({
    title,
    description,
    children,
    className = '',
}: {
    title: string;
    description: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className="text-base">{title}</CardTitle>
                <CardDescription className="text-sm">{description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">{children}</CardContent>
        </Card>
    );
}

function MetricItem({ label, value, threshold, inverse = false }: { label: string; value: number; threshold: number; inverse?: boolean }) {
    const isGood = inverse ? value <= threshold : value >= threshold;

    return (
        <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
                <span className="font-medium">{label}</span>
                <span className={`font-mono ${isGood ? 'text-green-500' : 'text-yellow-500'}`}>{value}%</span>
            </div>
            <div className="bg-muted relative h-2 w-full rounded-full">
                <div className="bg-primary absolute top-0 left-0 h-2 rounded-full" style={{ width: `${value}%` }} />
                <div className="border-foreground absolute top-0 h-2 border-r-2" style={{ left: `${threshold}%` }} />
            </div>
        </div>
    );
}

function ProgressItem({ label, value, status }: { label: string; value: number; status?: string }) {
    return (
        <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
                <span className="font-medium">{label}</span>
                <div className="flex items-center gap-2">
                    {status && <Badge variant={status === 'completed' ? 'default' : 'secondary'}>{status.replace('_', ' ')}</Badge>}
                    <span className="text-muted-foreground">{value}%</span>
                </div>
            </div>
            <div className="bg-muted relative h-2 w-full rounded-full">
                <div className="bg-primary absolute top-0 left-0 h-2 rounded-full" style={{ width: `${value}%` }} />
            </div>
        </div>
    );
}

function ProgressBar({ value }: { value: number }) {
    return (
        <div className="flex items-center gap-2">
            <div className="bg-muted relative h-2 w-full rounded-full">
                <div className="bg-primary absolute top-0 left-0 h-2 rounded-full" style={{ width: `${value}%` }} />
            </div>
            <span className="text-muted-foreground text-sm">{value}%</span>
        </div>
    );
}

function SectionWithViewAll({
    title,
    href,
    children,
    noPadding = false,
}: {
    title: string;
    href: string;
    children: React.ReactNode;
    noPadding?: boolean;
}) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{title}</h3>
                <Button variant="ghost" size="sm" asChild>
                    <Link href={href}>View All</Link>
                </Button>
            </div>
            <Card>
                <CardContent className={noPadding ? 'p-0' : 'pt-6'}>{children}</CardContent>
            </Card>
        </div>
    );
}
