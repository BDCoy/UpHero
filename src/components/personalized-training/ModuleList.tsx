import { ModuleItem } from "./ModuleItem";

interface ModuleListProps {
  modules: { title: string }[];
  selectedModule: number | null;
  completedModules: boolean[];
  onModuleClick: (index: number) => void;
  onToggleComplete: (index: number) => void;
}

export function ModuleList({
  modules,
  selectedModule,
  completedModules,
  onModuleClick,
  onToggleComplete,
}: ModuleListProps) {
  return (
    <div className="space-y-2">
      {modules.map((module, index) => (
        <ModuleItem
          key={index}
          title={module.title}
          isSelected={selectedModule === index}
          isCompleted={completedModules[index]}
          onClick={() => onModuleClick(index)}
          onToggleComplete={() => onToggleComplete(index)}
        />
      ))}
    </div>
  );
}
