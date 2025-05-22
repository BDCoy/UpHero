import { Loader2 } from "lucide-react";
import { Button } from "../ui/Button";

interface MessageFormProps {
  clientMessage: string;
  onMessageChange: (message: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function MessageForm({
  clientMessage,
  onMessageChange,
  onGenerate,
  isGenerating,
}: MessageFormProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-upwork-gray mb-4">
        Client Message
      </h2>

      <div className="space-y-4">
        <div>
          <textarea
            value={clientMessage}
            onChange={(e) => onMessageChange(e.target.value)}
            rows={8}
            className="w-full rounded-md border-upwork-gray-lighter focus:border-upwork-green focus:ring-upwork-green resize-none"
            placeholder="Paste the client's message here..."
          />
        </div>

        <Button
          onClick={onGenerate}
          disabled={isGenerating || !clientMessage.trim()}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating Response...
            </>
          ) : (
            "Generate Response"
          )}
        </Button>
      </div>
    </div>
  );
}
