'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Users,
  User,
  X,
  ArrowRight,
  ArrowLeft as ArrowLeftIcon,
  Upload,
  Globe,
  Mail,
  Phone,
  MapPin,
  Building2,
  Download
} from 'lucide-react';
import Image from 'next/image';

interface SocialLink {
  platform: string;
  url: string;
  color: string;
}

interface EmployeeData {
  _id?: string;
  name: string;
  title: string;
  employeeId: string;
  profileImage: string;
  email: string;
  phone: string;
  officeLocation: string;
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyWebsite: string;
  companyAddress: string;
  socials: SocialLink[];
  profileUrl: string;
  qrCodeUrl: string;
  createdAt?: string;
}

export default function EmployeeManagement() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(null);
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  // Form state for 4-step form
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<EmployeeData>({
    name: '',
    title: '',
    employeeId: '',
    profileImage: '',
    email: '',
    phone: '',
    officeLocation: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    companyWebsite: '',
    companyAddress: '',
    socials: [],
    profileUrl: '',
    qrCodeUrl: ''
  });
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch employees
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/employees');
      const result = await response.json();
      if (result.success) {
        setEmployees(result.data);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter employees based on search
  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

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

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setUploadedImage(result);
        setFormData(prev => ({ ...prev, profileImage: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSocialChange = (index: number, field: keyof SocialLink, value: string) => {
    const newSocials = [...formData.socials];
    if (!newSocials[index]) {
      newSocials[index] = { platform: '', url: '', color: '#2158D0' };
    }
    newSocials[index] = { ...newSocials[index], [field]: value };
    setFormData(prev => ({ ...prev, socials: newSocials }));
  };

  const addSocialLink = () => {
    setFormData(prev => ({
      ...prev,
      socials: [...prev.socials, { platform: '', url: '', color: '#2158D0' }]
    }));
  };

  const removeSocialLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      socials: prev.socials.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setIsCreateModalOpen(false);
        setCurrentStep(1);
        setFormData({
          name: '',
          title: '',
          employeeId: '',
          profileImage: '',
          email: '',
          phone: '',
          officeLocation: '',
          companyName: '',
          companyEmail: '',
          companyPhone: '',
          companyWebsite: '',
          companyAddress: '',
          socials: [],
          profileUrl: '',
          qrCodeUrl: ''
        });
        setUploadedImage('');
        fetchEmployees();
      } else {
        alert('Failed to create employee: ' + result.error);
      }
    } catch (error) {
      alert('Failed to create employee. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      name: '',
      title: '',
      employeeId: '',
      profileImage: '',
      email: '',
      phone: '',
      officeLocation: '',
      companyName: '',
      companyEmail: '',
      companyPhone: '',
      companyWebsite: '',
      companyAddress: '',
      socials: [],
      profileUrl: '',
      qrCodeUrl: ''
    });
    setUploadedImage('');
  };

  // Action handlers
  const handleViewEmployee = (employee: EmployeeData) => {
    setSelectedEmployee(employee);
    setIsViewModalOpen(true);
  };

  const handleEditEmployee = (employee: EmployeeData) => {
    setSelectedEmployee(employee);
    setFormData({
      name: employee.name,
      title: employee.title,
      employeeId: employee.employeeId,
      profileImage: employee.profileImage,
      email: employee.email,
      phone: employee.phone,
      officeLocation: employee.officeLocation,
      companyName: employee.companyName,
      companyEmail: employee.companyEmail,
      companyPhone: employee.companyPhone,
      companyWebsite: employee.companyWebsite,
      companyAddress: employee.companyAddress,
      socials: employee.socials || [],
      profileUrl: employee.profileUrl,
      qrCodeUrl: employee.qrCodeUrl
    });
    setUploadedImage(employee.profileImage);
    setIsEditModalOpen(true);
  };

  const handleDeleteEmployee = (employee: EmployeeData) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const downloadQRCode = () => {
    if (selectedEmployee?.qrCodeUrl) {
      const link = document.createElement('a');
      link.href = selectedEmployee.qrCodeUrl;
      link.download = `${selectedEmployee.name.replace(/\s+/g, '_')}_QR_Code.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEmployee(null);
    resetForm();
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleConfirmEdit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/employees/${selectedEmployee?._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setIsEditModalOpen(false);
        setSelectedEmployee(null);
        resetForm();
        fetchEmployees();
      } else {
        alert('Failed to update employee: ' + result.error);
      }
    } catch (error) {
      alert('Failed to update employee. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedEmployee) return;
    
    try {
      const response = await fetch(`/api/employees/${selectedEmployee._id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (result.success) {
        setIsDeleteModalOpen(false);
        setSelectedEmployee(null);
        fetchEmployees();
      } else {
        alert('Failed to delete employee: ' + result.error);
      }
    } catch (error) {
      alert('Failed to delete employee. Please try again.');
    }
  };

  // Validation functions for each step
  const validateStep1 = () => {
    return formData.name.trim() !== '' && formData.title.trim() !== '';
  };

  const validateStep2 = () => {
    return formData.email.trim() !== '' && 
           formData.phone.trim() !== '' && 
           formData.officeLocation.trim() !== '' &&
           formData.email.includes('@') &&
           formData.phone.length >= 10;
  };

  const validateStep3 = () => {
    return formData.companyName.trim() !== '' && 
           formData.companyEmail.trim() !== '' && 
           formData.companyPhone.trim() !== '' && 
           formData.companyWebsite.trim() !== '' && 
           formData.companyAddress.trim() !== '' &&
           formData.companyEmail.includes('@') &&
           formData.companyWebsite.startsWith('http');
  };

  const validateStep4 = () => {
    // Social links are optional, so always valid
    return true;
  };

  const canProceedToNext = () => {
    switch(currentStep) {
      case 1: return validateStep1();
      case 2: return validateStep2();
      case 3: return validateStep3();
      case 4: return validateStep4();
      default: return false;
    }
  };

  const getStepError = () => {
    switch(currentStep) {
      case 1: 
        if (!formData.name.trim()) return 'Full Name is required';
        if (!formData.title.trim()) return 'Job Title is required';
        return '';
      case 2:
        if (!formData.email.trim()) return 'Email Address is required';
        if (!formData.email.includes('@')) return 'Please enter a valid email';
        if (!formData.phone.trim()) return 'Phone Number is required';
        if (formData.phone.length < 10) return 'Please enter a valid phone number';
        if (!formData.officeLocation.trim()) return 'Office Location is required';
        return '';
      case 3:
        if (!formData.companyName.trim()) return 'Company Name is required';
        if (!formData.companyEmail.trim()) return 'Company Email is required';
        if (!formData.companyEmail.includes('@')) return 'Please enter a valid company email';
        if (!formData.companyPhone.trim()) return 'Company Phone is required';
        if (!formData.companyWebsite.trim()) return 'Company Website is required';
        if (!formData.companyWebsite.startsWith('http')) return 'Please enter a valid website URL';
        if (!formData.companyAddress.trim()) return 'Company Address is required';
        return '';
      case 4:
        return '';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Employee Management</h1>
        <div className="flex items-center justify-end gap-3">
          <button 
            onClick={() => setIsCreateModalOpen(true)} 
            className="flex items-center gap-2 bg-[#005F87] text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg hover:bg-[#004A6B] transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="mt-0.5 font-normal">Create Employee</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-[24px] p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-sm text-[#4F5E6E] font-normal mb-3 sm:mb-5 mt-3 sm:mt-5">Total Employees</p>
          <p className="text-2xl sm:text-[32px] font-semibold text-gray-900">{employees.length}</p>
        </div>

        <div className="bg-white rounded-[24px] p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex items-center gap-1 text-blue-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-sm text-[#4F5E6E] font-normal mb-3 sm:mb-5 mt-3 sm:mt-5">Departments</p>
          <p className="text-2xl sm:text-[32px] font-semibold text-gray-900">8</p>
        </div>

        <div className="bg-white rounded-[24px] p-4 shadow-sm sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex items-center gap-1 text-gray-900">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-sm text-[#4F5E6E] font-normal mb-3 sm:mb-5 mt-3 sm:mt-5">Profile Views</p>
          <p className="text-2xl sm:text-[32px] font-semibold text-gray-900">24,580</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-[24px] p-3 sm:p-4 mb-6">
        <div className="p-2 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <div className="flex-1 relative rounded-[10px] bg-[#F9F9FB]">
            <Search className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search for Employee..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 rounded-[10px] focus:outline-none focus:ring-1 focus:ring-[#005F87] focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto -mx-3 sm:mx-0">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-t border-gray-200">
                <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Employee</th>
                <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Title</th>
                <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Company</th>
                <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Email</th>
                <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Created</th>
                <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8">
                    <div className="flex items-center justify-center">
                      <div className="w-8 h-8 border-4 border-[#005F87] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </td>
                </tr>
              ) : currentEmployees.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No employees found
                  </td>
                </tr>
              ) : (
                currentEmployees.map((employee) => (
                  <tr key={employee._id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-200">
                          {employee.profileImage ? (
                            <Image src={employee.profileImage} alt="" width={40} height={40} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                          <p className="text-xs text-gray-500">{employee.employeeId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className="text-sm text-gray-900">{employee.title}</span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className="text-sm text-gray-600">{employee.companyName}</span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className="text-sm text-gray-600">{employee.email}</span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className="text-sm text-gray-600">
                        {employee.createdAt ? new Date(employee.createdAt).toLocaleDateString() : 'N/A'}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <button 
                          onClick={() => handleViewEmployee(employee)}
                          className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors" 
                          title="View Employee Details"
                        >
                          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                        </button>
                        <button 
                          onClick={() => handleEditEmployee(employee)}
                          className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors" 
                          title="Edit Employee"
                        >
                          <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                        </button>
                        <button 
                          onClick={() => handleDeleteEmployee(employee)}
                          className="p-1.5 sm:p-2 hover:bg-red-50 rounded-lg transition-colors" 
                          title="Delete Employee"
                        >
                          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-3 sm:px-6 py-3 sm:py-4 border-t border-gray-200">
            <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredEmployees.length)} of {filteredEmployees.length} results
            </div>
            <div className="flex items-center justify-center gap-2">
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
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
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
        )}
      </div>

      {/* Create Employee Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsCreateModalOpen(false)} />
          <div className="bg-white rounded-[20px] w-full max-w-4xl relative z-10 max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Create Employee Profile</h2>
                  <p className="text-xs sm:text-sm text-gray-500">Add a new employee to your organization</p>
                </div>
                <button
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    resetForm();
                  }}
                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="mb-8">
                <div className="relative">
                  <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
                  <div 
                    className="absolute top-5 left-0 h-1 bg-green-500 -z-10 transition-all duration-300"
                    style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                  ></div>
                  <div className="relative flex justify-between">
                    {[1, 2, 3, 4].map((step) => (
                      <div key={step} className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                          currentStep === step
                            ? 'bg-[#005F87] text-white ring-4 ring-[#005F87]/20'
                            : currentStep > step
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {currentStep > step ? '✓' : step}
                        </div>
                        <span className={`text-xs mt-2 font-medium transition-colors ${
                          currentStep >= step ? 'text-[#005F87]' : 'text-gray-500'
                        }`}>
                          {step === 1 && 'Basic Info'}
                          {step === 2 && 'Contact'}
                          {step === 3 && 'Company'}
                          {step === 4 && 'Social'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Profile Image
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          id="profileImage"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <label
                          htmlFor="profileImage"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#2158D0] transition-colors"
                        >
                          {uploadedImage ? (
                            <Image
                              src={uploadedImage}
                              alt="Profile preview"
                              width={80}
                              height={80}
                              className="rounded-lg object-cover border-2 border-[#2158D0]"
                            />
                          ) : (
                            <div className="flex flex-col items-center">
                              <Upload className="w-8 h-8 text-gray-400 mb-2" />
                              <span className="text-sm text-gray-500">Click to upload image</span>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                          placeholder="Enter full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Job Title *
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                          placeholder="Enter job title"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Contact Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                        placeholder="email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                        placeholder="+234 000 000 0000"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Office Location *
                      </label>
                      <input
                        type="text"
                        name="officeLocation"
                        value={formData.officeLocation}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                        placeholder="Enter office location"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Company Information */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                        placeholder="Enter company name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Email *
                      </label>
                      <input
                        type="email"
                        name="companyEmail"
                        value={formData.companyEmail}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                        placeholder="company@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Phone *
                      </label>
                      <input
                        type="tel"
                        name="companyPhone"
                        value={formData.companyPhone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                        placeholder="+234 000 000 0000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Website *
                      </label>
                      <input
                        type="url"
                        name="companyWebsite"
                        value={formData.companyWebsite}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                        placeholder="https://example.com"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Address *
                      </label>
                      <textarea
                        name="companyAddress"
                        value={formData.companyAddress}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent resize-none"
                        placeholder="Enter company address"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Social Links */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Social Links</h3>
                  
                  <div className="space-y-4">
                    {formData.socials.length > 0 && (
                      <div className="space-y-4">
                        {formData.socials.map((social, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="text-sm font-medium text-gray-900">Social Link {index + 1}</h4>
                              <button
                                type="button"
                                onClick={() => removeSocialLink(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <input
                                type="text"
                                placeholder="Platform (e.g., Instagram)"
                                value={social.platform}
                                onChange={(e) => handleSocialChange(index, 'platform', e.target.value)}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                              />
                              <input
                                type="url"
                                placeholder="URL (e.g., https://instagram.com/username)"
                                value={social.url}
                                onChange={(e) => handleSocialChange(index, 'url', e.target.value)}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={addSocialLink}
                      className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="text-sm">Add Social Link</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ArrowLeftIcon className="w-4 h-4" />
                    Previous
                  </div>
                </button>

                {currentStep < 4 ? (
                  <div className="flex flex-col items-end">
                    {/* {getStepError() && (
                      <span className="text-red-500 text-sm mb-2">{getStepError()}</span>
                    )} */}
                    <button
                      onClick={nextStep}
                      disabled={!canProceedToNext()}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        !canProceedToNext()
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-[#005F87] text-white hover:bg-[#004A6B]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        Next
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:cursor-not-allowed disabled:bg-gray-400"
                  >
                    {isSubmitting ? 'Creating...' : 'Create Employee'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {isEditModalOpen && selectedEmployee && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="absolute inset-0 bg-black/50" onClick={handleCloseEditModal} />
          <div className="bg-white rounded-[20px] w-full max-w-4xl relative z-10 max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Edit Employee Profile</h2>
                  <p className="text-xs sm:text-sm text-gray-500">Update employee information</p>
                </div>
                <button
                  onClick={handleCloseEditModal}
                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="mb-8">
                <div className="relative">
                  <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
                  <div 
                    className="absolute top-5 left-0 h-1 bg-green-500 -z-10 transition-all duration-300"
                    style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                  ></div>
                  <div className="relative flex justify-between">
                    {[1, 2, 3, 4].map((step) => (
                      <div key={step} className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                          currentStep === step
                            ? 'bg-[#005F87] text-white ring-4 ring-[#005F87]/20'
                            : currentStep > step
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {currentStep > step ? '✓' : step}
                        </div>
                        <span className={`text-xs mt-2 font-medium transition-colors ${
                          currentStep >= step ? 'text-[#005F87]' : 'text-gray-500'
                        }`}>
                          {step === 1 && 'Basic Info'}
                          {step === 2 && 'Contact'}
                          {step === 3 && 'Company'}
                          {step === 4 && 'Social'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Profile Image
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          id="profileImage"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <label
                          htmlFor="profileImage"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#2158D0] transition-colors"
                        >
                          {uploadedImage ? (
                            <Image
                              src={uploadedImage}
                              alt="Profile preview"
                              width={80}
                              height={80}
                              className="rounded-lg object-cover border-2 border-[#2158D0]"
                            />
                          ) : (
                            <div className="flex flex-col items-center">
                              <Upload className="w-8 h-8 text-gray-400 mb-2" />
                              <span className="text-sm text-gray-500">Click to upload image</span>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                          placeholder="Enter full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Job Title *
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                          placeholder="Enter job title"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Contact Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                        placeholder="email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                        placeholder="+234 000 000 0000"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Office Location *
                      </label>
                      <input
                        type="text"
                        name="officeLocation"
                        value={formData.officeLocation}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                        placeholder="Enter office location"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Company Information */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                        placeholder="Enter company name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Email *
                      </label>
                      <input
                        type="email"
                        name="companyEmail"
                        value={formData.companyEmail}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                        placeholder="company@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Phone *
                      </label>
                      <input
                        type="tel"
                        name="companyPhone"
                        value={formData.companyPhone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                        placeholder="+234 000 000 0000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Website *
                      </label>
                      <input
                        type="url"
                        name="companyWebsite"
                        value={formData.companyWebsite}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                        placeholder="https://example.com"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Address *
                      </label>
                      <textarea
                        name="companyAddress"
                        value={formData.companyAddress}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent resize-none"
                        placeholder="Enter company address"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Social Links */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Social Links</h3>
                  
                  <div className="space-y-4">
                    {formData.socials.length > 0 && (
                      <div className="space-y-4">
                        {formData.socials.map((social, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="text-sm font-medium text-gray-900">Social Link {index + 1}</h4>
                              <button
                                type="button"
                                onClick={() => removeSocialLink(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <input
                                type="text"
                                placeholder="Platform (e.g., Instagram)"
                                value={social.platform}
                                onChange={(e) => handleSocialChange(index, 'platform', e.target.value)}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                              />
                              <input
                                type="url"
                                placeholder="URL (e.g., https://instagram.com/username)"
                                value={social.url}
                                onChange={(e) => handleSocialChange(index, 'url', e.target.value)}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2158D0] focus:border-transparent"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={addSocialLink}
                      className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="text-sm">Add Social Link</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ArrowLeftIcon className="w-4 h-4" />
                    Previous
                  </div>
                </button>

                {currentStep < 4 ? (
                  <div className="flex flex-col items-end">
                    {getStepError() && (
                      <span className="text-red-500 text-sm mb-2">{getStepError()}</span>
                    )}
                    <button
                      onClick={nextStep}
                      disabled={!canProceedToNext()}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        !canProceedToNext()
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-[#005F87] text-white hover:bg-[#004A6B]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        Next
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleConfirmEdit}
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:cursor-not-allowed disabled:bg-gray-400"
                  >
                    {isSubmitting ? 'Updating...' : 'Update Employee'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedEmployee && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="absolute inset-0 bg-black/50" onClick={handleCloseDeleteModal} />
          <div className="bg-white rounded-[20px] w-full max-w-md relative z-10 max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Delete Employee</h2>
                  <p className="text-sm text-gray-500">This action cannot be undone</p>
                </div>
                <button
                  onClick={handleCloseDeleteModal}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Employee Info */}
              <div className="bg-red-50 rounded-xl p-6 mb-6 border-2 border-red-100">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-white ring-2 ring-red-200">
                    {selectedEmployee.profileImage ? (
                      <Image src={selectedEmployee.profileImage} alt="" width={64} height={64} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{selectedEmployee.name}</h3>
                    <p className="text-sm text-gray-600">{selectedEmployee.title}</p>
                    <p className="text-xs text-gray-500">ID: {selectedEmployee.employeeId}</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-6">
                Are you sure you want to delete this employee profile? All associated data including the QR code and profile URL will be permanently removed.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
                <button
                  onClick={handleCloseDeleteModal}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Delete Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && selectedEmployee && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="absolute inset-0 bg-black/50" onClick={handleCloseViewModal} />
          <div className="bg-white rounded-[20px] w-full max-w-3xl relative z-10 max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Employee Details</h2>
                  <p className="text-sm text-gray-500">View complete employee information</p>
                </div>
                <button
                  onClick={handleCloseViewModal}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Employee Profile Card */}
              <div className="bg-gradient-to-br from-[#005F87] to-[#2158D0] rounded-2xl p-6 mb-8 text-white">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-white/20 backdrop-blur-sm ring-4 ring-white/30">
                    {selectedEmployee.profileImage ? (
                      <Image src={selectedEmployee.profileImage} alt="" width={96} height={96} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-12 h-12 text-white/80" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{selectedEmployee.name}</h3>
                    <p className="text-lg text-white/90 mb-1">{selectedEmployee.title}</p>
                    <p className="text-sm text-white/70">ID: {selectedEmployee.employeeId}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#005F87]" />
                  Contact Information
                </h4>
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Email Address</p>
                      <a href={`mailto:${selectedEmployee.email}`} className="text-gray-900 hover:text-[#2158D0] transition-colors font-medium">
                        {selectedEmployee.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                      <a href={`tel:${selectedEmployee.phone}`} className="text-gray-900 hover:text-[#2158D0] transition-colors font-medium">
                        {selectedEmployee.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Office Location</p>
                      <p className="text-gray-900 font-medium">{selectedEmployee.officeLocation}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Information Section */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#005F87]" />
                  Company Information
                </h4>
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Company Name</p>
                    <h5 className="text-lg font-semibold text-gray-900">{selectedEmployee.companyName}</h5>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Company Email</p>
                      <a href={`mailto:${selectedEmployee.companyEmail}`} className="text-gray-900 hover:text-[#2158D0] transition-colors font-medium">
                        {selectedEmployee.companyEmail}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Company Phone</p>
                      <a href={`tel:${selectedEmployee.companyPhone}`} className="text-gray-900 hover:text-[#2158D0] transition-colors font-medium">
                        {selectedEmployee.companyPhone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Website</p>
                      <a 
                        href={selectedEmployee.companyWebsite} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-900 hover:text-[#2158D0] transition-colors font-medium break-all"
                      >
                        {selectedEmployee.companyWebsite}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Address</p>
                      <p className="text-gray-900 font-medium">{selectedEmployee.companyAddress}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links Section */}
              {selectedEmployee.socials && selectedEmployee.socials.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h4>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedEmployee.socials.map((social, index) => (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 bg-white p-3 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="w-10 h-10 rounded-lg bg-[#2158D0]/10 flex items-center justify-center">
                            <Globe className="w-5 h-5 text-[#2158D0]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">{social.platform}</p>
                            <p className="text-xs text-gray-500 truncate">{social.url}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* QR Code Section */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">QR Code</h4>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-dashed border-gray-300">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
                      <img 
                        src={selectedEmployee.qrCodeUrl} 
                        alt="QR Code" 
                        className="w-40 h-40" 
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h5 className="font-semibold text-gray-900 mb-2">Scan to View Profile</h5>
                      <p className="text-sm text-gray-600 mb-4">
                        Use your mobile device to scan this QR code and instantly access the employee profile
                      </p>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="text-xs font-medium text-gray-500 mb-2">Profile URL:</p>
                        <p className="text-sm text-gray-900 break-all font-mono bg-gray-50 p-2 rounded">
                          {selectedEmployee.profileUrl}
                        </p>
                      </div>
                      <button
                        onClick={downloadQRCode}
                        className="mt-4 w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#005F87] text-white rounded-lg font-medium hover:bg-[#004A6B] transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download QR Code
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={handleCloseViewModal}
                  className="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <a
                  href={selectedEmployee.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-[#005F87] text-white rounded-lg font-medium hover:bg-[#004A6B] transition-colors text-center"
                >
                  View Full Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}