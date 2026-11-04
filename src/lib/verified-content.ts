import type { Testimonial } from "@/components/testimonials";
// Publish only verified information authorized by the owner.
// Supplied registration "CRT-BR 19.410" remains unpublished until confirmed.
export const verifiedProfile: {
  biography: string | null;
  registration: string | null;
  portrait: { src: string; alt: string } | null;
  qualifications: string[];
  events: { title: string; url: string }[];
  educationalResources: { title: string; url: string }[];
} = {
  biography: null,
  registration: null,
  portrait: null,
  qualifications: [],
  events: [],
  educationalResources: [],
};
export const authorizedTestimonials: readonly Testimonial[] = [];
