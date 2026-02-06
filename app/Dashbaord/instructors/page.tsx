'use client';

import { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Search,
  ChevronDown,
  X,
  Bell,
  UserX,
  Ban,
  Trash2
} from 'lucide-react';
import Notifications from '@/components/Notificationpanel';

interface Instructor {
  id: number;
  name: string;
  email: string;
  expertise: string;
  experience: string;
  status: string;
  date: string;
  fullName: string;
  registrationDate: string;
  phone: string;
  expertiseArea: string;
  experienceYears: string;
  areaOfInterest: string;
  portfolio: string;
  bio: string;
  isSuspended?: boolean;
}

export default function InstructorsPage() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Category');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  // Sample instructor data
  const instructors: Instructor[] = [
    {
      id: 1,
      name: 'Success Ifok',
      email: 'ifokusuccess@gmail.com',
      expertise: 'Cloud Computing',
      experience: '3 years',
      status: 'Approved',
      date: '07 Oct 2024',
      fullName: 'Ifiok Success',
      registrationDate: '07 Oct 2025',
      phone: '234 0907443351',
      expertiseArea: 'UI/UX Fundamental',
      experienceYears: '2 Years',
      areaOfInterest: 'Mobile Design',
      portfolio: 'behance.Success.if.com',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      isSuspended: false
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@gmail.com',
      expertise: 'UI/UX Design',
      experience: '5 years',
      status: 'Approved',
      date: '08 Oct 2024',
      fullName: 'Jane Smith',
      registrationDate: '08 Oct 2025',
      phone: '234 0907443352',
      expertiseArea: 'UI/UX Fundamental',
      experienceYears: '5 Years',
      areaOfInterest: 'Web Design',
      portfolio: 'behance.jane.smith.com',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      isSuspended: true
    },
    {
      id: 3,
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      expertise: 'Web Development',
      experience: '4 years',
      status: 'Approved',
      date: '09 Oct 2024',
      fullName: 'John Doe',
      registrationDate: '09 Oct 2025',
      phone: '234 0907443353',
      expertiseArea: 'Web Development',
      experienceYears: '4 Years',
      areaOfInterest: 'Full Stack',
      portfolio: 'github.com/johndoe',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      isSuspended: false
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@gmail.com',
      expertise: 'Mobile Development',
      experience: '2 years',
      status: 'Approved',
      date: '10 Oct 2024',
      fullName: 'Sarah Wilson',
      registrationDate: '10 Oct 2025',
      phone: '234 0907443354',
      expertiseArea: 'Mobile Development',
      experienceYears: '2 Years',
      areaOfInterest: 'iOS Development',
      portfolio: 'sarahwilson.dev',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      isSuspended: false
    },
    {
      id: 5,
      name: 'Mike Johnson',
      email: 'mike.johnson@gmail.com',
      expertise: 'Cloud Computing',
      experience: '6 years',
      status: 'Approved',
      date: '11 Oct 2024',
      fullName: 'Mike Johnson',
      registrationDate: '11 Oct 2025',
      phone: '234 0907443355',
      expertiseArea: 'Cloud Computing',
      experienceYears: '6 Years',
      areaOfInterest: 'DevOps',
      portfolio: 'mikejohnson.cloud',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      isSuspended: false
    }
  ];

  const handleInstructorClick = (instructor: Instructor) => {
    setSelectedInstructor(instructor);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setShowSuspendModal(false);
    setShowDeleteModal(false);
    setSelectedInstructor(null);
  };

  const handleSuspendInstructor = (instructor: Instructor) => {
    setSelectedInstructor(instructor);
    setShowSuspendModal(true);
  };

  const handleDeleteInstructor = (instructor: Instructor) => {
    setSelectedInstructor(instructor);
    setShowDeleteModal(true);
  };

  const handleConfirmSuspend = () => {
    if (selectedInstructor) {
      console.log(`${selectedInstructor.isSuspended ? 'Unsuspending' : 'Suspending'} instructor:`, selectedInstructor.name);
    }
    handleCloseModal();
  };

  const handleConfirmDelete = () => {
    if (selectedInstructor) {
      console.log('Deleting instructor:', selectedInstructor.name);
    }
    handleCloseModal();
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
    setShowCategoryDropdown(false);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    setShowStatusDropdown(false);
  };

  // Filter instructors based on search and filters
  const filteredInstructors = instructors.filter(instructor => {
    const matchesSearch = instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          instructor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          instructor.expertise.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || instructor.status === statusFilter;
    const matchesCategory = categoryFilter === 'Category' || instructor.expertise === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Instructor</h1>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowRegisterModal(true)}
            className="flex items-center gap-2 bg-[#005F87] text-white px-4 py-2.5 rounded-lg hover:bg-[#004A6B] transition-colors"
          >
            <span className="text-xl">+</span>
            <span className="text-sm font-medium">Add New Instructor</span>
          </button>
          <Notifications />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Application Submitted */}
        <div className="bg-white rounded-[16px] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <p className="text-sm font-normal text-[#6B7280] mb-2">Application Submitted</p>
          <p className="text-[32px] font-semibold text-gray-900">20</p>
        </div>

        {/* Processed */}
        <div className="bg-white rounded-[16px] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex items-center gap-1">
              <TrendingDown className="w-4 h-4 text-red-600" />
            </div>
          </div>
          <p className="text-sm font-normal text-[#6B7280] mb-2">Processed</p>
          <p className="text-[32px] font-semibold text-gray-900">100</p>
        </div>

        {/* Unread */}
        <div className="bg-white rounded-[16px] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex items-center gap-1">
              <TrendingDown className="w-4 h-4 text-gray-600" />
            </div>
          </div>
          <p className="text-sm font-normal text-[#6B7280] mb-2">Unread</p>
          <p className="text-[32px] font-semibold text-gray-900">12</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-gray-200">
        {/* Search and Filters */}
        <div className="p-4 flex items-center gap-4 border-b border-gray-200">
          <div className="flex-1 relative bg-white rounded-[10px]">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search for Instructor..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-[10px] border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#005F87] focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-[10px] border border-gray-200 bg-white transition-colors min-w-[130px] justify-between"
              >
                <span className="text-sm text-gray-600">{categoryFilter}</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              {showCategoryDropdown && (
                <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {['Category', 'Cloud Computing', 'UI/UX Design', 'Web Development', 'Mobile Development'].map((category) => (
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
            <div className="relative">
              <button
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-[10px] border border-gray-200 bg-white transition-colors min-w-[130px] justify-between"
              >
                <span className="text-sm text-gray-600">{statusFilter}</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              {showStatusDropdown && (
                <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {['All Status', 'Approved', 'Pending', 'Rejected'].map((status) => (
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
              <tr className="border-b border-gray-200">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Applicant Name</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Email Address</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Expertise</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Experience</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Date</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInstructors.map((instructor) => (
                <tr
                  key={instructor.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleInstructorClick(instructor)}
                >
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{instructor.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{instructor.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{instructor.expertise}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{instructor.experience}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-green-600">{instructor.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{instructor.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSuspendInstructor(instructor);
                        }}
                        className={`p-1.5 hover:bg-gray-100 rounded transition-colors ${
                          instructor.isSuspended ? 'text-green-600 hover:bg-green-50' : 'text-orange-600 hover:bg-orange-50'
                        }`}
                        title={instructor.isSuspended ? 'Unsuspend Instructor' : 'Suspend Instructor'}
                      >
                        {instructor.isSuspended ? (
                          <UserX className="w-4 h-4" />
                        ) : (
                          <Ban className="w-4 h-4" />
                        )}
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteInstructor(instructor);
                        }}
                        className="p-1.5 hover:bg-red-50 rounded transition-colors text-red-600"
                        title="Delete Instructor"
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
      </div>

      {/* Register New Instructor Modal */}
      {showRegisterModal && (
        <RegisterInstructorModal onClose={() => setShowRegisterModal(false)} />
      )}

      {/* Application Details Modal */}
      {showDetailsModal && selectedInstructor && (
        <ApplicationDetailsModal 
          instructor={selectedInstructor} 
          onClose={handleCloseModal} 
        />
      )}

      {/* Suspend Confirmation Modal */}
      {showSuspendModal && selectedInstructor && (
        <SuspendConfirmationModal 
          instructor={selectedInstructor} 
          onClose={handleCloseModal} 
          onConfirm={handleConfirmSuspend} 
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedInstructor && (
        <DeleteInstructorConfirmationModal 
          instructor={selectedInstructor} 
          onClose={handleCloseModal} 
          onConfirm={handleConfirmDelete} 
        />
      )}
    </div>
  );
}

function RegisterInstructorModal({ onClose }: { onClose: () => void }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [expertise, setExpertise] = useState('');
  const [experience, setExperience] = useState('');
  const [areaOfInterest, setAreaOfInterest] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [motivation, setMotivation] = useState('');

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="bg-white rounded-[20px] w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Register New Instructor</h2>
              <p className="text-sm text-gray-500">Fill in the details to register a new instructor</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                />
              </div>
            </div>

            {/* Expertise and Experience */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Expertise</label>
                <input
                  type="text"
                  value={expertise}
                  onChange={(e) => setExpertise(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Experience</label>
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                />
              </div>
            </div>

            {/* Area of Interest and Portfolio Link */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Area of Interest</label>
                <input
                  type="text"
                  value={areaOfInterest}
                  onChange={(e) => setAreaOfInterest(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Link to Portfolio</label>
                <input
                  type="text"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                />
              </div>
            </div>

            {/* Bio/Motivation */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Bio/Motivation</label>
              <textarea
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent resize-none"
                placeholder="Tell us about yourself and why you want to become an instructor. Share your teaching philosophy, relevant experience, and what you hope to achieve by joining our team. We'd love to hear what drives your passion for education and how you plan to inspire and engage students."
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end mt-8">
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-[#005F87] text-white rounded-lg text-sm font-medium hover:bg-[#004A6B] transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApplicationDetailsModal({ instructor, onClose }: { instructor: Instructor; onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="bg-white rounded-[20px] w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Application Details</h2>
              <p className="text-sm text-gray-500">Create and publish a newsletter for your audience</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Full Name and Registration Date */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Full Name</label>
                <div className="text-sm text-gray-900">{instructor.fullName}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Registration Date</label>
                <div className="text-sm text-gray-900">{instructor.registrationDate}</div>
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
                <div className="text-sm text-gray-900">{instructor.email}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Phone Number</label>
                <div className="text-sm text-gray-900">{instructor.phone}</div>
              </div>
            </div>

            {/* Expertise and Experience */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Expertise</label>
                <div className="text-sm text-gray-900">{instructor.expertiseArea}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Experience</label>
                <div className="text-sm text-gray-900">{instructor.experienceYears}</div>
              </div>
            </div>

            {/* Area of Interest and Portfolio Link */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Area of Interest</label>
                <div className="text-sm text-gray-900">{instructor.areaOfInterest}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Link to portfolio</label>
                <div className="text-sm text-gray-900">{instructor.portfolio}</div>
              </div>
            </div>

            {/* Bio/Motivation */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Bio/Motivation</label>
              <div className="text-sm text-gray-900 leading-relaxed">
                {instructor.bio}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-8">
            <button className="px-6 py-3 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
              Reject
            </button>
            <button className="px-6 py-3 bg-[#005F87] text-white rounded-lg text-sm font-medium hover:bg-[#004A6B] transition-colors">
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SuspendConfirmationModal({ instructor, onClose, onConfirm }: { 
  instructor: Instructor; 
  onClose: () => void; 
  onConfirm: () => void; 
}) {
  const isCurrentlySuspended = instructor.isSuspended || false;  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="bg-white rounded-[20px] w-full max-w-md relative z-10">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {isCurrentlySuspended ? 'Unsuspend Instructor' : 'Suspend Instructor'}
              </h2>
              <p className="text-sm text-gray-500">
                Are you sure you want to {isCurrentlySuspended ? 'unsuspend' : 'suspend'} this instructor?
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Instructor Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">{instructor.name}</h3>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Email:</span> {instructor.email}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Expertise:</span> {instructor.expertise}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Current Status:</span> {isCurrentlySuspended ? 'Suspended' : 'Active'}
              </p>
            </div>
          </div>

          {/* Warning Message */}
          <div className={`rounded-lg p-4 mb-6 ${
            isCurrentlySuspended 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-orange-50 border border-orange-200'
          }`}>
            <p className={`text-sm ${
              isCurrentlySuspended ? 'text-green-800' : 'text-orange-800'
            }`}>
              <strong>
                {isCurrentlySuspended ? 'Note:' : 'Warning:'}
              </strong> 
              {isCurrentlySuspended 
                ? ' This instructor will regain full access to their account and can resume teaching activities.'
                : ' This instructor will lose access to their account and cannot teach courses until unsuspended.'
              }
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
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                isCurrentlySuspended
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-orange-600 text-white hover:bg-orange-700'
              }`}
            >
              {isCurrentlySuspended ? 'Unsuspend' : 'Suspend'} Instructor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeleteInstructorConfirmationModal({ instructor, onClose, onConfirm }: { 
  instructor: Instructor; 
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
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Delete Instructor</h2>
              <p className="text-sm text-gray-500">Are you sure you want to delete this instructor?</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Instructor Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">{instructor.name}</h3>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Email:</span> {instructor.email}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Expertise:</span> {instructor.expertise}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Status:</span> {instructor.status}
              </p>
            </div>
          </div>

          {/* Warning Message */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-800">
              <strong>Warning:</strong> This action cannot be undone. All instructor data, including courses, student enrollments, and progress records, will be permanently deleted.
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
              Delete Instructor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}