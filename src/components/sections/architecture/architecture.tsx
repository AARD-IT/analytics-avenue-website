'use client'

import type { ReactNode } from 'react'
import {
    createContext,
    useEffect,
    useContext,
    useMemo,
    useRef,
    useState,
} from 'react'
import {
    motion,
    useScroll,
    useTransform,
    useReducedMotion,
    motionValue,
    type MotionValue,
} from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import type { IconType } from 'react-icons'

import { PRIMARY } from '@/components/card/challenge-card/chalenge-card'

const fontHeading = 'font-[family-name:var(--font-heading)]'
const fontBody = 'font-[family-name:var(--font-body)]'

/* ── Lucide icons (already in project) ── */
import {
    BarChart3, TrendingUp, Target, ShieldCheck, DollarSign,
    Users, MessageSquareText, Star, AlertTriangle,
    Sparkles, Bot, LayoutDashboard, Briefcase, Activity, BookOpen, Repeat, FileCheck
} from 'lucide-react'

/* ── React Icons for Data Source logos ── */
import {
    SiShopify, SiSalesforce, SiPinterest, SiInstagram, SiYoutube, SiTiktok, SiGoogleads, SiFacebook,
    SiIntuit, SiGooglecloud, SiDatabricks, SiSnowflake, SiApacheairflow,
} from 'react-icons/si'
import { FaFileExcel, FaFileCsv, FaGoogleDrive, FaTwitter, FaMagento, FaAws, FaMicrosoft, FaDatabase } from 'react-icons/fa'

/* ═══════════════════════════════════════════════════
   SCROLL REVEAL (scrubbed with vertical scroll)
   ═══════════════════════════════════════════════════ */

type ArchitectureRevealContextValue = {
    revealProgress: MotionValue<number>
}

const ArchitectureRevealContext = createContext<ArchitectureRevealContextValue | null>(null)

function useArchitectureReveal(): ArchitectureRevealContextValue {
    const ctx = useContext(ArchitectureRevealContext)
    if (!ctx) {
        throw new Error('Architecture reveal components must be used inside the architecture section')
    }
    return ctx
}

/** Sequential scroll "frames": each call consumes the next slice of [0,1]. */
function createScrollFrameBuilder(totalFrames: number) {
    let i = 0
    return (): [number, number] => {
        const a = i / totalFrames
        i += 1
        const b = Math.min(i / totalFrames, 1)
        return [a, b]
    }
}

/** Delay a range start without changing the end. */
function delayRangeStart([start, end]: [number, number], delayRatio: number): [number, number] {
    const duration = Math.max(end - start, 0)
    const delayedStart = Math.min(start + duration * delayRatio, end)
    return [delayedStart, end]
}

/** Shift an entire range on the timeline and clamp into [0,1]. */
function shiftRange([start, end]: [number, number], delta: number): [number, number] {
    const nextStart = Math.max(0, Math.min(1, start + delta))
    const nextEnd = Math.max(0, Math.min(1, end + delta))
    return [nextStart, nextEnd]
}

type DrawLineProps = {
    d: string
    isSolid?: boolean
    color?: string
    strokeWidth?: number
    range: [number, number]
}

type PulseDotProps = { cx: number; cy: number; color?: string; range: [number, number] }

type FadeInProps = { children: ReactNode; y?: number; className?: string; range: [number, number] }

type SectionHeaderProps = {
    number?: string
    title: ReactNode
    subtitle: ReactNode
    center?: boolean
    ranges: { number?: [number, number]; title: [number, number]; subtitle: [number, number] }
}

type LogoCardProps = { name: string; Icon: IconType; color?: string; range: [number, number] }

type DataTypeTagProps = { label: string; range: [number, number] }

type ToolBadgeProps = {
    Icon: IconType
    name: string
    iconColor?: string
    range: [number, number]
    className?: string
}

type AISolutionCardProps = {
    icon: LucideIcon
    title: string
    description: string
    range: [number, number]
}

type SolutionItemProps = { icon: LucideIcon; label: string; range: [number, number]; color: string }

type SectionConnectorProps = {
    ranges: {
        mainV: [number, number]
        dot: [number, number]
        polyDown: [number, number]
        horiz: [number, number]
        polyRight: [number, number]
        reportLabel: [number, number]
    }
    color?: string
}

type ScrollPolygonProps = { points: string; fill: string; range: [number, number] }

/* ═══════════════════════════════════════════════════
   ANIMATED DRAW LINE (scroll-scrubbed pathLength)
   ═══════════════════════════════════════════════════ */
const DrawLine = ({ d, isSolid = false, color = PRIMARY, strokeWidth = 3, range }: DrawLineProps) => {
    const { revealProgress } = useArchitectureReveal()
    const pathLength = useTransform(revealProgress, range, [0, 1])
    const opacity = useTransform(pathLength, [0, 0.04], [0, 1])

    return (
        <motion.path
            d={d} fill="none" stroke={color} strokeWidth={strokeWidth}
            strokeDasharray={isSolid ? 'none' : '10 10'} strokeLinecap="round"
            initial={false}
            style={{ pathLength, opacity }}
        />
    )
}

/* ═══════════════════════════════════════════════════
   PULSING DOT (scroll reveal + light CSS pulse)
   ═══════════════════════════════════════════════════ */
const PulseDot = ({ cx, cy, color = PRIMARY, range }: PulseDotProps) => {
    const { revealProgress } = useArchitectureReveal()
    const opacity = useTransform(revealProgress, range, [0, 1])
    const scale = useTransform(revealProgress, range, [0, 1])

    return (
        <motion.circle cx={cx} cy={cy} r="5" fill={color} style={{ opacity, scale }} />
    )
}

