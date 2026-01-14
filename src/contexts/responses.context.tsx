"use client";

import React, { useContext } from "react";

interface Response {
  createResponse: (payload: any) => Promise<any>;
  saveResponse: (payload: any, call_id: string) => Promise<void>;
}

export const ResponseContext = React.createContext<Response>({
  createResponse: async () => {},
  saveResponse: async () => {},
});

interface ResponseProviderProps {
  children: React.ReactNode;
}

export function ResponseProvider({ children }: ResponseProviderProps) {
  const createResponse = async (payload: any) => {
    const response = await fetch('/api/create-response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.id;
    }
    return null;
  };

  const saveResponse = async (payload: any, call_id: string) => {
    await fetch('/api/save-response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload, callId: call_id })
    });
  };

  return (
    <ResponseContext.Provider
      value={{
        createResponse,
        saveResponse,
      }}
    >
      {children}
    </ResponseContext.Provider>
  );
}

export const useResponses = () => {
  const value = useContext(ResponseContext);

  return value;
};
