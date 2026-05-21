import Link from 'next/link';
import { ArrowRight, ShieldCheck, BadgeCheck, Layers, ClipboardCheck, Briefcase, Users, BarChart3 } from 'lucide-react';

const stats = [
  { label: 'Total Active Forms', value: '4 workflows', icon: Layers },
  { label: 'Secure Workflow Collection', value: 'Encrypted intake flow', icon: ShieldCheck },
  { label: 'Enterprise Submission System', value: 'Protected data delivery', icon: BadgeCheck },
];

const cards = [
  {
    href: '/forms/pre-onboarding-form',
    category: 'RECRUITMENT',
    title: 'Candidate Pre-Onboarding',
    description: 'Submit candidate onboarding information, professional details, and intake documentation for recruitment coordination and internal review workflows.',
    icon: Users,
  },
  {
    href: '/forms/feedback-form',
    category: 'MENTORING',
    title: 'Mentor Feedback Review',
    description: 'Capture mentor observations, technical evaluations, session feedback, and structured learning insights within a centralized review workflow.',
    icon: ClipboardCheck,
  },
  {
    href: '/forms/placement-form',
    category: 'PLACEMENT',
    title: 'Placement Operations Tracker',
    description: 'Manage candidate placement progress, assignment tracking, onboarding stages, and operational task completion in one workflow system.',
    icon: Briefcase,
  },
  {
    href: '/forms/monthly-review-feedback-form',
    category: 'HR OPERATIONS',
    title: 'Monthly Performance Review',
    description: 'Collect employee performance reviews, workplace insights, productivity feedback, and professional growth observations securely.',
    icon: BarChart3,
  },
];

export default function FormsIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="aa-container px-4 py-10 lg:px-6 lg:py-12">
        <section className="overflow-hidden rounded-[2rem] border border-white/80 bg-gradient-to-br from-slate-50 via-slate-100 to-sky-50 p-6 shadow-[0_40px_120px_-70px_rgba(56,189,248,0.35)] lg:p-10">
          <div className="relative overflow-hidden rounded-[2rem] bg-white/90 p-6 shadow-lg shadow-slate-200/30 backdrop-blur-xl lg:p-10">
            <div className="absolute -right-10 top-8 h-48 w-48 rounded-full bg-sky-200/30 blur-3xl" />
            <div className="absolute left-4 bottom-8 h-32 w-32 rounded-full bg-violet-200/20 blur-3xl" />
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
                      <img src="/assets/logo/logo.svg" alt="Analytics Avenue" className="h-12 w-12 object-contain" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Enterprise forms portal</p>
                      <p className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Analytics Avenue</p>
                    </div>
                  </div>
                  <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600">
                    ENTERPRISE FORMS PORTAL
                  </span>
                </div>

                <div className="space-y-4 max-w-3xl">
                  <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Centralized Workflow & Intake Management</h1>
                  <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                    Access enterprise-grade onboarding, review, feedback, placement, and operational workflow forms through a unified Analytics Avenue portal designed for secure and professional data collection.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {stats.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50/90 p-4 shadow-sm">
                        <div className="flex items-center gap-3 text-slate-900">
                          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-sky-600 shadow-sm">
                            <Icon size={18} />
                          </span>
                          <div>
                            <p className="text-sm font-semibold">{item.label}</p>
                            <p className="text-sm text-slate-600">{item.value}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <a href="#workflows" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                    Browse Forms
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="workflows" className="mt-10 space-y-6">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">Available workflows</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Operational Forms Directory</h2>
            <p className="text-base leading-7 text-slate-600">
              Select a workflow below to access structured enterprise forms for onboarding, reviews, placement tracking, feedback collection, and internal operational processes.
            </p>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_64px_-40px_rgba(15,23,42,0.12)] transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-[0_36px_80px_-50px_rgba(56,189,248,0.25)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-12 w-12 place-items-center rounded-3xl bg-slate-100 text-sky-600 shadow-sm">
                        <Icon size={20} />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{card.category}</p>
                        <h3 className="mt-2 text-xl font-semibold text-slate-900">{card.title}</h3>
                      </div>
                    </div>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition group-hover:bg-sky-100 group-hover:text-slate-900">
                      <ArrowRight size={16} />
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-6 text-slate-600">{card.description}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {['Secure Submission', 'Internal Workflow', 'Response Tracking'].map((tag) => (
                      <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
