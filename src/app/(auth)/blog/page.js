'use client'

import Header from '@/app/(app)/Header'
import List from '@/app/(auth)/post/PostList'
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'
import Link from '@/components/NavLink'

const Blog = (tag = '') => {
    const pathname = usePathname()
    // const sortedTags = [ "next-js","tailwind","guide",
    //    ];

    const [tags, setTags] = useState([]);
    //    const MAX_DISPLAY = 5

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
                <div className='flex sm:space-x-24'>
                    <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
                        <div className="px-6 py-4">
                            {pathname.startsWith('/blog') ? (
                                <h3 className="font-[SpaceGrotesk] font-bold uppercase text-fuchsia-500">All Posts</h3>
                            ) : (
                                <Link
                                    href={`/blog`}
                                    className="font-bold uppercase text-gray-700 hover:text-fuchsia-500 dark:text-gray-300 dark:hover:text-fuchsia-500"
                                >
                                    All Posts
                                </Link>
                            )}
                            <ul>
                                {!tags.length && 'No tags found.'}
                                {tags?.map((t) => {
                                      const { name, count } = t
                                    return (
                                        <li key={name} className="my-3">
                                            <Link
                                                href={`/tags/${name}`}
                                                className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-fuchsia-500 dark:text-gray-300 dark:hover:text-fuchsia-500"
                                                aria-label={`View posts tagged ${name}`}
                                            >
                                                {`${name} (${count})`}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700 font-['Nunito']">
                        <List view={'blog'} tag={tag?.tag} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blog
