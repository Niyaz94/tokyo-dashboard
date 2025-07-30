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

  const deleteData = async (url: string, body?:any) => {
    setLoading(true);
    setResponse(null);
    setError("");

    try {
      const res = await fetch(`http://127.0.0.1:8000/${url}`, {
        method: "DELETE",
        body: body ? body : null,
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

  const deleteTableMultiRow = async (ids,path,setTable) => {

    let preData = new FormData();
    if(Array.isArray(ids)){
      ids.forEach((img) => preData.append("ids", img));
    }
    await deleteData(`${path}`,preData);
    setTable((prev) => prev.filter((row) =>  !ids.includes(row.id)));
  };

  return { response, loading, error, deleteData,deleteTableRow,deleteTableMultiRow};
};

export default useDeleteAPI;
