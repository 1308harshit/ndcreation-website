'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  ShoppingBag,
  FileText,
  Package,
  BarChart3,
  DollarSign,
  Users,
  Settings,
  LogOut,
} from 'lucide-react';
import { BRAND } from '@/lib/constants';
import { logout } from '@/lib/auth';

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/nd-admin/dashboard' },
  { icon: ShoppingBag, label: 'Orders', href: '/nd-admin/orders' },
  { icon: FileText, label: 'Reports', href: '/nd-admin/reports' },
  { icon: Package, label: 'Products', href: '/nd-admin/products' },
  { icon: BarChart3, label: 'Analytics', href: '/nd-admin/analytics' },
  { icon: DollarSign, label: 'Revenue', href: '/nd-admin/revenue' },
  { icon: Users, label: 'Developers', href: '/nd-admin/developers' },
  { icon: Settings, label: 'Settings', href: '/nd-admin/settings' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/nd-admin');
  };

  return (
    <div className="w-64 h-screen bg-[var(--charcoal-black)] border-r border-white/10 flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/nd-admin/dashboard" className="block">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-cyan)] bg-clip-text text-transparent">
            {BRAND.name}
          </h1>
          <p className="text-xs text-gray-500 mt-1">Admin Dashboard</p>
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-cyan)] text-white'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
