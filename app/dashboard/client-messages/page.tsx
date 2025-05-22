"use client";

import { useCallback, useEffect, useState } from "react";
import { MessageForm } from "@/components/client-message/MessageForm";
import { ResponsePreview } from "@/components/client-message/ResponsePreview";
import { generateClientMessage } from "@/lib/openai/client-messages";

import { SubscriptionModal } from "@/components/shared/SubscriptionModal";
import { User } from "@supabase/supabase-js";
import {
  checkSubscriptionStatus,
  getSubscription,
  getUser,
} from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/client";
import { toast } from "@/lib/store/toast";

export default function ClientMessageResponse() {
  const supabase = createClient();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [clientMessage, setClientMessage] = useState("");
  const [generatedResponse, setGeneratedResponse] = useState<string | null>(
    null
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [subscription, setSubscription] = useState<any | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const getData = useCallback(async () => {
    try {
      const [userData, subscriptionData] = await Promise.all([
        getUser(supabase),
        getSubscription(supabase),
      ]);
      setUser(userData);
      setSubscription(subscriptionData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [supabase]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleGenerate = async () => {
    if (!clientMessage.trim()) {
      toast.error("Please enter a client message");
      return;
    }

    if (!user) {
      throw Error("Please signin to continue");
    }
    // Check subscription status
    const isSubscriptionValid = await checkSubscriptionStatus(
      user.id,
      subscription,
      supabase,
      "client_messages_count"
    );
    if (!isSubscriptionValid) {
      setShowSubscriptionModal(true);
      return;
    }

    try {
      setIsGenerating(true);
      const response = await generateClientMessage(clientMessage);
      setGeneratedResponse(response);

      toast.success("Response generated successfully!");

      const { data, error: fetchError } = await supabase
        .from("users")
        .select("client_messages_count")
        .eq("id", user?.id)
        .single();

      if (fetchError) {
        console.error("Error fetching current count:", fetchError);
        return;
      }

      const newCount = (data?.client_messages_count || 0) + 1;

      const { error } = await supabase.functions.invoke(
        "update-profile-count", // Name of the edge function
        {
          body: {
            analysisType: "client_messages_count", // Specify the analysis type
            user_id: user.id, // Pass the user_id to the Edge Function
            new_count: newCount, // Pass the new count
          },
        }
      );

      if (error) {
        console.error("Error invoking edge function:", error);
        return;
      }
    } catch (error) {
      console.error("Error generating response:", error);
      toast.error("Failed to generate response. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-upwork-gray">
          Client Message Response
        </h1>
        <p className="mt-1 text-sm text-upwork-gray-light">
          Generate professional responses to client messages instantly
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MessageForm
          clientMessage={clientMessage}
          onMessageChange={setClientMessage}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />
        <ResponsePreview response={generatedResponse} />
      </div>
      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
      />
    </div>
  );
}
