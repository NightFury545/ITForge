import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Bar, BarChart, Pie, PieChart, Cell, ResponsiveContainer } from "recharts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Performance Profile', href: '/profile' },
];

export default function PerformanceProfile() {
  // Data
  const profileStats = {
    position: "Senior Frontend Developer",
    totalProjects: 23,
    completedProjects: 12,
    totalDeployments: 35,
    averageRating: 4.3,
    engagementPeriod: "23 months",
    skills: ["React", "TypeScript", "Node.js", "UI/UX", "Database"],
    performance: {
      codeQuality: 92,
      deliveryTime: 75,
      clientSatisfaction: 88,
      bugRate: 15,
    },
    currentProjects: [
      { name: "Platform Redesign", progress: 85 },
      { name: "API Optimization", progress: 45 },
      { name: "Dashboard Analytics", progress: 72 },
    ]
  };

  const projectsData = [
    { name: "Completed", value: profileStats.completedProjects },
    { name: "In Progress", value: 4 },
    { name: "Planned", value: 7 },
  ];

  const deploymentData = [
    { month: "Jan", deployments: 3 },
    { month: "Feb", deployments: 6 },
    { month: "Mar", deployments: 4 },
    { month: "Apr", deployments: 8 },
    { month: "May", deployments: 5 },
    { month: "Jun", deployments: 9 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Performance Profile" />
      
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Developer Performance Metrics</h2>
            <Badge variant="outline" className="text-sm">
              {profileStats.position}
            </Badge>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {profileStats.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="font-normal">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard label="Total Projects" value={profileStats.totalProjects} trend="up" />
          <StatCard label="Successful Deploys" value={profileStats.totalDeployments} />
          <StatCard label="Average Rating" value={profileStats.averageRating} unit="/5" />
          <StatCard label="Engagement" value={profileStats.engagementPeriod} />
        </div>

        {/* Analytics Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ChartCard 
            title="Project Distribution" 
            description="Current workload breakdown"
          >
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={projectsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {projectsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Deployment Frequency"
            description="Monthly deployment history"
          >
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={deploymentData}>
                <Bar 
                  dataKey="deployments" 
                  fill="#8884d8" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Active Projects"
            description="Current progress status"
            className="lg:col-span-1"
          >
            <div className="space-y-4">
              {profileStats.currentProjects.map((project) => (
                <ProgressItem 
                  key={project.name}
                  label={project.name}
                  value={project.progress}
                />
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Performance Metrics */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity Log</CardTitle>
              <CardDescription>Operational timeline</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { 
                  action: "Platform Redesign v1.2 deployed", 
                  timestamp: "2023-06-15T14:32:00Z",
                  status: "deployment" 
                },
                { 
                  action: "Code review completed", 
                  timestamp: "2023-06-14T09:15:00Z",
                  status: "review" 
                },
                { 
                  action: "Critical bug hotfix", 
                  timestamp: "2023-06-12T18:45:00Z",
                  status: "maintenance" 
                },
              ].map((item, index) => (
                <ActivityItem 
                  key={index}
                  action={item.action}
                  timestamp={item.timestamp}
                  status={item.status}
                />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quality Metrics</CardTitle>
              <CardDescription>Performance indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <MetricItem 
                label="Code Quality Score" 
                value={profileStats.performance.codeQuality} 
                threshold={85} 
              />
              <MetricItem 
                label="Delivery Efficiency" 
                value={profileStats.performance.deliveryTime} 
                threshold={75} 
              />
              <MetricItem 
                label="Client Satisfaction" 
                value={profileStats.performance.clientSatisfaction} 
                threshold={85} 
              />
              <MetricItem 
                label="Defect Density" 
                value={profileStats.performance.bugRate} 
                threshold={15} 
                inverse 
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

// Reusable Components
function StatCard({ 
  label, 
  value, 
  unit = "",
  trend
}: { 
  label: string; 
  value: string | number;
  unit?: string;
  trend?: "up" | "down";
}) {
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
            <span className={`text-sm ${
              trend === "up" ? "text-green-500" : "text-red-500"
            }`}>
              {trend === "up" ? "↑" : "↓"}
            </span>
          )}
        </div>
      </CardHeader>
    </Card>
  );
}

function ChartCard({ 
  title, 
  description, 
  children,
  className = ""
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

function ActivityItem({ 
  action, 
  timestamp,
  status
}: { 
  action: string; 
  timestamp: string;
  status: "deployment" | "review" | "maintenance";
}) {
  const statusIcons = {
    deployment: "🟢",
    review: "🔵",
    maintenance: "🟡"
  };

  const date = new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-sm">{statusIcons[status]}</span>
      <div className="flex-1">
        <p className="text-sm font-medium">{action}</p>
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>
    </div>
  );
}

function MetricItem({ 
  label, 
  value, 
  threshold, 
  inverse = false 
}: { 
  label: string; 
  value: number; 
  threshold: number;
  inverse?: boolean;
}) {
  const isGood = inverse ? value <= threshold : value >= threshold;
  
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className={`font-mono ${
          isGood ? "text-green-500" : "text-yellow-500"
        }`}>
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

function ProgressItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">{value}%</span>
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