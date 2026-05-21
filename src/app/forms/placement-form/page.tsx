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
import { FormStepper } from '@/components/forms/form-stepper';
import { FileUpload } from '@/components/forms/file-upload';
import { SectionHeader } from '@/components/forms/section-header';
import { RatingStars } from '@/components/forms/rating-stars';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  convertFileToBase64,
  submitAnalyticsAvenueForm,
  validatePlacementPassportFile,
  validatePlacementPaymentFile,
} from '@/lib/analyticsAvenueForms';
import { Star } from 'lucide-react';

const stepDefinitions = [
  { title: 'Profile', active: true },
  { title: 'Career', active: false },
];

const placementSchema = z.object({
  name: z.string().min(1, 'Enter full name'),
  passportPic: z.string().optional(),
  phoneNumber: z.string().min(6, 'Enter phone number'),
  emailId: z.string().email('Enter a valid email'),
  briefIntro: z.string().min(1, 'Provide a short introduction'),
  status: z.enum(['Student', 'Fresher', 'Working']),
  totalAmountPaid: z.string().min(1, 'Enter amount paid'),
  paymentProof: z.string().min(1, 'Upload payment proof'),
  googleDriveLink: z.string().url('Enter a valid URL'),
  overallFeedback: z.string().min(1, 'Enter feedback'),
  monthOfJoining: z.string().min(1, 'Enter joining month'),
  suitableSectors: z.array(z.string()).optional(),
  technologiesCompleted: z.string().min(1, 'Select your technology progress'),
  rating: z.number().min(1, 'Provide a rating'),
  hackerCertificate: z.enum(['Yes', 'No']),
  amcat: z.enum(['Yes', 'No']),
  dashboardCreated: z.enum(['Yes', 'No']),
  resumeUploaded: z.enum(['Yes', 'No']),
  projectTitles: z.string().optional(),
});

type PlacementFormValues = z.infer<typeof placementSchema>;

const sectorInterests = [
  'Financial Analytics',
  'Marketing Analytics',
  'Telemetry Analytics',
  'Bio and Health care Analytics',
  'Supply chain Analytics',
  'Digital Marketing',
  'HR Analytics',
  'Structural Analytics',
  'Automobile',
  'Ecommerce',
  'LLM',
  'Health care',
];

const technologyOptions = [
  'SQL only',
  'Python only',
  'Powerbi only',
  'SQL and Python',
  'SQL and Powerbi',
  'Python and powerbi',
  'Just Now started',
];

