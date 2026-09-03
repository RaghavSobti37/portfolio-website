import type { CodingProject, ProjectPreviewTheme } from '@/data/codingProjects';

function lines(text: string) {
  return text.split('\n');
}

function EditorialMock({ t }: { t: ProjectPreviewTheme }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-[7%] overflow-hidden" style={{ background: t.bg }}>
      <div className="flex items-center justify-between">
        <span className="text-[7px] md:text-[9px] tracking-[0.2em] uppercase" style={{ color: t.muted }}>
          {t.eyebrow}
        </span>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: t.accent }} />
      </div>
      <div>
        {lines(t.headline).map((line) => (
          <p
            key={line}
            className="font-display text-[clamp(1.1rem,2.6vw,1.85rem)] font-bold leading-[1.05] tracking-tight"
            style={{ color: t.text }}
          >
            {line}
          </p>
        ))}
        <p className="mt-2 text-[9px] md:text-[11px] max-w-[80%]" style={{ color: t.muted }}>
          {t.sub}
        </p>
        <div
          className="mt-4 inline-block px-3 py-1.5 text-[8px] md:text-[10px] tracking-wider uppercase"
          style={{ background: t.accent, color: t.bg }}
        >
          Enter →
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5 opacity-80">
        {[0, 1, 2].map((i) => (
          <div key={i} className="aspect-[4/3] border" style={{ borderColor: `${t.muted}44`, background: `${t.accent}${i === 1 ? '33' : '14'}` }} />
        ))}
      </div>
    </div>
  );
}

