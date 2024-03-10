export const revalidate=10;
import prisma from '@/lib/prisma';
import EntryCard from '@/pages/EntryCard';


export default async function Home() {
"use server";

  const entries= await prisma.entry.findMany();

  return (
    <>
{
  entries.map(entry =>
   <EntryCard key={entry.id} {...entry}/>
)
}
</>
  );
}


