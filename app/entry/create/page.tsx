import { Mood } from '@prisma/client'
import React from 'react'
import { redirect } from 'next/navigation'

async function createEntry(data:FormData) {
  "use server"
  const formData={
    title:data.get("title")!.toString(),
    content:data.get("content")!.toString(),
    mood:data.get("mood")! as Mood,
  }
  await prisma.entry.create({data:formData})
  redirect("/")
}

const CreatePage = () => {
  const moods = Object.values(Mood);
  return (
    <form action={createEntry} className='flex flex-col w-1/2 select-none gap-3' >
        <label htmlFor="title"> Title</label>
        <input type="text" name="title" id="title" placeholder='Title' className='p-2 border-2 border-blue-600 h-12' required/>
        <label htmlFor="content"> Content</label>
        <textarea name="content" id="content" placeholder='Content' className='p-2 border-2 border-blue-600 h-12'required/>
        <select name="mood" className='h-12' defaultValue="">
          <option  disabled selected>Select a mood</option>
           {
            moods.map((mood,idx)=>(
                  <option key={idx} value={mood}>{mood}</option>
            ))
           }
        </select>
        <button type='submit' className='font-bold py-2 px-4 rounded bg-blue-500 text-white'>Submit</button>
    </form>
  )
}

export default CreatePage