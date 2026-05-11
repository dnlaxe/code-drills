import { useTasks } from "../context/tasksContext";

export default function Navbar() {
  const { currentBranch, selectBranch, tasks, loading, error } = useTasks();

  if (loading) {
    return (
      <nav className="bg-[#F5F5F5] pt-8 border-r border-white">
        <div className="pl-8 mb-2">Loading..</div>
      </nav>
    );
  }

  if (error) {
    return (
      <nav className="bg-[#F5F5F5] pt-8 border-r border-white">
        <div className="px-8 mb-2">Server Error ㅠㅠ</div>
      </nav>
    );
  }

  return (
    <nav className="bg-[#F5F5F5] pt-8 border-r border-white">
      <div className="pl-8 mb-2 underline">Tags</div>
      <div className="w-full flex flex-col">
        {Object.entries(tasks).map(([branch, tasks]) => {
          return (
            <button
              key={branch}
              onClick={() => {
                console.log(`${branch} selected`);
                selectBranch(branch);
              }}
              className={`border-y border-[#F5F5F5] ${currentBranch === branch ? "bg-[#9AE9DF] border-[#9AE9DF]" : ""} px-8 py-1 flex w-full items-center justify-between`}
            >
              <span># {branch}</span>
              <span className="ml-4">{tasks.length}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
