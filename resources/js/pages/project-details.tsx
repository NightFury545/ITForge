import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Project, SharedData, type Bid } from '@/types';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { CheckIcon, HandshakeIcon, FileTextIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ProjectDetailsProps {
    project: Project;
}

function ContractAgreement({
  open,
  onOpenChange,
  project,
  bid,
  onConfirm,
}: {
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
  onConfirm: () => void;
}) {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Не вказано';
    return format(new Date(dateString), 'dd.MM.yyyy HH:mm');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl rounded-lg overflow-hidden p-0">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5">
            <CheckIcon className="h-5 w-5 text-white" />
            <span className="font-mono text-white tracking-wider">
              CONTRACT-{project.id.slice(0, 8).toUpperCase()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 p-6 gap-6 items-center">
          <div className="text-center">
            <Avatar className="h-20 w-20 mx-auto mb-3 border-2 border-blue-500">
              <AvatarImage src={project.client.avatar} />
              <AvatarFallback className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-2xl font-bold">
                {project.client.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-bold text-lg dark:text-white">Замовник</h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium">
              {project.client.name}
            </p>
          </div>

          <div className="flex justify-center">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-5 rounded-full inline-flex items-center justify-center">
              <HandshakeIcon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div className="text-center">
            <Avatar className="h-20 w-20 mx-auto mb-3 border-2 border-green-500">
              <AvatarImage src={bid.developer_avatar} />
              <AvatarFallback className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-2xl font-bold">
                {bid.developer_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-bold text-lg dark:text-white">Розробник</h3>
            <p className="text-green-600 dark:text-green-400 font-medium">
              {bid.developer_name}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 p-6 border-t border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 dark:text-white">
            <FileTextIcon className="h-5 w-5 text-blue-500" />
            Деталі угоди
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">Проєкт</p>
              <p className="font-medium dark:text-white">{project.title}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">Сума</p>
              <p className="font-medium text-blue-600 dark:text-blue-400">
                {bid.amount} ₴
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">Термін</p>
              <p className="font-medium dark:text-white">
                {formatDate(project.project_deadline)}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 dark:text-white">
            <FileTextIcon className="h-5 w-5 text-blue-500" />
            Умови співпраці
          </h3>

          <ol className="space-y-3">
            {[
              "Замовник зобов'язується надати всі необхідні матеріали",
              "Розробник гарантує якість виконаних робіт",
              "Оплата проводиться через платформу",
              "У разі суперечок - переговори",
              "Контракт може бути розірваний за згодою сторін",
            ].map((item, index) => (
              <li key={index} className="flex gap-3">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm font-medium mt-0.5 flex-shrink-0">
                  {index + 1}
                </span>
                <span className="dark:text-gray-300">{item}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-4">
          <button
            onClick={() => onOpenChange(false)}
            className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Відхилити
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md transition-all flex items-center gap-2"
          >
            <CheckIcon className="h-5 w-5" />
            Підписати контракт
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
    const [showBidForm, setShowBidForm] = useState(false);
    const [showContractModal, setShowContractModal] = useState(false);
    const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
    const currentUser = usePage<SharedData>().props.auth.user;
    const { data, setData, post, processing, reset, errors } = useForm({
        amount: '',
        proposal: '',
        project_id: project.id,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Проєкти', href: '/projects' },
        { title: project.title, href: `/projects/${project.id}` },
    ];

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    function formatDate(dateString: string): string {
        if (!dateString) return '—';
        const utcDate = parseISO(dateString);
        const localDate = toZonedTime(utcDate, userTimeZone);
        return format(localDate, 'dd.MM.yyyy HH:mm');
    }

    const handleCreateBid = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('bids.store'), {
            preserveScroll: true,
            onSuccess: (page) => {
                reset();
                setShowBidForm(false);
                toast.success(page.props.flash?.success || 'Ставку успішно створено.');
            },
        });
    };

    const handleDeleteBid = (bidId: string) => {
        if (confirm('Ви впевнені, що хочете видалити ставку?')) {
            router.delete(route('bids.destroy', bidId), {
                preserveScroll: true,
                onSuccess: (page) => {
                    toast.success(page.props.flash?.success || 'Ставка успішно видалена.');
                },
                onError: (errors) => {
                    toast.error(errors.error || 'Не вдалося видалити ставку.');
                },
            });
        }
    };

    const handleAcceptBid = (bid: Bid) => {
        setSelectedBid(bid);
        setShowContractModal(true);
    };

    const handleContractConfirmation = (confirmed: boolean) => {
        if (!selectedBid) return;

        if (confirmed) {
            router.post(
                route('bids.accept', selectedBid.id),
                {},
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        toast.success('Ставка успішно прийнята!');
                        setShowContractModal(false);
                    },
                    onError: (errors) => {
                        toast.error(errors.error || 'Не вдалося прийняти ставку.');
                    },
                },
            );
        } else {
            setShowContractModal(false);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={project.title} />
            
            {selectedBid && (
                <ContractAgreement
                    open={showContractModal}
                    onOpenChange={setShowContractModal}
                    project={{
                        id: project.id,
                        title: project.title,
                        client: {
                            name: project.client.name,
                            avatar: project.client.avatar,
                        },
                        project_deadline: project.project_deadline,
                    }}
                    bid={{
                        amount: selectedBid.amount,
                        developer_name: selectedBid.developer_name,
                        developer_avatar: selectedBid.developer_avatar,
                    }}
                    onConfirm={() => handleContractConfirmation(true)}
                />
            )}

            <div className="bg-gray-50 p-6 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                <div className="mx-auto max-w-6xl">
                    <h1 className="mb-6 text-3xl font-bold dark:text-white">{project.title}</h1>

                    <div className="mb-8">
                        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {project.tech_stack.join(', ')}
                        </span>
                    </div>

                    <div className="mb-8 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                        <h2 className="mb-4 text-xl font-semibold dark:text-white">Опис проєкту</h2>
                        <p className="mb-4 dark:text-gray-300">{project.description}</p>
                        <h3 className="mb-2 font-medium dark:text-white">Вимоги:</h3>
                        <p className="dark:text-gray-300">{project.requirements}</p>
                    </div>

                    <div className="mb-8 grid gap-4 md:grid-cols-3">
                        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-semibold dark:text-white">Замовник</h3>
                            <Link href={`/users/${project.client.name}`} className="mb-2 text-gray-600 hover:underline dark:text-gray-300">
                                {project.client.name}
                            </Link>
                        </div>
                        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-semibold dark:text-white">Бюджет</h3>
                            <p className="text-gray-600 dark:text-gray-400">{project.budget} $</p>
                        </div>
                        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-semibold dark:text-white">Дедлайни</h3>
                            <p className="text-gray-600 dark:text-gray-400">Ставки: {formatDate(project.bids_deadline)}</p>
                            <p className="text-gray-600 dark:text-gray-400">Проєкт: {formatDate(project.project_deadline)}</p>
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                        <h2 className="mb-6 text-xl font-semibold dark:text-white">Ставки</h2>

                        {!showBidForm ? (
                            <button
                                onClick={() => setShowBidForm(true)}
                                className="mb-6 flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                            >
                                <PlusIcon className="h-5 w-5" />
                                Додати ставку
                            </button>
                        ) : (
                            <form onSubmit={handleCreateBid} className="mb-6 rounded-lg bg-gray-100 p-4 dark:bg-gray-700">
                                <h3 className="mb-3 text-lg font-medium dark:text-white">Ваша ставка</h3>

                                {errors && Object.keys(errors).length > 0 && (
                                    <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-600 dark:bg-red-900 dark:text-red-300">
                                        <ul>
                                            {Object.values(errors).map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="mb-3">
                                    <label className="mb-1 block text-sm font-medium dark:text-gray-300">Сума ($)</label>
                                    <input
                                        type="number"
                                        value={data.amount}
                                        onChange={(e) => setData('amount', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                        placeholder="Введіть суму"
                                    />
                                    {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1 block text-sm font-medium dark:text-gray-300">Коментар</label>
                                    <textarea
                                        value={data.proposal}
                                        onChange={(e) => setData('proposal', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                        rows={3}
                                        placeholder="Додайте коментар до вашої ставки"
                                    ></textarea>
                                    {errors.proposal && <p className="text-sm text-red-500">{errors.proposal}</p>}
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowBidForm(false)}
                                        className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600"
                                    >
                                        Скасувати
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                                    >
                                        {processing ? 'Збереження...' : 'Підтвердити ставку'}
                                    </button>
                                </div>
                            </form>
                        )}

                        <div className="space-y-4">
                            {project.bids.map((bid) => (
                                <div key={bid.id} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10">
                                                {bid.developer_avatar ? (
                                                    <AvatarImage src={bid.developer_avatar} alt={bid.developer_name} />
                                                ) : (
                                                    <AvatarFallback>{bid.developer_name[0]}</AvatarFallback>
                                                )}
                                            </Avatar>
                                            <div>
                                                <h4 className="font-medium dark:text-white">
                                                    <Link
                                                        href={`/users/${bid.developer_name}`}
                                                        className="text-blue-600 hover:underline dark:text-blue-400"
                                                    >
                                                        {bid.developer_name}
                                                    </Link>
                                                </h4>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(bid.created_at).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{bid.amount} ₴</span>
                                    </div>

                                    {bid.proposal && <p className="mt-2 text-gray-600 dark:text-gray-300">{bid.proposal}</p>}

                                    <div className="mt-2">
                                        <span
                                            className={`- block inline rounded-full px-3 py-1 text-sm font-medium ${
                                                bid.status === 'accepted'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                    : bid.status === 'rejected'
                                                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                                      : bid.status === 'expired'
                                                        ? 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                            }`}
                                        >
                                            {bid.status === 'accepted'
                                                ? 'Прийнято'
                                                : bid.status === 'rejected'
                                                  ? 'Відхилено'
                                                  : bid.status === 'expired'
                                                    ? 'Прострочено'
                                                    : 'Очікує'}
                                        </span>
                                    </div>

                                    {bid.developer_id === currentUser.id && (
                                        <button
                                            onClick={() => handleDeleteBid(bid.id)}
                                            className="mt-4 rounded-lg bg-red-500 p-2 text-white hover:bg-red-600"
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </button>
                                    )}

                                    {project.client.id === currentUser.id && bid.status !== 'accepted' && (
                                        <button
                                            onClick={() => handleAcceptBid(bid)}
                                            className="mt-4 ml-1 rounded-lg bg-green-500 p-2 text-white hover:bg-green-600"
                                        >
                                            <CheckIcon className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}