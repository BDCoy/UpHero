"use client";

import React, { useState, useEffect, useCallback } from "react";

import { Loader2 } from "lucide-react";
import { ProfileForm } from "@/components/settings/ProfileForm";
import { UpdatePassword } from "@/components/settings/UpdatePassword";
import { createClient } from "@/utils/supabase/client";
import { toast } from "@/lib/store/toast";
import { getSubscription, getUserDetails } from "@/utils/supabase/queries";
import CustomerPortalForm from "@/components/settings/CustomerPortalForm";

interface Profile {
  full_name: string;
  phone: string;
  avatar_url: string | null;
}

export default function Settings() {
  const supabase = createClient();

  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [subscription, setSubscription] = useState();

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const getData = useCallback(async () => {
    try {
      const [userData, subscriptionData] = await Promise.all([
        getUserDetails(supabase),
        getSubscription(supabase),
      ]);

      setProfile(userData);
      setSubscription(subscriptionData);
      if (userData.avatar_url) {
        setAvatarPreview(userData.avatar_url);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [supabase]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfile((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    try {
      setIsSaving(true);

      let avatarUrl = profile.avatar_url;
      if (avatarFile) {
        const fileExt = avatarFile.name.split(".").pop();
        const fileName = `${profile.id}-${Math.random()}.${fileExt}`;

        // Remove old avatar if exists
        if (profile.avatar_url) {
          const oldFileName = profile.avatar_url.split("/").pop();
          if (oldFileName) {
            await supabase.storage.from("avatars").remove([oldFileName]);
          }
        }

        // Upload new avatar
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(fileName, avatarFile);

        if (uploadError) throw uploadError;

        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from("avatars").getPublicUrl(fileName);

        avatarUrl = publicUrl;
        setAvatarPreview(publicUrl);
      }

      const { error } = await supabase
        .from("users")
        .update({
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", profile.id);

      if (error) throw error;

      toast.success("Profile updated successfully");
      await getData();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-upwork-gray-light" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-upwork-gray">Settings</h2>
        <p className="mt-1 text-sm text-upwork-gray-light">
          Manage your account settings and preferences
        </p>
      </div>

      <ProfileForm
        profile={profile}
        user={profile}
        avatarPreview={avatarPreview}
        isSaving={isSaving}
        onSubmit={handleSubmit}
        onAvatarChange={handleAvatarChange}
        onProfileChange={handleProfileChange}
      />

      <UpdatePassword />
      <CustomerPortalForm subscription={subscription} />
    </div>
  );
}
