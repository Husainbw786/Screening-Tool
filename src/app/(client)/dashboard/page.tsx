"use client";

import React, { useState, useEffect } from "react";
import { useOrganization, useUser } from "@clerk/nextjs";
import InterviewCard from "@/components/dashboard/interview/interviewCard";
import CreateInterviewCard from "@/components/dashboard/interview/createInterviewCard";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ClientService } from "@/services/clients.service";
import { useInterviews } from "@/contexts/interviews.context";
import { Plus } from "lucide-react";

function Interviews() {
  const { interviews, interviewsLoading } = useInterviews();
  const { organization } = useOrganization();
  const { user } = useUser();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userOrganizationId, setUserOrganizationId] = useState<string | null>(null);
  const [clientData, setClientData] = useState<any>(null);

  function InterviewsLoader() {
    return (
      <div className="flex flex-row">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-60 w-56 ml-1 mr-3 mt-3 flex-none animate-pulse rounded-xl bg-gray-300"
          />
        ))}
      </div>
    );
  }

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        if (user?.id) {
          const data = await ClientService.getClientById(
            user.id,
            user?.emailAddresses?.[0]?.emailAddress,
            organization?.id ?? null
          );
          if (data) {
            setUserRole(data.role);
            setUserOrganizationId(data.organization_id);
            setClientData(data);
            console.log("Fetched user role:", data.role);
          }
        }
      } catch (error) {
        console.error("Error fetching client:", error);
      }
    };
    fetchClientData();
  }, [user, organization]);

  const canCreateInterview = () => {
    if (!userRole || !userOrganizationId) {
      return false;
    }
  
    return ["Admin", "Member"].includes(userRole);
  };

  const shouldShowAccessWarning = () => {
    return userRole === "Member" && !userOrganizationId;
  };

  return (
    <main className="p-8 pt-0 ml-12 mr-auto rounded-md">
      <div className="flex flex-col items-left">
        <h2 className="mr-2 text-2xl font-semibold tracking-tight mt-8">
          Create Interviews
        </h2>
        <h3 className="text-sm tracking-tight text-gray-600 font-medium">
          Start getting responses now!
        </h3>

        <div className="relative flex items-center mt-1 flex-wrap">
          {/* ⚠️ Access Warning */}
          {shouldShowAccessWarning() ? (
            <Card className="flex bg-yellow-100 items-center border-dashed border-yellow-700 border-2 h-60 w-56 ml-1 mr-3 mt-4 rounded-xl shadow-md">
              <CardContent className="flex items-center flex-col mx-auto">
                <div className="flex flex-col justify-center items-center w-full">
                  <Plus size={60} className="text-yellow-700" />
                </div>
                <CardTitle className="p-0 text-md text-center text-yellow-900">
                  You are not invited by an admin yet. Please wait for access.
                </CardTitle>
              </CardContent>
            </Card>
          ) : canCreateInterview() ? (
            <CreateInterviewCard />
          ) : null}

          {/* 🌀 Interview List or Loader */}
          {interviewsLoading ? (
            <InterviewsLoader />
          ) : (
            <>
              {interviews.map((item) => (
                <InterviewCard
                  key={item.id}
                  id={item.id}
                  interviewerId={item.interviewer_id}
                  name={item.name}
                  url={item.url ?? ""}
                  readableSlug={item.readable_slug}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Interviews;
