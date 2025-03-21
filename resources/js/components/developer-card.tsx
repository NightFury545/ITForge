import { StarIcon } from '@heroicons/react/24/solid';
import { type User } from '@/types';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface DeveloperCardProps {
    developer: User;
    projectsCount: number;
    averageRating: number;
}

export default function DeveloperCard({ developer, projectsCount, averageRating }: DeveloperCardProps) {
    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border p-6 w-full max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Перший стовпчик: Аватарка, ім'я, біографія */}
                <div className="col-span-1">
                    <div className="flex items-center gap-4">
                        <Tooltip>
                            <TooltipTrigger>
                                <Avatar>
                                    {developer.avatar ? (
                                        <AvatarImage src={developer.avatar} alt={developer.name} />
                                    ) : (
                                        <AvatarFallback>
                                            {developer.name ? developer.name[0].toUpperCase() : 'U'}
                                        </AvatarFallback>
                                    )}
                                </Avatar>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{developer.name}</p>
                            </TooltipContent>
                        </Tooltip>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-xl font-semibold truncate">{developer.name}</h2>
                            <p className="text-sm text-gray-500 truncate">{developer.user_type ?? 'Невідомий тип'}</p>
                        </div>
                    </div>
                    {developer.bio && (
                        <p className="mt-4 text-sm text-gray-600">{developer.bio}</p>
                    )}
                </div>

                {/* Другий стовпчик: Навички */}
                <div className="col-span-1">
                    <h3 className="font-semibold">Навички:</h3>
                    {developer.skills && developer.skills.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {developer.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="rounded bg-gray-200 px-2 py-1 text-sm dark:bg-gray-700 truncate"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 italic">Навички не вказані</p>
                    )}
                </div>

                {/* Третій стовпчик: Проекти та рейтинг */}
                <div className="col-span-1">
                    <div className="mt-4">
                        <span className="font-semibold">Проекти:</span>
                        <span className="ml-2 text-sm text-gray-500">
                            {projectsCount} завершених
                        </span>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                        <span className="font-semibold">Рейтинг:</span>
                        <div className="flex items-center flex-wrap">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <StarIcon
                                    key={star}
                                    className={`h-5 w-5 ${
                                        star <= Math.round(averageRating)
                                            ? 'text-yellow-400'
                                            : 'text-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-gray-500">
                            ({(+averageRating).toFixed(1)})
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