/* ═══════════════════════════════════════════════════
   FADE-IN WRAPPER
   ═══════════════════════════════════════════════════ */
const FadeIn = ({ children, y = 30, className = '', range }: FadeInProps) => {
    const { revealProgress } = useArchitectureReveal()
    const opacity = useTransform(revealProgress, range, [0, 1])
    const yMv = useTransform(revealProgress, range, [y, 0])

    return (
        <motion.div style={{ opacity, y: yMv }} className={className}>
            {children}
        </motion.div>
    )
}

const ScrollPolygon = ({ points, fill, range }: ScrollPolygonProps) => {
    const { revealProgress } = useArchitectureReveal()
    const opacity = useTransform(revealProgress, range, [0, 1])
    return <motion.polygon points={points} fill={fill} style={{ opacity }} />
}

const ScrollEllipse = ({
    cx, cy, rx, ry, stroke, strokeWidth, className, range,
}: {
    cx: number
    cy: number
    rx: number
    ry: number
    stroke: string
    strokeWidth: number
    className?: string
    range: [number, number]
}) => {
    const { revealProgress } = useArchitectureReveal()
    const pathLength = useTransform(revealProgress, range, [0, 1])
    const opacity = useTransform(revealProgress, range, [0, 1])
    return (
        <motion.ellipse
            cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={stroke} strokeWidth={strokeWidth}
            className={className}
            style={{ pathLength, opacity }}
        />
    )
}

/* ═══════════════════════════════════════════════════
   SECTION HEADER
   ═══════════════════════════════════════════════════ */
