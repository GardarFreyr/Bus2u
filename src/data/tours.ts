import type { ImageKey } from './images'

/**
 * EXAMPLE tours. They show how tour content would be presented and are
 * NOT offered for sale. Fields left `null` must be supplied by Bus2u; the UI
 * shows them as "staðfest síðar" and never invents duration, price,
 * departures or availability.
 *
 * Shape is CMS-ready: swap this array for a fetch from a CMS later.
 */
export type Region = 'Suðurland' | 'Reykjanes'

export interface Tour {
  slug: string
  title: string
  region: Region
  status: 'example' | 'confirmed'
  summary: string
  overview: string
  image: ImageKey
  gallery: ImageKey[]
  duration: string | null
  price: string | null
  departure: string | null
  included: string[] | null
  requirements: string[] | null
}

export const tours: Tour[] = [
  {
    slug: 'sudurstrondin',
    title: 'Suðurströndin',
    region: 'Suðurland',
    status: 'example',
    summary: 'Fossar, svartir sandar og jöklar í sjónmáli — dæmi um dagsferð meðfram suðurströndinni.',
    overview:
      'Hér kæmi lýsing Bus2u á ferðinni: helstu viðkomustaðir, hvað gerir ferðina sérstaka og fyrir hverja hún hentar.',
    image: 'skoga',
    gallery: ['skoga', 'vestra', 'hero'],
    duration: null, price: null, departure: null, included: null, requirements: null,
  },
  {
    slug: 'gullni-hringurinn',
    title: 'Gullni hringurinn',
    region: 'Suðurland',
    status: 'example',
    summary: 'Þingvellir, hverasvæði og fossar á einum degi — dæmi um klassíska leið.',
    overview:
      'Hér kæmi lýsing Bus2u á ferðinni: viðkomustaðir, tímalína dagsins og hagnýtar upplýsingar.',
    image: 'thing',
    gallery: ['thing', 'langj', 'hero'],
    duration: null, price: null, departure: null, included: null, requirements: null,
  },
  {
    slug: 'reykjanesid',
    title: 'Reykjanesið',
    region: 'Reykjanes',
    status: 'example',
    summary: 'Hraun, jarðhiti og strandlengja í nágrenni Voga — dæmi um styttri ferð.',
    overview:
      'Hér kæmi lýsing Bus2u á ferðinni um Reykjanesskagann, nærsvæði fyrirtækisins.',
    image: 'reykjanes',
    gallery: ['reykjanes', 'road5', 'hero'],
    duration: null, price: null, departure: null, included: null, requirements: null,
  },
]

export const regions: Array<'Allar' | Region> = ['Allar', 'Suðurland', 'Reykjanes']

export const findTour = (slug: string | undefined) => tours.find((t) => t.slug === slug)
