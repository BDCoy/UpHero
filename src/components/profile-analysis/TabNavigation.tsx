import { FileText, Globe } from "lucide-react";

export function TabNavigation({
  activeTab,
  setActiveTab,
}: {
  activeTab: "url" | "manual";
  setActiveTab: (tab: "url" | "manual") => void;
}) {
  return (
    <div className="flex space-x-4 border-b border-upwork-background">
      <button
        className={`pb-4 px-2 font-medium transition-colors ${
          activeTab === "url"
            ? "text-upwork-green border-b-2 border-upwork-green"
            : "text-upwork-gray-light hover:text-upwork-gray"
        }`}
        onClick={() => setActiveTab("url")}
      >
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Analyze by URL
        </div>
      </button>
      <button
        className={`pb-4 px-2 font-medium transition-colors ${
          activeTab === "manual"
            ? "text-upwork-green border-b-2 border-upwork-green"
            : "text-upwork-gray-light hover:text-upwork-gray"
        }`}
        onClick={() => setActiveTab("manual")}
      >
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Manual Analysis
        </div>
      </button>
    </div>
  );
}
