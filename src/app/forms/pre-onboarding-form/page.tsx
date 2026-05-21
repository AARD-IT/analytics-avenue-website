'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { HeroSection } from '@/components/forms/hero-section';
import { FormLayout } from '@/components/forms/form-layout';
import { FormCard } from '@/components/forms/form-card';
import { SectionHeader } from '@/components/forms/section-header';
import { SuccessModal } from '@/components/forms/success-modal';
import { ProgressBar } from '@/components/forms/progress-bar';
import { FormStepper } from '@/components/forms/form-stepper';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { submitAnalyticsAvenueForm } from '@/lib/analyticsAvenueForms';

const StepList = [
  { title: 'Submit Application', active: true },
  { title: 'Profile Review', active: false },
  { title: 'Coordinator Screening', active: false },
  { title: 'Final Confirmation', active: false },
];

const preBookingSchema = z.object({
  email: z.string().email('Enter a valid email'),
  fullName: z.string().min(2, 'Enter your full name'),
  phone: z.string().min(6, 'Enter a valid phone number'),
  city: z.string().min(2, 'Enter a valid city'),
  status: z.enum(['Student', 'Fresher', 'Unemployed', 'Working Professional']),
  collegeName: z.string().optional(),
  companyName: z.string().optional(),
  coordinatorName: z.string().min(1, 'Select a coordinator'),
  previousProgram: z.enum(['Yes', 'No']),
  profile: z.string().min(30, 'Please provide at least 30 characters'),
});

type PreBookingFormValues = z.infer<typeof preBookingSchema>;

