import React from "react";
import { AvatarUpload } from "./AvatarUpload";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button } from "../ui/Button";

interface ProfileFormProps {
  profile: {
    full_name: string;
    phone: string;
  } | null;
  user: { email: string } | null;
  avatarPreview: string | null;
  isSaving: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onProfileChange: (field: string, value: string) => void;
}

export function ProfileForm({
  profile,
  user,
  avatarPreview,
  isSaving,
  onSubmit,
  onAvatarChange,
  onProfileChange,
}: ProfileFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white shadow rounded-lg divide-y divide-upwork-background"
    >
      <div className="p-6">
        <h3 className="text-lg font-medium text-upwork-gray">
          Profile Information
        </h3>

        <AvatarUpload
          avatarPreview={avatarPreview}
          onAvatarChange={onAvatarChange}
        />

        <div className="mt-6 grid grid-cols-1 gap-y-6">
          <div>
            <label
              htmlFor="full_name"
              className="block text-sm font-medium text-upwork-gray"
            >
              Full Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="full_name"
                id="full_name"
                value={profile?.full_name || ""}
                onChange={(e) => onProfileChange("full_name", e.target.value)}
                className="block w-full rounded-md border-upwork-gray-lighter px-3 py-2 text-upwork-gray focus:border-upwork-green focus:outline-none focus:ring-upwork-green"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-upwork-gray"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                id="email"
                value={user?.email}
                disabled
                className="block w-full rounded-md border-upwork-gray-lighter bg-upwork-background px-3 py-2 text-upwork-gray-light"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-upwork-gray mb-1"
            >
              Phone Number
            </label>
            <PhoneInput
              country={"us"}
              value={profile?.phone || ""}
              onChange={(phone) => onProfileChange("phone", phone)}
              inputProps={{
                name: "phone",
                required: true,
                "aria-label": "Phone number",
              }}
              enableSearch
              searchPlaceholder="Search countries"
              specialLabel=""
              preferredCountries={["us", "gb", "ca", "au"]}
              enableAreaCodes={true}
              enableTerritories={true}
              buttonClass="custom-phone-input-button"
              containerStyle={{
                width: "100%",
              }}
              inputStyle={{
                width: "100%",
                height: "40px",
                fontSize: "16px",
                borderRadius: "6px",
                border: "1px solid #D1D5DB",
                paddingLeft: "48px",
              }}
              buttonStyle={{
                border: "none",
                borderRadius: "6px 0 0 6px",
                backgroundColor: "transparent",
                padding: "0 6px",
                background: "none",
              }}
              dropdownStyle={{
                borderRadius: "6px",
                border: "1px solid #E5E7EB",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </form>
  );
}
