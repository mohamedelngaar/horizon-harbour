import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

export function useFetchJobs() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: "jobs",
    queryFn: async () => {
      // Simulate a delay of 3 seconds
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await fetch("http://localhost:8000/jobs/");
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      return response.json();
    },
  });
}