export default function PreOnboardingFormPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<PreBookingFormValues>({
    resolver: zodResolver(preBookingSchema),
  });

  const values = watch();
  const progress = useMemo(() => {
    const requiredValues = [
      values.email,
      values.fullName,
      values.phone,
      values.city,
      values.status,
      values.coordinatorName,
      values.previousProgram,
      values.profile,
    ];
    const filled = requiredValues.filter(Boolean).length;
    return Math.round((filled / requiredValues.length) * 100);
  }, [values]);

  async function onSubmit(values: PreBookingFormValues) {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      await submitAnalyticsAvenueForm('pre-onboarding', {
        emailAddress: values.email,
        fullName: values.fullName,
        phoneNumber: values.phone,
        city: values.city,
        status: values.status,
        collegeName: values.collegeName || '',
        companyName: values.companyName || '',
        coordinatorName: values.coordinatorName,
        completedOtherInstituteProgram: values.previousProgram,
        profileSummary: values.profile,
      });
      setSubmitted(true);
      toast.success('Your application was submitted successfully.');
      reset();
    } catch (error) {
      console.error(error);
      toast.error('Unable to send your submission. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormLayout>
      <HeroSection
        title="Candidate Onboarding — Pre-application"
        description="Complete this form to submit your candidate application for onboarding and review. Provide accurate contact details and a brief professional summary."
        details="Secure candidate intake for coordinated onboarding and timely follow-up."
      />
      <div className="grid gap-8 xl:grid-cols-[0.8fr_0.5fr]">
        <div className="space-y-6">
          <FormCard title="Candidate Details" subtitle="Provide core contact and location details.">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700">
                <span>Email Address <span className="text-rose-500">*</span></span>
                <Input placeholder="candidate@example.com" {...register('email')} />
                {errors.email ? <p className="text-xs text-rose-500">{errors.email.message}</p> : null}
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Full Name <span className="text-rose-500">*</span></span>
                <Input placeholder="Aisha Khan" {...register('fullName')} />
                {errors.fullName ? <p className="text-xs text-rose-500">{errors.fullName.message}</p> : null}
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Phone Number <span className="text-rose-500">*</span></span>
                <Input placeholder="+1 234 567 890" {...register('phone')} />
                {errors.phone ? <p className="text-xs text-rose-500">{errors.phone.message}</p> : null}
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>City <span className="text-rose-500">*</span></span>
                <Input placeholder="London" {...register('city')} />
                {errors.city ? <p className="text-xs text-rose-500">{errors.city.message}</p> : null}
              </label>
            </div>
          </FormCard>

          <FormCard title="Status & Program" subtitle="Select your current status and program details.">
            <div className="grid gap-6">
              <div className="grid gap-2 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Status <span className="text-rose-500">*</span></p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {['Student', 'Fresher', 'Unemployed', 'Working Professional'].map((status) => (
                    <label key={status} className="inline-flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 transition hover:border-sky-300">
                      <input type="radio" value={status} {...register('status')} className="h-4 w-4 accent-sky-600" />
                      {status}
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-700">
                  <span>College Name</span>
                  <Input placeholder="College name (if student)" {...register('collegeName')} />
                </label>
                <label className="space-y-2 text-sm text-slate-700">
                  <span>Company Name</span>
                  <Input placeholder="Company name (if working)" {...register('companyName')} />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-700">
                  <span>Coordinator Name <span className="text-rose-500">*</span></span>
                  <Select {...register('coordinatorName')}>
                    <option value="">Select coordinator</option>
                    <option value="Spoke directly with Subu">Spoke directly with Subu</option>
                    <option value="Harsha">Harsha</option>
                    <option value="Kumar">Kumar</option>
                    <option value="Samson">Samson</option>
                    <option value="Mithun">Mithun</option>
                    <option value="Sanjay">Sanjay</option>
                    <option value="Faizan">Faizan</option>
                    <option value="Thilotheha">Thilotheha</option>
                    <option value="Gayathri">Gayathri</option>
                  </Select>
                  {errors.coordinatorName ? <p className="text-xs text-rose-500">{errors.coordinatorName.message}</p> : null}
                </label>
                <label className="space-y-2 text-sm text-slate-700">
                  <span>Completed data analytics program from other institute?</span>
                  <div className="flex flex-wrap gap-3">
                    {['Yes', 'No'].map((option) => (
                      <label key={option} className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-sky-300">
                        <input type="radio" value={option} {...register('previousProgram')} className="h-4 w-4 accent-sky-600" />
                        {option}
                      </label>
                    ))}
                  </div>
                </label>
              </div>
            </div>
          </FormCard>

          <FormCard title="Profile" subtitle="Provide a brief professional summary and expectations.">
            <div className="grid gap-6">
              <label className="space-y-2 text-sm text-slate-700">
                <span>Provide a brief 5-line summary of your background and expectations <span className="text-slate-500">(Use Shift + Enter to separate points)</span></span>
                <Textarea placeholder="I am a motivated candidate with ..." {...register('profile')} />
                {errors.profile ? <p className="text-xs text-rose-500">{errors.profile.message}</p> : null}
              </label>
            </div>
          </FormCard>

          <div className="space-y-4">
            <Button type="button" variant="primary" onClick={handleSubmit(onSubmit)} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </div>

        <aside className="space-y-6">
          <FormCard title="Application flow" subtitle="Your candidate onboarding checklist.">
            <FormStepper steps={StepList} />
            <ProgressBar value={progress} max={100} />
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">Candidate intake</p>
              <p className="mt-2 leading-6">Secure, structured intake designed for timely review and coordination.</p>
            </div>
          </FormCard>
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-sky-50 p-6 text-sm text-slate-700 shadow-sm">
            <p className="font-semibold text-slate-900">Why this form works</p>
            <ul className="mt-4 space-y-3 text-slate-600">
              <li>• Structured onboarding fields for consistent candidate review.</li>
              <li>• Secure handling of candidate information with controlled access.</li>
              <li>• Mobile-friendly submission for candidates on the go.</li>
              <li>• Faster communication and coordinated follow-up by our team.</li>
              <li>• Coordinator-driven next steps to guide candidates.</li>
            </ul>
          </div>
        </aside>
      </div>

      <SuccessModal
        open={submitted}
        onClose={() => setSubmitted(false)}
        title="Application received"
        message="Your application has been received. Our team will review your information and contact you with the next steps."
      />
    </FormLayout>
  );
}
