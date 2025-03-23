import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@/types';

export default function UserCard({ user }: { user: User }) {
    return (
        <div className="mx-auto w-full max-w-2xl rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
            <div className="mb-8 text-center">
                <Avatar className="mx-auto mb-4 h-24 w-24">
                    <AvatarImage src={user.avatar || 'https://github.com/shadcn.png'} alt="User Avatar" />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-lg text-gray-600">{user.email}</p>
            </div>

            <div className="mb-8">
                <h3 className="mb-6 text-xl font-semibold text-gray-900">Особиста інформація</h3>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                            Ім'я
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            defaultValue={user.name}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <Label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                            Електронна пошта
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            defaultValue={user.email}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
