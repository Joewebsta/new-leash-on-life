import { useMutation, useQueryClient } from "@tanstack/react-query";
import { performLogin, performLogout, BASE_URL } from "@/api/auth";
import { useNavigate } from "react-router";

export function usePerformLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: performLogin,
    retry: 2,
    async onSuccess() {
      queryClient.clear();

      // Test if cookies are working by making a test API call
      try {
        const testResponse = await fetch(`${BASE_URL}/dogs/breeds`, {
          credentials: "include",
        });

        if (testResponse.status === 401) {
          // Cookies aren't working - likely Safari's ITP blocking
          alert(
            "⚠️ Cookie Blocking Detected\n\n" +
              "Your browser is blocking authentication cookies needed for this app to work.\n\n" +
              "macOS Safari:\n" +
              "1. Safari → Settings → Privacy tab\n" +
              "2. Uncheck 'Prevent cross-site tracking'\n" +
              "3. Quit Safari completely (⌘Q)\n" +
              "4. Reopen Safari and log in again\n\n" +
              "iOS Safari:\n" +
              "1. Settings → Safari\n" +
              "2. Turn OFF 'Prevent Cross-Site Tracking'\n" +
              "3. Turn OFF 'Block All Cookies'\n" +
              "4. Force quit Safari and reopen\n" +
              "5. Log in again\n\n" +
              "iOS Chrome:\n" +
              "Settings → Content Settings → Disable 'Block Third-party Cookies'"
          );
          navigate("/login");
          return;
        }
      } catch (error) {
        console.error("Cookie test failed:", error);
        // Continue to search page even if test fails - might be network issue
      }

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
