interface StateFilterProps {
  states: string[];
  selected: string;
  onChange: (state: string) => void;
}

export default function StateFilter({ states, selected, onChange }: StateFilterProps) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-border bg-hover px-3 py-2 text-sm text-foreground"
    >
      <option value="">All States</option>
      {states.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
