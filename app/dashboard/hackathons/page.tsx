'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
const onClick = async () => {
  try {
    const res = await fetch('/api/hackathons')
    if (res.ok) {
      const data = await res.json()
      console.log(data)
    } else {
      throw new Error('Request failed')
    }
  } catch (error) {
    console.error(error)
  }
}
const HackathonPage = () => {
  return (
    <>
      <div>
        <Button onClick={onClick}>Send Api Request</Button>
      </div>
    </>
  )
}

export default HackathonPage
