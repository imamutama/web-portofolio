import cv from './cv.json';

export interface ProfileLink {
  label: string;
  url: string;
}

// First role started 2017-10; CV has a ~6-month gap (09/2018–02/2019),
// so 8 is the honest "years experience" figure to present.
const yearsExperience = 8;

export const profile = {
  name: cv.name,
  headline: cv.headline,
  location: cv.location,
  email: cv.email,
  summary: cv.summary,
  yearsExperience,
  links: [
    { label: 'GitHub', url: cv.links.github },
    ...(cv.links.linkedin ? [{ label: 'LinkedIn', url: cv.links.linkedin }] : []),
  ] satisfies ProfileLink[],
  education: cv.education,
  languages: cv.languages,
} as const;
