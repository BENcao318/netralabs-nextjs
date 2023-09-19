const urlRegex =
  /^(?:(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?feature=player_embedded&v=|youtu.be\/|user\/\S+|playlist\?list=\S+)))([^\s\/?#]+)/

// Test URL
const url = 'https://vimeo.com/783453912'

if (urlRegex.test(url)) {
  console.log('Valid YouTube or Vimeo URL')
  const videoId = url.match(urlRegex)[1]
  console.log('Video ID:', videoId)
} else {
  console.log('Not a valid YouTube or Vimeo URL')
}
