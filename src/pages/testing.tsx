import { NextPage } from 'next'
import { trpc } from '../utils/trpc'
import React from 'react'

const Testing : NextPage = () => {
  const callSMS = trpc.example.sendSMS.useMutation();
  const callWhatsapp = trpc.example.sendWhatsapp.useMutation();
  const callEmail = trpc.example.sendEmail.useMutation();

  const handleSMS = () => {
    callSMS.mutate({
      name_event: 'a',
      description_event: 'b',
      date_event: 'c',
      cellphone_number: '+5216611305053'
    });
  }

  const handleWhatsapp = () => {
    callWhatsapp.mutate({
      event_data: "limpieza de playa a las 15:00 horas el martes 24", 
      cellphone_number: "+5216611305053"});
  }

  const handleEmail = () => {
    callEmail.mutate("oscar.encinas@cetys.edu.mx");
  }

  return (    
      <>
        <button onClick={handleSMS}>sms</button>
        <button onClick={handleWhatsapp}>whatsapp</button>
        <button onClick={handleEmail}>email</button>
      </>
  )
}

export default Testing;
