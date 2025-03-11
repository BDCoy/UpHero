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

  return (
    <div className="space-y-6">
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