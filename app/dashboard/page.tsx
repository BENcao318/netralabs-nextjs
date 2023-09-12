'use client'

import React, { useEffect } from 'react'

const Page = () => {
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`/api/users/all`)
      const data = await response.json()
      console.log(data, 'users')
    }
    console.log('fetch effect')
    fetchUsers()
  }, [])

  return <div>page6</div>
}

export default Page
