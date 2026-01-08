"use client";

import { useRouter } from "next/navigation";
import { HomePage as HomeComponent } from "./components/home/HomePage";

export default function StaffingHomePage() {
  const router = useRouter();

  const handleShowJD = () => {
    router.push("/staffing/jd");
  };

  return (
    <HomeComponent
      onShowJD={handleShowJD}
      showToast={(msg: any) => console.log(msg)}
    />
  );
}
