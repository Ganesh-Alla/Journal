import prisma from '@/lib/prisma';
import { sql } from "@vercel/postgres";
import EntryCard from '@/pages/EntryCard';


export default async function Home() {

  const entries= await prisma.entry.findMany();
  // const { rows } = await sql`SELECT * FROM "Entry" `;

  return (
    <>
{
  entries.map(entry =>
   <EntryCard key={entry.id} {...entry}/>
)
}
{/* <h1>SQL Data Base</h1>
<div>
      {rows.map((row) => (
        <div key={row.id}>
          {row.title} - {row.content}
        </div>
      ))}
    </div> */}
</>
  );
}
