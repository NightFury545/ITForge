import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };

    [key: string]: unknown;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
    birthday?: Date;
    portfolio_urls?: string[];
    skills?: string[];
    user_type: string;
    role?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    projects_count?: number;
    average_rating?: number;

    [key: string]: unknown;
}

interface Review {
    id: number;
    text: string;
    author: string;
}

export interface ProjectCardProps {
    id: string;
    title: string;
    description: string;
    budget: number;
    tech_stack: string[];
    status: string;
    user: {
        name: string;
        avatar: string;
    };
}

export interface Project {
    id: string;
    title: string;
    description: string;
    requirements: string;
    status: string;
    budget: number;
    bids_deadline: string;
    project_deadline: string;
    tech_stack: string[];
    client_id: string;
    created_at: string;
    updated_at: string;
    client: User;
    bids: Bid[];
}

export interface Message {
    id: string;
    chat_id: string;
    sender_id: string;
    sender_name: string;
    avatar: string;
    message: string;
    created_at: string;
    updated_at: string;
}

export interface Chat {
    id: string;
    name: string;
    last_message: string;
    last_message_at: string;
    avatar: string;
    messages: Message[];
}

export interface Bid {
    id?: string;
    project_id?: string;
    developer_id?: string;
    developer_name?: string;
    developer_avatar?: string;
    amount?: number;
    proposal?: string;
    status?: string;
    created_at?: string;
    updated_at?: string;
}
