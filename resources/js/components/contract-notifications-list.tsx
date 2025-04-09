import { cn } from '@/lib/utils';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { ContractAgreement } from './contract-agreement';

interface NotificationContract {
    id: string;
    message: string;
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
    created_at: string;
    is_read: boolean;
    contract?: {
        id: string;
        status: 'active' | 'completed' | 'cancelled';
        signed_at?: string;
    };
}

export function ContractList({ contracts }: { contracts: NotificationContract[] }) {
    const [selectedContract, setSelectedContract] = useState<NotificationContract | null>(null);

    const completeContract = async (contractId: string) => {
        try {
            const response = await axios.post(`/contracts/${contractId}/complete`, {}, { withCredentials: true });

            toast.success(response.data.message || 'Контракт успішно завершено');

            setSelectedContract(null);
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Не вдалося завершити контракт');
        }
    };

    const cancelContract = async (contractId: string) => {
        try {
            const response = await axios.post(`/contracts/${contractId}/cancel`);

            toast.success(response.data.message || 'Контракт успішно скасовано');

            setSelectedContract(null);
        } catch (error: any) {

            toast.error(error.response?.data?.error || 'Не вдалося скасувати контракт');
        }
    };

    if (contracts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-2 p-6 sm:p-8">
                <span className="text-muted-foreground text-sm sm:text-base">Немає нових повідомлень</span>
                <span className="text-muted-foreground/60 text-xs">Нові сповіщення з'являться тут</span>
            </div>
        );
    }

    return (
        <>
            <ul className="scrollbar-hidden divide-border max-h-[60vh]! divide-y overflow-y-auto sm:max-h-[500px]">
                {contracts.map((contract) => (
                    <li
                        key={contract.id}
                        className={cn('hover:bg-accent/50 group cursor-pointer p-3 transition-colors sm:p-4', !contract.is_read && 'bg-accent/20')}
                        onClick={(e) => {
                            e.stopPropagation(); // Зупиняємо спливання
                            setSelectedContract(contract);
                        }}
                    >
                        <div className="flex flex-col gap-1.5">
                            <div className="group-hover:text-primary line-clamp-2 text-sm font-medium sm:text-base">{contract.message}</div>
                            <div className="xs:flex-row xs:justify-between xs:items-center flex flex-col gap-1">
                                <span className="text-muted-foreground truncate text-xs sm:text-sm">{contract.project.title}</span>
                                <span className="text-primary text-xs font-medium sm:text-sm">${contract.amount.toLocaleString()}</span>
                            </div>
                            <div className="text-muted-foreground/60 mt-1 text-xs">
                                {new Date(contract.created_at).toLocaleString('uk-UA', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {selectedContract && (
                <ContractAgreement
                    open={!!selectedContract}
                    onOpenChange={(open) => !open && setSelectedContract(null)}
                    project={selectedContract.project}
                    bid={selectedContract.bid}
                    contract={selectedContract.contract}
                    onConfirm={() => {
                        setSelectedContract(null);
                    }}
                    onComplete={() => completeContract(selectedContract.contract.id)}
                    onCancel={() => cancelContract(selectedContract.contract.id)}
                />
            )}
        </>
    );
}
