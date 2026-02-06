'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FileText, 
  Mail, 
  Phone, 
  Building2, 
  Users, 
  BookOpen,
  LogOut,
  User
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Blog Post', path: '/Dashbaord', icon: FileText },
    { name: 'Newsletter', path: '/Dashbaord/newsletter', icon: Mail },
    { name: 'Contact', path: '/Dashbaord/contact', icon: Phone },
    { name: 'Institute', path: '/Dashbaord/institute', icon: Building2 },
    { name: 'Instructors', path: '/Dashbaord/instructors', icon: Users },
    { name: 'Courses', path: '/Dashbaord/courses', icon: BookOpen },
  ];

  return (
    <div className="w-[400px] h-screen bg-white shadow-lg flex flex-col rounded-[24px]">
      {/* User Profile Section */}
      <div className="flex flex-col items-center pt-10 pb-8">
        <div className="w-18 h-18 bg-[#005F87]/20 rounded-full flex items-center justify-center mb-5">
          <User className="w-10 h-10 text-[#005F87]" />
        </div>
        <h2 className="text-sm font-semibold text-gray-900">Bahoju Admin Team</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-5">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-5 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#005F87] text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={2} />
                  <span className="text-sm font-semibold">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-3 pb-6">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
          <LogOut className="w-5 h-5" strokeWidth={2} />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );
}