import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { CreditCard, Wallet, Smartphone, Banknote, Bitcoin } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Поповнення',
        href: '/deposit',
    },
];

const StripePaymentForm = ({ amount, purpose }: { amount: number; purpose: string }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            // 1. Створюємо Payment Intent
            const { data } = await axios.post('/stripe/payment-intent', {
                amount,
                purpose
            });

            // 2. Підтверджуємо платіж
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
                data.clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement)!,
                    }
                }
            );

            if (stripeError) {
                throw new Error(stripeError.message || 'Помилка оплати');
            }

            if (paymentIntent?.status === 'succeeded') {
                // 3. Підтверджуємо транзакцію на сервері
                await axios.post('/stripe/confirm', {
                    payment_intent_id: paymentIntent.id,
                    amount
                });

                toast.success('Оплата успішна! Баланс поповнено.');
                setPaymentSuccess(true);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Сталася невідома помилка';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (paymentSuccess) {
        return (
            <div className="text-center py-6">
                <div className="text-green-500 text-2xl font-bold mb-2">Оплата успішна!</div>
                <p className="mb-4">Ваш баланс поповнено на ${amount.toFixed(2)}</p>
                <Button
                    onClick={() => window.location.reload()}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    Зробити ще один платіж
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
                <Label className="block text-sm font-medium text-gray-400 mb-2">
                    Дані кредитної картки
                </Label>
                <CardElement
                    options={{
                        style: {
                            base: {
                                color: '#ffffff',
                                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                                fontSmoothing: 'antialiased',
                                fontSize: '16px',
                                '::placeholder': {
                                    color: '#a0aec0'
                                }
                            },
                            invalid: {
                                color: '#fa755a',
                                iconColor: '#fa755a'
                            }
                        },
                        hidePostalCode: true
                    }}
                    className="p-3 border border-gray-700 rounded-md bg-gray-700"
                />
            </div>

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            <Button
                type="submit"
                disabled={!stripe || loading || amount < 1}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
                {loading ? 'Обробка...' : `Оплатити $${amount.toFixed(2)}`}
            </Button>
        </form>
    );
};

export default function PaymentPage() {
    const [amount, setAmount] = useState<string>('');
    const [purpose, setPurpose] = useState<string>('');
    const [selectedMethod, setSelectedMethod] = useState<string | null>('creditcard');

    const paymentMethods = [
        { id: 'creditcard', icon: <CreditCard className="w-5 h-5" />, label: 'Credit Card' },
        { id: 'wallet', icon: <Wallet className="w-5 h-5" />, label: 'Wallet' },
        { id: 'smartphone', icon: <Smartphone className="w-5 h-5" />, label: 'Mobile Payment' },
        { id: 'banknote', icon: <Banknote className="w-5 h-5" />, label: 'Bank Transfer' },
        { id: 'bitcoin', icon: <Bitcoin className="w-5 h-5" />, label: 'Bitcoin' },
    ];

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Дозволяємо тільки цифри та одну крапку
        if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
            setAmount(value);
        }
    };

    const getNumericAmount = () => {
        return amount ? parseFloat(amount) : 0;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-col gap-6 p-6 text-white">
                <h1 className="text-3xl font-bold text-white">Поповнення балансу</h1>

                <Card className="w-full max-w-lg mx-auto p-6 shadow-lg rounded-lg border border-gray-800 bg-gray-800">
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-bold text-white">Дані про оплату</h2>
                    </div>

                    <div className="mb-6">
                        <Label htmlFor="amount" className="block text-sm font-medium text-gray-400 mb-2">
                            Сума (USD)
                        </Label>
                        <Input
                            id="amount"
                            type="text"
                            inputMode="decimal"
                            value={amount}
                            onChange={handleAmountChange}
                            className="w-full rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2 text-center text-lg font-bold focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="0.00"
                        />
                    </div>

                    <div className="mb-6">
                        <Label htmlFor="purpose" className="block text-sm font-medium text-gray-400 mb-2">
                            Призначення платежу
                        </Label>
                        <Input
                            id="purpose"
                            type="text"
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
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
                                    variant={selectedMethod === method.id ? 'default' : 'secondary'}
                                    className={`flex items-center justify-center p-3 ${
                                        selectedMethod === method.id ? 'bg-blue-600' : 'bg-gray-700'
                                    }`}
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
                                    className={`flex flex-col items-center p-3 rounded-md border ${
                                        selectedMethod === method.id ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 bg-gray-700'
                                    } hover:bg-gray-600 cursor-pointer transition-all duration-300`}
                                    onClick={() => setSelectedMethod(method.id)}
                                >
                                    {method.icon}
                                    <p className="font-medium text-sm mt-1">{method.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {selectedMethod === 'creditcard' && (
                        <Elements stripe={stripePromise}>
                            <StripePaymentForm amount={getNumericAmount()} purpose={purpose} />
                        </Elements>
                    )}

                    {selectedMethod !== 'creditcard' && (
                        <div className="text-center py-4 text-yellow-500">
                            Цей спосіб оплати тимчасово недоступний
                        </div>
                    )}
                </Card>
            </div>
        </AppLayout>
    );
}