export default function PlacementFormPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passportPhoto, setPassportPhoto] = useState<File | null>(null);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm<PlacementFormValues>({
    resolver: zodResolver(placementSchema),
  });

  const values = watch();
  const watchedInterests = watch('suitableSectors') || [];
  const ratingValue = values.rating || 0;
  const progress = useMemo(() => {
    const requiredValues = [
      values.name,
      values.emailId,
      values.phoneNumber,
      values.totalAmountPaid,
      values.paymentProof,
      values.status,
      values.briefIntro,
      values.googleDriveLink,
      values.overallFeedback,
      values.monthOfJoining,
      values.technologiesCompleted,
      values.rating > 0 ? 'filled' : '',
      values.hackerCertificate,
      values.amcat,
      values.dashboardCreated,
      values.resumeUploaded,
    ];
    const filled = requiredValues.filter(Boolean).length;
    return Math.round((filled / requiredValues.length) * 100);
  }, [values]);

  const passportPreview = useMemo(() => passportPhoto?.name ?? 'No photo selected', [passportPhoto]);
  const paymentPreview = useMemo(() => paymentProof?.name ?? 'No payment proof selected', [paymentProof]);

  async function onSubmit(values: PlacementFormValues) {
    if (loading) {
      return;
    }

    // Validate files (passport optional, paymentProof required)
    if (passportPhoto) {
      const passportError = validatePlacementPassportFile(passportPhoto);
      if (passportError) {
        setError('passportPic' as any, { type: 'manual', message: passportError });
        return;
      }
    }

    if (!paymentProof) {
      setError('paymentProof' as any, { type: 'manual', message: 'Payment proof is required' });
      return;
    }

    if (paymentProof) {
      const paymentError = validatePlacementPaymentFile(paymentProof);
      if (paymentError) {
        setError('paymentProof' as any, { type: 'manual', message: paymentError });
        return;
      }
    }

    setLoading(true);
    try {
      const passportFileData = passportPhoto ? await convertFileToBase64(passportPhoto) : undefined;
      const paymentFileData = paymentProof ? await convertFileToBase64(paymentProof) : undefined;

      await submitAnalyticsAvenueForm('placement', {
        name: values.name,
        emailId: values.emailId,
        phoneNumber: values.phoneNumber,
        totalAmountPaid: values.totalAmountPaid,
        passportFile: passportFileData,
        paymentProofFile: paymentFileData,
        status: values.status,
        profileIntro: values.briefIntro,
        googleDriveLink: values.googleDriveLink,
        overallFeedback: values.overallFeedback,
        monthOfJoining: values.monthOfJoining,
        projectTitles: values.projectTitles || '',
        sectorInterests: (values.suitableSectors || []).join(', '),
        technologyCompleted: values.technologiesCompleted,
        classExperienceRating: values.rating,
        hackerCertificate: values.hackerCertificate,
        amcatOrCocubesCompleted: values.amcat,
        dashboardUploaded: values.dashboardCreated,
        resumeUploaded: values.resumeUploaded,
      });
      setSubmitted(true);
      toast.success('Placement details submitted successfully.');
      reset();
      setPassportPhoto(null);
      setPaymentProof(null);
      setCurrentStep(0);
    } catch (error) {
      console.error(error);
      toast.error('Unable to submit placement details. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  const stepTitles = stepDefinitions.map((step, index) => ({ ...step, active: index === currentStep }));

  return (
    <FormLayout>
      <HeroSection title="Analytics Avenue Placement Tracker - L1 Tasks" description="" details="" />

      <FormCard title="" subtitle="">
        <div className="space-y-4">
          <div className="text-lg font-semibold">Analytics Avenue Placement Tracker - L1 Tasks</div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <ol className="list-decimal pl-5 text-sm text-slate-700">
              <li>Create a github with repositories Placement_tracker, Projects, Certificates, Resume, SQL tasks, Python tasks, Dashboards, Blogs</li>
              <li>Ensure you add datasets too in respective bins for projects and dashboards</li>
              <li>Create a copy of this <a href="https://docs.google.com/spreadsheets/d/11vNt3SOzxl-ShAfeFvAMoU1A8tkgqtCs6ZnZHcSDB7Q/edit?gid=0#gid=0" target="_blank" rel="noreferrer" className="text-sky-600 underline">Link</a> placement tracker Excel sheet and periodically update it and re upload</li>
              <li>Make your github publicly visible</li>
              <li>Upload each activity into the respective folder / repository</li>
              <li>To know how to setup github: <a href="https://www.youtube.com/results?search_query=how+to+setup+github+and+repository" target="_blank" rel="noreferrer" className="text-sky-600 underline">Link</a></li>
              <li className="font-semibold">Note you are eligible for placement connect / project discussion only if you finish all the tasks in mentioned in the placement tracker as in point 3</li>
            </ol>
          </div>
          <p className="text-sm text-slate-700">The name, email, and photo associated with your Google account will be recorded when you upload files and submit this form</p>
          <p className="text-sm text-slate-700">* Indicates required question</p>
        </div>
      </FormCard>

      <div className="grid gap-8 lg:grid-cols-[0.7fr_0.35fr]">
        <div className="space-y-6">
          <FormCard title="Placement tracker" subtitle="Complete the task progress overview in three steps.">
            <FormStepper steps={stepTitles} />
          </FormCard>

          <FormCard title="Profile" subtitle="Fill the required placement resume and project fields.">
            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
              {currentStep === 0 && (
                <div className="space-y-6">
                  <SectionHeader title="Profile & Payment" description="Enter personal details, supporting documents, and payment status." />
                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="space-y-2 text-sm text-slate-700">
                      <div className="flex items-center gap-1">Name <span className="text-rose-500">*</span></div>
                      <Input placeholder="Your full name" {...register('name')} />
                      {errors.name ? <p className="text-xs text-rose-500">{errors.name.message}</p> : null}
                    </label>
                    <label className="space-y-2 text-sm text-slate-700">
                      <div className="flex items-center gap-1">Email id <span className="text-rose-500">*</span></div>
                      <Input placeholder="your.email@example.com" {...register('emailId')} />
                      {errors.emailId ? <p className="text-xs text-rose-500">{errors.emailId.message}</p> : null}
                    </label>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="space-y-2 text-sm text-slate-700">
                      <div className="flex items-center gap-1">Phone Number <span className="text-rose-500">*</span></div>
                      <Input placeholder="+91 98765 43210" {...register('phoneNumber')} />
                      {errors.phoneNumber ? <p className="text-xs text-rose-500">{errors.phoneNumber.message}</p> : null}
                    </label>
                    <label className="space-y-2 text-sm text-slate-700">
                      <div className="flex items-center gap-1">Total Amount Paid <span className="text-rose-500">*</span></div>
                      <Input placeholder="₹ 24,000" {...register('totalAmountPaid')} />
                      {errors.totalAmountPaid ? <p className="text-xs text-rose-500">{errors.totalAmountPaid.message}</p> : null}
                    </label>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="space-y-2 text-sm text-slate-700">
                      <div className="flex items-center gap-1">Passport size pic</div>
                      <FileUpload label="Passport size pic" accept=".jpg,.jpeg,.png" file={passportPhoto} onChange={(f) => { setPassportPhoto(f); if (f) setValue('passportPic', f.name); }} hint="Upload 1 supported file. Max 10 MB." />
                      {errors.passportPic ? <p className="text-xs text-rose-500">{errors.passportPic.message}</p> : null}
                    </label>
                    <label className="space-y-2 text-sm text-slate-700">
                      <div className="flex items-center gap-1">Payment proofs (Attach as a combined pdf)</div>
                      <FileUpload label="Payment proofs (Attach as a combined pdf)" accept=".pdf" file={paymentProof} onChange={(f) => { setPaymentProof(f); if (f) setValue('paymentProof', f.name); }} hint="Upload 1 supported file. Max 1 GB." />
                      {errors.paymentProof ? <p className="text-xs text-rose-500">{errors.paymentProof.message}</p> : null}
                    </label>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <span className="text-sm font-semibold text-slate-900">Status <span className="text-rose-500">*</span></span>
                      {['Student', 'Fresher', 'Working'].map((option) => (
                        <label key={option} className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 hover:border-sky-300">
                          <input type="radio" value={option} {...register('status')} className="h-4 w-4 accent-sky-600" />
                          {option}
                        </label>
                      ))}
                      {errors.status ? <p className="text-xs text-rose-500">{errors.status.message}</p> : null}
                    </div>
                    <label className="space-y-2 text-sm text-slate-700">
                      <span>Brief intro about your profile in 5 lines <span className="text-rose-500">*</span></span>
                      <Textarea placeholder="Describe your profile in 5 lines" {...register('briefIntro')} />
                      {errors.briefIntro ? <p className="text-xs text-rose-500">{errors.briefIntro.message}</p> : null}
                    </label>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  <SectionHeader title="Career & Project" description="Capture your interest areas, completed technology, and placement readiness." />
                  <label className="space-y-2 text-sm text-slate-700">
                    <span>Google Drive / GitHub Link</span>
                    <Input placeholder="https://github.com/yourprofile" {...register('googleDriveLink')} />
                    {errors.googleDriveLink ? <p className="text-xs text-rose-500">{errors.googleDriveLink.message}</p> : null}
                  </label>
                  <label className="space-y-2 text-sm text-slate-700">
                    <span>Overall Feedback</span>
                    <Textarea placeholder="Your placement readiness feedback" {...register('overallFeedback')} />
                    {errors.overallFeedback ? <p className="text-xs text-rose-500">{errors.overallFeedback.message}</p> : null}
                  </label>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="space-y-2 text-sm text-slate-700">
                      <span>Month of Joining</span>
                      <Input placeholder="May 2025" {...register('monthOfJoining')} />
                      {errors.monthOfJoining ? <p className="text-xs text-rose-500">{errors.monthOfJoining.message}</p> : null}
                    </label>
                    <label className="space-y-2 text-sm text-slate-700">
                      <span>Project Titles / Problem Statements</span>
                        <Textarea placeholder="Project 1: Sales dashboard..." {...register('projectTitles')} />
                        {errors.projectTitles ? <p className="text-xs text-rose-500">{errors.projectTitles.message}</p> : null}
                    </label>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">Sector Interests</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {sectorInterests.map((interest) => (
                        <label key={interest} className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                          <input type="checkbox" value={interest} {...register('suitableSectors')} className="h-4 w-4 accent-sky-600" />
                          {interest}
                        </label>
                      ))}
                    </div>
                  </div>
                  <label className="space-y-2 text-sm text-slate-700">
                    <span>Technology Completed <span className="text-rose-500">*</span></span>
                    <Select {...register('technologiesCompleted')}>
                      <option value="">Select technology completed</option>
                      {technologyOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </Select>
                    {errors.technologiesCompleted ? <p className="text-xs text-rose-500">{errors.technologiesCompleted.message}</p> : null}
                  </label>

                  <div className="space-y-6">
                    <div className="rounded-3xl border border-slate-200 bg-white p-4 mt-4">
                      <div className="space-y-2">
                        <div className="text-sm font-semibold text-slate-900">Overall Rating you give as per you on class experience <span className="text-rose-500">*</span></div>
                        <p className="text-sm text-slate-600">Select a single rating from 1 to 5.</p>
                      </div>
                      <div className="grid grid-cols-5 gap-3 mt-4">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setValue('rating', value, { shouldValidate: true })}
                            className={`rounded-3xl border p-3 text-center transition ${ratingValue >= value ? 'border-sky-500 bg-sky-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                            aria-label={`Rate ${value}`}
                          >
                            <span className="block text-sm font-semibold text-slate-700">{value}</span>
                            <Star size={20} className={`${ratingValue >= value ? 'mx-auto mt-2 text-sky-600' : 'mx-auto mt-2 text-slate-400 group-hover:text-slate-500'}`} />
                          </button>
                        ))}
                      </div>
                      {errors.rating ? <p className="text-xs text-rose-500 mt-3">{errors.rating.message}</p> : null}
                    </div>

                    <div className="grid gap-4">
                      <div className="rounded-3xl border border-slate-200 bg-white p-4">
                        <p className="text-sm font-semibold text-slate-900">Have you completed Hackerranker or Leetcode certificate in SQL or Python and added in certificates repository? <span className="text-rose-500">*</span></p>
                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          {['Yes', 'No'].map((option) => (
                            <label key={option} className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 hover:border-sky-300">
                              <input type="radio" value={option} {...register('hackerCertificate')} className="h-4 w-4 accent-sky-600" />
                              {option}
                            </label>
                          ))}
                        </div>
                        {errors.hackerCertificate ? <p className="text-xs text-rose-500 mt-3">{errors.hackerCertificate.message}</p> : null}
                      </div>

                      <div className="rounded-3xl border border-slate-200 bg-white p-4">
                        <p className="text-sm font-semibold text-slate-900">Have you completed Amcat or cocubes test (for freshers alone) <span className="text-rose-500">*</span></p>
                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          {['Yes', 'No'].map((option) => (
                            <label key={option} className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 hover:border-sky-300">
                              <input type="radio" value={option} {...register('amcat')} className="h-4 w-4 accent-sky-600" />
                              {option}
                            </label>
                          ))}
                        </div>
                        {errors.amcat ? <p className="text-xs text-rose-500 mt-3">{errors.amcat.message}</p> : null}
                      </div>

                      <div className="rounded-3xl border border-slate-200 bg-white p-4">
                        <p className="text-sm font-semibold text-slate-900">Have you created a dashboard in powerbi/excel and uploaded in github dashboard repository? <span className="text-rose-500">*</span></p>
                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          {['Yes', 'No'].map((option) => (
                            <label key={option} className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 hover:border-sky-300">
                              <input type="radio" value={option} {...register('dashboardCreated')} className="h-4 w-4 accent-sky-600" />
                              {option}
                            </label>
                          ))}
                        </div>
                        {errors.dashboardCreated ? <p className="text-xs text-rose-500 mt-3">{errors.dashboardCreated.message}</p> : null}
                      </div>

                      <div className="rounded-3xl border border-slate-200 bg-white p-4">
                        <p className="text-sm font-semibold text-slate-900">Have you uploaded the updated resume in github as mentioned in materials drive <span className="text-rose-500">*</span></p>
                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          {['Yes', 'No'].map((option) => (
                            <label key={option} className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 hover:border-sky-300">
                              <input type="radio" value={option} {...register('resumeUploaded')} className="h-4 w-4 accent-sky-600" />
                              {option}
                            </label>
                          ))}
                        </div>
                        {errors.resumeUploaded ? <p className="text-xs text-rose-500 mt-3">{errors.resumeUploaded.message}</p> : null}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                {currentStep < stepDefinitions.length - 1 ? (
                  <Button type="button" variant="primary" onClick={() => setCurrentStep((value) => value + 1)}>
                    Continue
                  </Button>
                ) : (
                  <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Placement'}
                  </Button>
                )}
              </div>
            </form>
          </FormCard>
        </div>

        <aside className="space-y-6">
          <FormCard title="Progress tracker" subtitle="A sticky summary of your placement journey.">
            <ProgressBar value={progress} max={100} />
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              <p className="font-semibold text-slate-900">Tips for speed</p>
              <p className="mt-3">Complete the listed profile items, attach your documents, and add strong project links for a premium placement submission.</p>
            </div>
          </FormCard>

          <FormCard title="Support summary" subtitle="Placement dashboard insights.">
            <ul className="space-y-3 text-sm text-slate-600">
              <li>• Keep your GitHub and project links ready.</li>
              <li>• Upload the latest resume and proof documents.</li>
              <li>• Use consistent status and technology completion tags.</li>
            </ul>
          </FormCard>
        </aside>
      </div>

      <SuccessModal
        open={submitted}
        onClose={() => setSubmitted(false)}
        title="Placement form submitted"
        message="Your placement tracker details have been sent successfully."
      />
    </FormLayout>
  );
}
