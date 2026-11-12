import { images, imgSrc, type ImageKey } from '../data/images'

interface Props {
  image: ImageKey
  sizes?: string
  className?: string
  priority?: boolean
  /** Pass true when the image is purely decorative. */
  decorative?: boolean
}

export function Photo({ image, sizes = '100vw', className = '', priority, decorative }: Props) {
  const { src, srcSet } = imgSrc(image)
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={decorative ? '' : images[image].alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
    />
  )
}
