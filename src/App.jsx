import { useState } from "react";

const SANS  = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
const BG    = '#11100E';
const SURF  = '#1A1816';
const SURF2 = '#211F1D';
const BOR   = 'rgba(255,255,255,0.06)';
const BORM  = 'rgba(255,255,255,0.1)';
const TEXT  = '#F0EBE4';
const TSUB  = '#B0A89E';
const TMUTE = '#7D766E';
const ACCENT  = '#F59E0B';
const ACCENTB = 'rgba(245,158,11,0.1)';
const ACCENTD = '#D97706';
const GRN   = '#22C55E';
const GRNB  = 'rgba(34,197,94,0.1)';

const MOCK_LINES = [
  { speaker: 'Priya',  color: ACCENT,     time: '00:00', text: 'Most podcasters never use 80% of what they record.' },
  { speaker: 'Arjun',  color: '#7C3AED', time: '00:08', text: 'Because going back to find a specific moment costs more time than it saves.' },
  { speaker: 'Priya',  color: ACCENT,     time: '00:15', text: "Exactly. If it's not in your notes from the day, it's gone." },
  { speaker: 'Arjun',  color: '#7C3AED', time: '00:24', text: 'The timestamp search alone saves me four hours a week.' },
];

const SPECS = [
  { val: '99.5%', label: 'Accuracy',            sub: 'Across accents, industries, and audio quality' },
  { val: '50+',   label: 'Languages supported',  sub: 'Auto-detected or set manually' },
  { val: '10',    label: 'Speakers per file',     sub: 'Automatically identified and labelled' },
  { val: '2–5',   label: 'Minutes to process',   sub: 'Most files processed before you finish your coffee' },
];

const HOW_STEPS = [
  { n: '01', icon: 'ti-upload',       title: 'Upload your file',         body: 'Any audio or video file, up to 1GB.' },
  { n: '02', icon: 'ti-cpu',          title: 'We process it',            body: '99.5% accuracy. Speaker-labelled. Timestamped. In minutes.' },
  { n: '03', icon: 'ti-file-export',  title: 'Export and use it',        body: 'Download TXT, SRT, or DOCX. Plug into your workflow via API.' },
];

const FOR_WHO = [
  {
    icon: 'ti-microphone-2',
    who: 'Podcast producers',
    headline: 'Turn every episode into content that works for weeks.',
    body: "You record an hour. You use ten minutes. MediaScriber unlocks the rest — show notes, clips, transcripts that keep your episode working long after it airs.",
    tags: ['Show notes', 'Clip selection', 'SEO content', 'Guest quotes'],
  },
  {
    icon: 'ti-news',
    who: 'Journalists and researchers',
    headline: "Every source. Every word. Accounted for.",
    body: "Every interview becomes a timestamped, speaker-labelled record you can search and export. No more scrubbing through audio for the right quote.",
    tags: ['Interview records', 'Speaker attribution', 'Source verification', 'Archive search'],
  },
  {
    icon: 'ti-video',
    who: 'Video creators',
    headline: 'Captions, scripts, subtitles. One upload.',
    body: "Upload once. Get SRT captions, DOCX transcripts, and TXT metadata. Your library becomes searchable overnight.",
    tags: ['Auto-captions', 'Subtitle files', 'Script export', 'SEO metadata'],
  },
  {
    icon: 'ti-building',
    who: 'Teams and agencies',
    headline: 'Volume transcription. Zero overhead.',
    body: "Shared workspaces, bulk uploads, and API access for teams that transcribe at scale.",
    tags: ['Bulk processing', 'Team workspace', 'API access', 'Usage controls'],
  },
];

