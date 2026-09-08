import { useState, type FormEvent } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export type ResumeLeadPortfolio = 'creative' | 'coding';

type ResumeLeadDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  portfolio: ResumeLeadPortfolio;
  resumeHref: string;
  resumeDownload: string;
  resumeLabel: string;
};

export function ResumeLeadDialog({
  open,
  onOpenChange,
  portfolio,
  resumeHref,
  resumeDownload,
  resumeLabel,
}: ResumeLeadDialogProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  const reset = () => {
    setName('');
    setEmail('');
    setCompany('');
    setStatus('idle');
    setError('');
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  const triggerDownload = () => {
    const a = document.createElement('a');
    a.href = resumeHref;
    a.download = resumeDownload;
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      const res = await fetch('/api/resume-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          portfolio: portfolio === 'coding' ? 'Creative Technologist' : 'Videographer',
          resume: resumeLabel,
        }),
      });

      const raw = await res.text();
      let data: { ok?: boolean; error?: string } = {};
      try {
        data = raw ? (JSON.parse(raw) as { ok?: boolean; error?: string }) : {};
      } catch {
        throw new Error(
          res.ok
            ? 'Server returned a non-JSON response. Restart local `npm run dev` or use the live site.'
            : `Could not reach lead API (${res.status}).`
        );
      }

      if (!res.ok || !data.ok) {
        throw new Error(data.error || `Could not save your details (${res.status})`);
      }

      triggerDownload();
      handleOpenChange(false);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="rounded-none border-border bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl tracking-tight">
            Get the resume
          </DialogTitle>
          <DialogDescription className="font-body text-muted-foreground">
            Drop your details — we&apos;ll email the {resumeLabel.toLowerCase()} (PDF attached)
            and keep a note for follow-up.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4 pt-2">
          <label className="block space-y-1.5">
            <span className="font-mono-meta text-primary">Name</span>
            <input
              required
              name="name"
              autoComplete="name"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              className="w-full border border-border bg-background px-3 py-2.5 font-body text-sm text-foreground outline-none focus:border-primary"
              placeholder="Your name"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="font-mono-meta text-primary">Email</span>
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className="w-full border border-border bg-background px-3 py-2.5 font-body text-sm text-foreground outline-none focus:border-primary"
              placeholder="you@company.com"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="font-mono-meta text-primary">Company</span>
            <input
              required
              name="company"
              autoComplete="organization"
              value={company}
              onChange={(ev) => setCompany(ev.target.value)}
              className="w-full border border-border bg-background px-3 py-2.5 font-body text-sm text-foreground outline-none focus:border-primary"
              placeholder="Studio / company"
            />
          </label>

          {status === 'error' && (
            <p className="font-body text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="font-mono-meta w-full bg-emerald-500 px-4 py-3 text-ink transition-colors hover:bg-emerald-400 disabled:opacity-60"
          >
            {status === 'loading' ? 'SENDING…' : 'DOWNLOAD RESUME ↗'}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
