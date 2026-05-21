'use client';

import { useMemo } from 'react';
import { UploadCloud, FileText } from 'lucide-react';

interface FileUploadProps {
  label: string;
  file?: File | null;
  accept?: string;
  onChange: (file: File | null) => void;
  hint?: string;
}

export function FileUpload({ label, file, accept, onChange, hint }: FileUploadProps) {
  const fileLabel = useMemo(() => {
    if (!file) return 'Choose file';
    return file.name;
  }, [file]);

  return (
    <div className="space-y-3 rounded-[1.75rem] border border-slate-200 bg-slate-50/80 p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">{label}</p>
          {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
        </div>
        <UploadCloud size={20} className="text-slate-500" />
      </div>

      <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-4 text-sm text-slate-600 transition hover:border-sky-400 hover:bg-slate-50">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-700">
            <FileText size={18} />
          </span>
          <div>
            <p className="font-semibold text-slate-900">{fileLabel}</p>
            <p className="text-xs text-slate-500">{accept ? `Accepted: ${accept}` : 'Upload a file to preview'}</p>
          </div>
        </div>
        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={(event) => {
            onChange(event.target.files?.[0] ?? null);
          }}
        />
      </label>
    </div>
  );
}