const TIERS = [
  {
    name: 'Free',         price: '$0',   period: 'forever',
    note: '30 min per file · 5 files/mo · No card needed',
    cta: 'Start free', prime: false,
    items: ['30 min / file', '5 transcriptions / month', 'TXT export', 'Email support'],
  },
  {
    name: 'Starter',      price: '$19',  period: 'per month',
    note: 'No frills. All the essentials.',
    cta: 'Try Starter', prime: false,
    items: ['300 min / month', '3 concurrent jobs', 'All export formats', 'Speaker diarization', 'Priority support'],
  },
  {
    name: 'Growth',       price: '$35',  period: 'per month',
    note: 'Best value for growing creators and teams',
    cta: 'Get Growth', prime: false,
    items: ['800 min / month', '5 concurrent jobs', 'All exports + API', 'Speaker diarization', 'Up to 5 members'],
  },
  {
    name: 'Professional', price: '$59',  period: 'per month',
    note: 'Built for production workflows and heavy usage',
    cta: 'Go Professional', prime: true,
    items: ['2,000 min / month', 'Unlimited concurrent jobs', 'All exports + API', 'Speaker diarization', 'Up to 10 members', 'Priority support'],
  },
  {
    name: 'Enterprise',   price: '$249', period: 'per month',
    note: 'Everything you need to transcribe at scale',
    cta: 'Contact sales', prime: false,
    items: ['Unlimited minutes', 'Unlimited members', 'Dedicated support', 'Custom integrations', 'SLA guarantee', 'Onboarding included'],
  },
];

const TESTIMONIALS = [
  { quote: "MediaScriber saves me 56 minutes per episode. The accuracy is better than what I was doing manually.", name: "Aryan V.", role: "Podcast Producer, 3 shows weekly" },
  { quote: "Speaker-labelled transcripts, delivered automatically. It changed how our team finds insights.", name: "Meera S.", role: "UX Research Lead" },
  { quote: "Every other tool mixes up who said what. MediaScriber gets it right — every single time.", name: "Kabir T.", role: "Independent Journalist" },
  { quote: "We connected the API to our video pipeline. Captions, transcripts, search — fully automated.", name: "Priya N.", role: "Head of Production, Media Agency" },
  { quote: "Over 200 lectures turned into a searchable archive in a weekend. My students actually use it now.", name: "Dr. Suresh R.", role: "Professor and Educator" },
];

const FAQS = [
  { q: "How accurate is MediaScriber?",                a: "99.5% on clear audio. We outperform Otter.ai and Rev across accents, industries, and real-world recording conditions." },
  { q: "How does speaker diarization work?",           a: "MediaScriber identifies and labels each unique voice — up to 10 speakers per file. Rename labels in the editor after transcription." },
  { q: "What file formats do you accept?",             a: "MP3, MP4, WAV, M4A, FLAC, OGG, WEBM, and most common formats. Maximum file size is 1GB." },
  { q: "How long does transcription take?",            a: "Most files process in 2–5 minutes. We'll notify you when your transcript is ready." },
  { q: "Is the API available on all plans?",           a: "Yes, on Growth, Professional, and Enterprise plans. Find your keys and docs in your account dashboard." },
  { q: "How does the free plan work?",                 a: "Five transcriptions per month, 30 minutes per file. No credit card required." },
  { q: "Is my content stored securely?",               a: "Encrypted in transit and at rest. You own your content. Delete files and transcripts anytime." },
  { q: "How is MediaScriber different from Otter?",    a: "Otter is built for live meetings. MediaScriber is optimised for recorded content — higher accuracy on pre-recorded files." },
  { q: "Can my team collaborate on transcripts?",      a: "Yes. Starter and above include team access. Enterprise includes unlimited members and guest access." },
  { q: "What languages are supported?",                a: "50+ languages. Auto-detected from your audio, or set manually before processing." },
  { q: "Can I cancel anytime?",                        a: "Yes. No contracts, no questions asked. Cancel from your account settings. Access continues until end of billing period." },
];

function Tag({ children }) {
  return (
    <div style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: ACCENT, marginBottom: 18 }}>
      {children}
    </div>
  );
}

