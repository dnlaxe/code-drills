import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./features/home/HomePage";
import Practice from "./features/practice/Practice";
import NotFound from "./features/notFound/NotFound";
import Navbar from "./components/Navbar";

function AppLayout() {
  return (
    <>
      <div className="flex min-h-screen">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
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
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
