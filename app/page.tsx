"use client"
import { useState, useEffect, Suspense } from 'react';
import EntryCard from '@/pages/EntryCard';
import { Mood } from '@prisma/client';
import Loading from './loading';

export const revalidate = 10;

interface Entry {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    mood: Mood;
}

export default function Home() {
    const [entries, setEntries] =  useState<Entry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const res = await fetch('/api/entry/fetch');
                if (res.ok) {
                    const data = await res.json();
                    setEntries(data.entries);
                    setLoading(false);
                } else {
                    throw new Error('Failed to fetch entries');
                }
            } catch (error) {
                console.error('Error fetching entries:', error);
            }
        };

        fetchEntries();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            {entries.map(entry => (
                <EntryCard key={entry.id} {...entry} />
            ))}
        </>
    );
}
