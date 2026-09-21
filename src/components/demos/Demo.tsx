import type { DemoId } from "@/content/types";
import { BoardDemo } from "./BoardDemo";
import { DedupDemo } from "./DedupDemo";
import { EditionsDemo } from "./EditionsDemo";
import { ImportDemo } from "./ImportDemo";

const demos = { board: BoardDemo, dedup: DedupDemo, import: ImportDemo, editions: EditionsDemo } as const;

export function Demo({ id, title, intro }: { id: DemoId; title: string; intro?: string }) {
  const Component = demos[id];
  return <Component title={title} intro={intro} />;
}
