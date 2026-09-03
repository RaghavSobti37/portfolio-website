import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type LazyImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  shellClassName?: string;
};

/** Image with shimmer until load (or fail). Images only. */
export function LazyImage({
  className,
  shellClassName,
  onLoad,
  onError,
  alt = '',
  src,
  ...props
}: LazyImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    setStatus('loading');
    const el = ref.current;
    if (el?.complete && el.naturalWidth > 0) {
      setStatus('ready');
    }
  }, [src]);

  if (status === 'error') {
    return (
      <span
        className={cn(
          'relative block overflow-hidden bg-secondary/50 flex items-center justify-center',
          shellClassName
        )}
      >
        <span className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground">
          —
        </span>
      </span>
    );
  }

  return (
    <span className={cn('relative block overflow-hidden bg-secondary/40', shellClassName)}>
      {status === 'loading' && (
        <span
          aria-hidden
          className="absolute inset-0 z-[1] animate-pulse bg-gradient-to-br from-secondary via-muted/30 to-secondary"
        />
      )}
      <img
        {...props}
        ref={ref}
        src={src}
        alt={alt}
        className={cn(
          className,
          'transition-opacity duration-300',
          status === 'ready' ? 'opacity-100' : 'opacity-0'
        )}
        onLoad={(e) => {
          setStatus('ready');
          onLoad?.(e);
        }}
        onError={(e) => {
          setStatus('error');
          onError?.(e);
        }}
      />
    </span>
  );
}
