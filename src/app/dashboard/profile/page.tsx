"use client";

import React, { useState, useRef, useEffect } from 'react';
import Input from '@/app/components/UI/Input';
import Button from '@/app/components/UI/Button';
import { Camera, Upload, X, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { cvUpload } from '@/services/fileUpload';
import { getSeekerProfile } from '@/services/profile';

export default function ProfilePage() {
  const [name, setName] = useState('John Doe');
  const [headline, setHeadline] = useState('Software Engineer');
  const [bio, setBio] = useState('Passionate about building scalable web applications and learning new technologies.');
  const [location, setLocation] = useState('San Francisco, CA');

  // Skills state
  const [skills, setSkills] = useState<string[]>(['React', 'TypeScript', 'Next.js']);
  const [newSkill, setNewSkill] = useState('');

  // CV Upload state
  const [currentCV, setCurrentCV] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await getSeekerProfile();
      console.log("Fetched Profile:", data, "Error:", error);
      if (!error && data) {
        if (data.full_name) setName(data.full_name);
        if (data.resume_url) setCurrentCV(data.resume_url);
      }
    };
    fetchProfile();
  }, []);

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      e.preventDefault();
      if (!skills.includes(newSkill.trim())) {
        setSkills([...skills, newSkill.trim()]);
      }
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setUploadError('');
      setUploadSuccess(false);
      setUploadProgress(0);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadCV = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadError('');
    setUploadSuccess(false);
    setUploadProgress(0);

    // Simulate progress bar since server action doesn't stream progress natively
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const path = `cv_${Date.now()}_${file.name}`;
      const response = await cvUpload(file, path);
      
      clearInterval(progressInterval);
      
      if (response.error) {
        setUploadError(response.error);
        setUploadProgress(0);
      } else {
        setUploadProgress(100);
        setUploadSuccess(true);
        // Refresh the profile to get the new CV URL immediately
        getSeekerProfile().then(({ data }) => {
            if (data?.resume_url) setCurrentCV(data.resume_url);
        });

        setTimeout(() => {
            setFile(null);
            setUploadProgress(0);
            setUploadSuccess(false);
        }, 3000)
      }
    } catch (error) {
      clearInterval(progressInterval);
      setUploadError('An unexpected error occurred during upload.');
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Your Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Photo & Actions */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="relative w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center mb-4 group overflow-hidden border-4 border-white shadow-md">
              <Camera className="w-8 h-8 text-slate-400 group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-white text-xs font-semibold">Update Photo</span>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-slate-800">{name || 'Your Name'}</h2>
            <p className="text-slate-500 text-sm mt-1">{headline || 'Your Headline'}</p>
          </div>

          {/* CV Upload Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Resume / CV
            </h3>
            
            {currentCV && !file ? (
              <div className="space-y-4">
                <div className="w-full h-96 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-inner">
                  <iframe src={currentCV} className="w-full h-full" title="Current Resume" />
                </div>
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Current Resume</p>
                      <a href={currentCV} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-primary hover:underline">
                        Open in new tab
                      </a>
                    </div>
                  </div>
                  <Button onclick={handleUploadClick} variant="ghost">
                    Update CV
                  </Button>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept=".pdf,.doc,.docx" 
                  className="hidden" 
                />
              </div>
            ) : !file ? (
              <div 
                onClick={handleUploadClick}
                className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors group"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium text-slate-700">Click to upload CV</p>
                <p className="text-xs text-slate-400 mt-1">PDF or DOCX (Max 5MB)</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept=".pdf,.doc,.docx" 
                  className="hidden" 
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <FileText className="w-6 h-6 text-slate-400 shrink-0" />
                    <span className="text-sm font-medium text-slate-700 truncate">{file.name}</span>
                  </div>
                  {!isUploading && !uploadSuccess && (
                    <button onClick={() => setFile(null)} className="p-1 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Progress Bar UI */}
                {(isUploading || uploadProgress > 0) && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-slate-500">
                      <span>{isUploading ? 'Uploading...' : 'Upload complete'}</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-primary h-full rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Status Messages */}
                {uploadError && (
                  <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-2 rounded-md">
                    <AlertCircle className="w-4 h-4" />
                    <span>{uploadError}</span>
                  </div>
                )}
                {uploadSuccess && (
                  <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-2 rounded-md animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>CV Uploaded Successfully!</span>
                  </div>
                )}

                {/* Action Buttons */}
                {!isUploading && !uploadSuccess && (
                   <Button onclick={handleUploadCV} fullWidth variant="primary">
                     Confirm Upload
                   </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Form Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Input 
                  label="Full Name" 
                  value={name} 
                  onChange={setName} 
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="md:col-span-2">
                <Input 
                  label="Professional Headline" 
                  value={headline} 
                  onChange={setHeadline} 
                  placeholder="e.g. Senior Frontend Developer"
                />
              </div>
              <div className="md:col-span-2">
                <div className="flex flex-col gap-2 w-full mb-4">
                  <label className="text-sm font-semibold text-slate-700">Bio / About</label>
                  <textarea 
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    className="w-full bg-surface-container-low px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[120px] resize-y"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <Input 
                  label="Location" 
                  value={location} 
                  onChange={setLocation} 
                  placeholder="e.g. San Francisco, CA"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Skills</h3>
            <p className="text-sm text-slate-500 mb-4">Add skills to help recruiters find you. Press Enter to add.</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill) => (
                <div 
                  key={skill} 
                  className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 group border border-primary/20"
                >
                  {skill}
                  <button 
                    onClick={() => removeSkill(skill)}
                    className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleAddSkill}
              placeholder="Type a skill and press Enter..."
              className="w-full bg-surface-container-low px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary">Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}