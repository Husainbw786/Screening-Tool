import { useState } from "react";
import { Figtree } from "next/font/google";
import React from "react";
import { API_BASE_URL } from "../../utils/constants";
import { useStaffing } from "../../context/StaffingContext";
import { normalizeSkills, normalizeTotalExperience } from "../../utils/helpers";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const FEATURE_FLAG_LINKEDIN_ENABLED = false;

type LoadingSource = "database" | "linkedin" | null;

export function JobDescriptionPage({
  onGoBack,
  onShowResults,
}: {
  onGoBack: () => void;
  onShowResults: (data: any) => void;
}) {
  const { jobDescription, setJobDescription } = useStaffing();

  const [loadingSource, setLoadingSource] = useState<LoadingSource>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleJDChange = (e: string) => {
    if (e.length > 5000) {
      console.log("JD limit exceeded");
      return;
    }
    setJobDescription(e);
  };

  const fetchCandidates = async (source: "database" | "linkedin") => {
    if (source === "linkedin" && !FEATURE_FLAG_LINKEDIN_ENABLED) {
      throw new Error("LinkedIn integration is currently under maintenance");
    }

    try {
      setLoadingSource(source);
      setErrorMsg(null);

      if (jobDescription.length < 10 || jobDescription.length > 5000) {
        setErrorMsg("Job description must be between 10 and 5000 characters.");
        return;
      }

      const endpoint =
        source === "database"
          ? `${API_BASE_URL}/api/candidates/database`
          : `${API_BASE_URL}/api/candidates/linkedin`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          job_description: jobDescription,
          limit: 6,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message =
          errorData?.detail || `Failed to fetch candidates from ${source}`;
        throw new Error(message);
      }

      let data = await response.json();

      if (data.candidates) {
        data.candidates = data.candidates.map((c: any) => ({
          ...c,
          skills: normalizeSkills(c.skills),
          total_experience: normalizeTotalExperience(c.total_experience),
        }));
      }

      onShowResults(data);
    } catch (error: any) {
      console.error(`Error fetching candidates from ${source}:`, error);
      setErrorMsg(error?.message || "Something went wrong. Please try again.");
    } finally {
      setLoadingSource(null);
    }
  };

  const handleLinkedInClick = () => {
    if (!FEATURE_FLAG_LINKEDIN_ENABLED) {
      setErrorMsg("LinkedIn integration is currently under maintenance");
      return;
    }
    fetchCandidates("linkedin");
  };

  return (
    <main className="flex-1 items-center justify-center flex flex-col px-4 py-6">
      <div className="w-full max-w-[827px] flex-1 items-center justify-center flex flex-col gap-4">
        <button
          onClick={onGoBack}
          className="self-start px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50 transition justify-center gap-2"
        >
          ← Go back
        </button>

        <div className="w-full max-w-[827px] bg-white rounded-3xl shadow-md p-8 w-full flex flex-col gap-6">
          <div className="text-center">
            <h2 className="text-base font-semibold text-gray-900">
              Enter job description
            </h2>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              Paste your job description below or fetch existing sources. Our AI{" "}
              <br />
              will analyze it and find the best matching candidates.
            </p>
          </div>

          <div className="relative w-full">
            <textarea
              value={jobDescription}
              onChange={(e) => handleJDChange(e.target.value)}
              placeholder="Enter job description"
              className={`${figtree.className} w-full h-64 p-4 pb-10 text-slate-600 bg-gray-50 border border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none`}
            />

            <div className="absolute bottom-2 right-0.5 pointer-events-none z-10">
              <span className="px-2 py-1 text-xs tracking-wide rounded shadow-sm transition-colors bg-white text-slate-400">
                {jobDescription.length} / 5000
              </span>
            </div>
          </div>

          {errorMsg && (
            <p className="text-xs text-red-600 text-center -mt-2">{errorMsg}</p>
          )}

          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => fetchCandidates("database")}
              disabled={loadingSource !== null}
              className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loadingSource === "database" ? (
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
                  Loading...
                </>
              ) : (
                "Fetch from database"
              )}
            </button>

            <button
              onClick={handleLinkedInClick}
              disabled={loadingSource !== null}
              className="px-4 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loadingSource === "linkedin" ? (
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
                  Loading...
                </>
              ) : (
                "Fetch from LinkedIn"
              )}
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            <span className="text-yellow-600">⚙️</span> Include specific
            requirements, skills, and responsibilities for better matches.
          </p>
        </div>
      </div>
    </main>
  );
}
