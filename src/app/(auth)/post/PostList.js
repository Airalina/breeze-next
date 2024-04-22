'use client'

import React, { useEffect, useState } from 'react';
import siteMetadata from '@/data/siteMetadata'
import Link from '@/components/NavLink'
import Tag from '@/components/Tag'
import { formatDate } from 'pliny/utils/formatDate'
import axios from '@/lib/axios'
import List from '@/app/(auth)/post/PostList'
import Button from '@/components/Button'
import ReactPaginate from 'react-paginate';

const PostList = ({ view, tag = '', openModal }) => {
    const [data, setData] = useState([]);
    const [meta, setMeta] = useState([]);
    const MAX_DISPLAY = 5
    const ids = [1, 2, 3];
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 4;

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        try {
            let url = 'http://localhost:8000/api/';
            if (tag) {
                url += `tags/${tag}`;
            } else {
                url += 'posts';
            }

            const response = await fetch(url + `?page=${currentPage}`, {
                headers: {
                    'Authorization': `Bearer 1|qvil55IhHvI6ugBcNS5fXeiyCANtyzv2WJZpasyT1a875246`
                }
            });
            const jsonData = await response.json();
            setData(jsonData.data);
            setMeta(jsonData.meta);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const deletePost = async (id) => {
        let url = `http://localhost:8000/api/posts/${id}`;

        axios
            .delete(url, {
                headers: {
                    'Authorization': `Bearer 1|qvil55IhHvI6ugBcNS5fXeiyCANtyzv2WJZpasyT1a875246`
                }
            })
            .then(res => {
                // router.push('/');
                fetchData();
            })
            .catch(error => {
                console.log(error);
                if (error.response.status !== 422) throw error
            })
    };

    let className = '';
    let classNameUl = '';
    if (view.includes('index')) {
        className += 'space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0';
        classNameUl += 'divide-y divide-gray-200 dark:divide-gray-700';
    }

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected + 1);
    };

    return (
        <>
            <section>
                <ul className={classNameUl} >
                    {!data.length && 'No posts found.'}
                    {data.slice(0, MAX_DISPLAY).map((post, index) => {
                        const { slug, created_at, title, summary, tags, id } = post
                        return (
                            <li key={index} className="py-12">
                                <article>
                                    <div className={className}
                                    >
                                        <dl>
                                            <dt className="sr-only">Published on</dt>
                                            <dd className="text-base font-['SpaceGrotesk'] font-medium leading-6 text-gray-500 dark:text-gray-400">
                                                <time dateTime={created_at}>{formatDate(created_at, siteMetadata.locale)}</time>
                                            </dd>
                                        </dl>
                                        <div className="space-y-5 xl:col-span-3">
                                            <div className="space-y-6">
                                                <div>
                                                    <div className='flex justify-between'>
                                                        <h2 className="text-2xl font-bold leading-8 tracking-tight">
                                                            <Link
                                                                href={`/post/${slug}`}
                                                                className="text-gray-900 dark:text-gray-100"
                                                            >
                                                                {title}
                                                            </Link>
                                                        </h2>
                                                        <div className='flex'>
                                                            {!ids.includes(id) && (
                                                                <div className='flex'>
                                                                    <Button type="button" className="ml-4 !bg-fuchsia-500 hover:!bg-fuchsia-600" onClick={(e) => openModal(post, e)}>Edit</Button>
                                                                    <Button type="button" className="ml-4 !bg-fuchsia-500 hover:!bg-fuchsia-600" onClick={(e) => deletePost(id)}>Delete</Button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap">
                                                        {tags.map((tag) => (
                                                            <Tag key={tag} text={tag} />
                                                        ))}
                                                    </div>

                                                </div>
                                                <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                                                    {summary}
                                                </div>
                                            </div>
                                            {view.includes('index') &&
                                                <div className="text-base font-medium leading-6">
                                                    <Link
                                                        href={`/post/${slug}`}
                                                        className="text-fuchsia-500 hover:text-fuchsia-600 dark:hover:text-fuchsia-400"
                                                        aria-label={`Read more: "${title}"`}
                                                    >
                                                        Read more &rarr;
                                                    </Link>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </article>
                            </li>
                        )
                    })}
                </ul>
                <div className=''>
                    <ReactPaginate
                        pageCount={meta?.last_page}
                        pageRangeDisplayed={5}
                        marginPagesDisplayed={2}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination flex gap-4 justify-center'}
                        activeClassName={'active text-fuchsia-500'}
                        disabledClassName={'disabled'}
                        previousLinkClassName={meta?.current_page === 1 ? 'disabled text-gray-400' : ''}
                        previousClassName={meta?.current_page === 1 ? 'disabled text-gray-400' : ''}
                        nextLinkClassName={meta?.current_page === meta?.last_page ? 'disabled text-gray-400' : ''}
                        nextClassName={meta?.current_page === meta?.last_page ? 'disabled text-gray-400' : ''}
                    />
                </div>

                {(data.length > MAX_DISPLAY && view.includes('index')) && (
                    <div className="flex justify-end text-base font-medium leading-6">
                        <Link
                            href="/blog"
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            aria-label="All posts"
                        >
                            All Posts &rarr;
                        </Link>
                    </div>
                )}

            </section>
        </>
    )
}

export default PostList
