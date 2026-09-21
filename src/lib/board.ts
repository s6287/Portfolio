/** Pure rules behind the task-board demo: who sees which task, and who may move it where. */

export type Role = "admin" | "manager" | "executive" | "specialist";
export type Column = "todo" | "doing" | "review" | "done";

export type Task = {
  id: string;
  title: string;
  column: Column;
  assignee: string;
  team: string;
};

export const columns: { id: Column; label: string }[] = [
  { id: "todo", label: "To do" },
  { id: "doing", label: "In progress" },
  { id: "review", label: "In review" },
  { id: "done", label: "Approved" },
];

export const roles: { id: Role; label: string; sees: string }[] = [
  { id: "specialist", label: "Specialist", sees: "Only tasks assigned to you" },
  { id: "executive", label: "Executive", sees: "Every task in your team" },
  { id: "manager", label: "Manager", sees: "Every team, and can approve work" },
  { id: "admin", label: "Admin", sees: "Everything" },
];

/** Row-level visibility, the same idea the real product enforces in the database. */
export function visibleTasks(tasks: Task[], role: Role, me: { name: string; team: string }): Task[] {
  if (role === "admin" || role === "manager") return tasks;
  if (role === "executive") return tasks.filter((t) => t.team === me.team);
  return tasks.filter((t) => t.assignee === me.name);
}

/** Anyone can progress work up to review. Only a manager or admin can approve it. */
export function canMove(role: Role, from: Column, to: Column): boolean {
  if (from === to) return true;
  if (to === "done" || from === "done") return role === "manager" || role === "admin";
  return true;
}

export function moveTask(tasks: Task[], id: string, to: Column): Task[] {
  return tasks.map((task) => (task.id === id ? { ...task, column: to } : task));
}
