'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import axios from 'axios';
import { format } from 'date-fns';
import { CheckCircle2Icon, CheckIcon, FileTextIcon, HandshakeIcon, StarIcon, XIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface ContractAgreementProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    project: {
        id: string;
        title: string;
        client: {
            name: string;
            avatar?: string;
        };
        project_deadline: string;
    };
    bid: {
        amount: number;
        developer_name: string;
        developer_avatar?: string;
    };
    contract?: {
        id: string;
        status: 'Активно' | 'Завершено' | 'Відхилено';
        signed_at?: string;
    };
    onConfirm: () => void;
    onComplete?: () => void;
    onCancel?: () => void;
}

export function ContractAgreement({ open, onOpenChange, project, bid, contract, onConfirm, onComplete, onCancel }: ContractAgreementProps) {
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);

    const reviewRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Не вказано';
        return format(new Date(dateString), 'dd.MM.yyyy HH:mm');
    };

    const getStatusBadge = () => {
        if (!contract) return null;

        switch (contract.status) {
            case 'Активно':
                return (
                    <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-green-800 dark:bg-green-900/80 dark:text-green-200">
                        <CheckIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">Активно</span>
                    </div>
                );
            case 'Завершено':
                return (
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-blue-800 dark:bg-blue-900/80 dark:text-blue-200">
                        <CheckCircle2Icon className="h-4 w-4" />
                        <span className="text-sm font-medium">Виконано</span>
                    </div>
                );
            case 'Відхилено':
                return (
                    <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-1.5 text-red-800 dark:bg-red-900/80 dark:text-red-200">
                        <XIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">Скасовано</span>
                    </div>
                );
            default:
                return null;
        }
    };

    const handleLeaveReview = () => {
        setShowReviewForm(true);
        setTimeout(() => {
            reviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            textareaRef.current?.focus();
        }, 100);
    };

    const handleSubmitReview = async () => {
        try {
            const response = await axios.post(
                '/reviews',
                {
                    contract_id: contract.id,
                    comment: reviewText,
                    rating: rating,
                },
                { withCredentials: true },
            );

            toast.success(response?.data?.message || 'Відгук успішно надіслано!');

            setShowReviewForm(false);
            setReviewText('');
            setRating(0);
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.error || 'Помилка при надсиланні відгуку');
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                className="scrollbar-hidden max-h-[90vh] overflow-hidden overflow-y-auto rounded-lg p-0 sm:max-w-2xl"
            >
                {/* Шапка */}
                <div onClick={(e) => e.stopPropagation()} className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-center">
                    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm">
                            <CheckIcon className="h-5 w-5 text-white" />
                            <span className="font-mono tracking-wider text-white">
                                {contract ? `CONTRACT-${contract.id.slice(0, 8).toUpperCase()}` : `PROJECT-${project.id.slice(0, 8).toUpperCase()}`}
                            </span>
                        </div>
                        {getStatusBadge()}
                    </div>
                </div>

                {/* Учасники */}
                <div className="grid grid-cols-3 items-center gap-6 p-6">
                    <div className="text-center">
                        <Avatar className="mx-auto mb-3 h-20 w-20 border-2 border-blue-500">
                            <AvatarImage src={project.client.avatar} />
                            <AvatarFallback className="bg-blue-100 text-2xl font-bold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                {project.client.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <h3 className="text-lg font-bold dark:text-white">Замовник</h3>
                        <p className="font-medium text-blue-600 dark:text-blue-400">{project.client.name}</p>
                    </div>

                    <div className="flex justify-center">
                        <div className="inline-flex items-center justify-center rounded-full bg-blue-100 p-5 dark:bg-blue-900/50">
                            <HandshakeIcon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>

                    <div className="text-center">
                        <Avatar className="mx-auto mb-3 h-20 w-20 border-2 border-green-500">
                            <AvatarImage src={bid.developer_avatar} />
                            <AvatarFallback className="bg-green-100 text-2xl font-bold text-green-800 dark:bg-green-900 dark:text-green-200">
                                {bid.developer_name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <h3 className="text-lg font-bold dark:text-white">Розробник</h3>
                        <p className="font-medium text-green-600 dark:text-green-400">{bid.developer_name}</p>
                    </div>
                </div>

                {/* Деталі */}
                <div className="border-t border-b border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-700/50">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold dark:text-white">
                        <FileTextIcon className="h-5 w-5 text-blue-500" />
                        Деталі угоди
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Проєкт</p>
                            <p className="font-medium dark:text-white">{project.title}</p>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Сума</p>
                            <p className="font-medium text-blue-600 dark:text-blue-400">{bid.amount} ₴</p>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Термін</p>
                            <p className="font-medium dark:text-white">
                                {formatDate(project.project_deadline)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Умови */}
                <div className="p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold dark:text-white">
                        <FileTextIcon className="h-5 w-5 text-blue-500" />
                        Умови співпраці
                    </h3>
                    <ol className="space-y-3">
                        {[
                            "Замовник зобов'язується надати всі необхідні матеріали",
                            'Розробник гарантує якість виконаних робіт',
                            'Оплата проводиться через платформу',
                            'У разі суперечок - переговори',
                            'Контракт може бути розірваний за згодою сторін',
                        ].map((item, index) => (
                            <li key={index} className="flex gap-3">
                                <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                    {index + 1}
                                </span>
                                <span className="dark:text-gray-300">{item}</span>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Кнопки */}
                <div className="flex flex-col items-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-700/50">
                    {!contract ? (
                        <div className="flex gap-4">
                            <button
                                onClick={() => onOpenChange(false)}
                                className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Відхилити
                            </button>
                            <button
                                onClick={onConfirm}
                                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2 text-white shadow-md transition-all hover:from-blue-600 hover:to-blue-700"
                            >
                                <CheckIcon className="h-5 w-5" />
                                Підписати контракт
                            </button>
                        </div>
                    ) : contract.status === 'Активно' ? (
                        <div className="flex gap-4">
                            <button
                                onClick={onCancel}
                                className="flex items-center gap-2 rounded-lg border border-red-300 px-6 py-2 text-red-700 transition-colors hover:bg-red-50 dark:border-red-600 dark:text-red-300 dark:hover:bg-red-900/50"
                            >
                                <XIcon className="h-5 w-5" />
                                Скасувати контракт
                            </button>
                            <button
                                onClick={onComplete}
                                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-6 py-2 text-white shadow-md transition-all hover:from-green-600 hover:to-green-700"
                            >
                                <CheckCircle2Icon className="h-5 w-5" />
                                Завершити контракт
                            </button>
                        </div>
                    ) : (
                        !showReviewForm && (
                            <button onClick={handleLeaveReview} className="rounded-md bg-yellow-500 px-5 py-2 text-white hover:bg-yellow-600">
                                Залишити відгук
                            </button>
                        )
                    )}
                </div>

                {/* Форма відгуку */}
                {showReviewForm && (
                    <div ref={reviewRef} className="border-t border-gray-300 p-6 dark:border-gray-700">
                        <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Залишити відгук</h3>
                        <div className="mb-3 flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <StarIcon
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={`h-6 w-6 cursor-pointer ${rating >= star ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
                                />
                            ))}
                        </div>
                        <textarea
                            ref={textareaRef}
                            rows={4}
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Ваш відгук..."
                            className="w-full resize-none rounded-lg border border-gray-300 p-3 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                        />
                        <div className="mt-4 flex justify-end gap-3">
                            <button
                                onClick={() => setShowReviewForm(false)}
                                className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Скасувати
                            </button>
                            <button onClick={handleSubmitReview} className="rounded-md bg-blue-600 px-5 py-2 text-sm text-white hover:bg-blue-700">
                                Надіслати
                            </button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
