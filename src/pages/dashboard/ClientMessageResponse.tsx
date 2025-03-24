import { useState } from "react";
import { MessageForm } from "@components/client-message/MessageForm";
import { ResponsePreview } from "@components/client-message/ResponsePreview";
import { toast } from "@lib/store";
import { generateClientMessage } from "@/lib/openai/client-messages";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthProvider";

export function ClientMessageResponse() {
  const { user } = useAuth();
  const [clientMessage, setClientMessage] = useState("");
  const [generatedResponse, setGeneratedResponse] = useState<string | null>(
    null
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!clientMessage.trim()) {
      toast.error("Please enter a client message");
      return;
    }

    try {
      setIsGenerating(true);
      const response = await generateClientMessage(clientMessage);
      setGeneratedResponse(response);

      toast.success("Response generated successfully!");

      const { data, error: fetchError } = await supabase
        .from("profiles")
        .select("client_messages_count")
        .eq("id", user?.id)
        .single();

      if (fetchError) {
        console.error("Error fetching current count:", fetchError);
        return;
      }

      const newCount = (data?.client_messages_count || 0) + 1;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ client_messages_count: newCount })
        .eq("id", user?.id);

      if (updateError) {
        console.error("Database update error:", updateError);
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
    </div>
  );
}
