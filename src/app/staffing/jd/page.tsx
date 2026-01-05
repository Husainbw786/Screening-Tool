"use client";
import { useRouter } from "next/navigation";
import { useStaffing } from "../context/StaffingContext";
import { JobDescriptionPage as JDComponent } from "../components/jd/JobDescriptionPage";

export default function JDRoute() {
  const router = useRouter();
  const { setResultsData } = useStaffing();

  const handleShowResults = (data: any) => {
    setResultsData(data);
    router.push("/staffing/results");
  };

  return (
    <JDComponent
      onGoBack={() => router.back()}
      onShowResults={handleShowResults}
    />
  );
}
