import { NextPage } from 'next'
import { trpc } from '../utils/trpc'
import React from 'react'

const Testing : NextPage = () => {
  const callMutation = trpc.example.call.useMutation();

  const handleCall = () => {
    callMutation.mutate("+526611305053")
  }
  return (    
      <button onClick={handleCall}>search</button>
  )
}

export default Testing;
