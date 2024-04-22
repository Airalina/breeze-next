'use client'

import Header from '@/app/(app)/Header'
import List from '@/app/(auth)/post/PostList'
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'
import Link from '@/components/NavLink'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

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
            <div className="mx-auto font-['SpaceGrotesk'] max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px- min-h-screen">
                <Header title="Dashboard" />
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
                        <h1 className="text-3xl  font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                            About
                        </h1>
                    </div>
                    <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
                        <div className="flex flex-col items-center space-x-2 pt-8">
                           
                                <img
                                    src={'/about.jpg'}
                                    alt="avatar"
                                    width={192}
                                    height={192}
                                    className="h-48 w-48 rounded-full"
                                />
                            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">Airaly Cañizales</h3>
                            <div className="text-gray-500 dark:text-gray-400">Full Stack Web Developer</div>
                            <div className="text-gray-500 dark:text-gray-400">Systems Engineer</div>
                            <div className="flex space-x-3 pt-6">
                                <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} />
                                <SocialIcon kind="github" href={siteMetadata.github} />
                                <SocialIcon kind="linkedin" href={siteMetadata.linkedin} />
                            </div>
                        </div>
                        <div class="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
                            <p className='mb-5'>Tails Azimuth is a professor of atmospheric sciences at the Stanford AI Lab. His research interests includes complexity modelling of tailwinds, headwinds and crosswinds.</p>
                            <p className='mb-5'>He leads the clean energy group which develops 3D air pollution-climate models, writes differential equation solvers, and manufactures titanium plated air ballons. In his free time he bakes raspberry pi.</p>
                            <p className='mb-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.</p></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blog
