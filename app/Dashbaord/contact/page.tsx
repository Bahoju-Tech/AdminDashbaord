'use client';

import { useState } from 'react';
import {
  User,
  Users,
  Mail,
  Phone,
  Building2,
  BookOpen,
  Bell,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  X,
  Calendar,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Notifications from '@/components/Notificationpanel';

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Category');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sample contact data
  const contacts = [
    { 
      id: 1, 
      name: 'Success J.', 
      email: 'ifokusuccess@gmail.com', 
      company: 'Bahoju Ltd', 
      enquiryType: 'Institute', 
      date: '07 Oct 2024', 
      status: 'Resolved',
      fullName: 'Ifiok Success',
      companyName: 'Bahoju Tech Services',
      typeOfEnquiry: 'Institute',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    },
    { 
      id: 2, 
      name: 'Success J.', 
      email: 'ifokusuccess@gmail.com', 
      company: 'Bahoju Ltd', 
      enquiryType: 'Mart', 
      date: '07 Oct 2024', 
      status: 'Progress',
      fullName: 'Ifiok Success',
      companyName: 'Bahoju Tech Services',
      typeOfEnquiry: 'Mart',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    },
    { 
      id: 3, 
      name: 'Success J.', 
      email: 'ifokusuccess@gmail.com', 
      company: 'Bahoju Ltd', 
      enquiryType: 'Rise', 
      date: '07 Oct 2024', 
      status: 'Progress',
      fullName: 'Ifiok Success',
      companyName: 'Bahoju Tech Services',
      typeOfEnquiry: 'Rise',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    },
    { 
      id: 4, 
      name: 'Success J.', 
      email: 'ifokusuccess@gmail.com', 
      company: 'Bahoju Ltd', 
      enquiryType: 'Services', 
      date: '07 Oct 2024', 
      status: 'Resolved',
      fullName: 'Ifiok Success',
      companyName: 'Bahoju Tech Services',
      typeOfEnquiry: 'Services',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    },
    { 
      id: 5, 
      name: 'Success J.', 
      email: 'ifokusuccess@gmail.com', 
      company: 'Bahoju Ltd', 
      enquiryType: 'Institute', 
      date: '07 Oct 2024', 
      status: 'Progress',
      fullName: 'Ifiok Success',
      companyName: 'Bahoju Tech Services',
      typeOfEnquiry: 'Institute',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    },
  ];

  const categories = ['Category', 'Institute', 'Mart', 'Rise', 'Services'];
  const statuses = ['All Status', 'Resolved', 'Progress'];

  // Filter contacts based on search and filters
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          contact.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || contact.status === statusFilter;
    const matchesCategory = categoryFilter === 'Category' || contact.enquiryType === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredContacts.slice(startIndex, endIndex);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    setShowStatusDropdown(false);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
    setShowCategoryDropdown(false);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleContactClick = (contact: any) => {
    setSelectedContact(contact);
    setShowContactModal(true);
  };

  const handleCloseModal = () => {
    setShowContactModal(false);
    setSelectedContact(null);
  };

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <div className="flex sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Contacts</h1>
        <div className="flex items-center gap-3">
          <Notifications />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Total Contact */}
        <div className="bg-white rounded-[16px] p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <p className="text-sm font-normal text-[#6B7280] mb-2">Total Contact</p>
          <p className="text-2xl sm:text-[32px] font-semibold text-gray-900">20</p>
        </div>

        {/* Attended */}
        <div className="bg-white rounded-[16px] p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <p className="text-sm font-normal text-[#6B7280] mb-2">Attended</p>
          <p className="text-2xl sm:text-[32px] font-semibold text-gray-900">100</p>
        </div>

        {/* Unattended */}
        <div className="bg-white rounded-[16px] p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex items-center gap-1">
              <TrendingDown className="w-4 h-4 text-red-600" />
            </div>
          </div>
          <p className="text-sm font-normal text-[#6B7280] mb-2">Unattended</p>
          <p className="text-2xl sm:text-[32px] font-semibold text-gray-900">0</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-gray-200">
        {/* Search and Filters */}
        <div className="p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 border-b border-gray-200">
          <div className="flex-1 relative bg-[#F9F9FB] rounded-[10px]">
            <Search className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search for Newsletter..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-sm rounded-[10px] focus:outline-none focus:ring-1 focus:ring-[#005F87] focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative category-dropdown flex-1 sm:flex-initial">
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-[10px] bg-[#F9F9FB] transition-colors w-full sm:min-w-[130px] justify-between"
              >
                <span className="text-xs sm:text-sm text-gray-600">{categoryFilter}</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              {showCategoryDropdown && (
                <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
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
            <div className="relative status-dropdown flex-1 sm:flex-initial">
              <button
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-[10px] bg-[#F9F9FB] transition-colors w-full sm:min-w-[130px] justify-between"
              >
                <span className="text-xs sm:text-sm text-gray-600">{statusFilter}</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              {showStatusDropdown && (
                <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
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
                <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Name</th>
                <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Email Address</th>
                <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Company</th>
                <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Enquiry Type</th>
                <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Date</th>
                <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((contact) => (
                <tr 
                  key={contact.id} 
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleContactClick(contact)}
                >
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className="text-xs sm:text-sm text-gray-900">{contact.name}</span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className="text-xs sm:text-sm text-gray-900">{contact.email}</span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className="text-xs sm:text-sm text-gray-900">{contact.company}</span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className="text-xs sm:text-sm text-gray-900">{contact.enquiryType}</span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className="text-xs sm:text-sm text-gray-900">{contact.date}</span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className={`text-xs sm:text-sm font-medium ${
                      contact.status === 'Resolved' ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {contact.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-t border-gray-200 gap-3 sm:gap-0">
          <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredContacts.length)} of {filteredContacts.length} results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors ${
                currentPage === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs sm:text-sm hidden sm:inline">Previous</span>
            </button>
            
            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                      currentPage === pageNumber
                        ? 'bg-[#005F87] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors ${
                currentPage === totalPages
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

      {/* Contact Request Details Modal */}
      {showContactModal && selectedContact && (
        <ContactRequestModal 
          contact={selectedContact} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}

function ContactRequestModal({ contact, onClose }: { contact: any; onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      {/* Modal */}
      <div className="bg-white rounded-[20px] w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10">
        <div className="p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-4 sm:mb-6 gap-4">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Contact request details</h2>
              <p className="text-xs sm:text-sm text-gray-500">Create and publish a newsletter for your audience</p>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4 sm:space-y-6">
            {/* Full Name and Email Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Full Name</label>
                <div className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg bg-gray-50">
                  <span className="text-xs sm:text-sm text-gray-900">{contact.fullName}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Email Address</label>
                <div className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg bg-gray-50">
                  <span className="text-xs sm:text-sm text-gray-900">{contact.email}</span>
                </div>
              </div>
            </div>

            {/* Company Name and Type of Enquiry */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Company Name</label>
                <div className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg bg-gray-50">
                  <span className="text-xs sm:text-sm text-gray-900">{contact.companyName}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Type of Enquiry</label>
                <div className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg bg-gray-50">
                  <span className="text-xs sm:text-sm text-gray-900">{contact.typeOfEnquiry}</span>
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Message</label>
              <div className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg bg-gray-50 min-h-[140px] sm:min-h-[180px]">
                <p className="text-xs sm:text-sm text-gray-900 whitespace-pre-line leading-relaxed">
                  {contact.message}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-6 sm:mt-8">
            <button className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors order-2 sm:order-1">
              <span>New Request</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button 
              onClick={onClose}
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#005F87] text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-[#004A6B] transition-colors order-1 sm:order-2"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}