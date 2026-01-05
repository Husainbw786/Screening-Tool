import { useState } from "react";
import { Candidate } from "../../types";

function AvatarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#fff"
    >
      <g clipPath="url(#clip0_3111_32720)">
        <path
          d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
          fill="white"
        />
        <path
          d="M11.9999 14.5C6.98991 14.5 2.90991 17.86 2.90991 22C2.90991 22.28 3.12991 22.5 3.40991 22.5H20.5899C20.8699 22.5 21.0899 22.28 21.0899 22C21.0899 17.86 17.0099 14.5 11.9999 14.5Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_3111_32720">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function CandidateCard({
  candidate,
  onClick,
}: {
  candidate: Candidate;
  onClick: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const skills = candidate.skills || [];
  const SKILL_LIMIT = 10;

  const visibleSkills = isExpanded ? skills : skills.slice(0, SKILL_LIMIT);
  const remainingCount = skills.length - SKILL_LIMIT;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all flex flex-col h-full">
      <div className="flex items-start gap-3 mb-4">
        {candidate.avatar ? (
          <img
            src={candidate.avatar}
            alt={candidate.name || "Candidate"}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
            <AvatarIcon />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {" "}
          <div className="flex items-center justify-between gap-2">
            <h3
              onClick={onClick}
              className="text-base text-gray-900 cursor-pointer truncate font-medium hover:text-blue-600 transition-colors"
            >
              {candidate.name || "Unknown Candidate"}
            </h3>

            {candidate.score !== undefined && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(candidate.view_url, "_blank");
                }}
                className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded cursor-pointer whitespace-nowrap flex-shrink-0"
              >
                {Math.floor(candidate.score * 100)}% Match
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 truncate">
            {candidate.title || "No Title Provided"}
          </p>
        </div>
      </div>

      <div className="flex gap-1.5 items-center mb-4 flex-wrap">
        {!!candidate.total_experience && (
          <div className="flex items-center gap-1 px-[10px] py-2 bg-slate-100 rounded-full text-sm text-gray-600">
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs whitespace-nowrap">
              {candidate.total_experience} years experience
            </span>
          </div>
        )}

        {candidate.location && (
          <div className="flex items-center gap-1 px-[10px] py-2 bg-slate-100 rounded-full text-sm text-gray-600">
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-xs truncate max-w-[150px]">
              {candidate.location}
            </span>
          </div>
        )}

        {candidate.company && (
          <div className="flex items-center gap-1 px-[10px] py-2 bg-slate-100 rounded-full text-sm text-gray-600">
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span className="text-xs truncate max-w-[150px]">
              {candidate.company}
            </span>
          </div>
        )}
      </div>

      <div className="mb-4 flex-1">
        <h4 className="text-xs text-slate-500 ml-1 mb-2">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {skills.length > 0 ? (
            visibleSkills.map((skill: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-400 ml-1 italic">
              No skills listed
            </span>
          )}

          {skills.length > SKILL_LIMIT && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="px-3 py-1 bg-slate-100 text-slate-700 hover:text-slate-800 hover:bg-slate-100 text-xs rounded font-medium transition-colors"
            >
              {isExpanded ? "Show less" : `+${remainingCount} more`}
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-2 mt-auto">
        <button
          disabled={!candidate?.email}
          onClick={(e) => {
            e.stopPropagation();
            candidate?.email &&
              window.open(
                `https://mail.google.com/mail/?view=cm&fs=1&to=${candidate.email}`,
                "_blank",
              );
          }}
          className={`flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs flex items-center justify-center gap-2 transition
            ${
              !candidate?.email
                ? "opacity-50 cursor-not-allowed pointer-events-none"
                : "hover:bg-gray-50 active:bg-gray-100"
            }`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Email candidate
        </button>

        <button
          disabled={!candidate?.linkedin}
          onClick={(e) => {
            e.stopPropagation();
            candidate?.linkedin && window.open(candidate.linkedin, "_blank");
          }}
          className={`flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs flex items-center justify-center gap-2 transition
            ${
              !candidate?.linkedin
                ? "opacity-50 cursor-not-allowed pointer-events-none"
                : "hover:bg-gray-50 active:bg-gray-100"
            }`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          Message via linkedin
        </button>
      </div>
    </div>
  );
}
