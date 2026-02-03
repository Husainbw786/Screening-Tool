"use client";
import { useState, useRef } from "react";
import React from "react";
import {
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE_BYTES,
  API_BASE_URL,
} from "../../utils/constants";
import { UploadCardBase } from "./UploadCardBase";

const FEATURE_FLAG_UPLOAD_ENABLED = false;

interface ResumeUploadCardProps {
  title: string;
  description: string;
  buttonText: string;
  infoTitle: string;
  items: string[];
  showToast: (message: string, type: "success" | "error") => void;
}

function validateFile(file: File): string | null {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return "File size must be less than 5MB";
  }
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return "Only PDF and DOCX files are allowed";
  }
  
return null;
}

async function uploadResumeToBackend(file: File) {
  if (!FEATURE_FLAG_UPLOAD_ENABLED) {
    throw new Error("Feature currently under maintenance");
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/api/upload-resume`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    let message = "Upload failed";
    try {
      const errorData = await response.json();
      message = errorData.detail || message;
    } catch {}
    throw new Error(message);
  }

  return response.json();
}

export function ResumeUploadCard(props: ResumeUploadCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const onButtonClick = (): void => {
    if (!FEATURE_FLAG_UPLOAD_ENABLED) {
      setErrorMsg("Feature currently under maintenance");
      
return;
    }
    fileInputRef.current?.click();
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!FEATURE_FLAG_UPLOAD_ENABLED) {
      setErrorMsg("Feature currently under maintenance");
      event.target.value = "";
      
return;
    }

    const file = event.target.files?.[0];
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!file) {return;}

    const validationError = validateFile(file);
    if (validationError) {
      setErrorMsg(validationError);
      event.target.value = "";
      
return;
    }

    setIsUploading(true);

    try {
      const result = await uploadResumeToBackend(file);
      console.log("Uploaded:", result);
      setSuccessMsg(`${file.name} uploaded successfully!`);
    } catch (err: any) {
      setErrorMsg(err?.message || "Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  const statusNode = (
    <>
      {errorMsg && (
        <p className="text-xs text-red-600 text-center -mt-2">{errorMsg}</p>
      )}
      {successMsg && (
        <p className="text-xs text-green-600 text-center -mt-2">{successMsg}</p>
      )}
    </>
  );

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        disabled={isUploading || !FEATURE_FLAG_UPLOAD_ENABLED}
        onChange={onFileChange}
      />

      <UploadCardBase
        variant="resume"
        title={props.title}
        description={props.description}
        buttonText={props.buttonText}
        infoTitle={props.infoTitle}
        items={props.items}
        isBusy={isUploading}
        statusNode={statusNode}
        disabled={isUploading}
        onButtonClick={onButtonClick}
      />
    </>
  );
}
