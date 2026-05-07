import { useTasks } from "../context/tasksContext";

export default function Navbar() {
  const { currentBranch, setCurrentBranch, tasks } = useTasks();

  return (
    <nav className="bg-[#E8EDF6] pt-8 border-r">
      <div className="w-full flex flex-col">
        {Object.entries(tasks).map(([branch, tasks]) => {
          return (
            <button
              key={branch}
              onClick={() => {
                console.log(`${branch} selected`);
                setCurrentBranch(branch);
              }}
              className={`border-y border-[#E8EDF6] ${currentBranch === branch ? "bg-[#B8E7FF] border-[#B8E7FF]" : ""} px-8 py-1 font-[400] flex w-full items-center justify-between`}
            >
              <span>{branch}</span>
              <span className="ml-4">{tasks.length}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