const SectionHeader = ({ number, title, subtitle, center = false, ranges }: SectionHeaderProps) => (
    <div className={`mb-10 lg:mb-14 ${center ? 'text-center' : ''}`}>
        {number != null && number !== '' && ranges.number != null && (
            <FadeIn range={ranges.number} className={`${fontHeading} mb-5 block text-4xl font-extrabold text-[var(--aa-primary)] md:mb-6 md:text-5xl`}>
                {number}
            </FadeIn>
        )}
        <FadeIn range={ranges.title} className={`${fontHeading} text-2xl font-extrabold leading-snug tracking-[-0.02em] text-[var(--aa-text-strong)] md:text-3xl lg:text-4xl`}>
            {title}
        </FadeIn>
        <FadeIn range={ranges.subtitle} className={`${fontBody} mt-3 text-base leading-relaxed text-[var(--aa-text-muted)] ${center ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}>
            {subtitle}
        </FadeIn>
    </div>
)

/* ═══════════════════════════════════════════════════
   LOGO CARD (with react-icons)
   ═══════════════════════════════════════════════════ */
const LogoCard = ({ name, Icon, color = '#333', range }: LogoCardProps) => {
    const { revealProgress } = useArchitectureReveal()
    const opacity = useTransform(revealProgress, range, [0, 1])
    const scale = useTransform(revealProgress, range, [0.85, 1])

    return (
        <motion.div
            style={{ opacity, scale }}
            className={`${fontBody} flex items-center justify-center gap-2.5 rounded-[var(--aa-radius-xl)] border border-[var(--aa-border)] bg-[var(--aa-surface)] px-4 py-5 shadow-[var(--aa-shadow-sm)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[var(--aa-shadow-md)]`}
        >
            <Icon size={24} color={color} />
            <span className="text-[13px] font-bold text-slate-700 whitespace-nowrap">{name}</span>
        </motion.div>
    )
}

/* ═══════════════════════════════════════════════════
   DATA TYPE TAG
   ═══════════════════════════════════════════════════ */
const DataTypeTag = ({ label, range }: DataTypeTagProps) => {
    const { revealProgress } = useArchitectureReveal()
    const opacity = useTransform(revealProgress, range, [0, 1])
    const x = useTransform(revealProgress, range, [-20, 0])

    return (
        <motion.div
            style={{ opacity, x }}
            className={`${fontBody} flex min-h-[3rem] w-full items-center justify-center rounded-[var(--aa-radius-lg)] border-2 border-[var(--aa-border)] bg-[var(--aa-surface)] px-2 py-2 text-center text-sm font-bold leading-snug text-[var(--aa-text-strong)] shadow-[var(--aa-shadow-sm)] transition-colors hover:bg-[var(--aa-surface-soft)]`}
        >
            {label}
        </motion.div>
    )
}

/* ═══════════════════════════════════════════════════
   TOOL BADGE (with react-icons)
   ═══════════════════════════════════════════════════ */
const ToolBadge = ({ Icon, name, iconColor = '#333', range, className = '' }: ToolBadgeProps) => {
    const { revealProgress } = useArchitectureReveal()
    const opacity = useTransform(revealProgress, range, [0, 1])
    const scale = useTransform(revealProgress, range, [0.8, 1])

    return (
        <motion.div
            style={{ opacity, scale }}
            className={`${fontBody} flex items-center gap-2 rounded-[var(--aa-radius-lg)] border border-[var(--aa-border)] bg-[var(--aa-surface)] px-4 py-2.5 shadow-[var(--aa-shadow-sm)] transition-all hover:shadow-[var(--aa-shadow-md)] ${className}`}
        >
            <Icon size={22} color={iconColor} />
            <span className="text-[13px] font-bold text-slate-700">{name}</span>
        </motion.div>
    )
}

/* ═══════════════════════════════════════════════════
   AI SOLUTION CARD
   ═══════════════════════════════════════════════════ */
const AISolutionCard = ({ icon: LucideIcon, title, description, range }: AISolutionCardProps) => {
    const { revealProgress } = useArchitectureReveal()
    const opacity = useTransform(revealProgress, range, [0, 1])
    const x = useTransform(revealProgress, range, [-30, 0])

    return (
        <motion.div
            style={{ opacity, x }}
            className="rounded-[var(--aa-radius-2xl)] border border-[var(--aa-border)] border-l-4 border-l-[var(--aa-primary)] bg-[var(--aa-surface)] p-5 shadow-[var(--aa-shadow-sm)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--aa-shadow-md)]"
        >
            <div className="mb-2 flex items-center gap-2">
                <LucideIcon className="h-5 w-5 shrink-0 text-[var(--aa-primary)]" strokeWidth={2} />
                <h5 className={`${fontHeading} text-sm font-bold uppercase tracking-wide text-[var(--aa-primary)]`}>{title}</h5>
            </div>
            <p className={`${fontBody} text-sm leading-relaxed text-[var(--aa-text-strong)]`}>{description}</p>
        </motion.div>
    )
}

/* ═══════════════════════════════════════════════════
   SOLUTION LIST ITEM
   ═══════════════════════════════════════════════════ */
const SolutionItem = ({ icon: LucideIcon, label, range, color }: SolutionItemProps) => (
    <FadeIn range={range} className="w-full">
        <div className="group flex cursor-default items-center gap-3 rounded-[var(--aa-radius-lg)] border border-transparent px-3 py-1.5 transition-colors hover:border-[var(--aa-border)] hover:bg-[var(--aa-surface-soft)]">
            <LucideIcon className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" style={{ color }} strokeWidth={2.5} />
            <span className={`${fontBody} text-[13px] font-semibold leading-tight text-[var(--aa-text-strong)]`}>{label}</span>
        </div>
    </FadeIn>
)

const SectionConnector = ({ ranges, color = PRIMARY }: SectionConnectorProps) => (
    <div className="relative w-full flex justify-center" style={{ height: 130 }}>
        <svg className="w-[300px] h-full overflow-visible" viewBox="0 0 300 130">
            <DrawLine d="M 150 0 L 150 130" range={ranges.mainV} color={color} isSolid={false} strokeWidth={3} />
            <PulseDot cx={150} cy={65} range={ranges.dot} color={color} />
            <ScrollPolygon points="142,120 150,135 158,120" fill={color} range={ranges.polyDown} />
            <DrawLine d="M 150 65 L 210 65" range={ranges.horiz} color={PRIMARY} isSolid strokeWidth={2.5} />
            <ScrollPolygon points="205,60 213,65 205,70" fill={PRIMARY} range={ranges.polyRight} />
        </svg>
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full">
            <div className="absolute" style={{ top: '65px', left: 'calc(50% + 70px)', transform: 'translateY(-50%)' }}>
                <FadeIn range={ranges.reportLabel} className="pointer-events-auto">
                    <div className={`${fontBody} whitespace-nowrap rounded-[var(--aa-radius-lg)] border-2 border-[var(--aa-primary)] bg-[var(--aa-surface)] px-4 py-1.5 text-[13px] font-bold text-[var(--aa-primary)] shadow-[var(--aa-shadow-sm)]`}>Reporting layer</div>
                </FadeIn>
            </div>
        </div>
    </div>
)

/* ═══════════════════════════════════════════════════════════════
   ██  MAIN WORKFLOW COMPONENT  ██
   ═══════════════════════════════════════════════════════════════ */
const Architecture = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const [isMobile, setIsMobile] = useState(false)
    const reducedMotion = useReducedMotion()
    const staticRevealed = useMemo(() => motionValue(1), [])
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })
    const revealProgress = reducedMotion ? staticRevealed : scrollYProgress

    useEffect(() => {
        const media = window.matchMedia('(max-width: 1023px)')
        const update = () => setIsMobile(media.matches)
        update()
        media.addEventListener('change', update)
        return () => media.removeEventListener('change', update)
    }, [])

    /* ── Section 01 data ── */
    const dataSources = [
        { name: 'QuickBooks', Icon: SiIntuit, color: '#365ABF' },
        { name: 'Shopify', Icon: SiShopify, color: '#96BF48' },
        { name: 'BigCommerce', Icon: FaFileExcel, color: '#34313F' },
        { name: 'Magento', Icon: FaMagento, color: '#EE672F' },
        { name: 'Salesforce', Icon: SiSalesforce, color: '#00A1E0' },
        { name: 'Google Drive', Icon: FaGoogleDrive, color: '#4285F4' },
        { name: 'CSV', Icon: FaFileCsv, color: '#217346' },
        { name: 'Excel', Icon: FaFileExcel, color: '#217346' },
        { name: 'Facebook', Icon: SiFacebook, color: '#1877F2' },
        { name: 'Pinterest', Icon: SiPinterest, color: '#E60023' },
        { name: 'Twitter / X', Icon: FaTwitter, color: '#1DA1F2' },
        { name: 'Instagram', Icon: SiInstagram, color: '#E4405F' },
        { name: 'YouTube', Icon: SiYoutube, color: '#FF0000' },
        { name: 'TikTok', Icon: SiTiktok, color: '#000000' },
        { name: 'Google Ads', Icon: SiGoogleads, color: '#4285F4' },
    ]

    const dataTypes = ['Semi-Structured', 'Unstructured', 'Structured', 'Real-Time', 'Batch']

    /* ── Section 03 data ── */
    const aiSolutions1 = [
        { icon: Briefcase, label: 'Marketing Performance & Optimization', color: PRIMARY },
        { icon: TrendingUp, label: 'Inventory Demand Forecasting', color: PRIMARY },
        { icon: ShieldCheck, label: 'Vendor Performance & Risk Monitor', color: PRIMARY },
        { icon: BarChart3, label: 'Asset And Financial Audits', color: PRIMARY },
        { icon: Activity, label: 'End-To-End Supply Chain Visibility', color: PRIMARY },
        { icon: AlertTriangle, label: 'Quality Control & Defect Intelligence', color: PRIMARY },
    ]
    const aiSolutions2 = [
        { icon: DollarSign, label: 'Price Optimization', color: PRIMARY },
        { icon: Users, label: 'Customer Segmentation', color: PRIMARY },
        { icon: MessageSquareText, label: 'Review & Sentiment Analysis', color: PRIMARY },
        { icon: AlertTriangle, label: 'Churn & Risk Analytics', color: PRIMARY },
        { icon: Star, label: 'Recommendation System', color: PRIMARY },
        { icon: TrendingUp, label: 'Demand Forecasting', color: PRIMARY },
        { icon: Target, label: 'Anomaly Detection', color: PRIMARY },
    ]
    const aiSolutions3 = [
        { icon: Sparkles, label: 'AI Personalization & Recommendation', color: PRIMARY },
        { icon: Bot, label: 'Smart Production Scheduling & Autonomous', color: PRIMARY },
        { icon: BookOpen, label: 'Negotiation & Contract Optimization', color: PRIMARY },
        { icon: Repeat, label: 'End-To-End Business Automation', color: PRIMARY },
        { icon: FileCheck, label: 'Clinical Documentation & Coding', color: PRIMARY },
        { icon: ShieldCheck, label: 'DataShield AI & Privacy Protection', color: PRIMARY },
    ]

    /* ── Section 02 warehouse tools ── */
    const warehouseTools = [
        { Icon: SiDatabricks, name: 'Databricks', iconColor: '#FF3621' },
        { Icon: SiSnowflake, name: 'Snowflake', iconColor: '#29B5E8' },
        { Icon: FaAws, name: 'AWS Glue', iconColor: '#FF9900' },
        { Icon: FaDatabase, name: 'ETL', iconColor: '#6B7280' },
        { Icon: SiApacheairflow, name: 'Airflow', iconColor: '#017CEE' },
        { Icon: FaMicrosoft, name: 'Azure Data Factory', iconColor: '#0078D4' },
    ]

    /** Scroll frames: order must match visual story top → bottom (table-driven). */
    const scrollRanges = useMemo(() => {
        const TOTAL = 117
        const next = createScrollFrameBuilder(TOTAL)
        const n = (count: number) => Array.from({ length: count }, () => next())

        return {
            mainTitle: next(),
            s01: {
                num: next(),
                title: next(),
                sub: next(),
            },
            logos: n(dataSources.length),
            dataTopLines: n(5),
            dataTypes: n(5),
            dataMid: {
                fan: n(5),
                dot: next(),
                stem: next(),
                arrow: next(),
            },
            mobileFeed: next(),
            s02: {
                num: next(),
                title: next(),
                sub: next(),
            },
            storage: next(),
            cloudTools: n(3),
            wh: {
                lines3: n(3),
                pd3: n(3),
                oval: next(),
                inner5: n(5),
                centerDot: next(),
                label: next(),
                badges: n(6),
            },
            whMobile: n(warehouseTools.length),
            connector: {
                mainV: next(),
                dot: next(),
                polyDown: next(),
                horiz: next(),
                polyRight: next(),
                reportLabel: next(),
            },
            s03: {
                num: next(),
                title: next(),
                sub: next(),
            },
            branch: {
                lines: n(3),
                polys: n(3),
            },
            /** 3 AI cards together → 3 stems together → 3 lower panels (hdr + lists) together */
            s03Cols: {
                topCards: next(),
                stems: next(),
                lowerPanels: next(),
            },
        }
    }, [dataSources.length, warehouseTools.length])

    const section01Ranges = useMemo(() => {
        const delayRatio = 0.45
        const delayedList = (ranges: [number, number][]) => ranges.map((r) => delayRangeStart(r, delayRatio))
        return {
            s01: {
                num: delayRangeStart(scrollRanges.s01.num, delayRatio),
                title: delayRangeStart(scrollRanges.s01.title, delayRatio),
                sub: delayRangeStart(scrollRanges.s01.sub, delayRatio),
            },
            logos: delayedList(scrollRanges.logos),
            dataTopLines: delayedList(scrollRanges.dataTopLines),
            dataTypes: delayedList(scrollRanges.dataTypes),
            dataMid: {
                fan: delayedList(scrollRanges.dataMid.fan),
                dot: delayRangeStart(scrollRanges.dataMid.dot, delayRatio),
                stem: delayRangeStart(scrollRanges.dataMid.stem, delayRatio),
                arrow: delayRangeStart(scrollRanges.dataMid.arrow, delayRatio),
            },
            mobileFeed: delayRangeStart(scrollRanges.mobileFeed, delayRatio),
        }
    }, [scrollRanges])

    const mobileRanges = useMemo(() => {
        const frame = 1 / 117
        const shiftForHiddenWarehouseDesktopFrames = -(20 * frame)
        const shiftForHiddenBranchAndStems = -(7 * frame)
        return {
            whMobile: scrollRanges.whMobile.map((r) => shiftRange(r, shiftForHiddenWarehouseDesktopFrames)),
            connector: {
                mainV: shiftRange(scrollRanges.connector.mainV, shiftForHiddenWarehouseDesktopFrames),
                dot: shiftRange(scrollRanges.connector.dot, shiftForHiddenWarehouseDesktopFrames),
                polyDown: shiftRange(scrollRanges.connector.polyDown, shiftForHiddenWarehouseDesktopFrames),
                horiz: shiftRange(scrollRanges.connector.horiz, shiftForHiddenWarehouseDesktopFrames),
                polyRight: shiftRange(scrollRanges.connector.polyRight, shiftForHiddenWarehouseDesktopFrames),
                reportLabel: shiftRange(scrollRanges.connector.reportLabel, shiftForHiddenWarehouseDesktopFrames),
            },
            s03Cols: {
                topCards: shiftRange(scrollRanges.s03Cols.topCards, shiftForHiddenWarehouseDesktopFrames + shiftForHiddenBranchAndStems),
                lowerPanels: shiftRange(scrollRanges.s03Cols.lowerPanels, shiftForHiddenWarehouseDesktopFrames + shiftForHiddenBranchAndStems),
            },
        }
    }, [scrollRanges])

    return (
        <ArchitectureRevealContext.Provider value={{ revealProgress }}>
            <section
                ref={sectionRef}
                id="architecture"
                aria-labelledby="architecture-heading"
                className="aa-section relative overflow-hidden bg-[var(--aa-surface-soft)]"
            >
                <div className="aa-container">

                    {/* ────────────── Main Heading (pill highlight like About) ────────────── */}
                    <FadeIn range={scrollRanges.mainTitle} className="mb-16 text-center sm:mb-20 lg:mb-28">
                        <h2
                            id="architecture-heading"
                            className={`${fontHeading} text-balance text-3xl font-extrabold leading-tight tracking-[-0.02em] text-[var(--aa-text-strong)] sm:text-4xl lg:text-[2.65rem]`}
                        >
                            Our End to End{' '}
                            <span
                                className="rounded-sm px-2 py-0.5 text-white"
                                style={{ backgroundColor: 'var(--aa-primary)' }}
                            >
                                Data Analytics Solutions
                            </span>
                        </h2>
                    </FadeIn>


                    {/* ═══════════════════════════════════════════
            SECTION 01 — DATA SOURCES (VERTICAL)
            ═══════════════════════════════════════════ */}
                    <div className="mb-0">
                        <SectionHeader
                            number="01"
                            title="Data Sources"
                            subtitle="Capturing multi-channel data across E-commerce, Social, and CRM platforms."
                            center
                            ranges={{
                                number: section01Ranges.s01.num,
                                title: section01Ranges.s01.title,
                                subtitle: section01Ranges.s01.sub,
                            }}
                        />

                        {/* Logo Grid */}
                        <div className="max-w-4xl mx-auto mb-10">
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                                {dataSources.map((src, i) => (
                                    <LogoCard key={src.name} name={src.name} Icon={src.Icon} color={src.color} range={section01Ranges.logos[i]!} />
                                ))}
                            </div>
                        </div>

                        {/* Data Type Tags + animated orange lines flowing down from grid */}
                        <div className="relative max-w-4xl mx-auto flex flex-col items-center">
                            <svg className="w-full h-16 pointer-events-none hidden lg:block overflow-visible" viewBox="0 0 800 64" preserveAspectRatio="none">
                                <DrawLine d="M 400 0 C 400 40, 150 20, 150 64" range={section01Ranges.dataTopLines[0]!} color={PRIMARY} strokeWidth={2} />
                                <DrawLine d="M 400 0 C 400 40, 300 20, 300 64" range={section01Ranges.dataTopLines[1]!} color={PRIMARY} strokeWidth={2} />
                                <DrawLine d="M 400 0 L 400 64" range={section01Ranges.dataTopLines[2]!} color={PRIMARY} strokeWidth={2.5} isSolid />
                                <DrawLine d="M 400 0 C 400 40, 500 20, 500 64" range={section01Ranges.dataTopLines[3]!} color={PRIMARY} strokeWidth={2} />
                                <DrawLine d="M 400 0 C 400 40, 650 20, 650 64" range={section01Ranges.dataTopLines[4]!} color={PRIMARY} strokeWidth={2} />
                            </svg>

                            <div className="relative z-10 grid w-full grid-cols-2 gap-3 px-4 sm:grid-cols-3 md:grid-cols-5 lg:-mt-1">
                                {dataTypes.map((dt, i) => (
                                    <DataTypeTag key={dt} label={dt} range={section01Ranges.dataTypes[i]!} />
                                ))}
                            </div>

                            <div className="relative w-full h-[120px]">
                                <svg className="w-full h-full pointer-events-none hidden lg:block overflow-visible" viewBox="0 0 800 120" preserveAspectRatio="none">
                                    <DrawLine d="M 150 0 C 150 40, 400 30, 400 60" range={section01Ranges.dataMid.fan[0]!} color={PRIMARY} strokeWidth={2} />
                                    <DrawLine d="M 300 0 C 300 40, 400 30, 400 60" range={section01Ranges.dataMid.fan[1]!} color={PRIMARY} strokeWidth={2} />
                                    <DrawLine d="M 400 0 L 400 60" range={section01Ranges.dataMid.fan[2]!} color={PRIMARY} strokeWidth={2.5} isSolid />
                                    <DrawLine d="M 500 0 C 500 40, 400 30, 400 60" range={section01Ranges.dataMid.fan[3]!} color={PRIMARY} strokeWidth={2} />
                                    <DrawLine d="M 650 0 C 650 40, 400 30, 400 60" range={section01Ranges.dataMid.fan[4]!} color={PRIMARY} strokeWidth={2} />

                                    <PulseDot cx={400} cy={60} range={section01Ranges.dataMid.dot} color={PRIMARY} />

                                    <DrawLine d="M 400 60 L 400 130" range={section01Ranges.dataMid.stem} color={PRIMARY} strokeWidth={2.5} isSolid />
                                    <ScrollPolygon points="394,124 400,132 406,124" fill={PRIMARY} range={section01Ranges.dataMid.arrow} />
                                </svg>

                                <FadeIn range={section01Ranges.mobileFeed} className="relative z-10 mt-6 flex justify-center lg:hidden">
                                    <div className={`${fontBody} rounded-[var(--aa-radius-lg)] border border-[var(--aa-primary)] bg-[color-mix(in_srgb,var(--aa-primary)_10%,transparent)] px-5 py-2 text-sm font-bold tracking-wide text-[var(--aa-primary)] shadow-[var(--aa-shadow-sm)]`}>
                                        → Feeds into Warehouse layer
                                    </div>
                                </FadeIn>
                            </div>
                        </div>
                    </div>


                    {/* ═══════════════════════════════════════════
            SECTION 02 — SINGLE SOURCE OF TRUTH
            ═══════════════════════════════════════════ */}
                    <div className="mb-0">
                        <SectionHeader
                            number="02"
                            title={<>Single source of truth to query<br className="hidden md:block" /> all your data</>}
                            subtitle="Processing and centralizing data into high-performance cloud warehouses for a Single Source of Truth."
                            center
                            ranges={{
                                number: scrollRanges.s02.num,
                                title: scrollRanges.s02.title,
                                subtitle: scrollRanges.s02.sub,
                            }}
                        />

                        {/* Storage layer label */}
                        <div className="flex justify-center mb-6">
                            <FadeIn range={scrollRanges.storage}>
                                <div className={`${fontBody} rounded-[var(--aa-radius-lg)] border-2 border-[var(--aa-border)] bg-[var(--aa-surface)] px-5 py-2 text-sm font-bold text-[var(--aa-text-strong)] shadow-[var(--aa-shadow-sm)]`}>Storage layer</div>
                            </FadeIn>
                        </div>

                        {/* Cloud Providers */}
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <ToolBadge Icon={SiGooglecloud} name="GCP GCS" iconColor="#4285F4" range={scrollRanges.cloudTools[0]!} />
                            <ToolBadge Icon={FaMicrosoft} name="Azure Blob" iconColor="#0078D4" range={scrollRanges.cloudTools[1]!} />
                            <ToolBadge Icon={FaAws} name="Amazon S3" iconColor="#FF9900" range={scrollRanges.cloudTools[2]!} />
                        </div>

                        {/* ── Desktop Oval Diagram ── */}
                        <div className="relative max-w-[900px] mx-auto hidden lg:block" style={{ height: 440 }}>
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 900 440">
                                <DrawLine d="M 250 0 L 250 40 Q 250 100, 345 113" range={scrollRanges.wh.lines3[0]!} color={PRIMARY} isSolid strokeWidth={2} />
                                <DrawLine d="M 450 0 L 450 105" range={scrollRanges.wh.lines3[1]!} color={PRIMARY} isSolid strokeWidth={2} />
                                <DrawLine d="M 650 0 L 650 40 Q 650 100, 555 113" range={scrollRanges.wh.lines3[2]!} color={PRIMARY} isSolid strokeWidth={2} />
                                <PulseDot cx={250} cy={10} range={scrollRanges.wh.pd3[0]!} color={PRIMARY} />
                                <PulseDot cx={450} cy={10} range={scrollRanges.wh.pd3[1]!} color={PRIMARY} />
                                <PulseDot cx={650} cy={10} range={scrollRanges.wh.pd3[2]!} color={PRIMARY} />

                                <ScrollEllipse cx={450} cy={260} rx={290} ry={155} stroke="var(--aa-border)" strokeWidth={2.5} range={scrollRanges.wh.oval} />

                                <DrawLine d="M 306 180 L 420 260" range={scrollRanges.wh.inner5[0]!} color="var(--aa-text-muted)" isSolid strokeWidth={1.5} />
                                <DrawLine d="M 558 180 L 480 260" range={scrollRanges.wh.inner5[1]!} color="var(--aa-text-muted)" isSolid strokeWidth={1.5} />
                                <DrawLine d="M 230 280 L 410 280" range={scrollRanges.wh.inner5[2]!} color="var(--aa-text-muted)" isSolid strokeWidth={1.5} />
                                <DrawLine d="M 490 280 L 620 280" range={scrollRanges.wh.inner5[3]!} color="var(--aa-text-muted)" isSolid strokeWidth={1.5} />
                                <DrawLine d="M 450 310 L 450 370" range={scrollRanges.wh.inner5[4]!} color="var(--aa-text-muted)" isSolid strokeWidth={1.5} />

                                <PulseDot cx={450} cy={275} range={scrollRanges.wh.centerDot} color={PRIMARY} />
                            </svg>

                            {/* Warehouse layer label */}
                            <div className="absolute z-10" style={{ left: '50%', top: '29%', transform: 'translate(-50%, -50%)' }}>
                                <FadeIn range={scrollRanges.wh.label}>
                                    <div className={`${fontHeading} rounded border border-[var(--aa-border)] bg-[var(--aa-surface-soft)] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--aa-text-strong)]`}>Warehouse layer</div>
                                </FadeIn>
                            </div>

                            {/* Tool badges */}
                            <div className="absolute z-10" style={{ left: '34%', top: '38%', transform: 'translate(-50%, -50%)' }}>
                                <ToolBadge Icon={SiDatabricks} name="Databricks" iconColor="#FF3621" range={scrollRanges.wh.badges[0]!} />
                            </div>
                            <div className="absolute z-10" style={{ left: '62%', top: '38%', transform: 'translate(-50%, -50%)' }}>
                                <ToolBadge Icon={SiSnowflake} name="Snowflake" iconColor="#29B5E8" range={scrollRanges.wh.badges[1]!} />
                            </div>
                            <div className="absolute z-10" style={{ left: '22%', top: '64%', transform: 'translate(-50%, -50%)' }}>
                                <ToolBadge Icon={FaAws} name="AWS Glue" iconColor="#FF9900" range={scrollRanges.wh.badges[2]!} />
                            </div>
                            <div className="absolute z-10" style={{ left: '50%', top: '64%', transform: 'translate(-50%, -50%)' }}>
                                <FadeIn range={scrollRanges.wh.badges[3]!}>
                                    <div className={`${fontBody} flex items-center gap-2 rounded-[var(--aa-radius-xl)] border-2 border-[var(--aa-border)] bg-[var(--aa-surface)] px-5 py-3 shadow-[var(--aa-shadow-md)]`}>
                                        <FaDatabase size={22} color="#64748b" />
                                        <span className="text-[14px] font-bold text-[var(--aa-text-strong)]">ETL</span>
                                    </div>
                                </FadeIn>
                            </div>
                            <div className="absolute z-10" style={{ left: '76%', top: '64%', transform: 'translate(-50%, -50%)' }}>
                                <ToolBadge Icon={SiApacheairflow} name="Airflow" iconColor="#017CEE" range={scrollRanges.wh.badges[4]!} />
                            </div>
                            <div className="absolute z-10" style={{ left: '50%', top: '90%', transform: 'translate(-50%, -50%)' }}>
                                <ToolBadge Icon={FaMicrosoft} name="Azure Data Factory" iconColor="#0078D4" range={scrollRanges.wh.badges[5]!} />
                            </div>
                        </div>

                        {/* ── Mobile warehouse layout ── */}
                        <div className="lg:hidden mt-6">
                            <div className="text-center mb-4">
                                <span className={`${fontBody} rounded-[var(--aa-radius-lg)] border border-[var(--aa-border)] bg-[var(--aa-surface)] px-4 py-1.5 text-sm font-bold text-[var(--aa-text-strong)] shadow-[var(--aa-shadow-sm)]`}>Warehouse layer</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3 pb-4">
                                {warehouseTools.map((t, i) => (
                                    <ToolBadge key={t.name} Icon={t.Icon} name={t.name} iconColor={t.iconColor} range={isMobile ? mobileRanges.whMobile[i]! : scrollRanges.whMobile[i]!} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ─── CONNECTOR 02 → 03 ─── */}
                    <SectionConnector ranges={isMobile ? mobileRanges.connector : scrollRanges.connector} />


                    {/* ═══════════════════════════════════════════
            SECTION 03 — END TO END AI SOLUTIONS
            ═══════════════════════════════════════════ */}
                    <div className="relative mt-8">
                        <SectionHeader
                            number="03"
                            title={<span className="text-[var(--aa-primary)]">End to End AI solutions</span>}
                            subtitle={<span className="text-[var(--aa-text-strong)]">Empower Your Business with Predictive Insights, Precision Decisions, and Seamless AI Automation.</span>}
                            center
                            ranges={{
                                number: scrollRanges.s03.num,
                                title: scrollRanges.s03.title,
                                subtitle: scrollRanges.s03.sub,
                            }}
                        />

                        <div className="w-full relative mt-8 lg:-mt-4">

                            {/* Header to Columns Branching Animation */}
                            <div className="w-full h-24 hidden lg:block relative mb-6">
                                <svg className="w-full h-full pointer-events-none" viewBox="0 0 1200 96" preserveAspectRatio="none">
                                    <DrawLine d="M 600 0 C 600 50, 200 50, 200 96" range={scrollRanges.branch.lines[0]!} color={PRIMARY} strokeWidth={2.5} />
                                    <ScrollPolygon points="194,88 200,96 206,88" fill={PRIMARY} range={scrollRanges.branch.polys[0]!} />

                                    <DrawLine d="M 600 0 L 600 96" range={scrollRanges.branch.lines[1]!} color={PRIMARY} strokeWidth={2.5} isSolid />
                                    <ScrollPolygon points="594,88 600,96 606,88" fill={PRIMARY} range={scrollRanges.branch.polys[1]!} />

                                    <DrawLine d="M 600 0 C 600 50, 1000 50, 1000 96" range={scrollRanges.branch.lines[2]!} color={PRIMARY} strokeWidth={2.5} />
                                    <ScrollPolygon points="994,88 1000,96 1006,88" fill={PRIMARY} range={scrollRanges.branch.polys[2]!} />
                                </svg>
                            </div>

                            {/* 3-Column Vertical Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">

                                {/* Column 1: Dynamic Dashboards */}
                                <div className="flex flex-col items-center w-full">
                                    <div className="w-full">
                                        <AISolutionCard icon={LayoutDashboard} title="Dynamic Dashboards" description="When data speaks early, business wins faster — predictive dashboards drive performance and prevent risk" range={isMobile ? mobileRanges.s03Cols.topCards : scrollRanges.s03Cols.topCards} />
                                    </div>
                                    <div className="w-full h-16 hidden lg:block overflow-visible relative -mt-3 mb-2 z-0">
                                        <svg className="w-full h-full pointer-events-none" viewBox="0 0 100 64" preserveAspectRatio="none">
                                            <DrawLine d="M 50 0 L 50 64" color={PRIMARY} range={scrollRanges.s03Cols.stems} strokeWidth={2} />
                                            <ScrollPolygon points="46,58 50,64 54,58" fill={PRIMARY} range={scrollRanges.s03Cols.stems} />
                                        </svg>
                                    </div>
                                    <div className={`${fontBody} relative z-10 mt-4 flex h-[calc(100%-1rem)] w-full min-h-[18rem] flex-col rounded-[var(--aa-radius-2xl)] border border-[var(--aa-border)] bg-[var(--aa-surface)] p-4 shadow-[var(--aa-shadow-sm)] lg:mt-0 lg:min-h-[22rem]`}>
                                        <FadeIn range={isMobile ? mobileRanges.s03Cols.lowerPanels : scrollRanges.s03Cols.lowerPanels} className="mb-4 text-center">
                                            <h4 className={`${fontHeading} mx-auto w-fit rounded-md border border-[var(--aa-border)] bg-[color-mix(in_srgb,var(--aa-primary)_8%,transparent)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[var(--aa-primary)]`}>Dashboard Solutions</h4>
                                        </FadeIn>
                                        <div className="flex flex-col gap-1">
                                            {aiSolutions1.map((s) => (
                                                <SolutionItem key={s.label} icon={s.icon} label={s.label} color={s.color} range={isMobile ? mobileRanges.s03Cols.lowerPanels : scrollRanges.s03Cols.lowerPanels} />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Column 2: Predictive Models */}
                                <div className="flex flex-col items-center w-full">
                                    <div className="w-full">
                                        <AISolutionCard icon={Sparkles} title="Predictive Models" description="Predict smarter, act faster, and lead with confidence - From prediction to performance, unlock real-time intelligence" range={isMobile ? mobileRanges.s03Cols.topCards : scrollRanges.s03Cols.topCards} />
                                    </div>
                                    <div className="w-full h-16 hidden lg:block overflow-visible relative -mt-3 mb-2 z-0">
                                        <svg className="w-full h-full pointer-events-none" viewBox="0 0 100 64" preserveAspectRatio="none">
                                            <DrawLine d="M 50 0 L 50 64" color={PRIMARY} range={scrollRanges.s03Cols.stems} strokeWidth={2} />
                                            <ScrollPolygon points="46,58 50,64 54,58" fill={PRIMARY} range={scrollRanges.s03Cols.stems} />
                                        </svg>
                                    </div>
                                    <div className={`${fontBody} relative z-10 mt-4 flex h-[calc(100%-1rem)] w-full min-h-[18rem] flex-col rounded-[var(--aa-radius-2xl)] border border-[var(--aa-border)] bg-[var(--aa-surface)] p-4 shadow-[var(--aa-shadow-sm)] lg:mt-0 lg:min-h-[22rem]`}>
                                        <FadeIn range={isMobile ? mobileRanges.s03Cols.lowerPanels : scrollRanges.s03Cols.lowerPanels} className="mb-4 text-center">
                                            <h4 className={`${fontHeading} mx-auto w-fit rounded-md border border-[var(--aa-border)] bg-[color-mix(in_srgb,var(--aa-primary)_8%,transparent)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[var(--aa-primary)]`}>Predictive Solutions</h4>
                                        </FadeIn>
                                        <div className="flex flex-col gap-1">
                                            {aiSolutions2.map((s) => (
                                                <SolutionItem key={s.label} icon={s.icon} label={s.label} color={s.color} range={isMobile ? mobileRanges.s03Cols.lowerPanels : scrollRanges.s03Cols.lowerPanels} />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Column 3: Agentic AI Automations */}
                                <div className="flex flex-col items-center w-full">
                                    <div className="w-full">
                                        <AISolutionCard icon={Bot} title="Agentic AI Automations" description="Agentic AI doesn't just assist — it acts. Our intelligent agents automate decisions and execute workflows." range={isMobile ? mobileRanges.s03Cols.topCards : scrollRanges.s03Cols.topCards} />
                                    </div>
                                    <div className="w-full h-16 hidden lg:block overflow-visible relative -mt-3 mb-2 z-0">
                                        <svg className="w-full h-full pointer-events-none" viewBox="0 0 100 64" preserveAspectRatio="none">
                                            <DrawLine d="M 50 0 L 50 64" color={PRIMARY} range={scrollRanges.s03Cols.stems} strokeWidth={2} />
                                            <ScrollPolygon points="46,58 50,64 54,58" fill={PRIMARY} range={scrollRanges.s03Cols.stems} />
                                        </svg>
                                    </div>
                                    <div className={`${fontBody} relative z-10 mt-4 flex h-[calc(100%-1rem)] w-full min-h-[18rem] flex-col rounded-[var(--aa-radius-2xl)] border border-[var(--aa-border)] bg-[var(--aa-surface)] p-4 shadow-[var(--aa-shadow-sm)] lg:mt-0 lg:min-h-[22rem]`}>
                                        <FadeIn range={isMobile ? mobileRanges.s03Cols.lowerPanels : scrollRanges.s03Cols.lowerPanels} className="mb-4 text-center">
                                            <h4 className={`${fontHeading} mx-auto w-fit rounded-md border border-[var(--aa-primary)] bg-[color-mix(in_srgb,var(--aa-primary)_8%,transparent)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[var(--aa-primary)]`}>Agentic AI Solutions</h4>
                                        </FadeIn>
                                        <div className="flex flex-col gap-1">
                                            {aiSolutions3.map((s) => (
                                                <SolutionItem key={s.label} icon={s.icon} label={s.label} color={s.color} range={isMobile ? mobileRanges.s03Cols.lowerPanels : scrollRanges.s03Cols.lowerPanels} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </ArchitectureRevealContext.Provider>
    )
}

export default Architecture
