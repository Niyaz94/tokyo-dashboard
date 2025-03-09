import { useState } from "react";

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

const useDeleteAPI = () => {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const deleteData = async (url: string) => {
    setLoading(true);
    setResponse(null);
    setError("");

    try {
      const res = await fetch(`http://127.0.0.1:8000/${url}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      const data = await res.json();
      console.log("Data:", data);
      setResponse({ success: true, data });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setResponse({ success: false, error: err.message });
    } finally {
      setLoading(false);
    }
    return response;
  };

  return { response, loading, error, deleteData };
};

export default useDeleteAPI;
