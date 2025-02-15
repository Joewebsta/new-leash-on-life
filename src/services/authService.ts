import { useMutation } from "@tanstack/react-query";
import { performLogin } from "@/api/auth";

export function usePerformLogin() {
  return useMutation({
    mutationFn: performLogin,
    onSuccess() {
      // direct user to search page
    },
    onError(error) {
      throw error;
    },
  });
}
