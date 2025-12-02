import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function usePreviousLocation() {
  const location = useLocation();
  const prevLocation = useRef(null);

  useEffect(() => {
    prevLocation.current = location;
  }, [location]);

  return prevLocation.current;
}