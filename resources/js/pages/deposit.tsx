import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { CreditCard, Wallet, Smartphone, Banknote, Bitcoin } from 'lucide-react'; 


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Поповнення',
        href: '/deposit',
    },
];

export default function PaymentPage() {
    const [selectedMethod, setSelectedMethod] = useState(null);

    const paymentMethods = [
        { id: 'creditcard', icon: <CreditCard className="w-5 h-5" />, label: 'Credit Card' },
        { id: 'wallet', icon: <Wallet className="w-5 h-5" />, label: 'Wallet' },
        { id: 'smartphone', icon: <Smartphone className="w-5 h-5" />, label: 'Mobile Payment' },
        { id: 'banknote', icon: <Banknote className="w-5 h-5" />, label: 'Bank Transfer' },
        { id: 'bitcoin', icon: <Bitcoin className="w-5 h-5" />, label: 'Bitcoin' },
    ];

    const renderAdditionalFields = () => {
        switch (selectedMethod) {
            case 'creditcard':
                return (
                    <div className="mt-6">
                        <Label htmlFor="cardNumber" className="block text-sm font-medium text-gray-400 mb-2">Номер картки</Label>
                        <Input
                            id="cardNumber"
                            type="text"
                            className="w-full rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Введіть номер картки"
                        />
                        <Label htmlFor="expiryDate" className="block text-sm font-medium text-gray-400 mb-2 mt-4">Термін дії</Label>
                        <Input
                            id="expiryDate"
                            type="text"
                            className="w-full rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="MM/YY"
                        />
                        <Label htmlFor="cvv" className="block text-sm font-medium text-gray-400 mb-2 mt-4">CVV</Label>
                        <Input
                            id="cvv"
                            type="text"
                            className="w-full rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="CVV"
                        />
                    </div>
                );
            case 'wallet':
                return (
                    <div className="mt-6">
                        <Label htmlFor="walletAddress" className="block text-sm font-medium text-gray-400 mb-2">Адреса гаманця</Label>
                        <Input
                            id="walletAddress"
                            type="text"
                            className="w-full rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Введіть адресу гаманця"
                        />
                    </div>
                );
            case 'smartphone':
                return (
                    <div className="mt-6">
                        <Label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-400 mb-2">Номер телефону</Label>
                        <Input
                            id="phoneNumber"
                            type="text"
                            className="w-full rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Введіть номер телефону"
                        />
                    </div>
                );
            case 'banknote':
                return (
                    <div className="mt-6">
                        <Label htmlFor="accountNumber" className="block text-sm font-medium text-gray-400 mb-2">Номер рахунку</Label>
                        <Input
                            id="accountNumber"
                            type="text"
                            className="w-full rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Введіть номер рахунку"
                        />
                    </div>
                );
            case 'bitcoin':
                return (
                    <div className="mt-6">
                        <Label htmlFor="bitcoinAddress" className="block text-sm font-medium text-gray-400 mb-2">Адреса Bitcoin</Label>
                        <Input
                            id="bitcoinAddress"
                            type="text"
                            className="w-full rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Введіть адресу Bitcoin"
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-col gap-6 p-6 text-white">
                <h1 className="text-3xl font-bold text-white"></h1>

                <Card className="w-full max-w-lg mx-auto p-6 shadow-lg rounded-lg border border-gray-800 bg-gray-800">
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-bold text-white">Дані про оплату</h2>
                    </div>

                    <div className="mb-6">
                        <Label htmlFor="amount" className="block text-sm font-medium text-gray-400 mb-2">Сума</Label>
                        <Input
                            id="amount"
                            type="text"
                            className="w-full rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2 text-center text-lg font-bold focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Введіть суму"
                        />
                    </div>

                    <div className="mb-6">
                        <Label htmlFor="purpose" className="block text-sm font-medium text-gray-400 mb-2">Призначення платежу</Label>
                        <Input
                            id="purpose"
                            type="text"
                            className="w-full rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Введіть призначення платежу"
                        />
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-white mb-3">Оберіть спосіб оплати</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {paymentMethods.slice(0, 2).map((method) => (
                                <Button
                                    key={method.id}
                                    className="flex items-center justify-center p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
                                    onClick={() => setSelectedMethod(method.id)}
                                >
                                    {method.icon}
                                    <span className="font-semibold ml-2">{method.label}</span>
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-white mb-3">Інші способи оплати</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {paymentMethods.slice(2).map((method) => (
                                <div
                                    key={method.id}
                                    className="flex flex-col items-center p-3 rounded-md border border-gray-700 bg-gray-700 hover:bg-gray-600 cursor-pointer transition-all duration-300"
                                    onClick={() => setSelectedMethod(method.id)}
                                >
                                    {method.icon}
                                    <p className="font-medium text-sm mt-1">{method.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {renderAdditionalFields()}

                    <div className="flex justify-center mt-6">
                        <Button
                            className="rounded-md bg-blue-600 text-white px-6 py-2 hover:bg-blue-700 transition-all duration-300"
                        >
                            Оплатити
                        </Button>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}