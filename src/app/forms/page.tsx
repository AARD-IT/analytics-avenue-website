"use client";

import { ArrowRight, Search } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { getActiveForms } from '@/lib/forms';
import type { FormRecord } from '@/types/forms';

const stats = [
  { label: 'Total Active Forms', value: 'Live workflows' },
  { label: 'Secure Workflow Collection', value: 'Encrypted intake flow' },
  { label: 'Enterprise Submission System', value: 'Protected data delivery' },
];

export default function FormsIndexPage() {
  const [query, setQuery] = useState('');
  const [cards, setCards] = useState<FormRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadForms() {
      setLoading(true);
      const { data, error } = await getActiveForms();
      if (active) {
        if (error) {
          setCards([]);
        } else {
          setCards(data ?? []);
        }
        setLoading(false);
      }
    }

    loadForms();

    return () => {
      active = false;
    };
  }, []);

  const filteredCards = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return [...cards]
      .map((card, index) => {
        const haystack = [
          `${index + 1}`,
          card.category ?? '',
          card.title,
          card.description ?? '',
        ]
          .join(' ')
          .toLowerCase();

        const exactNumber = normalized === `${index + 1}`;
        const containsWord = normalized.length > 0 ? haystack.includes(normalized) : true;
        const startsWithWord = normalized.length > 0 ? haystack.startsWith(normalized) : true;

        return {
          card,
          index,
          score: Number(exactNumber) * 3 + Number(startsWithWord) * 2 + Number(containsWord),
        };
      })
      .filter(({ score }) => (normalized ? score > 0 : true))
      .sort((a, b) => b.score - a.score || a.index - b.index)
      .map(({ card, index }) => ({ ...card, number: index + 1 }));
  }, [cards, query]);

  return (
    <div className="min-h-screen bg-white text-[#080808]">
      <main className="aa-container px-4 py-10 lg:px-6 lg:py-12">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200 shadow-[0_28px_80px_-45px_rgba(15,23,42,0.18)]">
          <div className="relative overflow-hidden rounded-[2rem] bg-white p-6 shadow-sm shadow-slate-200/40 lg:p-10">
            <div className="absolute -right-10 top-8 h-48 w-48 rounded-full bg-sky-200/30 blur-3xl" />
            <div className="absolute left-4 bottom-8 h-32 w-32 rounded-full bg-violet-200/20 blur-3xl" />
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <Image
                        src="/assets/logo/logo.svg"
                        alt="Analytics Avenue logo"
                        width={60}
                        height={60}
                        className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16"
                        priority
                      />
                      <div className="flex items-baseline gap-1 whitespace-nowrap">
                        <span className="text-[1.9rem] font-black tracking-tight text-[#1C3D76] sm:text-[2.4rem]">Analytics</span>
                        <span className="text-[1.9rem] font-black tracking-tight text-[#080808] sm:text-[2.4rem]">Avenue</span>
                      </div>
                    </div>
                    <h1 className="max-w-3xl font-[family-name:var(--font-heading)] text-4xl font-black tracking-tight text-[#080808] sm:text-5xl lg:text-6xl">
                      Centralized Workflow & Intake Management
                    </h1>
                    <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                      Access enterprise-grade onboarding, review, feedback, placement, and operational workflow forms through a unified Analytics Avenue portal designed for secure and professional data collection.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {stats.map((item, index) => (
                    <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50/90 p-4 shadow-sm">
                      <p className="text-sm font-semibold text-[#080808]">{item.label}</p>
                      <p className="mt-1 text-sm text-slate-600">{index === 0 ? `${cards.length} workflows` : item.value}</p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </section>

        <section id="workflows" className="mt-10 space-y-6">
          <div className="flex flex-col gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50/90 p-4 shadow-sm lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">Available workflows</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Operational Forms Directory</h2>
              <p className="text-base leading-7 text-slate-600">
                Select a workflow below to access structured enterprise forms for onboarding, reviews, placement tracking, feedback collection, and internal operational processes.
              </p>
            </div>
            <label className="flex w-full items-center gap-3 rounded-[1rem] border border-slate-200 bg-white px-4 py-3 shadow-sm lg:max-w-md">
              <Search size={18} className="text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by number, name, or keyword"
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                aria-label="Search forms"
              />
            </label>
          </div>

          {loading ? (
            <p className="rounded-[1.5rem] border border-slate-200 bg-white p-6 text-slate-600">Loading available forms…</p>
          ) : (
            <div className="grid gap-5 xl:grid-cols-2">
              {filteredCards.map((card) => (
                <a
                  key={card.id}
                  href={card.google_form_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_64px_-40px_rgba(15,23,42,0.12)] transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-[0_36px_80px_-50px_rgba(56,189,248,0.25)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--aa-primary)] text-xl font-black text-white shadow-sm">
                        {card.number}
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1C3D76]">{card.category || 'GENERAL'}</p>
                        <h3 className="mt-2 text-xl font-semibold text-[#080808]">{card.title}</h3>
                      </div>
                    </div>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition group-hover:bg-sky-100 group-hover:text-slate-900">
                      <ArrowRight size={16} />
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-6 text-slate-600">{card.description}</p>
                </a>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
