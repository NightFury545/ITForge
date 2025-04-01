import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Bar, BarChart, Pie, PieChart, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Link } from '@inertiajs/react'

interface PerformanceProfileProps {
    siteStats?: {
        totalUsers: number;
        activeProjects: number;
        completedProjects: number;
        totalTransactions: number;
        newUsersLastWeek: number;
        totalEarnings: number;
        pendingWithdrawals: number;
    };
    profile?: {
        position?: string;
        skills?: string[];
        currentProjects?: {
            id: string;
            name: string;
            progress: number;
            status: string;
        }[];
        walletBalance?: number;
        earnings?: {
            total: number;
            pending: number;
            lastMonth: number;
        };
    };
    projects?: {
        id: string;
        title: string;
        status: string;
        progress: number;
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
        activeProjects: 0,
        completedProjects: 0,
        totalTransactions: 0,
        newUsersLastWeek: 0,
        totalEarnings: 0,
        pendingWithdrawals: 0
    },
    profile: {
        position: 'Developer',
        skills: [],
        currentProjects: [],
        walletBalance: 0,
        earnings: {
            total: 0,
            pending: 0,
            lastMonth: 0
        }
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
                                               transactions = defaultProps.transactions
                                           }: PerformanceProfileProps) {
    const siteStatsData = [
        { name: "Total Users", value: siteStats.totalUsers },
        { name: "Active Projects", value: siteStats.activeProjects },
        { name: "Completed Projects", value: siteStats.completedProjects },
    ];

    const earningsData = [
        { name: "Total", value: profile.earnings?.total || 0 },
        { name: "Pending", value: profile.earnings?.pending || 0 },
        { name: "Last Month", value: profile.earnings?.lastMonth || 0 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    return (
        <AppLayout breadcrumbs={[{ title: 'Панель керування', href: '/dashboard' }]}>
            <Head title="Performance Profile" />

            <div className="space-y-6 ml-3 mr-3 mt-3 mb-3">
                {/* Site Statistics Header */}
                <div className="space-y-3">
                    <h2 className="text-2xl font-semibold tracking-tight">Site Statistics</h2>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="font-normal">
                            Total Users: {siteStats.totalUsers}
                        </Badge>
                        <Badge variant="secondary" className="font-normal">
                            Active Projects: {siteStats.activeProjects}
                        </Badge>
                        <Badge variant="secondary" className="font-normal">
                            New Users (Week): {siteStats.newUsersLastWeek}
                        </Badge>
                    </div>
                </div>

                {/* Site Stats Overview */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <StatCard label="Total Users" value={siteStats.totalUsers} trend="up" />
                    <StatCard label="Active Projects" value={siteStats.activeProjects} />
                    <StatCard label="Completed Projects" value={siteStats.completedProjects} />
                    <StatCard label="Total Transactions" value={siteStats.totalTransactions} />
                </div>

                {/* Site Analytics Section */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <ChartCard
                        title="Site Overview"
                        description="Key metrics distribution"
                    >
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={siteStatsData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {siteStatsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard
                        title="User Growth"
                        description="Weekly new users"
                    >
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={[
                                { week: 'Week 1', users: 15 },
                                { week: 'Week 2', users: 22 },
                                { week: 'Week 3', users: 18 },
                                { week: 'Week 4', users: 30 },
                            ]}>
                                <XAxis dataKey="week" />
                                <YAxis />
                                <Tooltip />
                                <Bar
                                    dataKey="users"
                                    fill="#8884d8"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard
                        title="Earnings Distribution"
                        description="Financial breakdown"
                    >
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={earningsData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {earningsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                {/* Wallet Balance Section */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle>Wallet Balance</CardTitle>
                                    <CardDescription>Available funds</CardDescription>
                                </div>
                                <Badge variant="default" className="text-lg px-4 py-1">
                                    ${profile.walletBalance?.toLocaleString()}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Total Earned</p>
                                    <p className="font-semibold">${profile.earnings?.total?.toLocaleString()}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Pending</p>
                                    <p className="font-semibold">${profile.earnings?.pending?.toLocaleString()}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Last Month</p>
                                    <p className="font-semibold">${profile.earnings?.lastMonth?.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Button variant="default" asChild>
                                    <Link href="/wallet/deposit">Deposit</Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/wallet/withdraw">Withdraw</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Performance Metrics</CardTitle>
                            <CardDescription>Key indicators</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <MetricItem
                                label="Project Completion"
                                value={75}
                                threshold={70}
                            />
                            <MetricItem
                                label="Client Satisfaction"
                                value={85}
                                threshold={80}
                            />
                            <MetricItem
                                label="On-Time Delivery"
                                value={90}
                                threshold={85}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Personal Projects Section */}
                <SectionWithViewAll title="My Projects" href="/projects">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Project</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Progress</TableHead>
                                <TableHead>Deadline</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
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
                                    <TableCell>
                                        <ProgressBar value={project.progress} />
                                    </TableCell>
                                    <TableCell>{new Date(project.deadline).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/projects/${project.id}`}>View</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </SectionWithViewAll>

                {/* Bids Section */}
                <SectionWithViewAll title="My Bids" href="/bids">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Project</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bids.slice(0, 5).map((bid) => (
                                <TableRow key={bid.id}>
                                    <TableCell className="font-medium">{bid.project_title}</TableCell>
                                    <TableCell>${bid.amount}</TableCell>
                                    <TableCell>
                                        <Badge variant={bid.status === 'accepted' ? 'default' : 'outline'}>
                                            {bid.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{new Date(bid.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/bids/${bid.id}`}>View</Link>
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
                                <TableHead>Project</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Period</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contracts.slice(0, 5).map((contract) => (
                                <TableRow key={contract.id}>
                                    <TableCell className="font-medium">{contract.project_title}</TableCell>
                                    <TableCell>${contract.amount}</TableCell>
                                    <TableCell>
                                        <Badge variant={contract.status === 'active' ? 'default' : 'secondary'}>
                                            {contract.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(contract.start_date).toLocaleDateString()} - {' '}
                                        {new Date(contract.end_date).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/contracts/${contract.id}`}>View</Link>
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
                                        <Badge variant={transaction.status === 'completed' ? 'default' : 'outline'}>
                                            {transaction.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {new Date(transaction.created_at).toLocaleDateString()}
                                    </TableCell>
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
function StatCard({ label, value, unit = "", trend }: { label: string; value: string | number; unit?: string; trend?: "up" | "down"; }) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardDescription className="text-sm">{label}</CardDescription>
                <div className="flex items-end justify-between">
                    <CardTitle className="text-2xl">
                        {value}
                        {unit && <span className="text-base text-muted-foreground">{unit}</span>}
                    </CardTitle>
                    {trend && (
                        <span className={`text-sm ${trend === "up" ? "text-green-500" : "text-red-500"}`}>
                            {trend === "up" ? "↑" : "↓"}
                        </span>
                    )}
                </div>
            </CardHeader>
        </Card>
    );
}

function ChartCard({ title, description, children, className = "" }: { title: string; description: string; children: React.ReactNode; className?: string; }) {
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

function MetricItem({ label, value, threshold, inverse = false }: { label: string; value: number; threshold: number; inverse?: boolean; }) {
    const isGood = inverse ? value <= threshold : value >= threshold;

    return (
        <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
                <span className="font-medium">{label}</span>
                <span className={`font-mono ${isGood ? "text-green-500" : "text-yellow-500"}`}>
                    {value}%
                </span>
            </div>
            <div className="relative h-2 w-full rounded-full bg-muted">
                <div
                    className="absolute left-0 top-0 h-2 rounded-full bg-primary"
                    style={{ width: `${value}%` }}
                />
                <div
                    className="absolute top-0 h-2 border-r-2 border-foreground"
                    style={{ left: `${threshold}%` }}
                />
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
                    {status && (
                        <Badge variant={status === 'completed' ? 'default' : 'secondary'}>
                            {status.replace('_', ' ')}
                        </Badge>
                    )}
                    <span className="text-muted-foreground">{value}%</span>
                </div>
            </div>
            <div className="relative h-2 w-full rounded-full bg-muted">
                <div
                    className="absolute left-0 top-0 h-2 rounded-full bg-primary"
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}

function ProgressBar({ value }: { value: number }) {
    return (
        <div className="flex items-center gap-2">
            <div className="relative h-2 w-full rounded-full bg-muted">
                <div
                    className="absolute left-0 top-0 h-2 rounded-full bg-primary"
                    style={{ width: `${value}%` }}
                />
            </div>
            <span className="text-sm text-muted-foreground">{value}%</span>
        </div>
    );
}

function SectionWithViewAll({ title, href, children, noPadding = false }: { title: string; href: string; children: React.ReactNode; noPadding?: boolean; }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{title}</h3>
                <Button variant="ghost" size="sm" asChild>
                    <Link href={href}>View All</Link>
                </Button>
            </div>
            <Card>
                <CardContent className={noPadding ? "p-0" : "pt-6"}>
                    {children}
                </CardContent>
            </Card>
        </div>
    );
}
