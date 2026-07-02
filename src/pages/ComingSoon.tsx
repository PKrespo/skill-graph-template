import { Construction } from "lucide-react";

interface ComingSoonProps {
  title?: string;
}

export function ComingSoon({ title = "This section" }: ComingSoonProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-info/10">
        <Construction className="h-8 w-8 text-info" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-text">{title}</h2>
        <p className="mt-2 text-sm text-text-dim">
          This section is part of the CoE Monitor template shell and will be
          available in a future release.
        </p>
      </div>
    </div>
  );
}
