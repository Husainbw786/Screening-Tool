"use client";
import { useRouter } from "next/navigation";
import { useStaffing } from "../context/StaffingContext";
import { ResultsPage as ResultsComponent } from "../components/results/ResultsPage";
import { useEffect } from "react";

export default function ResultsRoute() {
  const router = useRouter();
  const { resultsData, isLoading } = useStaffing();

  useEffect(() => {
    if (!isLoading && !resultsData) {
    }
  }, [resultsData, isLoading, router]);

  const handleCandidateClick = (candidate: any) => {
    router.push(`/staffing/candidate/${candidate.id || candidate.filename}`);
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <svg
            className="animate-spin h-8 w-8 text-gray-400"
            viewBox="0 0 24 24"
          >
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
          <p className="text-sm text-gray-500">Restoring results...</p>
        </div>
      </div>
    );
  }

  if (!resultsData) {
    return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4">
        <p className="text-gray-500">No results found.</p>
        <button
          className="text-sm text-blue-600 hover:underline"
          onClick={() => router.push("/staffing/jd")}
        >
          Upload a Job Description
        </button>
      </div>
    );
  }

  return (
    <ResultsComponent
      data={resultsData}
      onGoBack={() => router.back()}
      onCandidateClick={handleCandidateClick}
    />
  );
}
