import { NextPage } from 'next'
import { trpc } from '../utils/trpc'
import React from 'react'

const Testing : NextPage = () => {
  const callSMS = trpc.example.sendsms.useMutation();
  const callWhatsapp = trpc.example.sendwhatsapp.useMutation();

  const handleSMS = () => {
    callSMS.mutate("+526611305053");
  }

  const handleWhatsapp = () => {
    callWhatsapp.mutate("+5216611305053");
  }

  return (    
      <>
        <button onClick={handleSMS}>sms</button>
        <button onClick={handleWhatsapp}>whatsapp</button>
      </>
  )
}

export default Testing;
