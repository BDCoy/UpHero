import React, { useState, useEffect } from "react";
import { useAuth } from "@lib/AuthProvider";
import { supabase } from "@lib/supabase";
import { toast } from "@lib/store";
import { Loader2 } from "lucide-react";
import { ProfileForm } from "@components/settings/ProfileForm";
import { SubscriptionSection } from "@components/settings/SubscriptionSection";
import { DangerZone } from "@components/settings/DangerZone";
import { UpdatePassword } from "@components/settings/UpdatePassword";
import { ConfirmDialog } from "@components/shared/ConfirmDialog";
import { getCurrentSubscription, RevolutSubscription } from "@/lib/revolut";

interface Profile {
  full_name: string;
  phone: string;
  avatar_url: string | null;
}

export function Settings() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showReactivateDialog, setShowReactivateDialog] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isReactivating, setIsReactivating] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<RevolutSubscription | null>(
    null
  );

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchSubscription = async () => {
    setIsLoadingSubscription(true);
    if (!user) return;
    const data = await getCurrentSubscription(user.id);

    if (!data) {
      toast.info("No subscription found");
    } else {
      setSubscription(data);
    }
    setIsLoadingSubscription(false);
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchProfile = async () => {
    try {
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, phone, avatar_url")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      setProfile(data);
      if (data.avatar_url) {
        setAvatarPreview(data.avatar_url);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  };

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
    if (!user || !profile) return;

    try {
      setIsSaving(true);

      let avatarUrl = profile.avatar_url;
      if (avatarFile) {
        const fileExt = avatarFile.name.split(".").pop();
        const fileName = `${user.id}-${Math.random()}.${fileExt}`;

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
        .from("profiles")
        .update({
          ...profile,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;

      toast.success("Profile updated successfully");
      await fetchProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user || deleteConfirmation !== user.email) {
      toast.error("Please enter your email correctly to confirm deletion");
      return;
    }

    try {
      setIsDeleting(true);

      // Invoke the Supabase Edge Function to handle the deletion
      const { error } = await supabase.functions.invoke("delete-user-account", {
        body: {
          user_id: user.id,
        },
      });

      // If the Edge Function returns an error, show it to the user
      if (error) {
        throw error;
      }

      // If the deletion is successful, show a success message
      toast.success("Account and related data successfully deleted");
      signOut(); // Sign out the user after deleting the account

      // Optionally, handle any other necessary logic after the deletion (e.g., redirecting, etc.)
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account. Please try again.");
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false); // Close the delete confirmation dialog
    }
  };

  const handleCancelSubscription = async () => {
    try {
      if (!subscriptionId) {
        toast.error("No subscription found");
        return;
      }
      setIsCancelling(true);

      const { error } = await supabase
        .from("subscriptions")
        .update({ state: "cancelled" })
        .eq("id", subscriptionId);

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Subscription cancelled successfully");
      setShowCancelDialog(false);
      fetchSubscription();
    } catch (error) {
      console.error("Error unsubscribing:", error);
      toast.error("Unsubscribe failed");
    } finally {
      setIsCancelling(false);
    }
  };

  const handleReactivateSubscription = async () => {
    try {
      if (!subscriptionId) {
        toast.error("No subscription found");
        return;
      }
      setIsReactivating(true);

      const { error } = await supabase
        .from("subscriptions")
        .update({ state: "completed" })
        .eq("id", subscriptionId);

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Subscription successfully reactivated");
      setShowReactivateDialog(false);
      fetchSubscription();
    } catch (error) {
      console.error("Error reactivating subscription:", error);
      toast.error("The subscription could not be reactivated.");
    } finally {
      setIsReactivating(false);
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

      <UpdatePassword />

      <SubscriptionSection
        subscription={subscription}
        loading={isLoadingSubscription}
        onCancelSubscription={(id) => {
          setSubscriptionId(id);
          setShowCancelDialog(true);
        }}
        onReactivateSubscription={(id) => {
          setSubscriptionId(id);
          setShowReactivateDialog(true);
        }}
      />

      <DangerZone onDeleteAccount={() => setShowDeleteDialog(true)} />

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
          expectedValue: user?.email || "",
          onChange: (value) => setDeleteConfirmation(value),
        }}
      />
      <ConfirmDialog
        title="Cancel Subscription"
        description="Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your current billing period."
        confirmLabel="Yes, Cancel"
        cancelLabel="Go back"
        isOpen={showCancelDialog}
        isLoading={isCancelling}
        onConfirm={handleCancelSubscription}
        onCancel={() => setShowCancelDialog(false)}
        variant="warning"
      />
      <ConfirmDialog
        title="Reactivate Subscription"
        description="Are you sure you want to reactivate your subscription? Reactivating now will immediately resume your plan without any additional charges, and your subscription will continue to operate as usual."
        confirmLabel="Yes, Reactivate"
        cancelLabel="Go back"
        isOpen={showReactivateDialog}
        isLoading={isReactivating}
        onConfirm={handleReactivateSubscription}
        onCancel={() => setShowReactivateDialog(false)}
        variant="warning"
      />
    </div>
  );
}
