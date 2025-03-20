import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ProjectCardProps } from '@/types';
import { Link } from '@inertiajs/react';
import { useEffect, useRef } from 'react';

export function ProjectCard({ title, description, budget, tech_stack, status, user }: ProjectCardProps) {
    const techScrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const techScrollElement = techScrollRef.current;

        const handleWheel = (event: WheelEvent) => {
            if (event.deltaY !== 0) {
                event.preventDefault();
                techScrollElement?.scrollBy({
                    left: event.deltaY < 0 ? -50 : 50,
                    behavior: 'smooth',
                });
            }
        };

        techScrollElement?.addEventListener('wheel', handleWheel);

        return () => {
            techScrollElement?.removeEventListener('wheel', handleWheel);
        };
    }, []);

    return (
        <Card className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border">
            <CardHeader>
                <CardTitle className="truncate">{title}</CardTitle>
                {/* Додано мінімальну висоту для опису */}
                <CardDescription className="line-clamp-3 min-h-[60px]">{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger>
                            <Avatar>
                                {user.avatar ? (
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                ) : (
                                    <AvatarFallback>
                                        {user.name ? user.name[0].toUpperCase() : 'U'} {/* Плейсхолдер, якщо аватар відсутній */}
                                    </AvatarFallback>
                                )}
                            </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{user.name}</p>
                        </TooltipContent>
                    </Tooltip>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        <Link href={`/users/${user.name}`} className="text-sm text-gray-600 hover:underline dark:text-gray-400">
                            {user.name}
                        </Link>
                    </span>
                </div>
                <div className="mt-4 text-lg font-bold text-gray-900 dark:text-gray-100">${budget}</div>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">Status: {status}</div>
                <div ref={techScrollRef} className="tech-scroll-container mt-4 flex gap-2 overflow-x-auto">
                    {tech_stack.map((tech, index) => (
                        <span
                            key={index}
                            className="flex items-center rounded-md border border-gray-400 bg-transparent px-3 py-1 text-sm text-gray-700 backdrop-blur-md dark:border-gray-500 dark:text-gray-300"
                        >
                            <span className="mr-1">#</span>
                            {tech}
                        </span>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
