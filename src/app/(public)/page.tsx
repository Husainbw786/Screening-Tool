import Link from "next/link";
import {
  ArrowRight,
  LayoutDashboard,
  Users,
  ShieldCheck,
  Zap,
  Sparkles,
} from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { Figtree } from "next/font/google";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export default function LandingPage() {
  const { userId } = auth();

  return (
    <main
      className={`min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col ${figtree.className}`}
    >
      <header className="w-full py-3 px-6 border-b border-gray-200 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-none">
              Consult<span className="text-red-600">Add</span>
            </h1>
            <p className="text-[8px] text-slate-500 font-medium mt-0.5 tracking-wide">
              AI HIRING ECOSYSTEM
            </p>
          </div>
        </div>

        {userId && (
          <span className="text-[10px] font-bold bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />{" "}
            Logged In
          </span>
        )}
      </header>

      <div className="flex-grow flex flex-col items-center justify-center p-6 w-full">
        <div className="w-full max-w-4xl space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-medium text-slate-600 mb-2">
              <Sparkles size={12} className="text-yellow-500 fill-yellow-500" />
              <span>Two Powerful Engines. One Platform.</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Choose Your Workspace
            </h1>
            <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
              Streamline your recruitment process with our specialized AI tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <Link href="/dashboard" className="group">
              <div className="h-full bg-white rounded-2xl border border-slate-200 border-t-[6px] border-t-red-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden">
                <div className="p-8 pb-0">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-red-100">
                      <LayoutDashboard
                        className="w-7 h-7 text-red-600"
                        strokeWidth={1.5}
                      />
                    </div>
                    {userId && (
                      <span className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider rounded-full border border-slate-200">
                        Logged In
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 mb-8">
                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-red-700 transition-colors">
                      Interview Intelligence
                    </h2>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Automate screening with AI interviewers. Generate dynamic
                      questions, analyze transcripts, and get deep insights.
                    </p>
                  </div>
                </div>

                <div className="mt-auto p-6 pt-6 border-t border-slate-100 bg-slate-50/50 group-hover:bg-red-50/10 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 uppercase tracking-wide">
                      <ShieldCheck size={14} className="text-red-400" /> Secure
                      Access
                    </span>
                    <div className="flex items-center gap-2 text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                      {userId ? "ENTER DASHBOARD" : "SIGN IN"}{" "}
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/staffing" className="group">
              <div className="h-full bg-white rounded-2xl border border-slate-200 border-t-[6px] border-t-blue-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden">
                <div className="p-8 pb-0">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-blue-100">
                      <Users
                        className="w-7 h-7 text-blue-600"
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-blue-100">
                      Public Access
                    </span>
                  </div>

                  <div className="space-y-3 mb-8">
                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      Smart Staffing
                    </h2>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Instant candidate matching engine. Upload JDs and Resumes
                      to let our AI sourcing engine find the perfect fit.
                    </p>
                  </div>
                </div>

                <div className="mt-auto p-6 pt-6 border-t border-slate-100 bg-slate-50/50 group-hover:bg-blue-50/10 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 uppercase tracking-wide">
                      <Zap size={14} className="text-blue-400" /> Instant
                      Results
                    </span>
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      START SOURCING <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <footer className="w-full text-center py-6 bg-white border-t border-slate-100">
        <p className="text-xs text-slate-400 font-medium">
          &copy; {new Date().getFullYear()} ConsultAdd Inc. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
