import type { ResultPayload } from "../types/types";

const API_BASE_URL = "http://localhost:3000";

async function getAllTasks() {
  const res = await fetch(`${API_BASE_URL}/api/tasks`);

  if (!res.ok) {
    throw new Error(`Fetching tasks failed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  console.log(`API: ${data}`);

  return data;
}

async function sendResult(result: ResultPayload) {
  console.log(`RESULT: ${result}`);

  const res = await fetch(`${API_BASE_URL}/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result),
  });

  if (!res.ok) {
    throw new Error("Seinding result failure");
  }

  const complete = await res.json();

  console.log(`BACKEND SAYS: ${complete.message}`);

  return complete;
}

export { getAllTasks, sendResult };
