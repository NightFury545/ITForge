import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ProjectCardProps {
    title: string;
    description: string;
    author: {
        name: string;
        avatar: string;
        bio: string;
    };
    price: number;
}

export function ProjectCard({ title, description, author, price }: ProjectCardProps) {
    return (
        <Card className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger>
                            <Avatar>
                                <AvatarImage src={author.avatar} alt={author.name} />
                                <AvatarFallback>{author.name[0]}</AvatarFallback>
                            </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{author.name}</p>
                            <p className="text-sm text-gray-500">{author.bio}</p>
                        </TooltipContent>
                    </Tooltip>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{author.name}</span>
                </div>
                <div className="mt-4 text-lg font-bold text-gray-900 dark:text-gray-100">
                    ${price}
                </div>
            </CardContent>
        </Card>
    );
}