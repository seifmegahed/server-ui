"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

function UploadInput() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    await fetch("/api/upload-file", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to upload the file");
        }
        router.refresh();
        return response.json();
      })
      .catch((error) => {
        console.error("An error occurred while uploading the file:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <input
        type="file"
        name="file"
        id="file"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default UploadInput;
