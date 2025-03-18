import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ProjectCardProps } from '@/types';

export function ProjectCard({ title, description, budget, tech_stack, status, user }: ProjectCardProps) {
    return (
        <Card className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border">
            <CardHeader>
                <CardTitle className="truncate">{title}</CardTitle>
                <CardDescription className="line-clamp-3">{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger>
                            <Avatar>
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{user.name}</p>
                        </TooltipContent>
                    </Tooltip>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{user.name}</span>
                </div>
                <div className="mt-4 text-lg font-bold text-gray-900 dark:text-gray-100">
                    ${budget}
                </div>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Status: {status}
                </div>
                <div className="mt-4 flex gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
                    {tech_stack.map((tech, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 text-sm flex items-center border border-gray-400 dark:border-gray-500 rounded-md backdrop-blur-md bg-transparent text-gray-700 dark:text-gray-300"
                        >
                            <span className="mr-1">#</span>{tech}
                        </span>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
