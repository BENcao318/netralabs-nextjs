import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const Youtube = (function () {
  'use strict'

  let video, results

  let getThumb = function (url: string, size: string) {
    if (url === null) {
      return ''
    }
    size = size === null ? 'big' : size
    results = url.match('[\\?&]v=([^&#]*)')
    video = results === null ? url : results[1]

    if (size === 'small') {
      return 'http://img.youtube.com/vi/' + video + '/2.jpg'
    }
    return 'http://img.youtube.com/vi/' + video + '/0.jpg'
  }

  return {
    thumb: getThumb,
  }
})()

export const getVimeoThumbnailUrl = async (url: string) => {
  let result
  const res = await fetch(`https://vimeo.com/api/oembed.json?url=${url}`)
  if (res.ok) {
    const data = await res.json()
    result = data.thumbnail_url
  }
  return result
}