function DashboardMock({ t }: { t: ProjectPreviewTheme }) {
  return (
    <div className="absolute inset-0 flex overflow-hidden" style={{ background: t.bg }}>
      <div className="w-[18%] border-r p-2 space-y-2" style={{ borderColor: `${t.muted}33` }}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-1.5 rounded-full"
            style={{ background: i === 1 ? t.accent : `${t.muted}44`, width: `${70 - i * 8}%` }}
          />
        ))}
      </div>
      <div className="flex-1 p-[5%] flex flex-col">
        <p className="text-[7px] md:text-[9px] tracking-[0.18em] uppercase mb-2" style={{ color: t.muted }}>
          {t.eyebrow}
        </p>
        {lines(t.headline).map((line) => (
          <p
            key={line}
            className="font-display text-[clamp(1rem,2.2vw,1.6rem)] font-bold leading-tight"
            style={{ color: t.text }}
          >
            {line}
          </p>
        ))}
        <div className="mt-auto grid grid-cols-3 gap-2">
          {[40, 72, 55].map((h, i) => (
            <div key={i} className="rounded-sm border p-2" style={{ borderColor: `${t.muted}33`, background: `${t.accent}12` }}>
              <div className="h-1 w-8 mb-2 rounded-full" style={{ background: t.accent }} />
              <div className="flex items-end gap-0.5 h-8">
                {[0.4, 0.7, 0.5, 0.9, 0.6].map((v, j) => (
                  <div
                    key={j}
                    className="flex-1 rounded-sm"
                    style={{ height: `${v * h}%`, background: i === 1 ? t.accent : `${t.muted}66` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CorpMock({ t }: { t: ProjectPreviewTheme }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: t.bg }}>
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(ellipse at 70% 20%, ${t.accent}55, transparent 55%)`,
        }}
      />
      <div className="relative h-full flex flex-col justify-between p-[7%]">
        <div className="flex justify-between items-center">
          <span className="font-display text-[10px] md:text-xs font-bold tracking-wide" style={{ color: t.text }}>
            LOGO
          </span>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <span key={i} className="w-4 h-0.5" style={{ background: `${t.muted}66` }} />
            ))}
          </div>
        </div>
        <div className="max-w-[75%]">
          <p className="text-[7px] md:text-[9px] tracking-[0.2em] uppercase mb-2" style={{ color: t.accent }}>
            {t.eyebrow}
          </p>
          {lines(t.headline).map((line) => (
            <p
              key={line}
              className="font-display text-[clamp(1.15rem,2.5vw,1.8rem)] font-bold leading-[1.05]"
              style={{ color: t.text }}
            >
              {line}
            </p>
          ))}
          <p className="mt-2 text-[9px] md:text-[11px]" style={{ color: t.muted }}>
            {t.sub}
          </p>
          <div className="mt-4 flex gap-2">
            <span className="px-3 py-1.5 text-[8px] md:text-[10px] uppercase tracking-wider" style={{ background: t.accent, color: t.bg }}>
              Get a quote
            </span>
            <span className="px-3 py-1.5 text-[8px] md:text-[10px] uppercase tracking-wider border" style={{ borderColor: `${t.muted}55`, color: t.text }}>
              Services
            </span>
          </div>
        </div>
        <div className="h-1 w-full" style={{ background: `${t.accent}33` }} />
      </div>
    </div>
  );
}

function UtilityMock({ t }: { t: ProjectPreviewTheme }) {
  return (
    <div className="absolute inset-0 p-[6%] flex flex-col overflow-hidden" style={{ background: t.bg }}>
      <p className="text-[7px] md:text-[9px] tracking-[0.18em] uppercase mb-3" style={{ color: t.muted }}>
        {t.eyebrow}
      </p>
      {lines(t.headline).map((line) => (
        <p
          key={line}
          className="font-display text-[clamp(1.05rem,2.3vw,1.65rem)] font-bold leading-tight"
          style={{ color: t.text }}
        >
          {line}
        </p>
      ))}
      <div className="mt-4 flex-1 grid grid-cols-4 gap-1.5 content-start">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-sm border"
            style={{
              borderColor: `${t.muted}33`,
              background: i % 3 === 0 ? `${t.accent}44` : `${t.muted}18`,
            }}
          />
        ))}
      </div>
      <div className="mt-3 h-7 rounded-sm flex items-center px-3 text-[8px] md:text-[10px]" style={{ background: t.accent, color: '#fff' }}>
        Run tool →
      </div>
    </div>
  );
}

function AppMock({ t }: { t: ProjectPreviewTheme }) {
  const light = t.bg.startsWith('#f') || t.bg.startsWith('#F');
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ background: light ? '#e7e2d9' : '#080808' }}>
      <div
        className="w-[42%] aspect-[9/16] max-h-[88%] rounded-[1rem] border overflow-hidden shadow-2xl"
        style={{ background: t.bg, borderColor: `${t.muted}44` }}
      >
        <div className="h-[8%] flex items-center justify-center">
          <div className="w-8 h-1 rounded-full" style={{ background: `${t.muted}55` }} />
        </div>
        <div className="px-[10%] pt-2">
          <p className="text-[6px] tracking-[0.15em] uppercase mb-1" style={{ color: t.muted }}>
            {t.eyebrow}
          </p>
          {lines(t.headline).map((line) => (
            <p key={line} className="font-display text-[11px] md:text-sm font-bold leading-tight" style={{ color: t.text }}>
              {line}
            </p>
          ))}
          <p className="mt-1 text-[7px]" style={{ color: t.muted }}>
            {t.sub}
          </p>
        </div>
        <div className="mt-3 mx-[10%] h-[28%] rounded-md" style={{ background: `${t.accent}33` }} />
        <div className="mt-3 mx-[10%] h-6 rounded-md flex items-center justify-center text-[7px] font-semibold" style={{ background: t.accent, color: light ? '#fff' : t.bg }}>
          Continue
        </div>
      </div>
    </div>
  );
}

function ErpMock({ t }: { t: ProjectPreviewTheme }) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: t.bg }}>
      <div className="h-[14%] border-b flex items-center px-3 gap-2" style={{ borderColor: `${t.muted}33` }}>
        <span className="w-2 h-2 rounded-full" style={{ background: t.accent }} />
        <span className="text-[8px] md:text-[10px] font-mono tracking-wider" style={{ color: t.text }}>
          EKORS · ADMIN
        </span>
      </div>
      <div className="flex flex-1 min-h-0">
        <div className="w-[22%] border-r p-2 space-y-2" style={{ borderColor: `${t.muted}33` }}>
          {['Quotes', 'Tickets', 'Users', 'API'].map((label, i) => (
            <div
              key={label}
              className="text-[7px] md:text-[9px] px-1.5 py-1 rounded-sm"
              style={{
                color: i === 0 ? t.text : t.muted,
                background: i === 0 ? `${t.accent}22` : 'transparent',
              }}
            >
              {label}
            </div>
          ))}
        </div>
        <div className="flex-1 p-3 space-y-2">
          <p className="text-[7px] tracking-wider uppercase" style={{ color: t.muted }}>
            {t.eyebrow}
          </p>
          {lines(t.headline).map((line) => (
            <p key={line} className="font-display text-sm md:text-base font-bold" style={{ color: t.text }}>
              {line}
            </p>
          ))}
          <div className="mt-2 space-y-1.5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-6 border flex items-center px-2 gap-2" style={{ borderColor: `${t.muted}33` }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: t.accent }} />
                <span className="h-1 flex-1 rounded-full" style={{ background: `${t.muted}33` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const layouts = {
  editorial: EditorialMock,
  dashboard: DashboardMock,
  corp: CorpMock,
  utility: UtilityMock,
  app: AppMock,
  erp: ErpMock,
};

/** 4:3 laptop chrome + design-faithful hero mock (not a flaky screenshot). */
export function ProjectPreview({ project }: { project: CodingProject }) {
  const t = project.preview;
  const Mock = layouts[t.layout];

  return (
    <div className="relative w-full aspect-[4/3] bg-[#1a1b1e] flex items-center justify-center p-3 sm:p-4 md:p-5">
      {/* laptop shell */}
      <div className="relative w-full h-full flex flex-col max-w-[560px] mx-auto">
        <div className="relative flex-1 min-h-0 rounded-t-md border border-b-0 border-white/10 bg-black overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
          {/* camera notch */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/20 z-10" />
          <div className="absolute inset-[3px] top-3 rounded-sm overflow-hidden">
            <Mock t={t} />
          </div>
        </div>
        <div className="h-2.5 sm:h-3 rounded-b-md bg-gradient-to-b from-[#2a2b2e] to-[#151617] border border-t-0 border-white/10 relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0.5 w-[18%] h-1 rounded-b-sm bg-black/40" />
        </div>
        <div className="mx-auto w-[28%] h-0.5 mt-0.5 rounded-full bg-white/10" />
      </div>
    </div>
  );
}
