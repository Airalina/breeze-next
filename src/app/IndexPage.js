'use client'

import React, { useEffect, useState } from 'react';
import siteMetadata from '@/data/siteMetadata'
import Link from '@/components/NavLink'
import Tag from '@/components/Tag'
import { formatDate } from 'pliny/utils/formatDate'
import List from '@/app/(auth)/post/PostList'
import Alert from '@/components/Alert'
import Modal from "@/components/Modal"

const IndexPage = () => {

    const [modalShow, setmodalShow] = useState(false)
    const [post, setPost] = useState({})

    const onToggleModal = () => {
        setmodalShow(true);
    }

    const handleCloseModal = () => {
        console.log('asassa');
        setmodalShow(false);
    };

    const handleOpenModal = (post) => {
        console.log(post);
        setPost(post);
        setmodalShow(true);
    };

    return (
        <>
            <div>
                <Alert />
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 font-['Nunito']">
                <div className="space-y-2 pb-8 pt-6 md:space-y-5">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                        Latest
                    </h1>
                    <div className='flex justify-between'>
                        <p className="text-lg leading-7  font-['SpaceGrotesk'] text-gray-500 dark:text-gray-400">
                            {siteMetadata.description}
                        </p>
                        <button className='text-lg rounded px-2 py-1 font-semibold bg-fuchsia-500 hover:bg-fuchsia-600' aria-label="New post" onClick={onToggleModal}>Add new post</button>
                    </div>
                </div>
                <List view={'index'} tag={''} openModal={handleOpenModal} />
                {modalShow && <Modal closeModal={handleCloseModal} post={post}  />}
            </div>

        </>
    )
}

export default IndexPage
