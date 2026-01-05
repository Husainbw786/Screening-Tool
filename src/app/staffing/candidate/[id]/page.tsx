"use client";
import { useRouter, useParams } from "next/navigation";
import { useStaffing } from "../../context/StaffingContext";
import { CandidateDetailPage as DetailComponent } from "../../components/candidate/CandidateDetailPage";
import { Candidate } from "../../types";

export default function CandidateDetailRoute() {
  const router = useRouter();
  const params = useParams();
  const { resultsData } = useStaffing();

  const candidate = resultsData?.candidates.find(
    (c: Candidate) => (c.id || c.filename).toString() === params.id
  );

  if (!candidate) {
    return (
      <div className="flex flex-col items-center justify-center h-full pt-20">
        <h2 className="text-xl font-semibold text-gray-800">
          Candidate not found
        </h2>
        <button
          onClick={() => router.push("/staffing/jd")}
          className="mt-4 text-blue-600 hover:underline"
        >
          Return to search
        </button>
      </div>
    );
  }

  return (
    <DetailComponent candidate={candidate} onGoBack={() => router.back()} />
  );
}
