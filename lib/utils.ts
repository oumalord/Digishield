import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function exportToCSV<T extends Record<string, any>>(
  rows: T[],
  options?: { filename?: string; columns?: Array<keyof T> | string[] }
) {
  if (!rows || rows.length === 0) {
    if (typeof window !== "undefined") alert("No data to export")
    return
  }

  const headers: string[] = options?.columns
    ? (options.columns as string[])
    : Array.from(
        rows.reduce<Set<string>>((set, row) => {
          Object.keys(row).forEach((k) => set.add(k))
          return set
        }, new Set<string>()).values()
      )

  const escapeCell = (value: any): string => {
    if (value === null || value === undefined) return ""
    let cell = Array.isArray(value) ? value.join("; ") : String(value)
    cell = cell.replace(/"/g, '""')
    if (/[",\n]/.test(cell)) cell = `"${cell}"`
    return cell
  }

  const lines: string[] = []
  lines.push(headers.join(","))
  for (const row of rows) {
    const line = headers.map((h) => escapeCell((row as any)[h])).join(",")
    lines.push(line)
  }

  const csv = lines.join("\n")
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = (options?.filename || "export") + ".csv"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
