"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CandidateResponse } from "../types";

interface StaffingContextType {
  resultsData: CandidateResponse | null;
  setResultsData: (data: CandidateResponse) => void;
  jobDescription: string;
  setJobDescription: (text: string) => void;
  isLoading: boolean;
}

const StaffingContext = createContext<StaffingContextType | undefined>(
  undefined,
);

export function StaffingProvider({ children }: { children: React.ReactNode }) {
  const [resultsData, setResultsDataState] = useState<CandidateResponse | null>(
    null,
  );
  const [jobDescription, setJobDescriptionState] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedResults = localStorage.getItem("staffing_results");
    const savedJD = localStorage.getItem("staffing_jd");

    if (savedResults) {
      try {
        setResultsDataState(JSON.parse(savedResults));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedJD) {
      setJobDescriptionState(savedJD);
    }

    setIsLoading(false);
  }, []);

  const setResultsData = (data: CandidateResponse) => {
    setResultsDataState(data);
    localStorage.setItem("staffing_results", JSON.stringify(data));
  };

  const setJobDescription = (text: string) => {
    setJobDescriptionState(text);
    localStorage.setItem("staffing_jd", text);
  };

  return (
    <StaffingContext.Provider
      value={{
        resultsData,
        setResultsData,
        jobDescription,
        setJobDescription,
        isLoading,
      }}
    >
      {children}
    </StaffingContext.Provider>
  );
}

export function useStaffing() {
  const context = useContext(StaffingContext);
  if (!context) {
    throw new Error("useStaffing must be used within a StaffingProvider");
  }
  return context;
}
