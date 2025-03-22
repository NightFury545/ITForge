import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';

export default function Deposit({ balance }) {
    const { data, setData, post, processing, errors } = useForm({
        amount: "",
        method: "paypal",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("deposit.store"));
    };

    // breadcrumbs для AppLayout
    const breadcrumbs = [
        {
            title: "Поповнення балансу",
            href: route("deposit.index"),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Поповнення балансу" />

            <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Поповнення балансу</h2>
                <p className="text-gray-700 mb-4">Поточний баланс: <b>${balance}</b></p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-semibold">Сума ($)</label>
                        <input
                            type="number"
                            min="1"
                            value={data.amount}
                            onChange={(e) => setData("amount", e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
                        />
                        {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
                    </div>

                    <div>
                        <label className="block font-semibold">Метод оплати</label>
                        <select
                            value={data.method}
                            onChange={(e) => setData("method", e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
                        >
                            <option value="paypal">PayPal</option>
                            <option value="stripe">Stripe</option>
                            <option value="crypto">Crypto</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        disabled={processing}
                    >
                        {processing ? "Обробка..." : "Поповнити"}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
