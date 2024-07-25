import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

export function useFetchJobApplications() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: "jobs",
    queryFn: async () => {
      // Simulate a delay of 3 seconds
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await fetch("http://localhost:8000/jobapps");
      if (!response.ok) {
        throw new Error("Failed to fetch job applications");
      }
      return response.json();
    },
  });
}
