export interface TechIcon {
  name: string;
  slug: string;
}

export const TECH: Record<string, TechIcon> = {
  next:     { name: 'Next.js',      slug: 'nextdotjs'   },
  ts:       { name: 'TypeScript',   slug: 'typescript'  },
  tailwind: { name: 'Tailwind CSS', slug: 'tailwindcss' },
  shadcn:   { name: 'shadcn/ui',    slug: 'shadcnui'    },
  github:   { name: 'GitHub',       slug: 'github'      },
  html:     { name: 'HTML5',        slug: 'html5'       },
  css:      { name: 'CSS3',         slug: 'css'         },
  js:       { name: 'JavaScript',   slug: 'javascript'  },
  react:    { name: 'React',        slug: 'react'       },
  vite:     { name: 'Vite',         slug: 'vite'        },
  supabase: { name: 'Supabase',     slug: 'supabase'    },
  vercel:   { name: 'Vercel',       slug: 'vercel'      },
  three:    { name: 'Three.js',     slug: 'threedotjs'  },
  astro:    { name: 'Astro',        slug: 'astro'       },
  node:     { name: 'Node.js',      slug: 'nodedotjs'   },
};

export const techIconUrl = (key: string): string => {
  const t = TECH[key];
  return t ? `https://cdn.simpleicons.org/${t.slug}` : '';
};

export const techName = (key: string): string => TECH[key]?.name ?? key;
