import { ReactNode } from "react";

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

export default function Card({ title, description, footer, children }: Props) {
  return (
    <div className="w-full  m-auto my-8  bg-white shadow rounded-lg divide-y divide-upwork-background">
      <div className="px-5 py-4">
        <h3 className="mb-1 text-lg font-medium">{title}</h3>
        <p className="text-zinc-300">{description}</p>
        {children}
      </div>
      {footer && (
        <div className="p-4 border-t rounded-b-md  border-zinc-700  text-zinc-500">
          {footer}
        </div>
      )}
    </div>
  );
}
