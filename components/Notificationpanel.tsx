'use client';

import { Bell } from 'lucide-react';
import { useState } from 'react';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'Emela fashion Enrolled in UIUX Class',
      message: 'Today',
      time: '10 Hours',
      read: false,
    },
    {
      id: 2,
      title: 'Emela fashion sent a message',
      message: 'Today',
      time: '10 Hours',
      read: false,
    },
    {
      id: 3,
      title: 'Emela fashion sent a message',
      message: 'Today',
      time: '10 Hours',
      read: false,
    },
    {
      id: 4,
      title: 'Emela fashion sent a message',
      message: 'Today',
      time: '10 Hours',
      read: false,
    },
    {
      id: 5,
      title: 'Emela fashion sent a message',
      message: 'Yesterday',
      time: '10 Hours',
      read: false,
    },
    {
      id: 6,
      title: 'Emela fashion sent a message',
      message: 'Yesterday',
      time: '10 Hours',
      read: false,
    },
    {
      id: 7,
      title: 'Emela fashion sent a message',
      message: 'Yesterday',
      time: '10 Hours',
      read: false,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-full bg-[#FFFFFF]"
      >
        <Bell className="w-6 h-6 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {/* Today Section */}
              <div className="p-3 bg-gray-50">
                <span className="text-xs font-medium text-gray-500">Today</span>
              </div>
              {notifications
                .filter(n => n.message === 'Today')
                .map(notification => (
                  <div
                    key={notification.id}
                    className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  >
                    <p className="text-sm font-medium text-gray-800">
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}

              {/* Yesterday Section */}
              <div className="p-3 bg-gray-50">
                <span className="text-xs font-medium text-gray-500">Yesterday</span>
              </div>
              {notifications
                .filter(n => n.message === 'Yesterday')
                .map(notification => (
                  <div
                    key={notification.id}
                    className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  >
                    <p className="text-sm font-medium text-gray-800">
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}