"use client"
import React, { useState, useEffect } from 'react';
import prisma from '@/lib/prisma';
import EntryCard from '@/pages/EntryCard';
import { Mood } from '@prisma/client';
import Loading from '@/app/loading';

interface Entry {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    mood: Mood;
}

const Cards = () => {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const res = await fetch('/api/entry/fetch');
                if(res){
                    const data= await res.json();
                    const newEntries = data.entries
                    setEntries(newEntries);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching entries:', error);
            }
        };
        fetchEntries();
        const intervalId = setInterval(fetchEntries, 10000);
        return () => clearInterval(intervalId);
    }, []);

    if(loading) return <Loading/>

    return (
        <>
            {entries.map(entry => (
                <EntryCard key={entry.id} {...entry} />
            ))}
        </>
    );
};

export default Cards;
