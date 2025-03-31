import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { HandshakeIcon, FileTextIcon, CheckIcon } from 'lucide-react';

interface ContractAgreementProps {
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
}

export function ContractAgreement({
  open,
  onOpenChange,
  project,
  bid,
  onConfirm,
}: ContractAgreementProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Не вказано';
    return format(new Date(dateString), 'dd.MM.yyyy HH:mm');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl rounded-lg overflow-hidden p-0">
        {/* Унікальний ідентифікатор контракту */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5">
            <CheckIcon className="h-5 w-5 text-white" />
            <span className="font-mono text-white tracking-wider">
              CONTRACT-{project.id.slice(0, 8).toUpperCase()}
            </span>
          </div>
        </div>

        {/* Триколонковий блок партнерства */}
        <div className="grid grid-cols-3 p-6 gap-6 items-center">
          {/* Колонка замовника */}
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

          {/* Центральна іконка рукостискання */}
          <div className="flex justify-center">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-5 rounded-full inline-flex items-center justify-center">
              <HandshakeIcon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          {/* Колонка розробника */}
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

        {/* Деталі контракту */}
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

        {/* Умови контракту */}
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

        {/* Кнопки підтвердження */}
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