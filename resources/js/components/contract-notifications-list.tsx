import { usePage } from '@inertiajs/react';

export function ContractList( contracts ) {

    if (contracts.length === 0) {
        return <div className="p-4 text-sm text-gray-500">Немає нових контрактів</div>;
    }

    return (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-64 overflow-y-auto">
            {contracts.map(contract => (
                <li key={contract.id} className="p-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    <div className="font-medium">{contract.project.title}</div>
                    <div className="text-sm text-gray-500">Сума: ${contract.amount}</div>
                </li>
            ))}
        </ul>
    );
}
