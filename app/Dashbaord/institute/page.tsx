'use client';

import { useState } from 'react';
import {
  Users,
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Bell,
  Edit,
  GraduationCap,
  Ban,
  UserX,
  Trash2
} from 'lucide-react';
import Notifications from '@/components/Notificationpanel';

interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
  paymentType: string;
  amount: string;
  date: string;
  phone: string;
  registrationDate: string;
  learningLevel: string;
  amountPaid: string;
  balance: string;
  isGraduated?: boolean;
  isSuspended?: boolean;
}

export default function InstitutePage() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showGraduateModal, setShowGraduateModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Category');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sample student data
  const students: Student[] = [
    {
      id: 1,
      name: 'Success Rink',
      email: 'ifokusuccess@gmail.com',
      course: 'UI/UX Fundamental',
      paymentType: 'Full Payment',
      amount: 'N200,00.00',
      date: '07 Oct 2024',
      phone: '234 0907443351',
      registrationDate: '07 Oct 2025',
      learningLevel: 'Basic Class',
      amountPaid: 'N150,000.00',
      balance: 'N200,000.00',
      isGraduated: false,
      isSuspended: false
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@gmail.com',
      course: 'Web Development',
      paymentType: 'Part Payment',
      amount: 'N180,00.00',
      date: '08 Oct 2024',
      phone: '234 0907443352',
      registrationDate: '08 Oct 2025',
      learningLevel: 'Intermediate',
      amountPaid: 'N100,000.00',
      balance: 'N80,000.00',
      isGraduated: true,
      isSuspended: false
    },
    {
      id: 3,
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      course: 'Mobile Development',
      paymentType: 'Full Payment',
      amount: 'N220,00.00',
      date: '09 Oct 2024',
      phone: '234 0907443353',
      registrationDate: '09 Oct 2025',
      learningLevel: 'Advanced',
      amountPaid: 'N220,000.00',
      balance: 'N0.00',
      isGraduated: false,
      isSuspended: true
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@gmail.com',
      course: 'Data Science',
      paymentType: 'Part Payment',
      amount: 'N250,00.00',
      date: '10 Oct 2024',
      phone: '234 0907443354',
      registrationDate: '10 Oct 2025',
      learningLevel: 'Intermediate',
      amountPaid: 'N125,000.00',
      balance: 'N125,000.00',
      isGraduated: false,
      isSuspended: false
    },
    {
      id: 5,
      name: 'Mike Johnson',
      email: 'mike.johnson@gmail.com',
      course: 'Cloud Computing',
      paymentType: 'Full Payment',
      amount: 'N300,00.00',
      date: '11 Oct 2024',
      phone: '234 0907443355',
      registrationDate: '11 Oct 2025',
      learningLevel: 'Advanced',
      amountPaid: 'N300,000.00',
      balance: 'N0.00',
      isGraduated: true,
      isSuspended: false
    }
  ];

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    setShowDetailsModal(true);
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
    setShowDetailsModal(false);
  };

  const handleCloseModals = () => {
    setShowRegisterModal(false);
    setShowDetailsModal(false);
    setShowEditModal(false);
    setShowGraduateModal(false);
    setShowSuspendModal(false);
    setShowDeleteModal(false);
    setSelectedStudent(null);
  };

  const handleGraduateStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowGraduateModal(true);
  };

  const handleSuspendStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowSuspendModal(true);
  };

  const handleDeleteStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowDeleteModal(true);
  };

  const handleConfirmGraduate = () => {
    if (selectedStudent) {
      console.log('Graduating student:', selectedStudent.name);
    }
    handleCloseModals();
  };

  const handleConfirmSuspend = () => {
    if (selectedStudent) {
      console.log(`${selectedStudent.isSuspended ? 'Unsuspending' : 'Suspending'} student:`, selectedStudent.name);
    }
    handleCloseModals();
  };

  const handleConfirmDelete = () => {
    if (selectedStudent) {
      console.log('Deleting student:', selectedStudent.name);
    }
    handleCloseModals();
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
    setShowCategoryDropdown(false);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    setShowStatusDropdown(false);
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

  // Filter students based on search and filters
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || student.paymentType === statusFilter;
    const matchesCategory = categoryFilter === 'Category' || student.course === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredStudents.slice(startIndex, endIndex);

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Institute</h1>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShowRegisterModal(true)}
            className="flex items-center justify-center gap-2 bg-[#005F87] text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg hover:bg-[#004A6B] transition-colors flex-1 sm:flex-initial"
          >
            <span className="text-lg sm:text-xl">+</span>
            <span className="text-xs sm:text-sm font-medium">Register Student</span>
          </button>
          {/* <div className="hidden sm:block"> */}
            <Notifications />
          {/* </div> */}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Total Registered students */}
        <div className="bg-white rounded-[16px] p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <p className="text-sm font-normal text-[#6B7280] mb-2">Total Registered students</p>
          <p className="text-2xl sm:text-[32px] font-semibold text-gray-900">20</p>
        </div>

        {/* Fully paid Students */}
        <div className="bg-white rounded-[16px] p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <p className="text-sm font-normal text-[#6B7280] mb-2">Fully paid Students</p>
          <p className="text-2xl sm:text-[32px] font-semibold text-gray-900">100</p>
        </div>

        {/* Part Payment students */}
        <div className="bg-white rounded-[16px] p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex items-center gap-1">
              <TrendingDown className="w-4 h-4 text-red-600" />
            </div>
          </div>
          <p className="text-sm font-normal text-[#6B7280] mb-2">Part Payment students</p>
          <p className="text-2xl sm:text-[32px] font-semibold text-gray-900">12</p>
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
              placeholder="Search for Student..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-sm rounded-[10px] focus:outline-none focus:ring-1 focus:ring-[#005F87] focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative flex-1 sm:flex-initial">
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-[10px] transition-colors w-full sm:min-w-[130px] justify-between bg-[#F9F9FB]"
              >
                <span className="text-xs sm:text-sm text-gray-600">{categoryFilter}</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              {showCategoryDropdown && (
                <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {['Category', 'UI/UX Fundamental', 'UI/UX Fundamental', 'UI/UX Fundamental', 'UI/UX Fundamental'].map((category) => (
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
            <div className="relative flex-1 sm:flex-initial">
              <button
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-[10px] bg-[#F9F9FB] transition-colors w-full sm:min-w-[130px] justify-between"
              >
                <span className="text-xs sm:text-sm text-gray-600">{statusFilter}</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              {showStatusDropdown && (
                <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {['All Status', 'Full Payment'].map((status) => (
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
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Student Name</th>
                <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Email Address</th>
                <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Course</th>
                <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Payment Type</th>
                <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Amount</th>
                <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Date</th>
                <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleStudentClick(student)}
                >
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className="text-xs sm:text-sm text-gray-900">{student.name}</span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className="text-xs sm:text-sm text-gray-900">{student.email}</span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className="text-xs sm:text-sm text-gray-900">{student.course}</span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className="text-xs sm:text-sm font-medium text-green-600">{student.paymentType}</span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className="text-xs sm:text-sm text-gray-900">{student.amount}</span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className="text-xs sm:text-sm text-gray-900">{student.date}</span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGraduateStudent(student);
                        }}
                        className={`p-1.5 hover:bg-gray-100 rounded transition-colors ${
                          student.isGraduated ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'
                        }`}
                        title={student.isGraduated ? 'Already Graduated' : 'Graduate Student'}
                        disabled={student.isGraduated}
                      >
                        <GraduationCap className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSuspendStudent(student);
                        }}
                        className={`p-1.5 hover:bg-gray-100 rounded transition-colors ${
                          student.isSuspended ? 'text-green-600 hover:bg-green-50' : 'text-orange-600 hover:bg-orange-50'
                        }`}
                        title={student.isSuspended ? 'Unsuspend Student' : 'Suspend Student'}
                      >
                        {student.isSuspended ? (
                          <UserX className="w-4 h-4" />
                        ) : (
                          <Ban className="w-4 h-4" />
                        )}
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteStudent(student);
                        }}
                        className="p-1.5 hover:bg-red-50 rounded transition-colors text-red-600"
                        title="Delete Student"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-t border-gray-200 gap-3 sm:gap-0">
          <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredStudents.length)} of {filteredStudents.length} results
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

      {/* Register Student Modal */}
      {showRegisterModal && (
        <RegisterStudentModal onClose={handleCloseModals} />
      )}

      {/* Student Details Modal */}
      {showDetailsModal && selectedStudent && (
        <StudentDetailsModal student={selectedStudent} onClose={handleCloseModals} onEdit={handleEditStudent} />
      )}

      {/* Edit Student Modal */}
      {showEditModal && selectedStudent && (
        <EditStudentModal student={selectedStudent} onClose={handleCloseModals} />
      )}

      {/* Graduate Confirmation Modal */}
      {showGraduateModal && selectedStudent && (
        <GraduateConfirmationModal 
          student={selectedStudent} 
          onClose={handleCloseModals} 
          onConfirm={handleConfirmGraduate} 
        />
      )}

      {/* Suspend Confirmation Modal */}
      {showSuspendModal && selectedStudent && (
        <SuspendStudentConfirmationModal 
          student={selectedStudent} 
          onClose={handleCloseModals} 
          onConfirm={handleConfirmSuspend} 
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedStudent && (
        <DeleteStudentConfirmationModal 
          student={selectedStudent} 
          onClose={handleCloseModals} 
          onConfirm={handleConfirmDelete} 
        />
      )}
    </div>
  );
}

function RegisterStudentModal({ onClose }: { onClose: () => void }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('');
  const [learningLevel, setLearningLevel] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [balance, setBalance] = useState('');
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);
  const [showLevelDropdown, setShowLevelDropdown] = useState(false);
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="bg-white rounded-[20px] w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10">
        <div className="p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-4 sm:mb-6 gap-4">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Register New Student</h2>
              <p className="text-xs sm:text-sm text-gray-500">Create and publish a new blog post for your audience</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4 sm:space-y-5">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                />
              </div>
            </div>

            {/* Course and Learning Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="relative">
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Select Course</label>
                <button
                  onClick={() => setShowCourseDropdown(!showCourseDropdown)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent text-left flex items-center justify-between bg-white"
                >
                  <span className={course ? 'text-gray-900' : 'text-gray-400'}>
                    {course || ''}
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div className="relative">
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Learning Level</label>
                <button
                  onClick={() => setShowLevelDropdown(!showLevelDropdown)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent text-left flex items-center justify-between bg-white"
                >
                  <span className={learningLevel ? 'text-gray-900' : 'text-gray-400'}>
                    {learningLevel || ''}
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Payment Type, Amount Paid, Balance */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="relative">
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Payment Type</label>
                <button
                  onClick={() => setShowPaymentDropdown(!showPaymentDropdown)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent text-left flex items-center justify-between bg-white"
                >
                  <span className={paymentType ? 'text-gray-900' : 'text-gray-400'}>
                    {paymentType || ''}
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Amount Paid</label>
                <input
                  type="text"
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Balance</label>
                <input
                  type="text"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-6 sm:mt-8">
            <button
              onClick={onClose}
              className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors order-2 sm:order-1"
            >
              Cancel
            </button>
            <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#005F87] text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-[#004A6B] transition-colors order-1 sm:order-2">
              Register Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentDetailsModal({ student, onClose, onEdit }: { student: Student; onClose: () => void; onEdit: (student: Student) => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="bg-white rounded-[20px] w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10">
        <div className="p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-4 sm:mb-6 gap-4">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Student Details</h2>
              <p className="text-xs sm:text-sm text-gray-500">Create and publish a newsletter for your audience</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Details */}
          <div className="space-y-4 sm:space-y-6">
            {/* Full Name and Registration Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Full Name</label>
                <div className="text-xs sm:text-sm text-gray-900">Ifiok Success</div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Registration Date</label>
                <div className="text-xs sm:text-sm text-gray-900">{student.registrationDate}</div>
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Email Address</label>
                <div className="text-xs sm:text-sm text-gray-900">{student.email}</div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Phone Number</label>
                <div className="text-xs sm:text-sm text-gray-900">{student.phone}</div>
              </div>
            </div>

            {/* Course and Learning Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Course</label>
                <div className="text-xs sm:text-sm text-gray-900">{student.course}</div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Learning Level</label>
                <div className="text-xs sm:text-sm text-gray-900">{student.learningLevel}</div>
              </div>
            </div>

            {/* Payment Type and Amount Paid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Payment Type</label>
                <div className="text-xs sm:text-sm text-gray-900">{student.paymentType}</div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Amount Paid</label>
                <div className="text-xs sm:text-sm text-gray-900">{student.amountPaid}</div>
              </div>
            </div>

            {/* Balance */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Balance</label>
              <div className="text-xs sm:text-sm text-gray-900">{student.balance}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-6 sm:mt-8">
            <button
              onClick={() => onEdit(student)}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#005F87] text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-[#004A6B] transition-colors order-1 sm:order-1"
            >
              <Edit className="w-4 h-4" />
              Edit Student
            </button>
            <button
              onClick={onClose}
              className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors order-2 sm:order-2"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditStudentModal({ student, onClose }: { student: Student; onClose: () => void }) {
  const [firstName, setFirstName] = useState(student.name.split(' ')[0] || '');
  const [lastName, setLastName] = useState(student.name.split(' ')[1] || '');
  const [email, setEmail] = useState(student.email);
  const [phone, setPhone] = useState(student.phone);
  const [course, setCourse] = useState(student.course);
  const [learningLevel, setLearningLevel] = useState(student.learningLevel);
  const [paymentType, setPaymentType] = useState(student.paymentType);
  const [amountPaid, setAmountPaid] = useState(student.amountPaid);
  const [balance, setBalance] = useState(student.balance);
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);
  const [showLevelDropdown, setShowLevelDropdown] = useState(false);
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);

  const handleSave = () => {
    console.log('Updated student data:', {
      firstName,
      lastName,
      email,
      phone,
      course,
      learningLevel,
      paymentType,
      amountPaid,
      balance
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="bg-white rounded-[20px] w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10">
        <div className="p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-4 sm:mb-6 gap-4">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Edit Student</h2>
              <p className="text-xs sm:text-sm text-gray-500">Update student information</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4 sm:space-y-5">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                />
              </div>
            </div>

            {/* Course and Learning Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="relative">
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Select Course</label>
                <button
                  onClick={() => setShowCourseDropdown(!showCourseDropdown)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent text-left flex items-center justify-between bg-white"
                >
                  <span className={course ? 'text-gray-900' : 'text-gray-400'}>
                    {course || 'Select course'}
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
                {showCourseDropdown && (
                  <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {['UI/UX Fundamental', 'Web Development', 'Mobile Development', 'Data Science'].map((courseOption) => (
                      <button
                        key={courseOption}
                        onClick={() => {
                          setCourse(courseOption);
                          setShowCourseDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {courseOption}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative">
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Learning Level</label>
                <button
                  onClick={() => setShowLevelDropdown(!showLevelDropdown)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent text-left flex items-center justify-between bg-white"
                >
                  <span className={learningLevel ? 'text-gray-900' : 'text-gray-400'}>
                    {learningLevel || 'Select level'}
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
                {showLevelDropdown && (
                  <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {['Basic Class', 'Intermediate', 'Advanced'].map((levelOption) => (
                      <button
                        key={levelOption}
                        onClick={() => {
                          setLearningLevel(levelOption);
                          setShowLevelDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {levelOption}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Payment Type, Amount Paid, Balance */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="relative">
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Payment Type</label>
                <button
                  onClick={() => setShowPaymentDropdown(!showPaymentDropdown)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent text-left flex items-center justify-between bg-white"
                >
                  <span className={paymentType ? 'text-gray-900' : 'text-gray-400'}>
                    {paymentType || 'Select type'}
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
                {showPaymentDropdown && (
                  <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {['Full Payment', 'Part Payment'].map((paymentOption) => (
                      <button
                        key={paymentOption}
                        onClick={() => {
                          setPaymentType(paymentOption);
                          setShowPaymentDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {paymentOption}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Amount Paid</label>
                <input
                  type="text"
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Balance</label>
                <input
                  type="text"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-6 sm:mt-8">
            <button
              onClick={onClose}
              className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors order-2 sm:order-1"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#005F87] text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-[#004A6B] transition-colors order-1 sm:order-2"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GraduateConfirmationModal({ student, onClose, onConfirm }: { 
  student: Student; 
  onClose: () => void; 
  onConfirm: () => void; 
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="bg-white rounded-[20px] w-full max-w-md relative z-10">
        <div className="p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-4 sm:mb-6 gap-4">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Graduate Student</h2>
              <p className="text-xs sm:text-sm text-gray-500">Are you sure you want to graduate this student?</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Student Info */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">{student.name}</h3>
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-gray-600">
                <span className="font-medium">Email:</span> {student.email}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                <span className="font-medium">Course:</span> {student.course}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                <span className="font-medium">Learning Level:</span> {student.learningLevel}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                <span className="font-medium">Current Status:</span> {student.isGraduated ? 'Graduated' : 'Active'}
              </p>
            </div>
          </div>

          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm text-green-800">
              <strong>Success!</strong> This student will receive a graduation certificate and can access their transcript.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
            <button
              onClick={onClose}
              className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-green-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-green-700 transition-colors order-1 sm:order-2"
            >
              Graduate Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SuspendStudentConfirmationModal({ student, onClose, onConfirm }: { 
  student: Student; 
  onClose: () => void; 
  onConfirm: () => void; 
}) {
  const isCurrentlySuspended = student.isSuspended || false;  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="bg-white rounded-[20px] w-full max-w-md relative z-10">
        <div className="p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-4 sm:mb-6 gap-4">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                {isCurrentlySuspended ? 'Unsuspend Student' : 'Suspend Student'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Are you sure you want to {isCurrentlySuspended ? 'unsuspend' : 'suspend'} this student?
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Student Info */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">{student.name}</h3>
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-gray-600">
                <span className="font-medium">Email:</span> {student.email}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                <span className="font-medium">Course:</span> {student.course}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                <span className="font-medium">Current Status:</span> {isCurrentlySuspended ? 'Suspended' : 'Active'}
              </p>
            </div>
          </div>

          {/* Warning Message */}
          <div className={`rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 ${
            isCurrentlySuspended 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-orange-50 border border-orange-200'
          }`}>
            <p className={`text-xs sm:text-sm ${
              isCurrentlySuspended ? 'text-green-800' : 'text-orange-800'
            }`}>
              <strong>
                {isCurrentlySuspended ? 'Note:' : 'Warning:'}
              </strong> 
              {isCurrentlySuspended 
                ? ' This student will regain full access to their courses and can resume learning activities.'
                : ' This student will lose access to their courses and cannot participate in classes until unsuspended.'
              }
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
            <button
              onClick={onClose}
              className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-colors order-1 sm:order-2 ${
                isCurrentlySuspended
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-orange-600 text-white hover:bg-orange-700'
              }`}
            >
              {isCurrentlySuspended ? 'Unsuspend' : 'Suspend'} Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeleteStudentConfirmationModal({ student, onClose, onConfirm }: { 
  student: Student; 
  onClose: () => void; 
  onConfirm: () => void; 
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="bg-white rounded-[20px] w-full max-w-md relative z-10">
        <div className="p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-4 sm:mb-6 gap-4">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Delete Student</h2>
              <p className="text-xs sm:text-sm text-gray-500">Are you sure you want to delete this student?</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Student Info */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">{student.name}</h3>
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-gray-600">
                <span className="font-medium">Email:</span> {student.email}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                <span className="font-medium">Course:</span> {student.course}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                <span className="font-medium">Payment Type:</span> {student.paymentType}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                <span className="font-medium">Amount Paid:</span> {student.amountPaid}
              </p>
            </div>
          </div>

          {/* Warning Message */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm text-red-800">
              <strong>Warning:</strong> This action cannot be undone. All student data, including course enrollments, progress records, and payment history, will be permanently deleted.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
            <button
              onClick={onClose}
              className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-red-700 transition-colors order-1 sm:order-2"
            >
              Delete Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}