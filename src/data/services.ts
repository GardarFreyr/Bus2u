import type { ImageKey } from './images'
import type { ServiceType } from '../lib/inquiry'

/**
 * PROPOSED service categories — not confirmed Bus2u offerings.
 * Every card is rendered with a "Tillaga" badge until the client approves it.
 */
export interface Service {
  id: Exclude<ServiceType, 'tour'>
  title: string
  description: string
  cta: string
  image: ImageKey
  status: 'proposal'
}

export const services: Service[] = [
  {
    id: 'group',
    title: 'Hópferðir',
    description:
      'Akstur fyrir hópa af ýmsum stærðum — fyrirtæki, félagasamtök, skóla og fjölskyldur. Leið og tímasetning ákveðin í samráði.',
    cta: 'Fá tilboð fyrir hóp',
    image: 'vestra',
    status: 'proposal',
  },
  {
    id: 'private',
    title: 'Sérferðir',
    description:
      'Ferð sniðin að áhugamálum og hraða hópsins. Þú lýsir ferðinni og við leggjum til leið.',
    cta: 'Skipuleggja sérferð',
    image: 'kirkju',
    status: 'proposal',
  },
  {
    id: 'transfer',
    title: 'Akstursþjónusta',
    description:
      'Akstur milli staða, til dæmis frá Keflavíkurflugvelli, á viðburði eða í gistingu.',
    cta: 'Óska eftir akstri',
    image: 'road7',
    status: 'proposal',
  },
]
