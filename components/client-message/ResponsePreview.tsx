import { toast } from "@/lib/store/toast";
import { Copy, MessageSquare } from "lucide-react";
import { Button } from "../ui/Button";

interface ResponsePreviewProps {
  response: string | null;
}

export function ResponsePreview({ response }: ResponsePreviewProps) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(response || "");
      toast.success("Response copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy text");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-upwork-gray">
          Generated Response
        </h2>
        {response && (
          <Button
            variant="outline"
            onClick={copyToClipboard}
            className="flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy
          </Button>
        )}
      </div>

      {response ? (
        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap text-upwork-gray">{response}</p>
        </div>
      ) : (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-upwork-gray-light mx-auto mb-4" />
          <p className="text-upwork-gray">
            Your generated response will appear here
          </p>
          <p className="text-sm text-upwork-gray-light mt-2">
            Paste a client message and click "Generate Response" to get started
          </p>
        </div>
      )}
    </div>
  );
}
