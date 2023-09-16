const getBaseUrl = () => {
  let url
  switch (process.env.NODE_ENV) {
    case 'production':
      url = 'production url'
      break
    case 'development':
    default:
      url = 'http://localhost:3000'
  }

  return url
}

const serverAPI = {
  get: async (path) => {
    const url = `${getBaseUrl()}${path}`
    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error while making GET request:', error)
      throw new Error('Failed to fetch data')
    }
  },
  post: async (path, body) => {
    const url = `${getBaseUrl()}${path}`
    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error while making POST request:', error)
      throw new Error('Failed to fetch data')
    }
  },
}

export default serverAPI
