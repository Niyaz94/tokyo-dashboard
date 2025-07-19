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
      setResponse({ success: true, data });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setResponse({ success: false, error: err.message });
    } finally {
      setLoading(false);
    }
    return response;
  };

  const deleteTableRow = async (id,path,setTable) => {
    await deleteData(`${path}/${id}/`);
    setTable((prev) => prev.filter((row) => row.id !== id));
  };

  return { response, loading, error, deleteData,deleteTableRow };
};

export default useDeleteAPI;
