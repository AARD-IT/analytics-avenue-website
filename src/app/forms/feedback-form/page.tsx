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
import { RatingStars } from '@/components/forms/rating-stars';
import { ProgressBar } from '@/components/forms/progress-bar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { submitAnalyticsAvenueForm } from '@/lib/analyticsAvenueForms';

const feedbackSchema = z.object({
  email: z.string().email('Enter a valid email'),
  sessionDate: z.string().min(1, 'Enter session date'),
  name: z.string().min(2, 'Enter your name'),
  mentorName: z.string().min(2, 'Enter mentor name'),
  mainTopics: z.string().min(10, 'Please enter topics covered'),
  detailedMainTopics: z.string().min(10, 'Please enter topics covered'),
  feedbackAboutSession: z.string().min(20, 'Share more about the session'),
  negativeActivities: z.string().min(10, 'Share three activities'),
  queries: z.string().min(10, 'Share your queries'),
  joiningMonth: z.string().min(1, 'Enter joining month'),
  contactName: z.string().min(2, 'Enter contact name'),
  amountPaid: z.string().min(1, 'Enter amount paid'),
  contactNumber: z.string().min(6, 'Enter contact number'),
  topicsCovered: z.string().min(1, 'Choose a technology covered'),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

const technologyOptions = [
  'General Intro (Mixed Topics)',
  'SQL – Data Engineering',
  'Power BI',
  'Python – Data Analytics',
  'Interview Preparation workshop',
  'Project Discussion',
  'First Intro Session',
  'Statistics / Cloud / Excel',
];

export default function FeedbackFormPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ratingSession, setRatingSession] = useState(0);
  const [ratingInternet, setRatingInternet] = useState(0);
  const [ratingClarity, setRatingClarity] = useState(0);
  const [ratingErrors, setRatingErrors] = useState({ session: false, internet: false, clarity: false });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      email: '',
      sessionDate: '',
      name: '',
      mentorName: '',
      mainTopics: '',
      detailedMainTopics: '',
      feedbackAboutSession: '',
      negativeActivities: '',
      queries: '',
      joiningMonth: '',
      contactName: '',
      amountPaid: '',
      contactNumber: '',
      topicsCovered: '',
    },
  });

  const values = watch();
  const progress = useMemo(() => {
    const completed = [
      values.email,
      values.sessionDate,
      values.name,
      values.mentorName,
      values.mainTopics,
      values.detailedMainTopics,
      values.feedbackAboutSession,
      values.negativeActivities,
      values.queries,
      values.joiningMonth,
      values.contactName,
      values.amountPaid,
      values.contactNumber,
      values.topicsCovered,
      ratingSession > 0 ? 'filled' : '',
      ratingInternet > 0 ? 'filled' : '',
      ratingClarity > 0 ? 'filled' : '',
    ].filter(Boolean).length;
    return Math.round((completed / 17) * 100);
  }, [values, ratingSession, ratingInternet, ratingClarity]);

  async function onSubmit(values: FeedbackFormValues) {
    const hasRatingError = ratingSession === 0 || ratingInternet === 0 || ratingClarity === 0;
    setRatingErrors({
      session: ratingSession === 0,
      internet: ratingInternet === 0,
      clarity: ratingClarity === 0,
    });

    if (hasRatingError) {
      return;
    }

    if (loading) {
      return;
    }

    setLoading(true);
    try {
      await submitAnalyticsAvenueForm('feedback', {
        email: values.email,
        dateOfSession: values.sessionDate,
        studentName: values.name,
        mentorName: values.mentorName,
        technologyCovered: values.topicsCovered,
        topicsCovered: values.mainTopics,
        joiningMonth: values.joiningMonth,
        detailedTopics: values.detailedMainTopics,
        sessionFeedback: values.feedbackAboutSession,
        negativeActivities: values.negativeActivities,
        queries: values.queries,
        pointOfContactName: values.contactName,
        amountPaidTillDate: values.amountPaid,
        contactNumber: values.contactNumber,
        sessionRating: ratingSession,
        internetRating: ratingInternet,
        clarityRating: ratingClarity,
      });
      setSubmitted(true);
      toast.success('Thank you! Feedback submitted successfully.');
      reset();
      setRatingSession(0);
      setRatingInternet(0);
      setRatingClarity(0);
      setRatingErrors({ session: false, internet: false, clarity: false });
    } catch (error) {
      console.error(error);
      toast.error('Unable to submit feedback. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormLayout>
      <HeroSection
        title="Mentor Feedback Form"
        description="Capture session insights, technology coverage, and actionable feedback through a premium feedback portal."
        details="Designed for modern learning programs with ratings, emoji-style sentiment, and thoughtful review prompts."
      />

      <div className="grid gap-8 xl:grid-cols-[0.7fr_0.45fr]">
        <div className="space-y-6">
          <FormCard title="Session Summary" subtitle="Share the session specifics and learning outcomes.">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700">
                <span>Email <span className="text-rose-500">*</span></span>
                <Input placeholder="student@example.com" {...register('email')} />
                {errors.email ? <p className="text-xs text-rose-500">{errors.email.message}</p> : null}
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Date of Session <span className="text-rose-500">*</span></span>
                <Input type="date" {...register('sessionDate')} />
                {errors.sessionDate ? <p className="text-xs text-rose-500">{errors.sessionDate.message}</p> : null}
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Name <span className="text-rose-500">*</span></span>
                <Input placeholder="Shreya Patel" {...register('name')} />
                {errors.name ? <p className="text-xs text-rose-500">{errors.name.message}</p> : null}
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Mentor Name <span className="text-rose-500">*</span></span>
                <Input placeholder="Anuj Verma" {...register('mentorName')} />
                {errors.mentorName ? <p className="text-xs text-rose-500">{errors.mentorName.message}</p> : null}
              </label>
            </div>

            <div className="grid gap-6">
              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Technology Covered <span className="text-rose-500">*</span></p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {technologyOptions.map((topic) => (
                    <label key={topic} className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 transition hover:border-sky-300">
                      <input type="radio" value={topic} {...register('topicsCovered')} className="h-4 w-4 accent-sky-600" />
                      {topic}
                    </label>
                  ))}
                </div>
                {errors.topicsCovered ? <p className="mt-2 text-xs text-rose-500">{errors.topicsCovered.message}</p> : null}
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-700">
                  <span>Topics covered <span className="text-rose-500">*</span></span>
                  <Input placeholder="Select or describe topics covered" {...register('mainTopics')} />
                  {errors.mainTopics ? <p className="text-xs text-rose-500">{errors.mainTopics.message}</p> : null}
                </label>
                <label className="space-y-2 text-sm text-slate-700">
                  <span>Joining Month <span className="text-rose-500">*</span></span>
                  <Input placeholder="March 2025" {...register('joiningMonth')} />
                  {errors.joiningMonth ? <p className="text-xs text-rose-500">{errors.joiningMonth.message}</p> : null}
                </label>
              </div>

                <label className="space-y-2 text-sm text-slate-700">
                  <span>What were the main topics covered in today&apos;s session? <span className="text-rose-500">*</span></span>
                  <Input placeholder="SQL queries, dashboard design" {...register('detailedMainTopics')} />
                  {errors.detailedMainTopics ? <p className="text-xs text-rose-500">{errors.detailedMainTopics.message}</p> : null}
                </label>

                <label className="space-y-2 text-sm text-slate-700">
                  <span>Feedback About Session <span className="text-rose-500">*</span></span>
                  <Textarea placeholder="How was the mentor session?" {...register('feedbackAboutSession')} />
                  {errors.feedbackAboutSession ? <p className="text-xs text-rose-500">{errors.feedbackAboutSession.message}</p> : null}
                </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>3 Negative Activities <span className="text-rose-500">*</span></span>
                <Textarea placeholder="List the weakest parts of the session" {...register('negativeActivities')} />
                {errors.negativeActivities ? <p className="text-xs text-rose-500">{errors.negativeActivities.message}</p> : null}
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Queries <span className="text-rose-500">*</span></span>
                <Textarea placeholder="Any follow-up questions?" {...register('queries')} />
                {errors.queries ? <p className="text-xs text-rose-500">{errors.queries.message}</p> : null}
              </label>
            </div>
          </FormCard>

          <FormCard title="Contact & Administrative Details" subtitle="Capture program billing and point of contact information.">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700">
                <span>Point of Contact Name <span className="text-rose-500">*</span></span>
                <Input placeholder="Samir Khan" {...register('contactName')} />
                {errors.contactName ? <p className="text-xs text-rose-500">{errors.contactName.message}</p> : null}
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Amount Paid Till Date <span className="text-rose-500">*</span></span>
                <Input placeholder="₹ 28,000" {...register('amountPaid')} />
                {errors.amountPaid ? <p className="text-xs text-rose-500">{errors.amountPaid.message}</p> : null}
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Contact Number <span className="text-rose-500">*</span></span>
                <Input placeholder="+91 98765 43210" {...register('contactNumber')} />
                {errors.contactNumber ? <p className="text-xs text-rose-500">{errors.contactNumber.message}</p> : null}
              </label>
            </div>
          </FormCard>

          <div className="space-y-4 hidden lg:block">
            <ProgressBar value={progress} max={100} />
            <Button type="button" variant="primary" onClick={handleSubmit(onSubmit)} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </div>
        </div>

        <aside className="space-y-6">
          <FormCard title="Session ratings" subtitle="All ratings are required to submit the feedback.">
            <div>
              <RatingStars
                label="Rating out of 5"
                value={ratingSession}
                onChange={(value) => {
                  setRatingSession(value);
                  setRatingErrors((prev) => ({ ...prev, session: false }));
                }}
              />
              {ratingErrors.session ? <p className="mt-2 text-xs text-rose-500">Please rate the session.</p> : null}
            </div>
            <div>
              <RatingStars
                label="Internet Quality of Mentor"
                value={ratingInternet}
                onChange={(value) => {
                  setRatingInternet(value);
                  setRatingErrors((prev) => ({ ...prev, internet: false }));
                }}
              />
              {ratingErrors.internet ? <p className="mt-2 text-xs text-rose-500">Please rate the internet quality.</p> : null}
            </div>
            <div>
              <RatingStars
                label="Mentor Clarity and Understanding"
                value={ratingClarity}
                onChange={(value) => {
                  setRatingClarity(value);
                  setRatingErrors((prev) => ({ ...prev, clarity: false }));
                }}
              />
              {ratingErrors.clarity ? <p className="mt-2 text-xs text-rose-500">Please rate mentor clarity.</p> : null}
            </div>
          </FormCard>

          <div className="space-y-4 lg:hidden">
            <ProgressBar value={progress} max={100} />
            <Button type="button" variant="primary" onClick={handleSubmit(onSubmit)} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">Emoji sentiment</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">Use the star ratings to express the session quality and keep the review focused on what matters most.</p>
          </div>
        </aside>
      </div>

      <SuccessModal
        open={submitted}
        onClose={() => setSubmitted(false)}
        title="Feedback sent"
        message="Your mentor feedback has been submitted to the team successfully."
      />
    </FormLayout>
  );
}
