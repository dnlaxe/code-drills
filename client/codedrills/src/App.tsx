import { BrowserRouter, Route, Routes } from "react-router-dom";
import Practice from "./features/practice/Practice";
import NotFound from "./features/notFound/NotFound";
import Navbar from "./components/Navbar";
import { TasksProvider } from "./context/tasksProvider";

function AppLayout() {
  return (
    <>
      <div className="flex min-h-screen">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/practice" element={<Practice />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <TasksProvider>
        <AppLayout />
      </TasksProvider>
    </BrowserRouter>
  );
}

export default App;
