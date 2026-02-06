'use client';

import { useState } from 'react';
import {
  User,
  Users,
  Mail,
  Phone,
  Building2,
  BookOpen,
  LogOut,
  Plus,
  Bell,
  Search,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Send,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  UserX
} from 'lucide-react';
import Notifications from '@/components/Notificationpanel';

export default function NewsletterPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeView, setActiveView] = useState('newsletter'); // 'newsletter' or 'subscribers'
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const itemsPerPage = 5;

  // Sample newsletter data
  const newsletters = [
    { id: 1, title: 'Love Bahoju', status: 'Sent', category: 'General', date: '07 Oct 2024', price: 'Success' },
    { id: 2, title: 'Weekly Update', status: 'Sent', category: 'Updates', date: '06 Oct 2024', price: 'Success' },
    { id: 3, title: 'Special Offer', status: 'Draft', category: 'Promotions', date: '05 Oct 2024', price: 'Success' },
    { id: 4, title: 'Company News', status: 'Scheduled', category: 'News', date: '04 Oct 2024', price: 'Success' },
    { id: 5, title: 'Product Launch', status: 'Draft', category: 'Promotions', date: '03 Oct 2024', price: 'Success' },
    { id: 6, title: 'Monthly Digest', status: 'Sent', category: 'General', date: '02 Oct 2024', price: 'Success' },
    { id: 7, title: 'Tech Updates', status: 'Draft', category: 'Updates', date: '01 Oct 2024', price: 'Success' },
    { id: 8, title: 'Holiday Special', status: 'Scheduled', category: 'Promotions', date: '30 Sep 2024', price: 'Success' },
    { id: 9, title: 'Industry News', status: 'Sent', category: 'News', date: '29 Sep 2024', price: 'Success' },
    { id: 10, title: 'Customer Stories', status: 'Draft', category: 'General', date: '28 Sep 2024', price: 'Success' },
    { id: 11, title: 'New Features', status: 'Sent', category: 'Updates', date: '27 Sep 2024', price: 'Success' },
    { id: 12, title: 'Summer Sale', status: 'Draft', category: 'Promotions', date: '26 Sep 2024', price: 'Success' },
  ];

  // Sample subscriber data
  const subscribers = [
    { id: 1, name: 'Success J.', email: 'ifokusuccess@gmail.com', status: 'Active', source: 'Website', dateJoined: '07 Oct 2024', newsletter: 'Nil' },
    { id: 2, name: 'Success J.', email: 'ifokusuccess@gmail.com', status: 'Unsubscribe', source: 'Website', dateJoined: '07 Oct 2024', newsletter: 'Nil' },
    { id: 3, name: 'Success J.', email: 'ifokusuccess@gmail.com', status: 'Active', source: 'Website', dateJoined: '07 Oct 2024', newsletter: 'Nil' },
    { id: 4, name: 'Success J.', email: 'ifokusuccess@gmail.com', status: 'Unsubscribe', source: 'Website', dateJoined: '07 Oct 2024', newsletter: 'Nil' },
    { id: 5, name: 'Success J.', email: 'ifokusuccess@gmail.com', status: 'Active', source: 'Website', dateJoined: '07 Oct 2024', newsletter: 'Nil' },
    { id: 6, name: 'Success J.', email: 'ifokusuccess@gmail.com', status: 'Active', source: 'Website', dateJoined: '07 Oct 2024', newsletter: 'Nil' },
    { id: 7, name: 'Success J.', email: 'ifokusuccess@gmail.com', status: 'Unsubscribe', source: 'Website', dateJoined: '07 Oct 2024', newsletter: 'Nil' },
  ];

  // Get unique categories and sources
  const categories = ['All', ...Array.from(new Set(newsletters.map(newsletter => newsletter.category)))];
  const sources = ['All', ...Array.from(new Set(subscribers.map(subscriber => subscriber.source)))];
  const statuses = activeView === 'newsletter'
    ? ['All Status', 'Sent', 'Draft', 'Scheduled']
    : ['All Status', 'Active', 'Unsubscribe'];

  // Filter data based on active view
  const filteredData = activeView === 'newsletter'
    ? newsletters.filter(newsletter => {
      const matchesSearch = newsletter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        newsletter.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || newsletter.category === categoryFilter;
      const matchesStatus = statusFilter === 'All Status' || newsletter.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    })
    : subscribers.filter(subscriber => {
      const matchesSearch = subscriber.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subscriber.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSource = categoryFilter === 'All' || subscriber.source === categoryFilter;
      const matchesStatus = statusFilter === 'All Status' || subscriber.status === statusFilter;
      return matchesSearch && matchesSource && matchesStatus;
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
    setShowCategoryDropdown(false);
    setCurrentPage(1);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    setShowStatusDropdown(false);
    setCurrentPage(1);
  };

  const handleViewChange = (view: 'newsletter' | 'subscribers') => {
    setActiveView(view);
    setSearchQuery('');
    setCategoryFilter('All');
    setStatusFilter('All Status');
    setCurrentPage(1);
  };

  return (
    <div className="flex-1 overflow-auto">
      {/* Main Content */}
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {activeView === 'newsletter' ? 'Newsletter Management' : 'Subscribers'}
        </h1>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          {activeView === 'newsletter' ? (
            <button
              onClick={() => handleViewChange('subscribers')}
              className="px-3 sm:px-4 py-2 sm:py-2.5 border border-[#005F87] text-[#005F87] rounded-lg hover:bg-[#004A6B] hover:text-white transition-colors text-xs sm:text-sm font-medium whitespace-nowrap"
            >
              Subscribers
            </button>
          ) : (
            <button
              onClick={() => handleViewChange('newsletter')}
              className="px-3 sm:px-4 py-2 sm:py-2.5 border border-[#005F87] text-[#005F87] rounded-lg hover:bg-[#004A6B] hover:text-white transition-colors text-xs sm:text-sm font-medium whitespace-nowrap"
            >
              Newsletter
            </button>
          )}
          {/* {activeView === 'newsletter' && ( */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-1 sm:gap-2 bg-[#005F87] text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg hover:bg-[#004A6B] transition-colors flex-1 sm:flex-initial justify-center"
            >
              <Plus className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-medium">Create Newsletter</span>
            </button>
          {/* )} */}
          {/* <div className="hidden sm:block"> */}
            <Notifications />
          {/* </div> */}
        </div>
      </div>

      {/* Stats Cards */}
      {activeView === 'newsletter' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Total Subscribers */}
          <div className="bg-white rounded-[24px] p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <p className="text-sm font-normal text-[#4F5E6E] mb-3 mt-5">Total Subscribers</p>
            <p className="text-2xl sm:text-[32px] font-semibold text-gray-900">20</p>
          </div>

          {/* Total Newsletter */}
          <div className="bg-white rounded-[24px] p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <p className="text-sm font-normal text-[#4F5E6E] mb-3 mt-5">Total Newsletter</p>
            <p className="text-2xl sm:text-[32px] font-semibold text-gray-900">100</p>
          </div>

          {/* Sent Newsletter */}
          <div className="bg-white rounded-[24px] p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Send className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center gap-1 text-red-600">
                <TrendingDown className="w-4 h-4" />
              </div>
            </div>
            <p className="text-sm font-normal text-[#4F5E6E] mb-3 mt-5">Sent Newsletter</p>
            <p className="text-2xl sm:text-[32px] font-semibold text-gray-900">50</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Total Subscribers */}
          <div className="bg-white rounded-[24px] p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <p className="text-sm font-normal text-[#4F5E6E] mb-3 mt-5">Total Subscribers</p>
            <p className="text-2xl sm:text-[32px] font-semibold text-gray-900">20</p>
          </div>

          {/* Active Subscriber */}
          <div className="bg-white rounded-[24px] p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <p className="text-sm font-normal text-[#4F5E6E] mb-3 mt-5">Active Subscriber</p>
            <p className="text-2xl sm:text-[32px] font-semibold text-gray-900">100</p>
          </div>

          {/* Unsubscribers */}
          <div className="bg-white rounded-[24px] p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <UserX className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex items-center gap-1 text-red-600">
                <TrendingDown className="w-4 h-4" />
              </div>
            </div>
            <p className="text-sm font-normal text-[#4F5E6E] mb-3 mt-5">Unsubscribed</p>
            <p className="text-2xl sm:text-[32px] font-semibold text-gray-900">0</p>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-gray-200">
        {/* Search and Filters */}
        <div className="p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 border-b border-gray-200">
          <div className={`flex-1 relative rounded-[10px] ${activeView === 'subscribers' ? 'bg-white border border-gray-300' : 'bg-[#F9F9FB]'}`}>
            <Search className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search for Newsletter..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-sm rounded-[10px] focus:outline-none focus:ring-1 focus:ring-[#005F87] focus:border-transparent bg-transparent"
            />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {activeView === 'newsletter' && (
              <div className="relative category-dropdown flex-1 sm:flex-initial">
                <button
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-[10px] bg-[#F9F9FB] transition-colors w-full sm:w-auto justify-between"
                >
                  <span className="text-xs sm:text-sm text-gray-600">{categoryFilter}</span>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>
                {showCategoryDropdown && (
                  <div className="absolute top-full mt-1 w-full sm:w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className="w-full text-left px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            {activeView === 'subscribers' && (
              <div className="relative category-dropdown flex-1 sm:flex-initial">
                <button
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-[10px] border border-gray-300 bg-white transition-colors w-full sm:min-w-[120px] justify-between"
                >
                  <span className="text-xs sm:text-sm text-gray-600">{categoryFilter}</span>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>
                {showCategoryDropdown && (
                  <div className="absolute top-full mt-1 w-full sm:w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {sources.map((source) => (
                      <button
                        key={source}
                        onClick={() => handleCategoryChange(source)}
                        className="w-full text-left px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {source}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div className="relative status-dropdown flex-1 sm:flex-initial">
              <button
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-[10px] transition-colors w-full sm:w-auto justify-between ${activeView === 'subscribers'
                  ? 'border border-gray-300 bg-white sm:min-w-[120px]'
                  : 'bg-[#F9F9FB]'
                  }`}
              >
                <span className="text-xs sm:text-sm text-gray-600">{statusFilter}</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              {showStatusDropdown && (
                <div className="absolute top-full mt-1 w-full sm:w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {statuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      className="w-full text-left px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-gray-200">
                {activeView === 'newsletter' ? (
                  <>
                    <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">No</th>
                    <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Title</th>
                    <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Status</th>
                    <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Category</th>
                    <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Date</th>
                    <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Price</th>
                  </>
                ) : (
                  <>
                    <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Name</th>
                    <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Email Address</th>
                    <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Status</th>
                    <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Source</th>
                    <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Date Joined</th>
                    <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Date ...</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {activeView === 'newsletter' ? (
                currentData.map((newsletter: any, index: number) => (
                  <tr key={newsletter.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className="text-xs sm:text-sm text-gray-900">{startIndex + index + 1}</span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className="text-xs sm:text-sm text-gray-900">{newsletter.title}</span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className={`text-xs sm:text-sm font-medium ${newsletter.status === 'Sent' ? 'text-green-600' :
                        newsletter.status === 'Draft' ? 'text-red-600' :
                          'text-blue-600'
                        }`}>
                        {newsletter.status}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className="text-xs sm:text-sm text-gray-600">{newsletter.category}</span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className="text-xs sm:text-sm text-gray-600">{newsletter.date}</span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className="text-xs sm:text-sm text-gray-900">{newsletter.price}</span>
                    </td>
                  </tr>
                ))
              ) : (
                currentData.map((subscriber: any) => (
                  <tr key={subscriber.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className="text-xs sm:text-sm text-gray-900">{subscriber.name}</span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className="text-xs sm:text-sm text-gray-900">{subscriber.email}</span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className={`text-xs sm:text-sm font-medium ${subscriber.status === 'Active' ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {subscriber.status}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className="text-xs sm:text-sm text-gray-900">{subscriber.source}</span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className="text-xs sm:text-sm text-gray-900">{subscriber.dateJoined}</span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className="text-xs sm:text-sm text-gray-900">{subscriber.newsletter}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-t border-gray-200 gap-3 sm:gap-0">
          <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} results
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors ${currentPage === 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs sm:text-sm hidden sm:inline">Previous</span>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs sm:text-sm font-medium transition-colors ${currentPage === page
                    ? 'bg-[#005F87] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors ${currentPage === totalPages
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <span className="text-xs sm:text-sm hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Create Newsletter Modal */}
      {showCreateModal && (
        <CreateNewsletterModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}

function CreateNewsletterModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const categories = ['General', 'Updates', 'Promotions', 'News'];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Black Opacity */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="bg-white rounded-[24px] w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10">
        <div className="p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Create Newsletter</h2>
            <p className="text-xs sm:text-sm text-gray-500">Create and publish a newsletter for your audience</p>
          </div>

          {/* Title and Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
              />
            </div>
            <div className="relative">
              <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Category</label>
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent text-left flex items-center justify-between bg-white"
              >
                <span className={category ? 'text-gray-900' : 'text-gray-400'}>
                  {category || ''}
                </span>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </button>

              {showCategoryDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategory(cat);
                        setShowCategoryDropdown(false);
                      }}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      <span className="text-xs sm:text-sm text-gray-900">{cat}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Subject */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Subject</label>
            <textarea
              value={subject}
              onChange={(e) => {
                if (e.target.value.length <= 500) {
                  setSubject(e.target.value);
                }
              }}
              maxLength={500}
              rows={3}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">{subject.length}/500 Characters</p>
          </div>

          {/* Newsletter Content */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Newsletter Content</label>
            <textarea
              value={content}
              onChange={(e) => {
                if (e.target.value.length <= 500) {
                  setContent(e.target.value);
                }
              }}
              maxLength={500}
              rows={6}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">{content.length}/500 Characters</p>
          </div>

          {/* Schedule for later */}
          <div className="mb-6 sm:mb-8">
            <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Schedule for later (Optional)</label>
            <input
              type="text"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              placeholder="MM/DD/YYYY"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
            <button
              onClick={onClose}
              className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors order-2 sm:order-1"
            >
              Draft
            </button>
            <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-400 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-500 transition-colors order-1 sm:order-2">
              Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}