import { useTasks } from "../context/tasksContext";

export default function Navbar() {
  const { currentBranch, setCurrentBranch, tasks } = useTasks();

  return (
    <nav className="flex flex-col border-r w-40">
      {Object.entries(tasks).map(([branch, tasks]) => {
        return (
          <button
            key={branch}
            onClick={() => {
              console.log(`${branch} selected`);
              setCurrentBranch(branch);
            }}
            className={`${currentBranch === branch ? "bg-blue-200" : ""}`}
          >
            {branch}- {tasks.length}
          </button>
        );
      })}
    </nav>
  );
}
