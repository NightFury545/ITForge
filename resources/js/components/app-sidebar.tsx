import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    BookOpen,
    ChartArea,
    ComputerIcon,
    Folder,
    FolderOpenDot,
    HandIcon,
    LayoutGrid,
    MapIcon,
    MessageCircle,
    MessageCircleMore,
    User2,
    User2Icon,
    UserCheck2Icon,
    UserCog2Icon,
    UserIcon,
    UserRoundPen,
    UsersRoundIcon,
    WalletIcon
} from 'lucide-react';
import AppLogo from './app-logo';

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
];

const footerNavItems: NavItem[] = [

];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
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
