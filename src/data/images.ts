/**
 * All photography is landscape only, from Wikimedia Commons, used under the
 * licences below. No image shows a vehicle, so nothing can be mistaken for
 * Bus2u's own fleet. Each file exists at /images/<key>-800.jpg and -1600.jpg.
 */
export type ImageKey =
  | 'hero' | 'road7' | 'road5' | 'skoga' | 'thing' | 'reykjanes' | 'kirkju' | 'vestra' | 'langj'

export interface ImageInfo {
  alt: string
  title: string
  author: string
  license: 'CC0' | 'CC BY 2.0' | 'CC BY 4.0' | 'CC BY-SA 4.0'
  source: string
}

export const images: Record<ImageKey, ImageInfo> = {
  hero: {
    alt: 'Þjóðvegur liggur yfir opið íslenskt landslag undir skýjuðum himni',
    title: 'Iceland Ring Road trip, 14', author: 'Ben & Gab', license: 'CC BY 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Iceland_Ring_Road_trip,_14.jpg',
  },
  road7: {
    alt: 'Gul vegskilti við þjóðveg 1 sem vísa á Vík og Kirkjubæjarklaustur',
    title: 'Iceland Ring Road trip, 7', author: 'Ben & Gab', license: 'CC BY 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Iceland_Ring_Road_trip,_7.jpg',
  },
  road5: {
    alt: 'Hraun og svartur sandur í íslensku landslagi',
    title: 'Iceland Ring Road trip, 5', author: 'Ben & Gab', license: 'CC BY 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Iceland_Ring_Road_trip,_5.jpg',
  },
  skoga: {
    alt: 'Skógafoss fellur niður gróinn klettavegg',
    title: 'Skógafoss Waterfall, Iceland', author: 'Jakub Hałun', license: 'CC BY 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Sk%C3%B3gafoss_Waterfall,_Iceland,_20240720_1318_2975.jpg',
  },
  thing: {
    alt: 'Gjár og mosavaxið hraun á Þingvöllum',
    title: 'Þingvellir National Park, Iceland', author: 'Jakub Hałun', license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:%C3%9Eingvellir_National_Park,_Iceland,_20230502_1019_4151.jpg',
  },
  reykjanes: {
    alt: 'Reykjanesviti á hæð yfir hraunbreiðu',
    title: 'Reykjanesviti, Reykjanes, Iceland', author: 'Jakub Hałun', license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Reykjanesviti,_Reykjanes,_Iceland,_20230430_1301_3560.jpg',
  },
  kirkju: {
    alt: 'Kirkjufell og Kirkjufellsfoss á Snæfellsnesi',
    title: 'Kirkjufell, Iceland', author: 'Steven Diaz', license: 'CC0',
    source: 'https://commons.wikimedia.org/wiki/File:Kirkjufell,_Iceland_(Unsplash_LoKG7kKx7Zc).jpg',
  },
  vestra: {
    alt: 'Vestrahorn speglast í blautum sandi við Stokksnes',
    title: 'Vestrahorn and Stokksnes beach in Iceland', author: 'Daniel Oberhaus', license: 'CC BY 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Vestrahorn_and_Stokksnes_beach_in_Iceland.jpg',
  },
  langj: {
    alt: 'Hestar á sléttu með Langjökul í fjarska',
    title: 'Remote view of Langjökull from Road 35', author: 'Jakub Hałun', license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Remote_view_of_Langj%C3%B6kull_from_Road_35,_Iceland,_20230501_0927_3767.jpg',
  },
}

export const imgSrc = (key: ImageKey) => ({
  src: `/images/${key}-1600.jpg`,
  srcSet: `/images/${key}-800.jpg 800w, /images/${key}-1600.jpg 1600w`,
})
