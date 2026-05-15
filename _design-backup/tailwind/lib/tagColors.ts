export const TAG_COLORS: Record<string, string> = {
  App:            'bg-purple-100 text-purple-800',
  Education:      'bg-amber-100 text-amber-800',
  Branding:       'bg-pink-100 text-pink-800',
  Website:        'bg-green-100 text-green-800',
  Marketplace:    'bg-blue-100 text-blue-800',
  Data:           'bg-indigo-100 text-indigo-800',
  Logistics:      'bg-yellow-100 text-yellow-800',
  eComm:          'bg-rose-100 text-rose-800',
  Food:           'bg-orange-100 text-orange-800',
  Software:       'bg-teal-100 text-teal-800',
  VC:             'bg-violet-100 text-violet-800',
  Aerospace:      'bg-sky-100 text-sky-800',
  web3:           'bg-purple-100 text-purple-700',
  crypto:         'bg-amber-100 text-amber-700',
  Communications: 'bg-indigo-100 text-indigo-700',
  'API/SDK':      'bg-slate-100 text-slate-700',
  VIP:            'bg-violet-100 text-violet-800',
  Venue:          'bg-cyan-100 text-cyan-800',
}

export const STATUS_COLORS: Record<string, { dot: string; badge: string }> = {
  WIP:      { dot: 'bg-blue-500',  badge: 'bg-blue-100 text-blue-700'  },
  Shipped:  { dot: 'bg-green-500', badge: 'bg-green-100 text-green-700' },
  RIP:      { dot: 'bg-red-500',   badge: 'bg-red-100 text-red-700'    },
  Soon:     { dot: 'bg-gray-400',  badge: 'bg-gray-100 text-gray-600'  },
  'One day':{ dot: 'bg-gray-300',  badge: 'bg-gray-100 text-gray-500'  },
}
