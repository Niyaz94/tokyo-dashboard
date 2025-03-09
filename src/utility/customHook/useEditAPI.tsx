import { useState } from "react";

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

const useEditAPI = () => {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const editData = async (url: string, body: any, method: "PUT" | "PATCH" = "PUT") => {
    setLoading(true);
    setResponse(null);
    setError("");

    try {
      const res = await fetch(`http://127.0.0.1:8000/${url}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("Failed to update data");
      }

      const data = await res.json();
      setResponse({ success: true, data });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setResponse({ success: false, error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, editData };
};

export default useEditAPI;
