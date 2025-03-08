import React, { useState, useEffect } from 'react';
import { useAuth } from '@lib/AuthProvider';
import { supabase } from '@lib/supabase';
import { toast } from '@lib/store';
import { Loader2 } from 'lucide-react';
import { ProfileForm } from '@components/settings/ProfileForm';
import { SubscriptionSection } from '@components/settings/SubscriptionSection';
import { DangerZone } from '@components/settings/DangerZone';
import { ConfirmDialog } from '@components/shared/ConfirmDialog';

interface Profile {
  full_name: string;
  phone: string;
  avatar_url: string | null;
}

export function Settings() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      setProfile(data);
      if (data.avatar_url) {
        setAvatarPreview(data.avatar_url);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should be less than 2MB');
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfile(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile) return;

    try {
      setIsSaving(true);

      let avatarUrl = profile.avatar_url;
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${user.id}-${Math.random()}.${fileExt}`;

        // Remove old avatar if exists
        if (profile.avatar_url) {
          const oldFileName = profile.avatar_url.split('/').pop();
          if (oldFileName) {
            await supabase.storage
              .from('avatars')
              .remove([oldFileName]);
          }
        }

        // Upload new avatar
        const { error: uploadError, data } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatarFile);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);

        avatarUrl = publicUrl;
        setAvatarPreview(publicUrl);
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          ...profile,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      toast.success('Profile updated successfully');
      await fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user || deleteConfirmation !== user.email) {
      toast.error('Please enter your email correctly to confirm deletion');
      return;
    }

    try {
      setIsDeleting(true);

      if (profile?.avatar_url) {
        const fileName = profile.avatar_url.split('/').pop();
        if (fileName) {
          await supabase.storage
            .from('avatars')
            .remove([fileName]);
        }
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id);

      if (profileError) throw profileError;

      const { error: authError } = await supabase.auth.signOut();
      if (authError) throw authError;

      toast.success('Your account has been deleted successfully');
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Failed to delete account. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      setIsCancelling(true);
      // Implement subscription cancellation logic here
      toast.success('Subscription cancelled successfully');
      setShowCancelDialog(false);
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast.error('Failed to cancel subscription');
    } finally {
      setIsCancelling(false);
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
        user={user}
        avatarPreview={avatarPreview}
        isSaving={isSaving}
        onSubmit={handleSubmit}
        onAvatarChange={handleAvatarChange}
        onProfileChange={handleProfileChange}
      />

      <SubscriptionSection
        onCancelSubscription={() => setShowCancelDialog(true)}
      />

      <DangerZone
        onDeleteAccount={() => setShowDeleteDialog(true)}
      />

      <ConfirmDialog
        title="Delete Account"
        description="Are you sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone."
        confirmLabel="Delete Account"
        cancelLabel="Cancel"
        isOpen={showDeleteDialog}
        isLoading={isDeleting}
        onConfirm={handleDeleteAccount}
        onCancel={() => setShowDeleteDialog(false)}
        variant="danger"
        confirmInput={{
          value: deleteConfirmation,
          placeholder: "Type your email to confirm",
          expectedValue: user?.email || ''
        }}
      />

      <ConfirmDialog
        title="Cancel Subscription"
        description="Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your current billing period."
        confirmLabel="Yes, Cancel Subscription"
        cancelLabel="No, Keep Subscription"
        isOpen={showCancelDialog}
        isLoading={isCancelling}
        onConfirm={handleCancelSubscription}
        onCancel={() => setShowCancelDialog(false)}
        variant="warning"
      />
    </div>
  );
}