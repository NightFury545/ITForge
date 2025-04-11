import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Save, X, Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    user_type: string;
    avatar?: string;
    created_at: string;
}

interface Props {
    users: User[];
    handleDelete: (model: string, id: string) => void;
}

export default function UsersTable({ users, handleDelete }: Props) {
    return (
        <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold">Користувачі</h3>
            <Card>
                <CardContent className="pt-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Ім’я</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Роль</TableHead>
                                <TableHead>Тип</TableHead>
                                <TableHead>Дата реєстрації</TableHead>
                                <TableHead className="text-right">Дії</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <EditableUserRow key={user.id} user={user} handleDelete={handleDelete} />
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

function EditableUserRow({ user, handleDelete }: { user: User; handleDelete: (model: string, id: string) => void }) {
    const [editing, setEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({
        name: user.name,
        role: user.role,
        user_type: user.user_type,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        router.post(`/users/${user.id}`, editedUser);
        setEditing(false);
    };

    const handleCancel = () => {
        setEditedUser({
            name: user.name,
            role: user.role,
            user_type: user.user_type,
        });
        setEditing(false);
    };

    return (
        <TableRow>
            <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                    {user.avatar && <img src={user.avatar} alt={user.name} className="h-6 w-6 rounded-full" />}
                    {editing ? (
                        <input
                            name="name"
                            value={editedUser.name}
                            onChange={handleChange}
                            className="border px-2 py-1 rounded w-full"
                        />
                    ) : (
                        <span>{user.name}</span>
                    )}
                </div>
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
                {editing ? (
                    <select
                        name="role"
                        value={editedUser.role}
                        onChange={handleChange}
                        className="border px-2 py-1 rounded w-full"
                    >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                    </select>
                ) : (
                    user.role
                )}
            </TableCell>
            <TableCell>
                {editing ? (
                    <input
                        name="user_type"
                        value={editedUser.user_type}
                        onChange={handleChange}
                        className="border px-2 py-1 rounded w-full"
                    />
                ) : (
                    <Badge variant="outline">{user.user_type}</Badge>
                )}
            </TableCell>
            <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
            <TableCell className="text-right">
                {editing ? (
                    <div className="flex justify-end gap-2">
                        <Button size="sm" onClick={handleSave}>
                            <Save className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={handleCancel}>
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                ) : (
                    <div className="flex justify-end gap-2">
                        <Button size="sm" onClick={() => setEditing(true)}>
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete('users', user.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </TableCell>
        </TableRow>
    );
}
