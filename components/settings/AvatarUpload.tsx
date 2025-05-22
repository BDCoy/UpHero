/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Upload } from 'lucide-react';

interface AvatarUploadProps {
  avatarPreview: string | null;
  onAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AvatarUpload({ avatarPreview, onAvatarChange }: AvatarUploadProps) {
  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-upwork-gray">Profile Photo</label>
      <div className="mt-2 flex items-center space-x-4">
        <div className="relative">
          <div className="h-20 w-20 rounded-full overflow-hidden bg-upwork-background">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-upwork-gray-light" />
              </div>
            )}
          </div>
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-upwork-green text-white flex items-center justify-center cursor-pointer hover:bg-upwork-green-dark"
          >
            <Upload className="h-3 w-3" />
          </label>
          <input
            id="avatar-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={onAvatarChange}
          />
        </div>
        <p className="text-xs text-upwork-gray-light">
          Recommended: Square image, max 2MB
        </p>
      </div>
    </div>
  );
}