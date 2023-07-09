import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
/***
 * Configure bootstrap
 */
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import { QueryClientProvider, QueryClient } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./assets/index.scss";

import App from "./App.tsx";

/***
 * Configure React Query
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
    },
  },
});

/***
 * Configure Axios
 */
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.headers.post["Content-Type"] = "application/json";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <ToastContainer autoClose={3000} position="top-right" />

    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  </>
);
