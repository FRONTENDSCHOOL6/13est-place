import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";
import Spinner from "./components/Spinner";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Suspense fallback={<Spinner />}>
            <RouterProvider router={router} />
          </Suspense>
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
