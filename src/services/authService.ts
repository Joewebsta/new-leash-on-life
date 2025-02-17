import { useMutation } from "@tanstack/react-query";
import { performLogin, performLogout } from "@/api/auth";
import { useNavigate } from "react-router";

export function usePerformLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: performLogin,
    onSuccess() {
      navigate("/dogs/search");
    },
    onError(error) {
      throw error;
    },
  });
}

export function usePerformLogout() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: performLogout,
    onSuccess() {
      navigate("/login");
    },
    onError(error) {
      throw error;
    },
  });
}