function H2({ children, style = {} }) {
  return (
    <h2 style={{ fontFamily: SANS, fontSize: 32, fontWeight: 700, lineHeight: 1.2, color: TEXT, letterSpacing: '-0.02em', ...style }}>
      {children}
    </h2>
  );
}

export default function App() {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeWho, setActiveWho] = useState(0);

  const sec = { borderTop: `1px solid ${BOR}`, padding: '80px 32px' };
  const wrap = { maxWidth: 1040, margin: '0 auto' };
  const grid = (cols) => ({ display: 'grid', gridTemplateColumns: cols, gap: 2, background: BOR });

  return (
    <div style={{ background: BG, color: TEXT, fontFamily: SANS, minHeight: '100vh', lineHeight: 1.6 }}>
      <style>{`
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
        ::selection { background: ${ACCENT}22; }
        section[id] { scroll-margin-top: 60px; }

        .fade-up { animation: fadeUp 0.5s ease both; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

        .btn-pri { transition: all 0.2s ease; cursor: pointer; }
        .btn-pri:hover { transform: translateY(-1px); box-shadow: 0 4px 14px ${ACCENT}44; }
        .btn-pri:active { transform: translateY(0); }

        .btn-sec { transition: all 0.2s ease; cursor: pointer; }
        .btn-sec:hover { background: ${SURF} !important; }

        .btn-dark { transition: all 0.2s ease; cursor: pointer; }
        .btn-dark:hover { opacity: 0.85; transform: translateY(-1px); }

        .card-lift { transition: all 0.25s ease; }
        .card-lift:hover { transform: translateY(-3px); }

        .who-btn { transition: all 0.15s ease !important; }
        .who-btn:hover { border-color: ${ACCENT} !important; color: ${ACCENT} !important; }
        .nav-link { transition: color 0.15s ease; cursor: pointer; }
        .nav-link:hover { color: ${TEXT} !important; }

        @media (max-width: 1023px) {
          .hero-g { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 768px) {
          section { padding: 48px 20px !important; }
          h1 { font-size: 36px !important; }
          h2 { font-size: 26px !important; }
          .hero-b { flex-direction: column !important; align-items: center !important; }
          .hero-b button { width: 100% !important; max-width: 320px !important; }
          .specs-g { grid-template-columns: repeat(2,1fr) !important; }
          .steps-g { grid-template-columns: 1fr !important; }
          .who-p { grid-template-columns: 1fr !important; padding: 24px !important; }
          .ft-t { grid-template-columns: 1fr !important; text-align: center !important; padding: 28px !important; }
          .t-g { grid-template-columns: repeat(2,1fr) !important; }
          .p-g { grid-template-columns: repeat(2,1fr) !important; }
          .nav-d { display: none !important; }
        }
        @media (max-width: 480px) {
          .specs-g { grid-template-columns: 1fr !important; }
          .t-g { grid-template-columns: 1fr !important; }
          .p-g { grid-template-columns: 1fr !important; }
          h1 { font-size: 30px !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: `${BG}EE`, backdropFilter: 'blur(12px)', borderBottom: `1px solid ${BOR}`, padding: '0 32px' }}>
        <div style={{ ...wrap, display: 'flex', alignItems: 'center', height: 54 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 'auto' }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="ti ti-microphone" style={{ fontSize: 13, color: '#fff' }} />
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: TEXT, letterSpacing: '-0.02em' }}>MediaScriber</span>
          </div>
          <div className="nav-d" style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {['Features', 'How it Works', 'Pricing', 'FAQ'].map(l => (
              <span key={l} className="nav-link" style={{ fontSize: 13, color: TSUB, cursor: 'pointer' }} onClick={() => document.getElementById(l.toLowerCase().replace(' ', '-'))?.scrollIntoView({ behavior: 'smooth' })}>{l}</span>
            ))}
            <div style={{ width: 1, height: 16, background: BOR }} />
            <span style={{ fontSize: 13, color: TSUB, cursor: 'pointer' }}>Sign in</span>
            <button className="btn-dark" style={{ fontFamily: SANS, background: TEXT, color: BG, fontSize: 13, fontWeight: 600, border: 'none', padding: '10px 20px', borderRadius: 8, minHeight: 44 }}>
              Try it free →
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '120px 32px 80px', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 600px 400px at 50% 40%, ${ACCENT}15, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto' }}>
          <div className="fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: ACCENT, background: ACCENTB, padding: '5px 14px', borderRadius: 100, marginBottom: 28 }}>
            <i className="ti ti-sparkles" style={{ fontSize: 11 }} />
            99.5% accurate transcription
          </div>
          <h1 className="fade-up" style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.05, color: TEXT, marginBottom: 20, letterSpacing: '-0.03em' }}>
            Stop digging through hours<br />of audio. Find any quote,<br />any speaker, in seconds.
          </h1>
          <p className="fade-up" style={{ fontSize: 17, color: TSUB, lineHeight: 1.7, marginBottom: 36, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
            Upload audio or video. Get an accurate, speaker-labelled transcript in minutes — not hours.
          </p>
          <div className="fade-up hero-b" style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 16 }}>
            <button className="btn-pri" style={{ fontFamily: SANS, background: ACCENT, color: '#fff', fontSize: 15, fontWeight: 600, border: 'none', padding: '14px 28px', borderRadius: 8, minHeight: 48 }}>
              Transcribe your first file free
            </button>
            <button className="btn-sec" style={{ fontFamily: SANS, background: 'transparent', color: TSUB, fontSize: 15, border: `1px solid ${BORM}`, padding: '14px 24px', borderRadius: 8, minHeight: 48 }}>
              View pricing
            </button>
          </div>
          <p style={{ fontSize: 12, color: TMUTE }}>First 30 min free · No credit card · No software to install</p>
        </div>
      </section>

      {/* PRODUCT PREVIEW — transcript mock */}
      <section id="features" style={{ padding: '0 32px 96px', ...wrap }}>
        <div className="fade-up" style={{ background: SURF2, borderRadius: 16, overflow: 'hidden', boxShadow: '0 32px 96px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)', animationDelay: '0.15s' }}>
          <div style={{ padding: '12px 18px', background: '#181614', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            {['#FF5F57','#FEBC2E','#28C840'].map((c, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
            <span style={{ marginLeft: 8, fontSize: 11, color: '#555' }}>episode_247_final.mp3 · 58:32</span>
            <div style={{ marginLeft: 'auto', fontSize: 10, color: GRN, fontWeight: 600 }}>● Transcribed</div>
          </div>
          <div style={{ padding: '28px 28px 12px' }}>
            {MOCK_LINES.map((line, i) => (
              <div key={i} style={{ marginBottom: 20, opacity: i > 2 ? 0.5 : 1 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 5 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: line.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: line.color }}>{line.speaker}</span>
                  <span style={{ fontSize: 10, color: '#555' }}>{line.time}</span>
                </div>
                <p style={{ fontSize: 14, color: '#C0BCB4', lineHeight: 1.6, margin: 0, paddingLeft: 14 }}>{line.text}</p>
              </div>
            ))}
          </div>
          <div style={{ padding: '16px 28px 28px', display: 'flex', gap: 8 }}>
            {['.TXT', '.SRT', '.DOCX', 'API'].map((f, i) => (
              <div key={i} style={{ flex: 1, background: i === 0 ? ACCENT : SURF2, borderRadius: 8, padding: '10px 0', textAlign: 'center', cursor: 'pointer', border: i === 0 ? 'none' : `1px solid ${BOR}` }}>
                <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, color: i === 0 ? '#fff' : TMUTE }}>{f}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECS STRIP */}
      <div style={{ borderTop: `1px solid ${BOR}`, borderBottom: `1px solid ${BOR}`, background: SURF }}>
        <div className="specs-g" style={{ ...wrap, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          {SPECS.map((s, i) => (
            <div key={i} className="card-lift" style={{ padding: '28px 32px', borderRight: i < 3 ? `1px solid ${BOR}` : 'none' }}>
              <div style={{ fontSize: 30, fontWeight: 800, color: ACCENT, letterSpacing: '-0.03em', marginBottom: 4 }}>{s.val}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEXT, marginBottom: 3 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: TMUTE, lineHeight: 1.5 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={sec}>
        <div style={wrap}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
            <div>
              <Tag>How it works</Tag>
              <H2>Upload. Process. Use.<br />That's it.</H2>
            </div>
            <p style={{ fontSize: 14, color: TSUB, maxWidth: 260, textAlign: 'right', lineHeight: 1.65 }}>
              Three steps. No account. No learning curve. Just upload and go.
            </p>
          </div>
          <div className="steps-g" style={grid('repeat(3,1fr)')}>
            {HOW_STEPS.map((s, i) => (
              <div key={i} className={i === 1 ? '' : 'card-lift'} style={{ background: i === 1 ? ACCENT : SURF, padding: '36px 30px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ fontSize: 72, fontWeight: 800, color: i === 1 ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)', position: 'absolute', top: 8, right: 16, lineHeight: 1, letterSpacing: '-0.04em', userSelect: 'none' }}>{s.n}</div>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: i === 1 ? 'rgba(255,255,255,0.15)' : ACCENTB, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <i className={`ti ${s.icon}`} style={{ fontSize: 18, color: i === 1 ? '#fff' : ACCENT }} />
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: i === 1 ? '#fff' : TEXT, marginBottom: 10, letterSpacing: '-0.01em' }}>{s.title}</div>
                <div style={{ fontSize: 14, color: i === 1 ? 'rgba(255,255,255,0.72)' : TSUB, lineHeight: 1.65 }}>{s.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section style={sec}>
        <div style={wrap}>
          <div style={{ marginBottom: 36 }}>
            <Tag>Who it's for</Tag>
            <H2 style={{ marginBottom: 8 }}>Built for podcasters, journalists,<br />video creators, and teams.</H2>
            <p style={{ fontSize: 15, color: TSUB }}>If you record it, MediaScriber makes it searchable, shareable, and useful.</p>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
            {FOR_WHO.map((w, i) => (
              <button key={i} className="who-btn" onClick={() => setActiveWho(i)}
                style={{ fontFamily: SANS, display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 500, padding: '10px 18px', borderRadius: 8, minHeight: 44, border: `1px solid ${activeWho === i ? ACCENT : BORM}`, background: activeWho === i ? ACCENTB : 'transparent', color: activeWho === i ? ACCENT : TSUB, cursor: 'pointer', transition: 'all 0.15s' }}>
                <i className={`ti ${w.icon}`} style={{ fontSize: 14 }} />
                {w.who}
              </button>
            ))}
          </div>

          {/* Panel */}
          <div className="who-p" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, background: SURF, borderRadius: 12, padding: '40px 44px', alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: ACCENT, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>{FOR_WHO[activeWho].who}</div>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: TEXT, lineHeight: 1.25, marginBottom: 14, letterSpacing: '-0.02em' }}>
                {FOR_WHO[activeWho].headline}
              </h3>
              <p style={{ fontSize: 14, color: TSUB, lineHeight: 1.75, marginBottom: 24 }}>
                {FOR_WHO[activeWho].body}
              </p>
              <button className="btn-pri" style={{ fontFamily: SANS, background: ACCENT, color: '#fff', fontSize: 13, fontWeight: 600, border: 'none', padding: '10px 20px', borderRadius: 7, minHeight: 44 }}>
                Try it free →
              </button>
            </div>
            <div>
              <div style={{ fontSize: 11, color: TMUTE, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>What you use it for</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {FOR_WHO[activeWho].tags.map((tag, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px', background: BG, borderRadius: 8, border: `1px solid ${BOR}` }}>
                    <i className="ti ti-check" style={{ fontSize: 13, color: ACCENT, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: TEXT, fontWeight: 500 }}>{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={sec}>
        <div style={wrap}>
          <div style={{ marginBottom: 36 }}>
            <Tag>What our users say</Tag>
            <H2>Loved by creators, journalists,<br />and teams.</H2>
          </div>

          {/* Featured */}
          <div className="ft-t" style={{ background: SURF, borderRadius: 12, padding: '44px 52px', marginBottom: 2, display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 600, color: TEXT, lineHeight: 1.55, marginBottom: 20, letterSpacing: '-0.01em' }}>
                "{TESTIMONIALS[0].quote}"
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{TESTIMONIALS[0].name}</div>
              <div style={{ fontSize: 12, color: TMUTE }}>{TESTIMONIALS[0].role}</div>
            </div>
            <div style={{ display: 'flex', gap: 3, alignSelf: 'flex-start' }}>
              {[1,2,3,4,5].map(n => <i key={n} className="ti ti-star-filled" style={{ fontSize: 16, color: ACCENT }} />)}
            </div>
          </div>

          {/* 4 smaller */}
          <div className="t-g" style={grid('repeat(4,1fr)')}>
            {TESTIMONIALS.slice(1).map((t, i) => (
              <div key={i} className="card-lift" style={{ background: BG, padding: '24px 22px' }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
                  {[1,2,3,4,5].map(n => <i key={n} className="ti ti-star-filled" style={{ fontSize: 11, color: ACCENT }} />)}
                </div>
                <div style={{ fontSize: 13, color: TSUB, lineHeight: 1.72, marginBottom: 16 }}>"{t.quote}"</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{t.name}</div>
                <div style={{ fontSize: 11, color: TMUTE }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ ...sec, background: SURF }}>
        <div style={wrap}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 44 }}>
            <div>
              <Tag>Pricing</Tag>
              <H2>Simple, transparent pricing.</H2>
            </div>
            <p style={{ fontSize: 14, color: TSUB }}>No hidden fees. No surprises. Cancel anytime.</p>
          </div>
          <div className="p-g" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 2, background: BOR }}>
            {TIERS.map((t, i) => (
              <div key={i} className={t.prime ? '' : 'card-lift'} style={{ background: t.prime ? TEXT : BG, padding: '28px 20px', position: 'relative' }}>
                {t.prime && (
                  <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: ACCENT, color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 100, whiteSpace: 'nowrap', fontFamily: SANS }}>
                    Most popular
                  </div>
                )}
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: t.prime ? '#6A6860' : TMUTE, marginBottom: 10 }}>{t.name}</div>
                <div style={{ fontSize: 30, fontWeight: 800, color: t.prime ? '#18170F' : TEXT, letterSpacing: '-0.03em', marginBottom: 2 }}>{t.price}</div>
                <div style={{ fontSize: 12, color: t.prime ? '#A8A49C' : TMUTE, marginBottom: 16 }}>{t.period}</div>
                <div style={{ fontSize: 12, color: t.prime ? '#6A6860' : TSUB, lineHeight: 1.55, marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${t.prime ? 'rgba(0,0,0,0.08)' : BOR}` }}>{t.note}</div>
                {t.items.map((item, ii) => (
                  <div key={ii} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 9 }}>
                    <i className="ti ti-check" style={{ fontSize: 12, color: t.prime ? '#16A34A' : GRN, marginTop: 3, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: t.prime ? '#18170F' : TSUB, lineHeight: 1.45 }}>{item}</span>
                  </div>
                ))}
                <button className={t.prime ? 'btn-pri' : 'btn-sec'} style={{ fontFamily: SANS, width: '100%', background: t.prime ? ACCENT : 'transparent', color: t.prime ? '#fff' : TSUB, fontSize: 12, fontWeight: 600, border: `1px solid ${t.prime ? ACCENT : BORM}`, padding: '10px 0', borderRadius: 6, minHeight: 44, marginTop: 20 }}>
                  {t.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={sec}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 44 }}>
            <div>
              <Tag>FAQ</Tag>
              <H2>Common questions.</H2>
            </div>
            <span style={{ fontSize: 13, color: TMUTE }}>{FAQS.length} answers</span>
          </div>
          {FAQS.map((f, i) => (
            <div key={i} className="card-lift" style={{ background: SURF2, borderRadius: 12, padding: '18px 22px', marginBottom: 8, cursor: 'pointer', border: `1px solid ${BOR}` }} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: TEXT }}>{f.q}</span>
                <i className={`ti ${openFaq === i ? 'ti-minus' : 'ti-plus'}`} style={{ fontSize: 14, color: ACCENT, flexShrink: 0 }} />
              </div>
              {openFaq === i && <div style={{ fontSize: 14, color: TSUB, lineHeight: 1.72, marginTop: 12, paddingRight: 24 }}>{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ padding: '0 32px 96px', ...wrap }}>
        <div style={{ background: '#F4EFE8', borderRadius: 20, padding: '64px 48px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center', boxShadow: '0 32px 80px rgba(0,0,0,0.25)' }}>
          <div>
            <h2 style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.15, color: '#18170F', marginBottom: 12, letterSpacing: '-0.03em' }}>
              Your recordings hold more<br />
              <span style={{ color: ACCENTD }}>value than you're extracting</span><br />
              from them.
            </h2>
            <p style={{ fontSize: 14, color: '#6A6860', lineHeight: 1.65, marginBottom: 24 }}>
              Start with 30 minutes free. No credit card. No software.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['.MP3', '.MP4', '.WAV', '.M4A', '.FLAC', '+ more'].map((tag, i) => (
                <div key={i} style={{ fontSize: 11, fontWeight: 600, color: '#6A6860', background: 'rgba(0,0,0,0.05)', padding: '4px 12px', borderRadius: 100 }}>{tag}</div>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <button className="btn-pri" style={{ fontFamily: SANS, background: '#18170F', color: '#F4EFE8', fontSize: 15, fontWeight: 700, border: 'none', padding: '14px 32px', borderRadius: 10, minHeight: 48, marginBottom: 12, whiteSpace: 'nowrap' }}>
              Upload your first file →
            </button>
            <div style={{ fontSize: 12, color: '#A8A49C' }}>Free plan · No card · Cancel anytime</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${BOR}`, padding: '48px 32px 36px', background: BG }}>
        <div style={{ ...wrap, display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="ti ti-microphone" style={{ fontSize: 12, color: '#fff' }} />
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: TEXT, letterSpacing: '-0.02em' }}>MediaScriber</span>
            </div>
            <p style={{ fontSize: 12, color: TMUTE, lineHeight: 1.6, maxWidth: 240 }}>AI-powered transcription for creators, journalists, and teams.</p>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: TMUTE, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Product</div>
            {['Features', 'Pricing', 'API', 'Integrations'].map(l => (
              <div key={l} className="nav-link" style={{ fontSize: 13, color: TSUB, marginBottom: 8, cursor: 'pointer' }}>{l}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: TMUTE, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Company</div>
            {['Privacy Policy', 'Terms of Service', 'Contact'].map(l => (
              <div key={l} className="nav-link" style={{ fontSize: 13, color: TSUB, marginBottom: 8, cursor: 'pointer' }}>{l}</div>
            ))}
          </div>
        </div>
        <div style={{ ...wrap, borderTop: `1px solid ${BOR}`, marginTop: 32, paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: TMUTE }}>© 2026 Noesis Knowledge Solutions. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 16 }}>
            {['X', 'GitHub', 'LinkedIn'].map(s => (
              <span key={s} className="nav-link" style={{ fontSize: 11, color: TMUTE, cursor: 'pointer' }}>{s}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
