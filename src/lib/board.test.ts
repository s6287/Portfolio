import { describe, expect, it } from "vitest";
import { canMove, moveTask, visibleTasks, type Task } from "./board";

const tasks: Task[] = [
  { id: "1", title: "Keyword map", column: "todo", assignee: "Asha", team: "SEO" },
  { id: "2", title: "Landing page", column: "doing", assignee: "Ravi", team: "Web" },
  { id: "3", title: "Meta audit", column: "review", assignee: "Meera", team: "SEO" },
];

describe("visibleTasks", () => {
  it("shows a specialist only their own tasks", () => {
    expect(visibleTasks(tasks, "specialist", { name: "Asha", team: "SEO" }).map((t) => t.id)).toEqual(["1"]);
  });
  it("shows an executive their whole team", () => {
    expect(visibleTasks(tasks, "executive", { name: "Asha", team: "SEO" }).map((t) => t.id)).toEqual(["1", "3"]);
  });
  it("shows managers and admins everything", () => {
    expect(visibleTasks(tasks, "manager", { name: "Asha", team: "SEO" })).toHaveLength(3);
    expect(visibleTasks(tasks, "admin", { name: "Asha", team: "SEO" })).toHaveLength(3);
  });
});

describe("canMove", () => {
  it("lets anyone progress work up to review", () => {
    expect(canMove("specialist", "todo", "doing")).toBe(true);
    expect(canMove("specialist", "doing", "review")).toBe(true);
  });
  it("lets only managers and admins approve into done", () => {
    expect(canMove("specialist", "review", "done")).toBe(false);
    expect(canMove("executive", "review", "done")).toBe(false);
    expect(canMove("manager", "review", "done")).toBe(true);
    expect(canMove("admin", "review", "done")).toBe(true);
  });
  it("treats staying in place as allowed", () => {
    expect(canMove("specialist", "done", "done")).toBe(true);
  });
});

describe("moveTask", () => {
  it("returns a new array and leaves the input untouched", () => {
    const next = moveTask(tasks, "1", "doing");
    expect(next).not.toBe(tasks);
    expect(next.find((t) => t.id === "1")?.column).toBe("doing");
    expect(tasks.find((t) => t.id === "1")?.column).toBe("todo");
  });
  it("ignores unknown ids", () => {
    expect(moveTask(tasks, "99", "done")).toEqual(tasks);
  });
});
