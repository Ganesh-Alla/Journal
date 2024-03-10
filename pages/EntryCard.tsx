"use client"

import { Mood } from '@prisma/client';
import Link from 'next/link';
import React from 'react'


type Props = {
    id:string;
    title:string;
    content:string;
    mood: Mood
}

async function deleteEntry(id:string) {
    await fetch(`/api/entry/delete?id=${id}`,{
        method:"DELETE"
    })
    .then(response => {
        if (response.status === 200) {
          // Status is 200, reload the page
          window.location.reload();
        } else {
          // Handle the case where the delete operation failed (e.g., status is not 200)
          alert('Failed to delete the entry');
        }
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('Error deleting the entry:', error);
      });
}

const EntryCard = ({id,title,content,mood}:Props)=>{
return (
    <article className='flex justify-between border border-blue-700 p-4'>
    <header>
    <h2>{title}</h2>
    </header>
    <p>{content}</p>
    <footer>{mood}
    <button className='text-red-500 px-5' onClick={()=>deleteEntry(id)}>delete</button>
    <Link href={`/entry/edit?id=${id}`} role='button'>Edit</Link>
    </footer>
    </article>
)
}

export default EntryCard;