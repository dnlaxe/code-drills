import { useTasks } from "../context/tasksContext";

export default function Navbar() {
  const { currentBranch, setCurrentBranch, tasks } = useTasks();

  return (
    <nav className="flex flex-col border-r border-slate-200 bg-slate-50 pt-8">
      {Object.entries(tasks).map(([branch, tasks]) => {
        return (
          <button
            key={branch}
            onClick={() => {
              console.log(`${branch} selected`);
              setCurrentBranch(branch);
            }}
            className={`border-y border-slate-50 ${currentBranch === branch ? "bg-slate-100 border-y border-slate-200" : ""} px-8 py-1`}
          >
            {branch}- {tasks.length}
          </button>
        );
      })}
    </nav>
  );
}
