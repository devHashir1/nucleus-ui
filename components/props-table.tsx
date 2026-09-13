import type { PropRow } from "@/lib/registry";

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border/70">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border/70 bg-muted/40 text-xs tracking-wide text-muted-foreground uppercase">
            <th className="px-4 py-3 font-medium">Prop</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="hidden px-4 py-3 font-medium sm:table-cell">Default</th>
            <th className="px-4 py-3 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-b border-border/50 last:border-0">
              <td className="px-4 py-3 align-top">
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] font-medium text-primary">
                  {row.name}
                </code>
              </td>
              <td className="px-4 py-3 align-top font-mono text-xs text-muted-foreground">
                {row.type}
              </td>
              <td className="hidden px-4 py-3 align-top font-mono text-xs text-muted-foreground sm:table-cell">
                {row.defaultValue ?? "—"}
              </td>
              <td className="px-4 py-3 align-top text-muted-foreground">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
