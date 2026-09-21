"use client";

import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useId, useState } from "react";
import { canMove, columns, moveTask, roles, visibleTasks, type Column, type Role, type Task } from "@/lib/board";
import { DemoFrame } from "./DemoFrame";

const me = { name: "Asha", team: "SEO" };

const initialTasks: Task[] = [
  { id: "t1", title: "Keyword map for the spring campaign", column: "todo", assignee: "Asha", team: "SEO" },
  { id: "t2", title: "Fix broken internal links", column: "doing", assignee: "Asha", team: "SEO" },
  { id: "t3", title: "Meta descriptions, product pages", column: "review", assignee: "Meera", team: "SEO" },
  { id: "t4", title: "Landing page build", column: "doing", assignee: "Ravi", team: "Web" },
  { id: "t5", title: "Checkout form validation", column: "todo", assignee: "Ravi", team: "Web" },
  { id: "t6", title: "Banner set for the homepage", column: "review", assignee: "Kabir", team: "Design" },
  { id: "t7", title: "Monthly ranking report", column: "done", assignee: "Meera", team: "SEO" },
];

const order: Column[] = ["todo", "doing", "review", "done"];
const labelOf = (column: Column) => columns.find((c) => c.id === column)?.label ?? column;

type Props = { title: string; intro?: string; layout?: "wide" | "compact" };

const startMessage = "You are Asha on the SEO team, viewing as a manager. Switch role to see what others can see.";

export function BoardDemo({ title, intro, layout = "wide" }: Props) {
  const [tasks, setTasks] = useState(initialTasks);
  const [role, setRole] = useState<Role>("manager");
  const [message, setMessage] = useState(startMessage);
  const groupName = useId();
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 8 } }),
  );

  const shown = visibleTasks(tasks, role, me);

  function tryMove(id: string, to: Column) {
    const task = tasks.find((t) => t.id === id);
    if (!task || task.column === to) return;
    if (!canMove(role, task.column, to)) {
      setMessage(`Only a manager or admin can approve work or reopen it. Switch role to move “${task.title}”.`);
      return;
    }
    setTasks((current) => moveTask(current, id, to));
    setMessage(`Moved “${task.title}” to ${labelOf(to)}.`);
  }

  function onDragEnd(event: DragEndEvent) {
    if (event.over) tryMove(String(event.active.id), event.over.id as Column);
  }

  function reset() {
    setTasks(initialTasks);
    setRole("manager");
    setMessage(startMessage);
  }

  return (
    <DemoFrame title={title} intro={intro} onReset={reset}>
      <fieldset className="mb-5">
        <legend className="mb-2 text-[0.9rem] font-medium">View the board as</legend>
        <div className="flex flex-wrap gap-2">
          {roles.map((option) => (
            <label
              key={option.id}
              className={`flex min-h-11 cursor-pointer items-center rounded-md border px-4 text-[0.95rem] has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
                role === option.id ? "border-ink bg-accent font-semibold text-accent-ink" : "border-rule hover:border-ink"
              }`}
            >
              <input
                type="radio"
                name={groupName}
                value={option.id}
                checked={role === option.id}
                onChange={() => {
                  setRole(option.id);
                  setMessage(`${option.label}: ${option.sees.toLowerCase()}.`);
                }}
                className="sr-only"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <div className={`grid grid-cols-2 gap-3 ${layout === "wide" ? "lg:grid-cols-4" : ""}`}>
          {columns.map((column) => (
            <BoardColumn key={column.id} id={column.id} label={column.label} count={shown.filter((t) => t.column === column.id).length}>
              {shown
                .filter((task) => task.column === column.id)
                .map((task) => (
                  <Card key={task.id} task={task} onMove={tryMove} />
                ))}
            </BoardColumn>
          ))}
        </div>
      </DndContext>

      <p role="status" aria-live="polite" className="mt-4 min-h-[3rem] text-[0.95rem] text-muted">
        {message}
      </p>
    </DemoFrame>
  );
}

function BoardColumn({ id, label, count, children }: { id: Column; label: string; count: number; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={`min-h-40 rounded-md border p-2 transition-colors ${isOver ? "border-ink bg-accent/25" : "border-rule bg-sunken"}`}
    >
      <p className="mb-2 flex items-baseline justify-between px-1 text-[0.85rem] font-semibold">
        <span>{label}</span>
        <span className="font-mono text-muted">{count}</span>
      </p>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function Card({ task, onMove }: { task: Task; onMove: (id: string, to: Column) => void }) {
  const { setNodeRef, listeners, transform, isDragging } = useDraggable({ id: task.id });
  const index = order.indexOf(task.column);
  const previous = order[index - 1];
  const next = order[index + 1];

  return (
    <li
      ref={setNodeRef}
      {...listeners}
      style={transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined}
      className={`relative cursor-grab touch-manipulation select-none rounded border border-rule border-l-4 border-l-accent bg-surface p-2.5 text-[0.9rem] leading-snug active:cursor-grabbing ${
        isDragging ? "z-10 shadow-[0_12px_24px_rgba(0,0,0,0.25)]" : ""
      }`}
    >
      <p className="font-medium">{task.title}</p>
      <p className="mt-1 text-[0.8rem] text-muted">
        {task.assignee}, {task.team}
      </p>
      <div className="mt-2 flex gap-1.5">
        {previous ? (
          <button
            type="button"
            onClick={() => onMove(task.id, previous)}
            aria-label={`Move “${task.title}” back to ${labelOf(previous)}`}
            className="min-h-9 rounded border border-rule px-2 text-[0.8rem] hover:border-ink hover:bg-accent hover:text-accent-ink"
          >
            Back
          </button>
        ) : null}
        {next ? (
          <button
            type="button"
            onClick={() => onMove(task.id, next)}
            aria-label={`Move “${task.title}” forward to ${labelOf(next)}`}
            className="min-h-9 rounded border border-rule px-2 text-[0.8rem] hover:border-ink hover:bg-accent hover:text-accent-ink"
          >
            Forward
          </button>
        ) : null}
      </div>
    </li>
  );
}
