import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../Button';
import type { EditorProps } from './types';

export function Editor({ cvData, onUpdate }: EditorProps) {
  const handleChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
  };

  const handleContactChange = (field: string, value: string) => {
    onUpdate({
      contact: {
        ...cvData.contact,
        [field]: value
      }
    });
  };

  const addSocialLink = () => {
    onUpdate({
      socialLinks: [
        ...cvData.socialLinks,
        { platform: '', url: '' }
      ]
    });
  };

  const updateSocialLink = (index: number, field: string, value: string) => {
    const newLinks = [...cvData.socialLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    onUpdate({ socialLinks: newLinks });
  };

  const removeSocialLink = (index: number) => {
    onUpdate({
      socialLinks: cvData.socialLinks.filter((_, i) => i !== index)
    });
  };

  const addExperience = () => {
    onUpdate({
      workExperience: [
        ...cvData.workExperience,
        {
          id: Math.random().toString(36).substring(2),
          company: '',
          position: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
          achievements: []
        }
      ]
    });
  };

  const updateExperience = (id: string, field: string, value: any) => {
    onUpdate({
      workExperience: cvData.workExperience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const removeExperience = (id: string) => {
    onUpdate({
      workExperience: cvData.workExperience.filter(exp => exp.id !== id)
    });
  };

  const addEducation = () => {
    onUpdate({
      education: [
        ...cvData.education,
        {
          id: Math.random().toString(36).substring(2),
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        }
      ]
    });
  };

  const updateEducation = (id: string, field: string, value: any) => {
    onUpdate({
      education: cvData.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const removeEducation = (id: string) => {
    onUpdate({
      education: cvData.education.filter(edu => edu.id !== id)
    });
  };

  return (
    <div className="space-y-8">
      {/* Personal Information */}
      <div>
        <h2 className="text-lg font-semibold text-upwork-gray mb-4">Personal Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-upwork-gray mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={cvData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-upwork-gray mb-1">
              Professional Title
            </label>
            <input
              type="text"
              value={cvData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green"
              placeholder="Senior Software Engineer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-upwork-gray mb-1">
              Professional Summary
            </label>
            <textarea
              value={cvData.summary}
              onChange={(e) => handleChange('summary', e.target.value)}
              rows={4}
              className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green"
              placeholder="Brief professional summary..."
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h2 className="text-lg font-semibold text-upwork-gray mb-4">Contact Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-upwork-gray mb-1">
              Email
            </label>
            <input
              type="email"
              value={cvData.contact.email}
              onChange={(e) => handleContactChange('email', e.target.value)}
              className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-upwork-gray mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={cvData.contact.phone}
              onChange={(e) => handleContactChange('phone', e.target.value)}
              className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-upwork-gray mb-1">
              Location
            </label>
            <input
              type="text"
              value={cvData.contact.location}
              onChange={(e) => handleContactChange('location', e.target.value)}
              className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green"
              placeholder="City, Country"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-upwork-gray mb-1">
              Website
            </label>
            <input
              type="url"
              value={cvData.contact.website}
              onChange={(e) => handleContactChange('website', e.target.value)}
              className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green"
              placeholder="https://example.com"
            />
          </div>
        </div>
      </div>

      {/* Work Experience */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-upwork-gray">Work Experience</h2>
          <Button variant="outline" size="sm" onClick={addExperience}>
            <Plus className="w-4 h-4 mr-1" />
            Add Experience
          </Button>
        </div>
        <div className="space-y-6">
          {cvData.workExperience.map((experience) => (
            <div key={experience.id} className="bg-upwork-background rounded-lg p-4">
              <div className="flex justify-between mb-4">
                <h3 className="font-medium text-upwork-gray">Experience Details</h3>
                <button
                  onClick={() => removeExperience(experience.id)}
                  className="text-upwork-gray-light hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-upwork-gray mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      value={experience.company}
                      onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                      className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green"
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-upwork-gray mb-1">
                      Position
                    </label>
                    <input
                      type="text"
                      value={experience.position}
                      onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                      className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green"
                      placeholder="Job Title"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-upwork-gray mb-1">
                      Start Date
                    </label>
                    <input
                      type="month"
                      value={experience.startDate}
                      onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                      className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-upwork-gray mb-1">
                      End Date
                    </label>
                    <div className="space-y-2">
                      <input
                        type="month"
                        value={experience.endDate}
                        onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                        disabled={experience.current}
                        className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green disabled:bg-upwork-background-alt"
                      />
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={experience.current}
                          onChange={(e) => updateExperience(experience.id, 'current', e.target.checked)}
                          className="rounded border-upwork-gray-lighter text-upwork-green focus:ring-upwork-green"
                        />
                        <span className="text-sm text-upwork-gray">Current Position</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-upwork-gray mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={experience.location}
                    onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                    className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green"
                    placeholder="City, Country"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-upwork-gray mb-1">
                    Description
                  </label>
                  <textarea
                    value={experience.description}
                    onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                    rows={4}
                    className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green"
                    placeholder="Describe your responsibilities and achievements..."
                  />
                </div>
              </div>
            </div>
          ))}
          {cvData.workExperience.length === 0 && (
            <p className="text-center text-upwork-gray-light py-4">
              No work experience added yet
            </p>
          )}
        </div>
      </div>

      {/* Education */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-upwork-gray">Education</h2>
          <Button variant="outline" size="sm" onClick={addEducation}>
            <Plus className="w-4 h-4 mr-1" />
            Add Education
          </Button>
        </div>
        <div className="space-y-6">
          {cvData.education.map((education) => (
            <div key={education.id} className="bg-upwork-background rounded-lg p-4">
              <div className="flex justify-between mb-4">
                <h3 className="font-medium text-upwork-gray">Education Details</h3>
                <button
                  onClick={() => removeEducation(education.id)}
                  className="text-upwork-gray-light hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-upwork-gray mb-1">
                    Institution
                  </label>
                  <input
                    type="text"
                    value={education.institution}
                    onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                    className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green"
                    placeholder="University Name"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-upwork-gray mb-1">
                      Degree
                    </label>
                    <input
                      type="text"
                      value={education.degree}
                      onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                      className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green"
                      placeholder="Bachelor's, Master's, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-upwork-gray mb-1">
                      Field of Study
                    </label>
                    <input
                      type="text"
                      value={education.field}
                      onChange={(e) => updateEducation(education.id, 'field', e.target.value)}
                      className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green"
                      placeholder="Computer Science"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-upwork-gray mb-1">
                      Start Date
                    </label>
                    <input
                      type="month"
                      value={education.startDate}
                      onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
                      className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-upwork-gray mb-1">
                      End Date
                    </label>
                    <div className="space-y-2">
                      <input
                        type="month"
                        value={education.endDate}
                        onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
                        disabled={education.current}
                        className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green disabled:bg-upwork-background-alt"
                      />
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={education.current}
                          onChange={(e) => updateEducation(education.id, 'current', e.target.checked)}
                          className="rounded border-upwork-gray-lighter text-upwork-green focus:ring-upwork-green"
                        />
                        <span className="text-sm text-upwork-gray">Currently Studying</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-upwork-gray mb-1">
                    Description
                  </label>
                  <textarea
                    value={education.description}
                    onChange={(e) => updateEducation(education.id, 'description', e.target.value)}
                    rows={4}
                    className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green"
                    placeholder="Additional details about your education..."
                  />
                </div>
              </div>
            </div>
          ))}
          {cvData.education.length === 0 && (
            <p className="text-center text-upwork-gray-light py-4">
              No education added yet
            </p>
          )}
        </div>
      </div>

      {/* Social Links */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-upwork-gray">Social Links</h2>
          <Button variant="outline" size="sm" onClick={addSocialLink}>
            <Plus className="w-4 h-4 mr-1" />
            Add Link
          </Button>
        </div>
        <div className="space-y-4">
          {cvData.socialLinks.map((link, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={link.platform}
                  onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                  className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green"
                  placeholder="Platform (e.g., LinkedIn)"
                />
              </div>
              <div className="flex-1">
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                  className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green"
                  placeholder="Profile URL"
                />
              </div>
              <button
                onClick={() => removeSocialLink(index)}
                className="p-2 text-upwork-gray-light hover:text-red-500"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}