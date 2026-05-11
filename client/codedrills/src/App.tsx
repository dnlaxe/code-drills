import { BrowserRouter, Route, Routes } from "react-router-dom";
import Practice from "./features/practice/Practice";
import Navbar from "./components/Navbar";
import { TasksProvider } from "./context/tasksProvider";
import { useTasks } from "./context/tasksContext";

function AppLayout() {
  const { currentBranch } = useTasks();

  return (
    <div className="flex min-h-screen">
      <Navbar />

      <main className="flex-1 bg-[#EEEEEE]">
        <Routes>
          <Route path="*" element={<Practice key={currentBranch} />} />
        </Routes>
      </main>
    </div>
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
