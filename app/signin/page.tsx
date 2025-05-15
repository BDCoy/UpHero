// 'use client';

// import React, { useState } from "react";
// import Image from 'next/image';

// // SVG URLS
// const GOOGLE_ICON = "https://ext.same-assets.com/813215175/1450734516.png";
// const EMAIL_ICON = "https://ext.same-assets.com/813215175/1450734516.png";
// const LOCK_ICON = "https://ext.same-assets.com/813215175/118784453.svg";
// const CTA_ARROW = "https://ext.same-assets.com/813215175/18195144.svg";
// const MAIL_ICON = "https://ext.same-assets.com/813215175/3872480539.svg";

// export default function AuthPage() {
//   const [activeTab, setActiveTab] = useState("signup");

//   return (
//     <div className="min-h-screen flex flex-col justify-between items-center bg-[#f9f9f9] font-sans">
//       <main className="flex flex-1 items-center justify-center w-full">
//         <section className="w-full max-w-md bg-white rounded-2xl shadow-md px-6 py-10 mt-16 mb-8">
//           {/* Logo */}
//           <Image src="/sensei_logo.svg" alt="UGC Sensei" width={128} height={128} className="h-10 mx-auto mb-5" />
//           <h2 className="text-2xl font-bold text-center mb-2">Create a business account</h2>
//           <div className="text-center text-base text-[#7c7c7c] mb-7">
//             {activeTab === 'signup' 
//               ? 'Explore creators for free. Pay only when you\'re ready.'
//               : 'Sign in to manage your creator content'
//             }
//           </div>
//           {/* Tabs */}
//           <div className="flex justify-center mb-6 text-base font-medium">
//             <button
//               className={
//                 `px-4 py-1 focus:outline-none transition-all border-b-2 ` +
//                 (activeTab === "login"
//                   ? "border-[#4621b3] text-[#4621b3]"
//                   : "border-transparent text-[#7c7c7c]")
//               }
//               onClick={() => setActiveTab("login")}
//             >
//               Log in
//             </button>
//             <button
//               className={
//                 `px-4 py-1 focus:outline-none transition-all border-b-2 ` +
//                 (activeTab === "signup"
//                   ? "border-[#4621b3] text-[#4621b3]"
//                   : "border-transparent text-[#7c7c7c]")
//               }
//               onClick={() => setActiveTab("signup")}
//             >
//               Sign up
//             </button>
//           </div>

//           {/* Social button */}
//           <button className="flex items-center gap-3 border border-[#dadada] rounded-md w-full px-4 py-2 mb-3 shadow-sm hover:bg-[#f6f4fd]">
//             <Image src={GOOGLE_ICON} alt="G" width={20} height={20} className="h-5 w-5" />
//             <span className="font-medium text-[#4a0efb]">Sign up with Google</span>
//           </button>
//           <div className="flex items-center my-3">
//             <div className="flex-grow h-px bg-[#e5e6ea]" />
//             <span className="mx-3 text-xs text-[#7c7c7c]">or</span>
//             <div className="flex-grow h-px bg-[#e5e6ea]" />
//           </div>
//           {/* Email field */}
//           <div className="mb-3 relative">
//             <span className="absolute left-3 top-1/2 -translate-y-1/2">
//               <Image src={EMAIL_ICON} alt="email" width={20} height={20} className="h-5 w-5 opacity-80" />
//             </span>
//             <input
//               className="w-full pl-10 pr-3 py-2 rounded border border-[#dadada] text-base focus:outline-none focus:border-[#4621b3] bg-white"
//               type="email"
//               placeholder="Enter your business email"
//               autoComplete="off"
//             />
//           </div>
//           {/* Password field */}
//           <div className="mb-5 relative">
//             <span className="absolute left-3 top-1/2 -translate-y-1/2">
//               <Image src={LOCK_ICON} alt="pwd" width={20} height={20} className="h-5 w-5 opacity-80" />
//             </span>
//             <input
//               className="w-full pl-10 pr-3 py-2 rounded border border-[#dadada] text-base focus:outline-none focus:border-[#4621b3] bg-white"
//               type="password"
//               placeholder="•••••••"
//               autoComplete="off"
//             />
//           </div>
//           <div className="text-xs text-[#7c7c7c] mb-6 text-center">By signing up, you agree to our terms and policies.</div>
//           {/* CTA */}
//           <button className="w-full bg-[#4621b3] hover:bg-[#965bd3] transition-colors rounded-full px-4 py-3 shadow font-semibold text-white text-lg flex items-center justify-center gap-2 mb-4">
//             {activeTab === "signup" ? "Sign up" : "Sign in"}
//             <Image src={CTA_ARROW} alt="→" width={20} height={20} className="h-5 w-5" />
//           </button>

//           {activeTab === "signup" && (
//             <div className="mt-2 flex items-center gap-3">
//               <span className="text-xs text-[#9d9ba1]">Step 1 of 2</span>
//               <div className="flex-1 h-2 rounded bg-[#e5e6ea] overflow-hidden w-24">
//                 <div className="h-full w-1/2 bg-[#4621b3] transition-all"></div>
//               </div>
//             </div>
//           )}
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="w-full flex flex-col items-center gap-2 pb-4">
//         {/* Links row */}
//         <div className="flex flex-wrap justify-center gap-4 text-xs mt-3">
//           <a href="#tos" target="_blank" className="text-[#7c7c7c] hover:text-[#4621b3]">Terms of services</a>
//           <a href="#privacy" target="_blank" className="text-[#7c7c7c] hover:text-[#4621b3]">Privacy policy</a>
//           <a href="#refund" target="_blank" className="text-[#7c7c7c] hover:text-[#4621b3]">Refund policy</a>
//           <a href="#pack-exp" target="_blank" className="text-[#7c7c7c] hover:text-[#4621b3]">Pack expiration policy</a>
//         </div>
//         <div className="flex items-center gap-2 text-xs text-[#9d9ba1] mt-1">
//           <Image src={MAIL_ICON} alt="mail" width={16} height={16} className="h-4 w-4" />
//           <a href="mailto:support@ugcsensei.com" className="hover:underline">support@ugcsensei.com</a>
//           <span>| © 2025 UGC Sensei. All Rights Reserved.</span>
//         </div>
//       </footer>
//     </div>
//   );
// }
import { redirect } from 'next/navigation';
import { getDefaultSignInView } from '@/utils/auth-helpers/settings';
import { cookies } from 'next/headers';

export default function SignIn() {
  const preferredSignInView =
    cookies().get('preferredSignInView')?.value || null;
  const defaultView = getDefaultSignInView(preferredSignInView);

  return redirect(`/signin/${defaultView}`);
}