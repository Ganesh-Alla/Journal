"use client"
import React, { useState, useEffect } from 'react';
import prisma from '@/lib/prisma';
import EntryCard from '@/pages/EntryCard';
import { Mood } from '@prisma/client';

interface Entry {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    mood: Mood; // Assuming Mood is defined somewhere
}

const Cards = () => {
    const [entries, setEntries] = useState<Entry[]>([]);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const entriesData = await prisma.entry.findMany({
                    orderBy: {
                        createdAt: 'desc',
                    },
                });
                setEntries(entriesData);
            } catch (error) {
                console.error('Error fetching entries:', error);
            }
        };

        fetchEntries();
    }, []);

    return (
        <>
            {entries.map(entry => (
                <EntryCard key={entry.id} {...entry} />
            ))}
        </>
    );
};

export default Cards;

