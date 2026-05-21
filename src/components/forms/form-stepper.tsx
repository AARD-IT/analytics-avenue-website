'use client';

interface Step {
  title: string;
  active: boolean;
}

interface FormStepperProps {
  steps: Step[];
}

export function FormStepper({ steps }: FormStepperProps) {
  return (
    <div className="grid gap-3 rounded-[1.75rem] bg-slate-50/80 p-4 shadow-sm border border-slate-200">
      {steps.map((step, index) => (
        <div key={step.title} className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-2xl border text-sm font-semibold ${step.active ? 'border-sky-500 bg-sky-500 text-white' : 'border-slate-200 bg-white text-slate-500'}`}>
            {index + 1}
          </div>
          <div>
            <p className={`text-sm font-semibold ${step.active ? 'text-slate-900' : 'text-slate-500'}`}>{step.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
