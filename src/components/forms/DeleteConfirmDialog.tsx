'use client';

export function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4" role="presentation">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-600">Delete form</p>
        <h3 className="mt-3 text-2xl font-semibold text-slate-900">Are you sure you want to delete this form?</h3>
        <p className="mt-3 text-sm text-slate-600">This action cannot be undone. The form will be removed from the public directory immediately.</p>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
          <button
            type="button"
            onClick={async () => {
              await onConfirm();
            }}
            className="rounded-full bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
