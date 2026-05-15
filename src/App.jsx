import { useState } from "react";

const SANS  = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
const BG    = '#FAFAF8';
const SURF  = '#F2F1EE';
const SURF2 = '#ECEAE5';
const BOR   = 'rgba(26,25,22,0.09)';
const BORM  = 'rgba(26,25,22,0.16)';
const TEXT  = '#18170F';
const TSUB  = '#6A6860';
const TMUTE = '#A8A49C';
const TEAL  = '#0D9488';
const TEALB = 'rgba(13,148,136,0.09)';
const TEALD = '#0A7A70';
const GRN   = '#16A34A';
const GRNB  = 'rgba(22,163,74,0.09)';

const MOCK_LINES = [
  { speaker: 'Priya',  color: TEAL,     time: '00:00', text: 'Most podcasters never use 80% of what they record.' },
  { speaker: 'Arjun',  color: '#7C3AED', time: '00:08', text: 'Because going back to find a specific moment costs more time than it saves.' },
  { speaker: 'Priya',  color: TEAL,     time: '00:15', text: "Exactly. If it's not in your notes from the day, it's gone." },
  { speaker: 'Arjun',  color: '#7C3AED', time: '00:24', text: 'The timestamp search alone saves me four hours a week.' },
];

const SPECS = [
  { val: '99.5%', label: 'Accuracy',            sub: 'Across accents, industries, and audio quality' },
  { val: '50+',   label: 'Languages supported',  sub: 'Auto-detected or set manually' },
  { val: '10',    label: 'Speakers per file',     sub: 'Automatically identified and labelled' },
  { val: '2–5',   label: 'Minutes to process',   sub: 'Most files processed before you finish your coffee' },
];

const HOW_STEPS = [
  { n: '01', icon: 'ti-upload',       title: 'Upload your file',         body: 'Any audio or video file, up to 1GB. No software, no account — just upload and go.' },
  { n: '02', icon: 'ti-cpu',          title: 'We process it',            body: '99.5% accuracy. Every speaker identified, every line timestamped. Delivered in minutes.' },
  { n: '03', icon: 'ti-file-export',  title: 'Export and use it',        body: 'Download TXT, SRT, or DOCX. Edit inline, search by speaker, or integrate via API.' },
];

