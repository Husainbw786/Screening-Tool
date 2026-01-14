"use client";

import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { Plus, Loader2 } from "lucide-react";
import { useState } from "react";
import { useInterviewers } from "@/contexts/interviewers.context";
import { toast } from "sonner";

function CreateInterviewerButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { setInterviewers } = useInterviewers();

  const createInterviewers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/create-interviewer");
      
      if (response.status === 200) {
        toast.success("Successfully created default interviewers (Lisa & Bob)!", {
          position: "bottom-right",
          duration: 3000,
        });
        
        // Refresh the interviewers list
        const refreshResponse = await fetch('/api/get-interviewers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: '' })
        });
        
        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          setInterviewers(data);
        }
      }
    } catch (error: any) {
      console.error("Error creating interviewers:", error);
      toast.error(error.response?.data?.error || "Failed to create interviewers. Please try again.", {
        position: "bottom-right",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card
        className="p-0 inline-block cursor-pointer hover:scale-105 ease-in-out duration-300 h-40 w-36 ml-1 mr-3 rounded-xl shrink-0 overflow-hidden shadow-md"
        onClick={() => createInterviewers()}
      >
        <CardContent className="p-0">
          {isLoading ? (
            <div className="w-full h-20 overflow-hidden flex justify-center items-center">
              <Loader2 size={40} className="animate-spin" />
            </div>
          ) : (
            <div className="w-full h-20 overflow-hidden flex justify-center items-center">
              <Plus size={40} />
            </div>
          )}
          <p className="my-3 mx-auto text-xs text-wrap w-fit text-center">
            Create two Default Interviewers
          </p>
        </CardContent>
      </Card>
    </>
  );
}

export default CreateInterviewerButton;
