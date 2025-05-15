import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

export default function Card({ title, description, footer, children }: Props) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f9f9f9] font-sans">
      <main className="flex flex-1 items-center justify-center w-full px-4 sm:px-6">
        <section className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-2xl shadow-md px-6 sm:px-10 py-10 mt-16 mb-8">
          <div className="text-center text-[#7c7c7c] max-w-3xl mx-auto">
            <Link href="/">
              <Image
                src="/sensei_logo.svg"
                alt="UGC Sensei"
                width={128}
                height={128}
                className="mx-auto mb-6 sm:mb-8"
                priority
              />
            </Link>
            <h3 className="mb-2 text-2xl font-semibold text-zinc-900">
              {title}
            </h3>
            {description && (
              <p className="mb-6 text-zinc-500 sm:text-base text-sm">
                {description}
              </p>
            )}
            <div>{children}</div>
          </div>
          {footer && (
            <div className="mt-8 pt-4 border-t rounded-b-md bg-zinc-900 text-zinc-400 text-sm">
              {footer}
            </div>
          )}
        </section>
      </main>

      <footer className="w-full flex flex-col items-center gap-2 py-6 bg-[#f9f9f9] text-[#7c7c7c] text-xs">
        <div className="flex flex-wrap justify-center gap-5 max-w-screen-sm px-4">
          <Link href="/terms" passHref legacyBehavior>
            <a
              className="hover:text-[#4621b3] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of services
            </a>
          </Link>
          <Link href="/privacy" passHref legacyBehavior>
            <a
              className="hover:text-[#4621b3] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy policy
            </a>
          </Link>
          <Link href="/refund" passHref legacyBehavior>
            <a
              className="hover:text-[#4621b3] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Refund policy
            </a>
          </Link>
          <Link href="/pack-exp" passHref legacyBehavior>
            <a
              className="hover:text-[#4621b3] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pack expiration policy
            </a>
          </Link>
        </div>
        <div className="flex items-center gap-2 mt-1 max-w-screen-sm px-4">
          <a href="mailto:support@ugcsensei.com" className="hover:underline">
            support@ugcsensei.com
          </a>
          <span>| © 2025 UGC Sensei. All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  );
}