const FOR_WHO = [
  {
    icon: 'ti-microphone-2',
    who: 'Podcast producers',
    headline: 'Turn every episode into content that works for weeks.',
    body: "You record an hour. You use ten minutes. MediaScriber unlocks the rest — show notes, clips, transcripts, a searchable archive. One episode. Weeks of useful content.",
    tags: ['Show notes', 'Clip selection', 'SEO content', 'Guest quotes'],
  },
  {
    icon: 'ti-news',
    who: 'Journalists and researchers',
    headline: "Every source. Every word. Accounted for.",
    body: "Every interview becomes a timestamped, speaker-labelled record you can search and export. No more scrubbing through audio for the right quote. It's exactly where you left it.",
    tags: ['Interview records', 'Speaker attribution', 'Source verification', 'Archive search'],
  },
  {
    icon: 'ti-video',
    who: 'Video creators',
    headline: 'Captions, scripts, subtitles. One upload.',
    body: "Upload once. Get SRT captions, DOCX transcripts, and TXT metadata in a single pass. Your entire video library becomes searchable — without manual work.",
    tags: ['Auto-captions', 'Subtitle files', 'Script export', 'SEO metadata'],
  },
  {
    icon: 'ti-building',
    who: 'Teams and agencies',
    headline: 'Volume transcription. Zero overhead.',
    body: "Shared workspaces, bulk uploads, usage controls, and API access built for teams that transcribe at scale. Predictable pricing as your volume grows.",
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
  { quote: "I used to budget an hour after every episode just for transcript cleanup. MediaScriber does it in four minutes — with better accuracy than my manual process. That's 56 minutes back per episode.", name: "Aryan V.", role: "Podcast Producer, 3 shows weekly" },
  { quote: "Fifteen to twenty research interviews a month. Speaker-labelled transcripts, delivered automatically. It changed how our team finds insights. We catch patterns we used to miss.", name: "Meera S.", role: "UX Research Lead" },
  { quote: "I interview two to three guests per episode. Every other tool mixes up who said what. MediaScriber gets it right — every single time.", name: "Kabir T.", role: "Independent Journalist" },
  { quote: "We connected the MediaScriber API to our video pipeline. Captions, transcripts, search — fully automated. Our editors stopped asking for better tools and started shipping faster.", name: "Priya N.", role: "Head of Production, Media Agency" },
  { quote: "Over 200 recorded lectures. MediaScriber turned all of them into a searchable archive — in a weekend. My students actually search the archive now. That never happened before.", name: "Dr. Suresh R.", role: "Professor and Educator" },
];

const FAQS = [
  { q: "How accurate is MediaScriber?",                a: "99.5% on clear audio. We outperform automated transcription from Otter.ai and Rev across accents, industries, and real-world recording conditions." },
  { q: "How does speaker diarization work?",           a: "MediaScriber automatically identifies and labels each unique voice — up to 10 speakers per file. Rename labels in the editor after transcription." },
  { q: "What file formats do you accept?",             a: "MP3, MP4, WAV, M4A, FLAC, OGG, WEBM, and most common audio and video formats. Maximum file size is 1GB." },
  { q: "How long does transcription take?",            a: "Most files process in 2–5 minutes. We'll notify you when your transcript is ready." },
  { q: "Is the API available on all plans?",           a: "API access is included on Growth, Professional, and Enterprise plans. Find your keys and documentation in your account dashboard." },
  { q: "How does the free plan work?",                 a: "Five transcriptions per month, 30 minutes per file. No credit card required. Designed for you to test on real files before you commit." },
  { q: "Is my content stored securely?",               a: "Encrypted in transit and at rest. You own your content. Delete files and transcripts from your dashboard anytime." },
  { q: "How is MediaScriber different from Otter?",    a: "Otter is built for live meetings. MediaScriber is optimised for recorded content — higher accuracy on pre-recorded files, with speaker diarization included on every paid plan." },
  { q: "Can my team collaborate on transcripts?",      a: "Yes. Starter and above include team access. Enterprise includes unlimited members with guest access from a shared workspace." },
  { q: "What languages are supported?",                a: "50+ languages. Auto-detected from your audio, or set manually before processing." },
  { q: "Can I cancel anytime?",                        a: "Yes. No contracts. Cancel from your account settings — access continues until the end of your billing period." },
];

function Tag({ children }) {
  return (
    <div style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: TEAL, marginBottom: 18 }}>
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
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 2px; }
        .who-btn:hover { border-color: ${TEAL} !important; color: ${TEAL} !important; }
        .nav-link:hover { color: ${TEXT} !important; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: `${BG}EE`, backdropFilter: 'blur(12px)', borderBottom: `1px solid ${BOR}`, padding: '0 32px' }}>
        <div style={{ ...wrap, display: 'flex', alignItems: 'center', height: 54 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 'auto' }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: TEAL, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="ti ti-microphone" style={{ fontSize: 13, color: '#fff' }} />
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: TEXT, letterSpacing: '-0.02em' }}>MediaScriber</span>
          </div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {['Features', 'How it Works', 'Pricing', 'FAQ'].map(l => (
              <span key={l} className="nav-link" style={{ fontSize: 13, color: TSUB, cursor: 'pointer' }}>{l}</span>
            ))}
            <div style={{ width: 1, height: 16, background: BOR }} />
            <span style={{ fontSize: 13, color: TSUB, cursor: 'pointer' }}>Sign in</span>
            <button style={{ fontFamily: SANS, background: TEXT, color: BG, fontSize: 13, fontWeight: 600, border: 'none', padding: '8px 16px', borderRadius: 7, cursor: 'pointer' }}>
              Try it free →
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: '72px 32px 80px', ...wrap }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

          {/* LEFT */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: TEAL, background: TEALB, padding: '4px 12px', borderRadius: 100, marginBottom: 24 }}>
              <i className="ti ti-sparkles" style={{ fontSize: 11 }} />
              99.5% accurate transcription
            </div>
            <h1 style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.1, color: TEXT, marginBottom: 20, letterSpacing: '-0.03em' }}>
              Stop digging through hours<br />of audio. Find any quote,<br />any speaker, in seconds.
            </h1>
            <p style={{ fontSize: 16, color: TSUB, lineHeight: 1.7, marginBottom: 12, maxWidth: 420 }}>
              Upload audio or video. Get an accurate, speaker-labelled transcript in minutes — not hours.
            </p>
            <p style={{ fontSize: 15, color: TMUTE, lineHeight: 1.65, marginBottom: 32, maxWidth: 420 }}>
              MediaScriber identifies who said what, timestamps every line, and exports in the format you need. Your recordings keep working long after they end.
            </p>
            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
              <button style={{ fontFamily: SANS, background: TEAL, color: '#fff', fontSize: 14, fontWeight: 600, border: 'none', padding: '12px 24px', borderRadius: 8, cursor: 'pointer' }}>
                Transcribe your first file free
              </button>
              <button style={{ fontFamily: SANS, background: 'transparent', color: TSUB, fontSize: 14, border: `1px solid ${BORM}`, padding: '12px 20px', borderRadius: 8, cursor: 'pointer' }}>
                View pricing
              </button>
            </div>
            <p style={{ fontSize: 12, color: TMUTE }}>First 30 min free · No credit card · No software to install</p>
          </div>

          {/* RIGHT — transcript mock */}
          <div style={{ background: '#111', borderRadius: 14, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }}>
            <div style={{ padding: '11px 16px', background: '#1A1A1A', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid #2A2A2A' }}>
              {['#FF5F57','#FEBC2E','#28C840'].map((c, i) => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
              ))}
              <span style={{ marginLeft: 8, fontSize: 11, color: '#555' }}>episode_247_final.mp3 · 58:32</span>
              <div style={{ marginLeft: 'auto', fontSize: 10, color: GRN, fontWeight: 600 }}>● Transcribed</div>
            </div>
            <div style={{ padding: '22px 22px 10px' }}>
              {MOCK_LINES.map((line, i) => (
                <div key={i} style={{ marginBottom: 18, opacity: i > 2 ? 0.55 : 1 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 5 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: line.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: line.color }}>{line.speaker}</span>
                    <span style={{ fontSize: 10, color: '#3A3A3A' }}>{line.time}</span>
                  </div>
                  <p style={{ fontSize: 13, color: '#C0BCB4', lineHeight: 1.6, margin: 0, paddingLeft: 14 }}>{line.text}</p>
                </div>
              ))}
            </div>
            <div style={{ padding: '14px 22px 22px', display: 'flex', gap: 6 }}>
              {['.TXT', '.SRT', '.DOCX', 'API'].map((f, i) => (
                <div key={i} style={{ flex: 1, background: i === 0 ? TEAL : '#1E1E1E', borderRadius: 6, padding: '8px 0', textAlign: 'center', cursor: 'pointer' }}>
                  <div style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, color: i === 0 ? '#fff' : '#555' }}>{f}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SPECS STRIP */}
      <div style={{ borderTop: `1px solid ${BOR}`, borderBottom: `1px solid ${BOR}`, background: SURF }}>
        <div style={{ ...wrap, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          {SPECS.map((s, i) => (
            <div key={i} style={{ padding: '28px 32px', borderRight: i < 3 ? `1px solid ${BOR}` : 'none' }}>
              <div style={{ fontSize: 30, fontWeight: 800, color: TEAL, letterSpacing: '-0.03em', marginBottom: 4 }}>{s.val}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEXT, marginBottom: 3 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: TMUTE, lineHeight: 1.5 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section style={sec}>
        <div style={wrap}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
            <div>
              <Tag>How it works</Tag>
              <H2>Upload. Process. Use.<br />That's it.</H2>
            </div>
            <p style={{ fontSize: 14, color: TSUB, maxWidth: 260, textAlign: 'right', lineHeight: 1.65 }}>
              Three steps. No software. No account required. Just upload and go.
            </p>
          </div>
          <div style={grid('repeat(3,1fr)')}>
            {HOW_STEPS.map((s, i) => (
              <div key={i} style={{ background: i === 1 ? TEAL : SURF, padding: '36px 30px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ fontSize: 72, fontWeight: 800, color: i === 1 ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)', position: 'absolute', top: 8, right: 16, lineHeight: 1, letterSpacing: '-0.04em', userSelect: 'none' }}>{s.n}</div>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: i === 1 ? 'rgba(255,255,255,0.15)' : TEALB, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <i className={`ti ${s.icon}`} style={{ fontSize: 18, color: i === 1 ? '#fff' : TEAL }} />
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
            <H2 style={{ marginBottom: 8 }}>Built for anyone who records<br />something worth keeping.</H2>
            <p style={{ fontSize: 15, color: TSUB }}>If you record it, MediaScriber makes it searchable, shareable, and useful.</p>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
            {FOR_WHO.map((w, i) => (
              <button key={i} className="who-btn" onClick={() => setActiveWho(i)}
                style={{ fontFamily: SANS, display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 500, padding: '8px 16px', borderRadius: 8, border: `1px solid ${activeWho === i ? TEAL : BORM}`, background: activeWho === i ? TEALB : 'transparent', color: activeWho === i ? TEAL : TSUB, cursor: 'pointer', transition: 'all 0.15s' }}>
                <i className={`ti ${w.icon}`} style={{ fontSize: 14 }} />
                {w.who}
              </button>
            ))}
          </div>

          {/* Panel */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, background: SURF, borderRadius: 12, padding: '40px 44px', alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: TEAL, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>{FOR_WHO[activeWho].who}</div>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: TEXT, lineHeight: 1.25, marginBottom: 14, letterSpacing: '-0.02em' }}>
                {FOR_WHO[activeWho].headline}
              </h3>
              <p style={{ fontSize: 14, color: TSUB, lineHeight: 1.75, marginBottom: 24 }}>
                {FOR_WHO[activeWho].body}
              </p>
              <button style={{ fontFamily: SANS, background: TEAL, color: '#fff', fontSize: 13, fontWeight: 600, border: 'none', padding: '10px 20px', borderRadius: 7, cursor: 'pointer' }}>
                Try it free →
              </button>
            </div>
            <div>
              <div style={{ fontSize: 11, color: TMUTE, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>What you use it for</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {FOR_WHO[activeWho].tags.map((tag, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px', background: BG, borderRadius: 8, border: `1px solid ${BOR}` }}>
                    <i className="ti ti-check" style={{ fontSize: 13, color: TEAL, flexShrink: 0 }} />
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
          <div style={{ background: SURF, borderRadius: 12, padding: '44px 52px', marginBottom: 2, display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 600, color: TEXT, lineHeight: 1.55, marginBottom: 20, letterSpacing: '-0.01em' }}>
                "{TESTIMONIALS[0].quote}"
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{TESTIMONIALS[0].name}</div>
              <div style={{ fontSize: 12, color: TMUTE }}>{TESTIMONIALS[0].role}</div>
            </div>
            <div style={{ display: 'flex', gap: 3, alignSelf: 'flex-start' }}>
              {[1,2,3,4,5].map(n => <i key={n} className="ti ti-star-filled" style={{ fontSize: 16, color: TEAL }} />)}
            </div>
          </div>

          {/* 4 smaller */}
          <div style={grid('repeat(4,1fr)')}>
            {TESTIMONIALS.slice(1).map((t, i) => (
              <div key={i} style={{ background: BG, padding: '24px 22px' }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
                  {[1,2,3,4,5].map(n => <i key={n} className="ti ti-star-filled" style={{ fontSize: 11, color: TEAL }} />)}
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
      <section style={{ ...sec, background: SURF }}>
        <div style={wrap}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 44 }}>
            <div>
              <Tag>Pricing</Tag>
              <H2>Simple, transparent pricing.</H2>
            </div>
            <p style={{ fontSize: 14, color: TSUB }}>No hidden fees. No surprises. Cancel anytime.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 2, background: BOR }}>
            {TIERS.map((t, i) => (
              <div key={i} style={{ background: t.prime ? TEXT : BG, padding: '28px 20px', position: 'relative' }}>
                {t.prime && (
                  <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: TEAL, color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 100, whiteSpace: 'nowrap', fontFamily: SANS }}>
                    Most popular
                  </div>
                )}
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: t.prime ? 'rgba(255,255,255,0.4)' : TMUTE, marginBottom: 10 }}>{t.name}</div>
                <div style={{ fontSize: 30, fontWeight: 800, color: t.prime ? '#fff' : TEXT, letterSpacing: '-0.03em', marginBottom: 2 }}>{t.price}</div>
                <div style={{ fontSize: 12, color: t.prime ? 'rgba(255,255,255,0.35)' : TMUTE, marginBottom: 16 }}>{t.period}</div>
                <div style={{ fontSize: 12, color: t.prime ? 'rgba(255,255,255,0.55)' : TSUB, lineHeight: 1.55, marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${t.prime ? 'rgba(255,255,255,0.08)' : BOR}` }}>{t.note}</div>
                {t.items.map((item, ii) => (
                  <div key={ii} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 9 }}>
                    <i className="ti ti-check" style={{ fontSize: 12, color: t.prime ? 'rgba(255,255,255,0.55)' : GRN, marginTop: 3, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: t.prime ? 'rgba(255,255,255,0.72)' : TSUB, lineHeight: 1.45 }}>{item}</span>
                  </div>
                ))}
                <button style={{ fontFamily: SANS, width: '100%', background: t.prime ? TEAL : 'transparent', color: t.prime ? '#fff' : TSUB, fontSize: 12, fontWeight: 600, border: `1px solid ${t.prime ? TEAL : BORM}`, padding: '9px 0', borderRadius: 6, cursor: 'pointer', marginTop: 20 }}>
                  {t.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={sec}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 44 }}>
            <div>
              <Tag>FAQ</Tag>
              <H2>Common questions.</H2>
            </div>
            <span style={{ fontSize: 13, color: TMUTE }}>{FAQS.length} answers</span>
          </div>
          {FAQS.map((f, i) => (
            <div key={i} style={{ borderTop: `1px solid ${BOR}`, padding: '15px 0', cursor: 'pointer' }} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: TEXT }}>{f.q}</span>
                <i className={`ti ${openFaq === i ? 'ti-minus' : 'ti-plus'}`} style={{ fontSize: 14, color: TEAL, flexShrink: 0 }} />
              </div>
              {openFaq === i && <div style={{ fontSize: 14, color: TSUB, lineHeight: 1.72, marginTop: 10, paddingRight: 24 }}>{f.a}</div>}
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${BOR}` }} />
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ borderTop: `1px solid ${BOR}`, padding: '88px 32px', background: TEXT, textAlign: 'center' }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <h2 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.1, color: '#fff', marginBottom: 14, letterSpacing: '-0.03em' }}>
            Your recordings hold more<br />
            <span style={{ color: TEAL }}>value than you're extracting</span><br />
            from them.
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', marginBottom: 32, lineHeight: 1.65 }}>
            Start with 30 minutes free. No credit card. No software.
          </p>
          <button style={{ fontFamily: SANS, background: TEAL, color: '#fff', fontSize: 15, fontWeight: 700, border: 'none', padding: '14px 32px', borderRadius: 9, cursor: 'pointer', marginBottom: 14 }}>
            Upload your first file →
          </button>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
            Free plan · No credit card required · Cancel anytime
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '28px 32px', background: '#111' }}>
        <div style={{ ...wrap, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: TEAL, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="ti ti-microphone" style={{ fontSize: 11, color: '#fff' }} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.35)' }}>MediaScriber</span>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms'].map(l => (
              <span key={l} style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', cursor: 'pointer' }}>{l}</span>
            ))}
          </div>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.15)' }}>© 2026 Noesis Knowledge Solutions. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
