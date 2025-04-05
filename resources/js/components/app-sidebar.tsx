import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    LayoutGrid,
    UserCog2Icon,
    MessageCircleMore,
    FolderOpenDot,
    WalletIcon, UserIcon
} from 'lucide-react';
import AppLogoIcon from './app-logo-icon';
import { NotificationsBell } from '@/components/notification-bell';

const mainNavItems: NavItem[] = [
    {
        title: 'Панель керування',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Розробники',
        href: '/developers',
        icon: UserCog2Icon,
    },
    {
        title: 'Чати',
        href: '/chats',
        icon: MessageCircleMore,
    },
    {
        title: 'Проєкти',
        href: '/projects',
        icon: FolderOpenDot,
    },
    {
        title: 'Поповнення',
        href: '/deposit',
        icon: WalletIcon,
    },
    {
        title: 'Адмін панель',
        href: '/admin',
        icon: UserIcon,
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <div className="flex items-center justify-between w-full relative">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                size="lg"
                                asChild
                                className="inline-flex w-auto px-2"
                            >
                                <Link href="/dashboard" prefetch>
                                    <div className="flex items-center">
                                        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                                            <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
                                        </div>
                                        <div className="ml-2 text-sm font-semibold">ITForge</div>
                                    </div>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>

                    {/* Контейнер для сповіщень - абсолютно позиціонований справа */}
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
                        <NotificationsBell />
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
