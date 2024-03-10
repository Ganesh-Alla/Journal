
  import prisma from '@/lib/prisma';
  import EntryCard from '@/pages/EntryCard';

  const Cards = async () => {
  "use server";
  const entries = await prisma.entry.findMany({
      orderBy: {
          createdAt: 'desc',
      },
  });
      return (
          <>
              {entries.map(entry => (
                  <EntryCard key={entry.id} {...entry} />
              ))}
          </>
      );
  };
  export default Cards;
