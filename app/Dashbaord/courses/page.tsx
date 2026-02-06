'use client';

import { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  Search,
  ChevronDown,
  X,
  Bell,
  Edit2,
  Trash2
} from 'lucide-react';
import Notifications from '@/components/Notificationpanel';

interface Course {
  id: number;
  title: string;
  status: string;
  date: string;
  category: string;
}

function EditCourseModal({ course, onClose }: { course: Course; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [courseTitle, setCourseTitle] = useState(course.title);
  const [subtitleText, setSubtitleText] = useState('');
  const [duration, setDuration] = useState('');
  const [courseFormat, setCourseFormat] = useState('');
  const [learningLevel, setLearningLevel] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [whatYouLearn, setWhatYouLearn] = useState(['']);
  const [learningLevelStep2, setLearningLevelStep2] = useState('');
  const [pricing, setPricing] = useState('');
  const [whatIncluded, setWhatIncluded] = useState('');
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const [showLevelDropdown, setShowLevelDropdown] = useState(false);
  const [showLevelStep2Dropdown, setShowLevelStep2Dropdown] = useState(false);

  const handleContinue = () => {
    setStep(2);
  };

  const handleSave = () => {
    console.log('Updated course:', {
      ...course,
      title: courseTitle,
      subtitleText,
      duration,
      courseFormat,
      learningLevel,
      courseDescription,
      whatYouLearn,
      learningLevelStep2,
      pricing,
      whatIncluded
    });
    onClose();
  };

  const addWhatYouLearnField = () => {
    setWhatYouLearn([...whatYouLearn, '']);
  };

  const removeWhatYouLearnField = (index: number) => {
    const newFields = whatYouLearn.filter((_, i) => i !== index);
    setWhatYouLearn(newFields);
  };

  const updateWhatYouLearnField = (index: number, value: string) => {
    const newFields = [...whatYouLearn];
    newFields[index] = value;
    setWhatYouLearn(newFields);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="bg-white rounded-[20px] w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Edit Course</h2>
              <p className="text-sm text-gray-500">Update course information</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Step 1 Form */}
          {step === 1 && (
            <div className="space-y-5">
              {/* Course Title and Subtitle */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Course Title</label>
                  <input
                    type="text"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Subtitle text</label>
                  <input
                    type="text"
                    value={subtitleText}
                    onChange={(e) => setSubtitleText(e.target.value)}
                    placeholder="Type text text text text text text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Duration and Course Format */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Duration (Weeks)</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="6 weeks"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-900 mb-2">Course Format</label>
                  <button
                    onClick={() => setShowFormatDropdown(!showFormatDropdown)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent text-left flex items-center justify-between bg-white"
                  >
                    <span className={courseFormat ? 'text-gray-900' : 'text-gray-400'}>
                      {courseFormat || 'In-person and Online'}
                    </span>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Learning Level and Course Description */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-900 mb-2">Learning Level</label>
                  <button
                    onClick={() => setShowLevelDropdown(!showLevelDropdown)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent text-left flex items-center justify-between bg-white"
                  >
                    <span className={learningLevel ? 'text-gray-900' : 'text-gray-400'}>
                      {learningLevel || 'Select All Three'}
                    </span>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Course Description</label>
                  <input
                    type="text"
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                    placeholder="Type text text text text text text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end mt-8">
                <button
                  onClick={handleContinue}
                  className="px-8 py-3 bg-[#005F87] text-white rounded-lg text-sm font-medium hover:bg-[#004A6B] transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 2 Form */}
          {step === 2 && (
            <div className="space-y-5">
              {/* What you'll learn */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">What you'll learn</label>
                {whatYouLearn.map((field, index) => (
                  <div key={index} className="flex items-center gap-2 mb-3">
                    <input
                      type="text"
                      value={field}
                      onChange={(e) => updateWhatYouLearnField(index, e.target.value)}
                      placeholder="e.g. Introduction to UI/UX"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                    />
                    {index > 0 && (
                      <button
                        onClick={() => removeWhatYouLearnField(index)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addWhatYouLearnField}
                  className="text-[#005F87] hover:text-[#004A6B] text-sm font-medium flex items-center gap-1"
                >
                  <span className="text-lg">+</span>
                  <span>Add Another What you'll learn</span>
                </button>
              </div>

              {/* Learning Level and Pricing */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-900 mb-2">Learning Level</label>
                  <button
                    onClick={() => setShowLevelStep2Dropdown(!showLevelStep2Dropdown)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent text-left flex items-center justify-between bg-white"
                  >
                    <span className={learningLevelStep2 ? 'text-gray-900' : 'text-gray-400'}>
                      {learningLevelStep2 || 'Select Level'}
                    </span>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Pricing</label>
                  <input
                    type="text"
                    value={pricing}
                    onChange={(e) => setPricing(e.target.value)}
                    placeholder="Type text text text text text text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                  />
                </div>
              </div>

              {/* What is Included */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">What is Included</label>
                <textarea
                  value={whatIncluded}
                  onChange={(e) => setWhatIncluded(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent resize-none"
                />
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
          )}
        </div>
      </div>
    </div>
  );
}

function DeleteConfirmationModal({ course, onClose, onConfirm }: { course: Course; onClose: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="bg-white rounded-[20px] w-full max-w-md relative z-10">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Delete Course</h2>
              <p className="text-sm text-gray-500">Are you sure you want to delete this course?</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Course Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Status:</span> {course.status}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Category:</span> {course.category}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Date:</span> {course.date}
              </p>
            </div>
          </div>

          {/* Warning Message */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-800">
              <strong>Warning:</strong> This action cannot be undone. All course data, including student enrollments and progress, will be permanently deleted.
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
              Delete Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Category');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  // Sample course data
  const courses: Course[] = [
    { id: 1, title: 'UI/UX Principle Fundamental', status: 'Active', date: '07 Oct 2024', category: 'Design' },
    { id: 2, title: 'Web Development Basics', status: 'Active', date: '08 Oct 2024', category: 'Development' },
    { id: 3, title: 'Mobile App Design', status: 'Draft', date: '09 Oct 2024', category: 'Design' },
    { id: 4, title: 'React Advanced Concepts', status: 'Active', date: '10 Oct 2024', category: 'Development' },
    { id: 5, title: 'Database Management', status: 'Archived', date: '11 Oct 2024', category: 'Development' },
    { id: 6, title: 'Digital Marketing', status: 'Active', date: '12 Oct 2024', category: 'Marketing' },
    { id: 7, title: 'Cloud Computing Fundamentals', status: 'Draft', date: '13 Oct 2024', category: 'Development' },
    { id: 8, title: 'Graphic Design Masterclass', status: 'Active', date: '14 Oct 2024', category: 'Design' }
  ];

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setShowEditModal(true);
  };

  const handleDeleteCourse = (course: Course) => {
    setSelectedCourse(course);
    setShowDeleteModal(true);
  };

  const handleCloseModals = () => {
    setShowRegisterModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedCourse(null);
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

  // Filter courses based on search and filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || course.status === statusFilter;
    const matchesCategory = categoryFilter === 'Category' || course.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowRegisterModal(true)}
            className="flex items-center gap-2 bg-[#005F87] text-white px-4 py-2.5 rounded-lg hover:bg-[#004A6B] transition-colors"
          >
            <span className="text-xl">+</span>
            <span className="text-sm font-medium">Add New Course</span>
          </button>
          <Notifications />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Total Courses */}
        <div className="bg-white rounded-[16px] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <p className="text-sm font-normal text-[#6B7280] mb-2">Total Courses</p>
          <p className="text-[32px] font-semibold text-gray-900">20</p>
        </div>

        {/* Ongoing */}
        <div className="bg-white rounded-[16px] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex items-center gap-1">
              <TrendingDown className="w-4 h-4 text-red-600" />
            </div>
          </div>
          <p className="text-sm font-normal text-[#6B7280] mb-2">Ongoing</p>
          <p className="text-[32px] font-semibold text-gray-900">100</p>
        </div>

        {/* Ended */}
        <div className="bg-white rounded-[16px] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex items-center gap-1">
              <TrendingDown className="w-4 h-4 text-gray-600" />
            </div>
          </div>
          <p className="text-sm font-normal text-[#6B7280] mb-2">Ended</p>
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
              placeholder="Search for Course..."
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
                  {['Category', 'Design', 'Development', 'Marketing'].map((category) => (
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
                  {['All Status', 'Active', 'Draft', 'Archived'].map((status) => (
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
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Course Title</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr
                  key={course.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{course.title}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-green-600">{course.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{course.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleEditCourse(course)}
                        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button 
                        onClick={() => handleDeleteCourse(course)}
                        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
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
      </div>

      {/* Register New Course Modal */}
      {showRegisterModal && (
        <RegisterCourseModal onClose={handleCloseModals} />
      )}

      {/* Edit Course Modal */}
      {showEditModal && selectedCourse && (
        <EditCourseModal course={selectedCourse} onClose={handleCloseModals} />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedCourse && (
        <DeleteConfirmationModal 
          course={selectedCourse} 
          onClose={handleCloseModals} 
          onConfirm={() => {
            console.log('Deleting course:', selectedCourse.title);
            handleCloseModals();
          }}
        />
      )}
    </div>
  );
}

function RegisterCourseModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [courseTitle, setCourseTitle] = useState('');
  const [subtitleText, setSubtitleText] = useState('');
  const [duration, setDuration] = useState('');
  const [courseFormat, setCourseFormat] = useState('');
  const [learningLevel, setLearningLevel] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [whatYouLearn, setWhatYouLearn] = useState(['']);
  const [learningLevelStep2, setLearningLevelStep2] = useState('');
  const [pricing, setPricing] = useState('');
  const [whatIncluded, setWhatIncluded] = useState('');
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const [showLevelDropdown, setShowLevelDropdown] = useState(false);
  const [showLevelStep2Dropdown, setShowLevelStep2Dropdown] = useState(false);

  const handleContinue = () => {
    setStep(2);
  };

  const handleRegister = () => {
    // Handle registration
    onClose();
  };

  const addWhatYouLearnField = () => {
    setWhatYouLearn([...whatYouLearn, '']);
  };

  const removeWhatYouLearnField = (index: number) => {
    const newFields = whatYouLearn.filter((_, i) => i !== index);
    setWhatYouLearn(newFields);
  };

  const updateWhatYouLearnField = (index: number, value: string) => {
    const newFields = [...whatYouLearn];
    newFields[index] = value;
    setWhatYouLearn(newFields);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="bg-white rounded-[20px] w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Register New Course</h2>
              <p className="text-sm text-gray-500">Create and publish a new blog post for your audience</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Step 1 Form */}
          {step === 1 && (
            <div className="space-y-5">
              {/* Course Title and Subtitle */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Course Title</label>
                  <input
                    type="text"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    placeholder="UI/UX Fundamental"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Subtitle text</label>
                  <input
                    type="text"
                    value={subtitleText}
                    onChange={(e) => setSubtitleText(e.target.value)}
                    placeholder="Type text text text text text text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Duration and Course Format */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Duration (Weeks)</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="6 weeks"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-900 mb-2">Course Format</label>
                  <button
                    onClick={() => setShowFormatDropdown(!showFormatDropdown)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent text-left flex items-center justify-between bg-white"
                  >
                    <span className={courseFormat ? 'text-gray-900' : 'text-gray-400'}>
                      {courseFormat || 'In-person and Online'}
                    </span>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Learning Level and Course Description */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-900 mb-2">Learning Level</label>
                  <button
                    onClick={() => setShowLevelDropdown(!showLevelDropdown)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent text-left flex items-center justify-between bg-white"
                  >
                    <span className={learningLevel ? 'text-gray-900' : 'text-gray-400'}>
                      {learningLevel || 'Select All Three'}
                    </span>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Course Description</label>
                  <input
                    type="text"
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                    placeholder="Type text text text text text text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end mt-8">
                <button
                  onClick={handleContinue}
                  className="px-8 py-3 bg-[#005F87] text-white rounded-lg text-sm font-medium hover:bg-[#004A6B] transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 2 Form */}
          {step === 2 && (
            <div className="space-y-5">
              {/* What you'll learn */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">What you'll learn</label>
                {whatYouLearn.map((field, index) => (
                  <div key={index} className="flex items-center gap-2 mb-3">
                    <input
                      type="text"
                      value={field}
                      onChange={(e) => updateWhatYouLearnField(index, e.target.value)}
                      placeholder="e.g. Introduction to UI/UX"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                    />
                    {index > 0 && (
                      <button
                        onClick={() => removeWhatYouLearnField(index)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addWhatYouLearnField}
                  className="text-[#005F87] hover:text-[#004A6B] text-sm font-medium flex items-center gap-1"
                >
                  <span className="text-lg">+</span>
                  <span>Add Another What you'll learn</span>
                </button>
              </div>

              {/* Learning Level and Pricing */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-900 mb-2">Learning Level</label>
                  <button
                    onClick={() => setShowLevelStep2Dropdown(!showLevelStep2Dropdown)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent text-left flex items-center justify-between bg-white"
                  >
                    <span className={learningLevelStep2 ? 'text-gray-900' : 'text-gray-400'}>
                      {learningLevelStep2 || 'Select Level'}
                    </span>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Pricing</label>
                  <input
                    type="text"
                    value={pricing}
                    onChange={(e) => setPricing(e.target.value)}
                    placeholder="Type text text text text text text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                  />
                </div>
              </div>

              {/* What is Included */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">What is Included</label>
                <textarea
                  value={whatIncluded}
                  onChange={(e) => setWhatIncluded(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent resize-none"
                />
              </div>

              {/* Action Button */}
              <div className="flex justify-end mt-8">
                <button
                  onClick={handleRegister}
                  className="px-8 py-3 bg-[#005F87] text-white rounded-lg text-sm font-medium hover:bg-[#004A6B] transition-colors"
                >
                  Register
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}