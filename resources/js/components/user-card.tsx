import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function UserCard({ user }) {
    return (
        <div className="w-full max-w-2xl mx-auto p-8 shadow-lg rounded-xl border border-gray-100 bg-white">
            <div className="text-center mb-8">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={user.avatarUrl || "https://github.com/shadcn.png"} alt="User Avatar" />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-lg text-gray-600">{user.email}</p>
            </div>

            <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Особиста інформація</h3>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Ім'я</Label>
                        <Input
                            id="name"
                            type="text"
                            defaultValue={user.name}
                            className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <Label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-2">Прізвище</Label>
                        <Input
                            id="surname"
                            type="text"
                            defaultValue={user.surname}
                            className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Електронна пошта</Label>
                        <Input
                            id="email"
                            type="email"
                            defaultValue={user.email}
                            className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Змінити пароль</h3>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">Поточний пароль</Label>
                        <Input
                            id="currentPassword"
                            type="password"
                            className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <Label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">Новий пароль</Label>
                        <Input
                            id="newPassword"
                            type="password"
                            className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Підтвердити пароль</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end mt-8">
                <Button
                    className="rounded-lg bg-blue-600 text-white px-8 py-3 hover:bg-blue-700 transition-all duration-300"
                >
                    Зберегти зміни
                </Button>
            </div>
        </div>
    );
}