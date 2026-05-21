'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { HeroSection } from '@/components/forms/hero-section';
import { FormLayout } from '@/components/forms/form-layout';
import { FormCard } from '@/components/forms/form-card';
import { SuccessModal } from '@/components/forms/success-modal';
import { ProgressBar } from '@/components/forms/progress-bar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { submitAnalyticsAvenueForm } from '@/lib/analyticsAvenueForms';

const ratingField = () =>
  z.preprocess((value) => Number(value), z.number().min(0).max(10));

const monthlyReviewSchema = z.object({
  employeeName: z.string().min(2, 'Enter employee name'),
  employeeId: z.string().min(2, 'Enter employee ID'),
  department: z.string().min(2, 'Enter department'),
  designation: z.string().min(2, 'Enter designation'),
  reportingManager: z.string().min(2, 'Enter reporting manager'),
  reviewMonth: z.string().min(1, 'Enter review month'),
  taskCompletion: ratingField(),
  productivity: ratingField(),
  communication: ratingField(),
  teamCollaboration: ratingField(),
  problemSolving: ratingField(),
  attendance: ratingField(),
  achievements: z.string().min(10, 'Share achievements'),
  challenges: z.string().min(10, 'Share challenges'),
  learnings: z.string().min(10, 'Share learnings'),
  goals: z.string().min(10, 'Share goals'),
  supportNeeded: z.string().min(10, 'Share support needed'),
  workEnvironment: ratingField(),
  managerSupport: ratingField(),
  teamSupport: ratingField(),
  stressLevel: ratingField(),
  workLifeBalance: ratingField(),
  suggestions: z.string().min(10, 'Share suggestions'),
  anonymousFeedback: z.string().min(10, 'Share anonymous feedback'),
  additionalComments: z.string().min(10, 'Share additional comments'),
});

type MonthlyReviewFormValues = z.infer<typeof monthlyReviewSchema>;

const ratingCards: Array<{ name: keyof MonthlyReviewFormValues; label: string }> = [
  { name: 'taskCompletion', label: 'Task Completion' },
  { name: 'productivity', label: 'Productivity' },
  { name: 'communication', label: 'Communication' },
  { name: 'teamCollaboration', label: 'Team Collaboration' },
  { name: 'problemSolving', label: 'Problem Solving' },
  { name: 'attendance', label: 'Attendance' },
];

const workplaceRatings: Array<{ name: keyof MonthlyReviewFormValues; label: string }> = [
  { name: 'workEnvironment', label: 'Work Environment' },
  { name: 'managerSupport', label: 'Manager Support' },
  { name: 'teamSupport', label: 'Team Support' },
  { name: 'stressLevel', label: 'Stress Level' },
  { name: 'workLifeBalance', label: 'Work-Life Balance' },
];

export default function MonthlyReviewFeedbackPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<MonthlyReviewFormValues>({
    resolver: zodResolver(monthlyReviewSchema),
    defaultValues: {
      employeeName: '',
      employeeId: '',
      department: '',
      designation: '',
      reportingManager: '',
      reviewMonth: '',
      taskCompletion: 0,
      productivity: 0,
      communication: 0,
      teamCollaboration: 0,
      problemSolving: 0,
      attendance: 0,
      achievements: '',
      challenges: '',
      learnings: '',
      goals: '',
      supportNeeded: '',
      workEnvironment: 0,
      managerSupport: 0,
      teamSupport: 0,
      stressLevel: 0,
      workLifeBalance: 0,
      suggestions: '',
      anonymousFeedback: '',
      additionalComments: '',
    },
  });

  const values = watch();
  const progress = useMemo(() => {
    const requiredFields = [
      values.employeeName,
      values.employeeId,
      values.department,
      values.designation,
      values.reportingManager,
      values.reviewMonth,
      values.achievements,
      values.challenges,
      values.learnings,
      values.goals,
      values.supportNeeded,
      values.suggestions,
      values.anonymousFeedback,
      values.additionalComments,
    ];

    const ratings = [
      values.taskCompletion,
      values.productivity,
      values.communication,
      values.teamCollaboration,
      values.problemSolving,
      values.attendance,
      values.workEnvironment,
      values.managerSupport,
      values.teamSupport,
      values.stressLevel,
      values.workLifeBalance,
    ];

    const filledText = requiredFields.filter(Boolean).length;
    const filledRatings = ratings.filter((value) => value > 0).length;
    return Math.round(((filledText + filledRatings) / 25) * 100);
  }, [values]);

  async function onSubmit(values: MonthlyReviewFormValues) {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      await submitAnalyticsAvenueForm('monthly-review', {
        employeeName: values.employeeName,
        employeeId: values.employeeId,
        department: values.department,
        designation: values.designation,
        reportingManager: values.reportingManager,
        reviewMonth: values.reviewMonth,
        taskCompletion: values.taskCompletion,
        productivity: values.productivity,
        communication: values.communication,
        teamCollaboration: values.teamCollaboration,
        problemSolving: values.problemSolving,
        attendance: values.attendance,
        workEnvironment: values.workEnvironment,
        managerSupport: values.managerSupport,
        teamSupport: values.teamSupport,
        stressLevel: values.stressLevel,
        workLifeBalance: values.workLifeBalance,
        achievements: values.achievements,
        challenges: values.challenges,
        learnings: values.learnings,
        goals: values.goals,
        supportNeeded: values.supportNeeded,
        suggestions: values.suggestions,
        anonymousFeedback: values.anonymousFeedback,
        additionalComments: values.additionalComments,
      });
      setSubmitted(true);
      toast.success('Monthly review submitted successfully.');
      reset();
    } catch (error) {
      console.error(error);
      toast.error('Unable to submit monthly review. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormLayout>
      <HeroSection
        title="Monthly Review Feedback Form"
        description="A modern HR dashboard experience for performance reviews and workplace sentiment."
        details="Capture employee performance, self review notes, productivity ratings, and anonymous insights in one clean workflow."
      />

      <div className="grid gap-8 lg:grid-cols-[0.7fr_0.35fr]">
        <div className="space-y-6">
          <FormCard title="Employee details" subtitle="Enter the core employee information for the review month.">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700">
                <span>Employee Name <span className="text-rose-500">*</span></span>
                <Input placeholder="Nikhil Sharma" {...register('employeeName')} />
                {errors.employeeName ? <p className="text-xs text-rose-500">{errors.employeeName.message}</p> : null}
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Employee ID <span className="text-rose-500">*</span></span>
                <Input placeholder="AA-2301" {...register('employeeId')} />
                {errors.employeeId ? <p className="text-xs text-rose-500">{errors.employeeId.message}</p> : null}
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Department <span className="text-rose-500">*</span></span>
                <Input placeholder="Analytics" {...register('department')} />
                {errors.department ? <p className="text-xs text-rose-500">{errors.department.message}</p> : null}
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Designation <span className="text-rose-500">*</span></span>
                <Input placeholder="Data Analyst" {...register('designation')} />
                {errors.designation ? <p className="text-xs text-rose-500">{errors.designation.message}</p> : null}
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Reporting Manager <span className="text-rose-500">*</span></span>
                <Input placeholder="Priya Singh" {...register('reportingManager')} />
                {errors.reportingManager ? <p className="text-xs text-rose-500">{errors.reportingManager.message}</p> : null}
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Review Month <span className="text-rose-500">*</span></span>
                <Input placeholder="May 2025" {...register('reviewMonth')} />
                {errors.reviewMonth ? <p className="text-xs text-rose-500">{errors.reviewMonth.message}</p> : null}
              </label>
            </div>
          </FormCard>

          <FormCard title="Performance ratings" subtitle="Rate the employee across key performance dimensions.">
            <div className="grid gap-6">
              {ratingCards.map((item) => (
                <div key={item.name} className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">{item.label} <span className="text-rose-500">*</span></p>
                    <span className="text-sm font-semibold text-sky-600">{values[item.name] ?? 0}/10</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    step={1}
                    {...register(item.name)}
                    className="w-full accent-sky-600"
                  />
                </div>
              ))}
            </div>
          </FormCard>

          <FormCard title="Self review" subtitle="Capture achievements, challenges, and goals from the employee perspective.">
            <div className="grid gap-6">
              {['achievements', 'challenges', 'learnings', 'goals', 'supportNeeded'].map((field) => (
                <label key={field} className="space-y-2 text-sm text-slate-700">
                  <span>{field === 'achievements' ? 'Achievements' : field === 'challenges' ? 'Challenges' : field === 'learnings' ? 'Learnings' : field === 'goals' ? 'Goals' : 'Support Needed'} <span className="text-rose-500">*</span></span>
                  <Textarea placeholder="Add your response" {...register(field as keyof MonthlyReviewFormValues)} />
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {errors[field as keyof MonthlyReviewFormValues] ? <p className="text-xs text-rose-500">{(errors[field as keyof MonthlyReviewFormValues] as any).message}</p> : null}
                </label>
              ))}
            </div>
          </FormCard>

          <div className="space-y-4 hidden lg:block">
            <ProgressBar value={progress} max={100} />
            <Button type="button" variant="primary" onClick={handleSubmit(onSubmit)} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Monthly Review'}
            </Button>
          </div>
        </div>

        <aside className="space-y-6">
          <FormCard title="Workplace experience" subtitle="Evaluate manager and team support along with work-life balance.">
            <div className="grid gap-6">
              {workplaceRatings.map((item) => (
                <div key={item.name} className="space-y-3 rounded-3xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">{item.label} <span className="text-rose-500">*</span></p>
                    <span className="text-sm text-slate-600">{values[item.name] ?? 0}/10</span>
                  </div>
                  <input type="range" min={0} max={10} step={1} {...register(item.name)} className="w-full accent-sky-600" />
                </div>
              ))}
            </div>
          </FormCard>

          <FormCard title="Final feedback" subtitle="Provide closing comments and anonymous suggestions.">
            <div className="space-y-6">
              <label className="space-y-2 text-sm text-slate-700">
                <span>Suggestions <span className="text-rose-500">*</span></span>
                <Textarea placeholder="Suggest improvements or next steps" {...register('suggestions')} />
                {errors.suggestions ? <p className="text-xs text-rose-500">{errors.suggestions.message}</p> : null}
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Anonymous Feedback <span className="text-rose-500">*</span></span>
                <Textarea placeholder="Share candid feedback anonymously" {...register('anonymousFeedback')} />
                {errors.anonymousFeedback ? <p className="text-xs text-rose-500">{errors.anonymousFeedback.message}</p> : null}
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Additional Comments <span className="text-rose-500">*</span></span>
                <Textarea placeholder="Additional remarks for leadership" {...register('additionalComments')} />
                {errors.additionalComments ? <p className="text-xs text-rose-500">{errors.additionalComments.message}</p> : null}
              </label>
            </div>
          </FormCard>

          <div className="space-y-4 lg:hidden">
            <ProgressBar value={progress} max={100} />
            <Button type="button" variant="primary" onClick={handleSubmit(onSubmit)} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Monthly Review'}
            </Button>
          </div>
        </aside>
      </div>

      <SuccessModal
        open={submitted}
        onClose={() => setSubmitted(false)}
        title="Review submitted"
        message="The monthly review has been sent to your Google Apps Script endpoint successfully."
      />
    </FormLayout>
  );
}
