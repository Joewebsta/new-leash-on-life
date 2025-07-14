import { useMutation, useQueryClient } from "@tanstack/react-query";
import { performLogin, performLogout } from "@/api/auth";
import { useNavigate } from "react-router";

export function usePerformLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: performLogin,
    retry: 2,
    onSuccess() {
      queryClient.clear();
      navigate("/dogs/search?sort=breed:asc");
    },
    onError(error) {
      console.error("Login failed:", error);
    },
  });
}

export function usePerformLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: performLogout,
    onSuccess() {
      queryClient.clear();
      navigate("/login");
    },
    onError(error) {
      console.error("Logout failed:", error);
      queryClient.clear();
      navigate("/login");
    },
  });
}
