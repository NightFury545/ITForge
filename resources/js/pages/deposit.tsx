import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';

export default function Deposit({ balance }) {
    const { data, setData, post, processing, errors } = useForm({
        amount: '',
        method: 'paypal',
    });
    const [paymentMethod, setPaymentMethod] = useState('paypal');

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('deposit.store'));
    };

    const handleMethodChange = (method) => {
        setPaymentMethod(method);
        setData('method', method);
    };

    const breadcrumbs = [
        {
            title: 'Поповнення балансу',
            href: route('deposit.index'),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-col gap-6 p-6 bg-gray-800 text-gray-300">
                <h1 className="text-3xl font-semibold text-gray-100">Поповнення балансу</h1>
                <p className="text-lg text-gray-400">Поточний баланс: <b>{balance} ₴</b></p>

                <Card className="w-full max-w-lg mx-auto p-6 shadow-lg rounded-lg border border-gray-700 bg-gray-900">
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-medium text-gray-100">Оберіть платіжну систему для поповнення</h2>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mb-6">
                        {/* PayPal */}
                        <div
                            className={`flex flex-col items-center p-6 rounded-lg border cursor-pointer transition-all duration-300 ${paymentMethod === 'paypal' ? 'bg-gray-700 text-white scale-105 shadow-xl' : 'bg-gray-800 hover:bg-gray-700'}`}
                            onClick={() => handleMethodChange('paypal')}
                        >
                            <img src="/images/paypal-logo.png" alt="PayPal" className="w-16 h-16 mb-4" />
                            <p className="font-medium">PayPal</p>
                        </div>

                        {/* Stripe */}
                        <div
                            className={`flex flex-col items-center p-6 rounded-lg border cursor-pointer transition-all duration-300 ${paymentMethod === 'stripe' ? 'bg-gray-700 text-white scale-105 shadow-xl' : 'bg-gray-800 hover:bg-gray-700'}`}
                            onClick={() => handleMethodChange('stripe')}
                        >
                            <img src="/images/stripe-logo.png" alt="Stripe" className="w-16 h-16 mb-4" />
                            <p className="font-medium">Stripe</p>
                        </div>

                        {/* Crypto */}
                        <div
                            className={`flex flex-col items-center p-6 rounded-lg border cursor-pointer transition-all duration-300 ${paymentMethod === 'crypto' ? 'bg-gray-700 text-white scale-105 shadow-xl' : 'bg-gray-800 hover:bg-gray-700'}`}
                            onClick={() => handleMethodChange('crypto')}
                        >
                            <img src="/images/crypto-logo.png" alt="Crypto" className="w-16 h-16 mb-4" />
                            <p className="font-medium">Crypto</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Label htmlFor="amount">Сума</Label>
                            <Input
                                id="amount"
                                type="number"
                                min="1"
                                value={data.amount}
                                onChange={(e) => setData('amount', e.target.value)}
                                className="w-full rounded-lg border bg-gray-700 text-gray-200 px-4 py-2 focus:ring-2 focus:ring-gray-600"
                            />
                            {errors.amount && <p className="text-sm text-red-500 mt-1">{errors.amount}</p>}
                        </div>

                        <Button
                            type="submit"
                            className="w-full rounded-lg bg-gray-600 py-2 text-gray-200 hover:bg-gray-700 disabled:opacity-50"
                            disabled={processing}
                        >
                            {processing ? 'Обробка...' : 'Поповнити'}
                        </Button>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
