'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Bell,
  Search,
  ChevronDown,
  FileCheck,
  TrendingUp,
  FileEdit,
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  FileText
} from 'lucide-react';
import Notifications from '@/components/Notificationpanel';
import CreateBlogModal from '@/components/Createblogmodal';

export default function BlogContentManagement() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // State for dropdown menus
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.category-dropdown')) {
        setCategoryDropdownOpen(false);
      }
      if (!target.closest('.status-dropdown')) {
        setStatusDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sample blog data
  const blogs = [
    { id: 1, image: '/images/img.jpg', title: 'Institution', category: 'Ride', status: 'Published', views: 100, created: '13 Oct 2024' },
    { id: 2, image: '/images/img.jpg', title: 'Institution', category: 'Institution', status: 'Draft', views: 100, created: '13 Oct 2024' },
    { id: 3, image: '/images/img.jpg', title: 'Tech', category: 'Tech', status: 'Published', views: 100, created: '13 Oct 2024' },
    { id: 4, image: '/images/img.jpg', title: 'Institution', category: 'Institution', status: 'Draft', views: 100, created: '13 Oct 2024' },
    { id: 5, image: '/images/img.jpg', title: 'Institution', category: 'Institution', status: 'Published', views: 100, created: '13 Oct 2024' },
    { id: 6, image: '/images/img.jpg', title: 'Ride', category: 'Ride', status: 'Published', views: 100, created: '13 Oct 2024' },
    { id: 7, image: '/images/img.jpg', title: 'Institution', category: 'Institution', status: 'Published', views: 100, created: '13 Oct 2024' },
    { id: 8, image: '/images/img.jpg', title: 'Mart', category: 'Mart', status: 'Draft', views: 100, created: '13 Oct 2024' },
    { id: 9, image: '/images/img.jpg', title: 'Institution', category: 'Institution', status: 'Published', views: 100, created: '13 Oct 2024' },
    { id: 10, image: '/images/img.jpg', title: 'Institution', category: 'Institution', status: 'Published', views: 100, created: '13 Oct 2024' },
  ];

  // Get unique categories for filter dropdown
  const categories = ['All', ...Array.from(new Set(blogs.map(blog => blog.category)))];
  const statuses = ['All Status', 'Published', 'Draft'];

  // Filter blogs based on search, category, and status
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || blog.category === categoryFilter;
    const matchesStatus = statusFilter === 'All Status' || blog.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
    setCurrentPage(1);
    setCategoryDropdownOpen(false);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
    setStatusDropdownOpen(false);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Blog Content Management</h1>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2 bg-[#005F87] text-white px-4 py-2.5 rounded-lg hover:bg-[#004A6B] transition-colors">
            <Plus className="w-4 h-4" />
            <span className="text-sm mt-0.5 font-normal">Create New Blog</span>
          </button>
          <Notifications />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Published Card */}
        <div className="bg-white rounded-[24px] p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-sm text-[#4F5E6E] font-normal mb-5 mt-5">Published</p>
          <p className="text-[32px] font-semibold text-gray-900">12,450</p>
        </div>

        {/* Draft Card */}
        <div className="bg-white rounded-[24px] p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <FileEdit className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex items-center gap-1 text-red-600">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <p className="text-sm text-[#4F5E6E] font-normal mb-5 mt-5">Draft</p>
          <p className="text-[32px] font-semibold text-gray-900">12,450</p>
        </div>

        {/* Views Card */}
        <div className="bg-white rounded-[24px] p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex items-center gap-1 text-gray-900">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
          <p className="text-sm text-[#4F5E6E] font-normal mb-5 mt-5">Views</p>
          <p className="text-[32px] font-semibold text-gray-900">12,450</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-[24px] p-4 mb-6">
        <div className="p-4 flex items-center gap-4">
          <div className="flex-1 relative bg-[#F9F9FB]">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search for Blog..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-[10px] focus:outline-none focus:ring-1 focus:ring-[#005F87] focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-3">
            {/* Category Dropdown */}
            <div className="relative category-dropdown">
              <button 
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-[#F9F9FB] transition-colors"
              >
                <span className="text-sm text-gray-600">{categoryFilter}</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              {categoryDropdownOpen && (
                <div className="absolute top-full mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Status Dropdown */}
            <div className="relative status-dropdown">
              <button 
                onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-[#F9F9FB] transition-colors"
              >
                <span className="text-sm text-gray-600">{statusFilter}</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              {statusDropdownOpen && (
                <div className="absolute top-full mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {statuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
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
          <table className="w-full">
            <thead>
              <tr className="border-t border-gray-200">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Image</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Title</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Category</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Views</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Created</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBlogs.map((blog) => (
                <tr key={blog.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-200">
                      <img src={blog.image} alt="" className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{blog.title}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{blog.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${blog.status === 'Published' ? 'text-green-600' : 'text-red-600'
                      }`}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{blog.views}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{blog.created}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {blog.status === 'Draft' && (
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                      )}
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredBlogs.length)} of {filteredBlogs.length} results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                currentPage === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">Previous</span>
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === page
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
              className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                currentPage === totalPages
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="text-sm">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <CreateBlogModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  );
}