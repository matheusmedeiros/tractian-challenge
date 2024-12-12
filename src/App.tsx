import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// COMPONENTS
import Panel from "./components/Panel";
import Header from "./components/Header";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000, // garbage collection
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <Panel />
      </div>
    </QueryClientProvider>
  );
}

export default App;
