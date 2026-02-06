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
  FileText,
  X
} from 'lucide-react';
import Notifications from '@/components/Notificationpanel';
import CreateBlogModal from '@/components/Createblogmodal';

export default function BlogContentManagement() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
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

  const handleEditBlog = (blog: any) => {
    setSelectedBlog(blog);
    setIsEditModalOpen(true);
  };

  const handleDeleteBlog = (blog: any) => {
    setSelectedBlog(blog);
    setIsDeleteModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedBlog(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedBlog(null);
  };

  const handleConfirmEdit = (updatedBlog: any) => {
    console.log('Updating blog:', updatedBlog);
    handleCloseEditModal();
  };

  const handleConfirmDelete = () => {
    if (selectedBlog) {
      console.log('Deleting blog:', selectedBlog.title);
    }
    handleCloseDeleteModal();
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
                      <button 
                        onClick={() => handleEditBlog(blog)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit Blog"
                      >
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button 
                        onClick={() => handleDeleteBlog(blog)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Blog"
                      >
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

      {/* Edit Blog Modal */}
      {isEditModalOpen && selectedBlog && (
        <EditBlogModal 
          blog={selectedBlog} 
          onClose={handleCloseEditModal} 
          onSave={handleConfirmEdit} 
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedBlog && (
        <DeleteBlogConfirmationModal 
          blog={selectedBlog} 
          onClose={handleCloseDeleteModal} 
          onConfirm={handleConfirmDelete} 
        />
      )}
    </div>
  );
}

function EditBlogModal({ blog, onClose, onSave }: { 
  blog: any; 
  onClose: () => void; 
  onSave: (blog: any) => void; 
}) {
  const [title, setTitle] = useState(blog.title);
  const [category, setCategory] = useState(blog.category);
  const [status, setStatus] = useState(blog.status);

  const handleSave = () => {
    const updatedBlog = {
      ...blog,
      title,
      category,
      status
    };
    onSave(updatedBlog);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="bg-white rounded-[20px] w-full max-w-2xl relative z-10">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Edit Blog Post</h2>
              <p className="text-sm text-gray-500">Update blog post information</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Blog Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                placeholder="Enter blog title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                placeholder="Enter category"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-[#005F87] text-white rounded-lg text-sm font-medium hover:bg-[#004A6B] transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeleteBlogConfirmationModal({ blog, onClose, onConfirm }: { 
  blog: any; 
  onClose: () => void; 
  onConfirm: () => void; 
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="bg-white rounded-[20px] w-full max-w-md relative z-10">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Delete Blog Post</h2>
              <p className="text-sm text-gray-500">Are you sure you want to delete this blog post?</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Blog Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">{blog.title}</h3>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Category:</span> {blog.category}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Status:</span> {blog.status}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Views:</span> {blog.views}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Created:</span> {blog.created}
              </p>
            </div>
          </div>

          {/* Warning Message */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-800">
              <strong>Warning:</strong> This action cannot be undone. All blog post data, including content, comments, and analytics, will be permanently deleted.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-3 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Delete Blog Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}