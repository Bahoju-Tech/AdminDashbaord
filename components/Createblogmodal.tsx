'use client';

import { useState, useRef, useEffect } from 'react';
import { X, ChevronDown, Upload, Image as ImageIcon } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  image: string;
  description: string;
}

interface CreateBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateBlogModal({ isOpen, onClose }: CreateBlogModalProps) {
  const [postTitle, setPostTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<BlogPost[]>([]);
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [additionalImage, setAdditionalImage] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [additionalImageUrl, setAdditionalImageUrl] = useState('');
  const [coverImageTab, setCoverImageTab] = useState<'upload' | 'url'>('upload');
  const [additionalImageTab, setAdditionalImageTab] = useState<'upload' | 'url'>('upload');
  
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);
  
  const categoryRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  const categories = ['Ride', 'Tech', 'Mart', 'Institute'];
  
  // Sample previous blog posts for tagging
  const previousBlogs: BlogPost[] = [
    {
      id: 1,
      title: 'Getting Started with Next.js',
      image: 'https://plus.unsplash.com/premium_photo-1669530958591-15cbad83785b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmV4dGpzfGVufDB8fDB8fHww',
      description: 'Learn the basics of Next.js and how to build modern web applications with React...'
    },
    {
      id: 2,
      title: 'Understanding TypeScript',
      image: 'https://images.unsplash.com/photo-1611592121675-a09a80da4117?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dHlwZXNjcmlwdHxlbnwwfHwwfHx8MA%3D%3D',
      description: 'A comprehensive guide to TypeScript and its benefits in modern development...'
    },
    {
      id: 3,
      title: 'Tailwind CSS Best Practices',
      image: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y3NzfGVufDB8fDB8fHww',
      description: 'Discover the best practices for using Tailwind CSS in your projects...'
    },
    {
      id: 4,
      title: 'React Hooks Deep Dive',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVhY3R8ZW58MHx8MHx8fDA%3D',
      description: 'Explore the power of React Hooks and how they transform component logic...'
    },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
      if (tagsRef.current && !tagsRef.current.contains(event.target as Node)) {
        setShowTagsDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTagBlog = (blog: BlogPost) => {
    if (!tags.find(t => t.id === blog.id)) {
      setTags([...tags, blog]);
    }
    setShowTagsDropdown(false);
  };

  const removeTag = (blogId: number) => {
    setTags(tags.filter(t => t.id !== blogId));
  };

  const handleFileUpload = (file: File, type: 'cover' | 'additional') => {
    if (type === 'cover') {
      setCoverImage(file);
    } else {
      setAdditionalImage(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10">
        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Create New Blog</h2>
            <p className="text-sm text-gray-500">Create and publish a new blog post for your audience</p>
          </div>

          {/* Post Title and Category */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Post Title</label>
              <input
                type="text"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent"
                placeholder=""
              />
            </div>
            <div ref={categoryRef} className="relative">
              <label className="block text-sm font-medium text-gray-900 mb-2">Category</label>
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent text-left flex items-center justify-between bg-white"
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
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      <span className="text-sm text-gray-900">{cat}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">Description of blog post</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent resize-none"
              placeholder=""
            />
            <p className="text-xs text-gray-500 mt-1">{description.length}/500 Characters</p>
          </div>

          {/* Tags */}
          <div ref={tagsRef} className="mb-6 relative">
            <label className="block text-sm font-medium text-gray-900 mb-2">Tags</label>
            <div
              onClick={() => setShowTagsDropdown(!showTagsDropdown)}
              className="w-full min-h-[48px] px-4 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-[#005F87] focus-within:border-transparent cursor-text bg-white"
            >
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center gap-2 bg-[#005F87]/70 text-white px-3 py-1 rounded-md text-sm"
                  >
                    <span>{tag.title}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTag(tag.id);
                      }}
                      className="hover:bg-[#005F87]/10 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {tags.length === 0 && (
                  <span className="text-gray-400 py-1">Click to add tags</span>
                )}
              </div>
            </div>

            {showTagsDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                {previousBlogs.filter(blog => !tags.find(t => t.id === blog.id)).map((blog) => (
                  <button
                    key={blog.id}
                    onClick={() => handleTagBlog(blog)}
                    className="w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex gap-3">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 mb-1 truncate">
                          {blog.title}
                        </h4>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {blog.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">Content of blog</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={500}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] focus:border-transparent resize-none"
              placeholder=""
            />
            <p className="text-xs text-gray-500 mt-1">{content.length}/500 Characters</p>
          </div>

          {/* Image Upload */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {/* Cover Image */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Upload Cover Image</label>
              
              {/* Tab Switcher */}
              <div className="flex bg-gray-100 rounded-lg p-1 mb-3">
                <button
                  onClick={() => setCoverImageTab('upload')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    coverImageTab === 'upload'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Upload
                </button>
                <button
                  onClick={() => setCoverImageTab('url')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    coverImageTab === 'url'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  URL
                </button>
              </div>

              {/* Upload Tab */}
              {coverImageTab === 'upload' && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3">
                      <ImageIcon className="w-6 h-6 text-[#005F87]" />
                    </div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Tap to Upload Image</p>
                    <p className="text-xs text-gray-500 mb-3">SVG, PNG, JPG, GIF/WEBP max</p>
                    {coverImage && (
                      <p className="text-xs text-[#005F87] mb-2">File selected: {coverImage.name}</p>
                    )}
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'cover')}
                        className="hidden"
                      />
                      <span className="bg-[#005F87] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#005F87] transition-colors inline-block">
                        Upload
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* URL Tab */}
              {coverImageTab === 'url' && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3">
                      <ImageIcon className="w-6 h-6 text-[#005F87]" />
                    </div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Enter Image URL</p>
                    <p className="text-xs text-gray-500 mb-3">Add image from external website</p>
                    <input
                      type="url"
                      value={coverImageUrl}
                      onChange={(e) => setCoverImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] mb-3 text-sm"
                    />
                    {coverImageUrl && (
                      <div className="w-full mt-3">
                        <img
                          src={coverImageUrl}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg"
                          onError={() => console.log('Image failed to load')}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Additional Image */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Additional Image</label>
              
              {/* Tab Switcher */}
              <div className="flex bg-gray-100 rounded-lg p-1 mb-3">
                <button
                  onClick={() => setAdditionalImageTab('upload')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    additionalImageTab === 'upload'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Upload
                </button>
                <button
                  onClick={() => setAdditionalImageTab('url')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    additionalImageTab === 'url'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  URL
                </button>
              </div>

              {/* Upload Tab */}
              {additionalImageTab === 'upload' && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3">
                      <ImageIcon className="w-6 h-6 text-[#005F87]" />
                    </div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Tap to Upload Image</p>
                    <p className="text-xs text-gray-500 mb-3">SVG, PNG, JPG, GIF/WEBP max</p>
                    {additionalImage && (
                      <p className="text-xs text-[#005F87] mb-2">File selected: {additionalImage.name}</p>
                    )}
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'additional')}
                        className="hidden"
                      />
                      <span className="bg-[#005F87] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#005F87] transition-colors inline-block">
                        Upload
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* URL Tab */}
              {additionalImageTab === 'url' && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3">
                      <ImageIcon className="w-6 h-6 text-[#005F87]" />
                    </div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Enter Image URL</p>
                    <p className="text-xs text-gray-500 mb-3">Add image from external website</p>
                    <input
                      type="url"
                      value={additionalImageUrl}
                      onChange={(e) => setAdditionalImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005F87] mb-3 text-sm"
                    />
                    {additionalImageUrl && (
                      <div className="w-full mt-3">
                        <img
                          src={additionalImageUrl}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg"
                          onError={() => console.log('Image failed to load')}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Draft
            </button>
            <button className="px-6 py-3 bg-gray-400 text-white rounded-lg text-sm font-medium hover:bg-gray-500 transition-colors">
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}