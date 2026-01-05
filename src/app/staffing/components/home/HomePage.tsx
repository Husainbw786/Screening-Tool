import { Figtree } from "next/font/google";
import React from "react";
import { ResumeUploadCard } from "../upload/ResumeUploadCard";
import { JDUploadCard } from "../upload/JDUploadCard";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export function HomePage({
  onShowJD,
  showToast,
}: {
  onShowJD: () => void;
  showToast: any;
}) {
  return (
    <main className="flex-1 flex items-center justify-center px-4 py-6">
      <div className="bg-white rounded-3xl shadow-md p-8 w-full max-w-[827px] flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-base font-semibold text-slate-900">
            Transform Your Career with AI
          </h2>
          <p className="text-xs mt-1 text-slate-500 leading-relaxed">
            Upload a resume to find matching jobs, or upload a job description
            <br />
            to discover perfect candidates.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <ResumeUploadCard
            title="Upload your CV"
            description="Upload a candidate's resume and our AI will instantly analyze skills, experience, and qualification to find the best matching job opportunities."
            buttonText="Upload resume"
            infoTitle="AI-powered analysis"
            showToast={showToast}
            items={[
              "Skill extraction & matching",
              "Experience level assessment",
              "Job compatibility scoring",
            ]}
          />

          <JDUploadCard
            title="Upload / Paste JD"
            description="Paste or upload a job description and let our AI find the most qualified candidates from our database or external job portals."
            buttonText="Upload Job description"
            infoTitle="Smart candidate discovery"
            items={[
              "Multi-platform sourcing",
              "Intelligent candidate ranking",
              "Real-time availability check",
            ]}
            onSelectJD={onShowJD}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between text-xs text-gray-600 mt-4 gap-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                stroke="#159D70"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.3333 9.23336V10C18.3323 11.797 17.7504 13.5456 16.6744 14.9849C15.5985 16.4242 14.0861 17.4771 12.3628 17.9866C10.6395 18.4961 8.79771 18.4349 7.11205 17.8122C5.42639 17.1894 3.9872 16.0384 3.00912 14.5309C2.03105 13.0234 1.56648 11.2401 1.68472 9.44696C1.80296 7.65383 2.49766 5.94697 3.66522 4.58092C4.83278 3.21488 6.41064 2.26285 8.16348 1.86682C9.91632 1.47079 11.7502 1.65198 13.3917 2.38336M18.3333 3.33336L9.99999 11.675L7.49999 9.17503"
              />
            </svg>
            <span className={`text-[14px] text-slate-500 ${figtree.className}`}>
              AI-powered parsing & analysis
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                stroke="#159D70"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.3333 9.23336V10C18.3323 11.797 17.7504 13.5456 16.6744 14.9849C15.5985 16.4242 14.0861 17.4771 12.3628 17.9866C10.6395 18.4961 8.79771 18.4349 7.11205 17.8122C5.42639 17.1894 3.9872 16.0384 3.00912 14.5309C2.03105 13.0234 1.56648 11.2401 1.68472 9.44696C1.80296 7.65383 2.49766 5.94697 3.66522 4.58092C4.83278 3.21488 6.41064 2.26285 8.16348 1.86682C9.91632 1.47079 11.7502 1.65198 13.3917 2.38336M18.3333 3.33336L9.99999 11.675L7.49999 9.17503"
              />
            </svg>
            <span className={`text-[14px] text-slate-500 ${figtree.className}`}>
              Secure & GDPR compliant
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                stroke="#159D70"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.3333 9.23336V10C18.3323 11.797 17.7504 13.5456 16.6744 14.9849C15.5985 16.4242 14.0861 17.4771 12.3628 17.9866C10.6395 18.4961 8.79771 18.4349 7.11205 17.8122C5.42639 17.1894 3.9872 16.0384 3.00912 14.5309C2.03105 13.0234 1.56648 11.2401 1.68472 9.44696C1.80296 7.65383 2.49766 5.94697 3.66522 4.58092C4.83278 3.21488 6.41064 2.26285 8.16348 1.86682C9.91632 1.47079 11.7502 1.65198 13.3917 2.38336M18.3333 3.33336L9.99999 11.675L7.49999 9.17503"
              />
            </svg>
            <span className={`text-[14px] text-slate-500 ${figtree.className}`}>
              Instant job matching
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
