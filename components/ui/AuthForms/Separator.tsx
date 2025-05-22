interface SeparatorProps {
  text: string;
}

export default function Separator({ text }: SeparatorProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-upwork-gray-lighter" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-white text-upwork-gray-light">
          {text}
        </span>
      </div>
    </div>
  );
}
