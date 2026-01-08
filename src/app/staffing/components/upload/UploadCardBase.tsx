import { Figtree } from "next/font/google";
import React from "react";

import UploadJdButtonIcon from "../icons/UploadJdButtonIcon";
import UploadJdIcon from "../icons/UploadJdIcon";
import UploadResumeButtonIcon from "../icons/UploadResumeButtonIcon";
import UploadResumeIcon from "../icons/UploadResumeIcon";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

type UploadVariant = "resume" | "jd";

interface UploadCardBaseProps {
  variant: UploadVariant;
  title: string;
  description: string;
  buttonText: string;
  infoTitle: string;
  items: string[];
  onButtonClick: () => void;
  isBusy?: boolean;
  statusNode?: React.ReactNode;
  disabled?: boolean;
}

export function UploadCardBase({
  variant,
  title,
  description,
  buttonText,
  infoTitle,
  items,
  onButtonClick,
  isBusy,
  statusNode,
  disabled = false,
}: UploadCardBaseProps) {
  const isResume = variant === "resume";
  const colorClass = isResume ? "bg-blue-500" : "bg-violet-500";
  const AccentIcon = isResume ? UploadResumeIcon : UploadJdIcon;
  const ButtonIcon = isResume ? UploadResumeButtonIcon : UploadJdButtonIcon;

  return (
    <div className="flex-1 border border-gray-200 rounded-2xl p-4 flex flex-col justify-between bg-white hover:shadow-sm transition-all">
      <div className="flex flex-col items-center gap-2">
        <div
          className={`w-10 h-10 rounded-lg ${colorClass} flex items-center justify-center`}
        >
          <AccentIcon />
        </div>
        <h3 className="text-base font-semibold text-slate-900 mt-2">{title}</h3>
        <p
          className={`text-[15px]/5 text-slate-400 text-center font-light ${figtree.className}`}
        >
          {description}
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 mt-4">
        <button
          onClick={onButtonClick}
          disabled={isBusy || disabled}
          className="px-[12px] py-2 m-4 bg-white border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50 transition flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isBusy ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span className="text-[14px]">Uploading...</span>
            </>
          ) : (
            <>
              <ButtonIcon />
              <span className="text-[14px]">{buttonText}</span>
            </>
          )}
        </button>

        {statusNode}

        <div className="w-full bg-slate-50 rounded-lg p-3 border border-gray-200">
          <h4 className="text-xs font-semibold text-gray-900 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
              />
            </svg>
            {infoTitle}
          </h4>
          <ul className="mt-3 text-xs text-slate-500 space-y-1">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-2 ml-1">
                <span className="text-slate-500">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
