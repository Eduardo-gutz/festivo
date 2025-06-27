import { Mail, Home } from "lucide-react";
import { BarChart, FileText, HelpCircle, Settings, Users } from "lucide-react";

export const navigationItems = [
    {
        label: 'dashboard',
        href: '/dashboard',
        icon: Home,
    },
    {
        label: 'invitations',
        href: '/invitations',
        icon: Mail,
    },
    {
        label: 'guests',
        href: '/guests',
        icon: Users,
    },
    {
        label: 'templates',
        href: '/templates',
        icon: FileText,
        isForPublisher: true,
    },
    {
        label: 'statistics',
        href: '/statistics',
        icon: BarChart,
    },
];

export const configItems = [
    {
        label: 'settings',
        href: '/settings',
        icon: Settings,
        isForPublisher: true,
    },
    {
        label: 'help',
        href: '/help',
        icon: HelpCircle,
        isForPublisher: true,
    },
];