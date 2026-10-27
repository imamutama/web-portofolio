import cv from './cv.json';

export interface Experience {
  company: string;
  title: string;
  start: string; // YYYY-MM
  end: string; // YYYY-MM or 'present'
  bullets: string[];
  range: string; // human-readable, computed
}

function formatRange(start: string, end: string): string {
  const fmt = (ym: string) => {
    if (ym === 'present') return 'Present';
    const [y, m] = ym.split('-').map(Number);
    return new Date(y, m - 1, 1).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };
  return `${fmt(start)} – ${fmt(end)}`;
}

export const experience: Experience[] = cv.experience.map((e) => ({
  ...e,
  range: formatRange(e.start, e.end),
}));
