'use client'

import Header from '@/app/(app)/Header'
import List from '@/app/(auth)/post/PostList'
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'
import Link from '@/components/NavLink'

const Blog = () => {
    const pathname = usePathname()
    // const sortedTags = [ "next-js","tailwind","guide",
    //    ];

    const [tags, setTags] = useState([]);
    //    const MAX_DISPLAY = 5
    const tagKeys = Object.keys(tags)

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/tags', {
                headers: {
                    'Authorization': `Bearer 1|qvil55IhHvI6ugBcNS5fXeiyCANtyzv2WJZpasyT1a875246`
                }
            });
            const jsonData = await response.json();
            setTags(jsonData.data);
        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    };

    return (
        <>
            <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px- min-h-screen">
                <Header title="Dashboard" />
                <div className="font-['SpaceGrotesk'] flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
                    <div className="space-x-2 pb-8 pt-6 md:space-y-5">
                        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
                            Tags
                        </h1>
                    </div>
                    <div className="flex max-w-lg flex-wrap">
                        {tagKeys.length === 0 && 'No tags found.'}
                        {tags.map((tag) => {
                            const { name, count } = tag
                            return (
                                <div key={name} className="mb-2 mr-5 mt-2">
                                    <Link
                                        href={`/tags/${name}`}
                                        className="mr-3 text-sm font-medium uppercase text-fuchsia-500 hover:text-fuchsia-600 dark:hover:text-primary-400"
                                    >
                                          {name}
                                    </Link>
                                    <Link
                                        href={`/tags/${name}`}
                                        className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                                        aria-label={`View posts tagged ${count}`}
                                    >
                                        {` (${count})`}
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blog
