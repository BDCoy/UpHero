import { useState } from "react";
import { Button } from "@components/Button";
import { Loader2 } from "lucide-react";
import { CheckCircle, Circle } from "lucide-react";
import UpworkProfileOptimization from "@/components/personalized-training/UpworkProfileOptimization";
import PerfectProposalProcessPart1 from "@/components/personalized-training/PerfectProposalProcessPart1";
import PerfectProposalProcessPart2 from "@/components/personalized-training/PerfectProposalProcessPart2";
import PerfectProposalProcessPart3 from "@/components/personalized-training/PerfectProposalProcessPart3";
import UpworkSalesProcessPart1 from "@/components/personalized-training/UpworkSalesProcessPart1";
import UpworkSalesProcessPart2A from "@/components/personalized-training/UpworkSalesProcessPart2A";
import UpworkSalesProcessPart2B from "@/components/personalized-training/UpworkSalesProcessPart2B";
import UpworkSalesProcessPart2C from "@/components/personalized-training/UpworkSalesProcessPart2C";
import NoShowWorkflow from "@/components/personalized-training/NoShowWorkflow";
import CallNotClosedWorkflow from "@/components/personalized-training/CallNotClosedWorkflow";

const trainingModules = [
  {
    title: "Perfect Profile",
    content: <UpworkProfileOptimization />,
  },
  {
    title: "Proposal Process (Part 1: Why Send Proposals?)",
    content: <PerfectProposalProcessPart1 />,
  },
  {
    title: "Proposal Process (Part 2: Finding The Right Jobs)",
    content: <PerfectProposalProcessPart2 />,
  },
  {
    title: "Proposal Process (Part 3: Proposal Creation)",
    content: <PerfectProposalProcessPart3 />,
  },
  {
    title: "Sales Process (Part 1: Setting)",
    content: <UpworkSalesProcessPart1 />,
  },
  {
    title: "Sales Process (Part 2A: Structure & Mentality)",
    content: <UpworkSalesProcessPart2A />,
  },
  {
    title: "Sales Process (Part 2B: Discovery Call)",
    content: <UpworkSalesProcessPart2B />,
  },
  {
    title: "Sales Process (Part 2C: Proposal Call)",
    content: <UpworkSalesProcessPart2C />,
  },
  {
    title: "No-Show Workflow",
    content: <NoShowWorkflow />,
  },
  {
    title: "Call Not Closed Workflow",
    content: <CallNotClosedWorkflow />,
  },
];

export function PersonalizedTraining() {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [completedModules, setCompletedModules] = useState<boolean[]>(
    new Array(trainingModules.length).fill(false)
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleModuleClick = (index: number) => {
    setSelectedModule(index);
  };

  const toggleCompleteModule = (index: number) => {
    const newCompletedModules = [...completedModules];
    newCompletedModules[index] = !newCompletedModules[index];
    setCompletedModules(newCompletedModules);
  };

  const handleAnalyze = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toggleCompleteModule(selectedModule!);
    }, 2000);
  };

  const totalModules = trainingModules.length;
  const completedCount = completedModules.filter(Boolean).length;
  const progress = (completedCount / totalModules) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-upwork-gray">
            Personalized Training
          </h1>
          <p className="mt-1 text-sm text-upwork-gray-light">
            Improve your skills with tailored training modules.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6">
        <div className="w-full sm:w-1/3 space-y-4">
          <h2 className="text-xl font-semibold text-upwork-gray">
            Course Modules
          </h2>
          <div className="space-y-2">
            {trainingModules.map((module, index) => (
              <div
                key={index}
                className={`flex items-center justify-between gap-2 p-2 rounded-md cursor-pointer hover:bg-upwork-gray-lighter hover:text-white transition-all duration-300 ${
                  selectedModule === index ? "bg-upwork-green text-white" : ""
                }`}
                onClick={() => handleModuleClick(index)}
              >
                <span
                  className={`text-sm ${
                    completedModules[index]
                      ? "line-through text-upwork-gray-light hover:text-white"
                      : "hover:text-upwork-gray-dark"
                  }`}
                >
                  {module.title}
                </span>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCompleteModule(index);
                  }}
                >
                  {completedModules[index] ? (
                    <CheckCircle className="w-5 h-5 text-green-500 hover:text-white transition-transform transform hover:scale-110" />
                  ) : (
                    <Circle className="w-5 h-5 text-upwork-gray-light hover:text-white transition-transform transform hover:scale-110" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
          {selectedModule !== null ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-upwork-gray">
                  {trainingModules[selectedModule].title}
                </h2>
                <Button
                  onClick={() => {
                    if (!completedModules[selectedModule]) {
                      handleAnalyze();
                    } else {
                      toggleCompleteModule(selectedModule);
                    }
                  }}
                  disabled={isLoading}
                  className="flex items-center ml-auto p-2 bg-upwork-green text-white rounded-md hover:bg-green-600 transition-all duration-300"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : completedModules[selectedModule] ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <Circle className="w-5 h-5 text-white" />
                  )}
                </Button>
              </div>

              <div className="text-sm text-upwork-gray">
                {trainingModules[selectedModule].content}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col items-center justify-center h-full text-center text-upwork-gray-light py-12">
                {/* Add an appropriate icon here */}
                <Circle className="w-12 h-12 mb-4 text-upwork-gray-light" />{" "}
                {/* Example icon */}
                <p className="text-sm text-upwork-gray">
                  Please select a module to view its content.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
