import React from "react";

import { Copy } from "lucide-react";
import type { ProposalResponse } from "@lib/store/proposal";
import { Button } from "../ui/Button";
import { toast } from "@/lib/store/toast";

interface ProposalPreviewProps {
  proposal: ProposalResponse;
}

export function ProposalPreview({ proposal }: ProposalPreviewProps) {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy text");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm divide-y divide-upwork-background">
      {/* Cover Letter Section */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-upwork-gray">
            Cover Letter
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(proposal.coverLetter)}
            className="flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy
          </Button>
        </div>
        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap text-upwork-gray">
            {proposal.coverLetter}
          </p>
        </div>
      </div>

      {/* Project Plan Section */}
      {/* {proposal.projectPlan && (
        <div className="p-6">
          <h2 className="text-lg font-semibold text-upwork-gray mb-4">Project Plan</h2>
          <div className="space-y-6">
            {Object.entries(proposal.projectPlan).map(([phase, details]) => (
              <div key={phase} className="bg-upwork-background rounded-lg p-4">
                <h3 className="font-medium text-upwork-gray capitalize mb-3">
                  {phase.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-upwork-gray-light">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{details.duration}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-upwork-gray mb-2">Tasks:</h4>
                    <ul className="space-y-1">
                      {details.tasks.map((task, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-upwork-gray-light">
                          <CheckCircle className="w-4 h-4 text-upwork-green flex-shrink-0 mt-0.5" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-upwork-gray mb-1">Milestone:</h4>
                    <p className="text-sm text-upwork-gray-light">{details.milestone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )} */}

      {/* Question Responses Section */}
      {proposal?.questionResponses?.length > 0 && (
        <div className="p-6">
          <h2 className="text-lg font-semibold text-upwork-gray mb-4">
            Question Responses
          </h2>
          <div className="space-y-4">
            {proposal?.questionResponses?.map((response, index) => (
              <div key={index} className="bg-upwork-background rounded-lg p-4">
                <p className="font-medium text-upwork-gray mb-2">
                  {response.question}
                </p>
                <p className="text-upwork-gray-light">{response.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project Details Section */}
      {/* <div className="p-6">
        <h2 className="text-lg font-semibold text-upwork-gray mb-4">Project Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-upwork-background rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-5 h-5 text-upwork-green" />
              <h3 className="font-medium text-upwork-gray">Suggested Rate</h3>
            </div>
            <p className="text-xl font-semibold text-upwork-gray mb-2">
              ${proposal.suggestedRate.min} - ${proposal.suggestedRate.max}/hr
            </p>
            <p className="text-sm text-upwork-gray-light">
              {proposal.suggestedRate.rationale}
            </p>
          </div>

          <div className="bg-upwork-background rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-upwork-green" />
              <h3 className="font-medium text-upwork-gray">Estimated Duration</h3>
            </div>
            <p className="text-xl font-semibold text-upwork-gray mb-2">
              {proposal.estimatedDuration.value} {proposal.estimatedDuration.unit}
            </p>
            <p className="text-sm text-upwork-gray-light">
              {proposal.estimatedDuration.rationale}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-upwork-green" />
            <h3 className="font-medium text-upwork-gray">Key Points</h3>
          </div>
          <div className="bg-upwork-background rounded-lg p-4">
            <ul className="space-y-2">
              {proposal.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-upwork-green flex-shrink-0 mt-1" />
                  <span className="text-upwork-gray-light">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div> */}
    </div>
  );
}
