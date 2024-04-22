'use client'

import { useAuth } from '@/hooks/auth'
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from '@/components/NavLink'
import axios from 'axios';
import siteMetadata from '@/data/siteMetadata'

import { formatDate } from 'pliny/utils/formatDate'

const PostDetail = () => {

  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const postDateTemplate = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  useEffect(() => {
    if (!slug) {
      return;
    }

    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/posts/${slug}`, {
          headers: {
            'Authorization': `Bearer 1|qvil55IhHvI6ugBcNS5fXeiyCANtyzv2WJZpasyT1a875246`
          }
        }); // Ruta de la API Laravel
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {post ? (
        <article>
          <div className="xl:divide-y font-['SpaceGrotesk'] xl:divide-gray-200 xl:dark:divide-gray-700">
            <header className="pt-6 xl:pb-6">
              <div className="space-y-1 text-center">
                <dl className="space-y-10">
                  <div>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium font-['SpaceGrotesk'] leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={post.created_at}>
                        {new Date(post.created_at).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                      </time>
                    </dd>
                  </div>
                </dl>
                <div>
                  <h1 className=" text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                    {post.title}
                  </h1>
                </div>
              </div>
            </header>
            <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
              <dl className="pb-10 pt-6 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
                <dt className="sr-only">Authors</dt>
                <dd>
                  <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">

                    <li className="flex items-center space-x-2" key={siteMetadata.author}>
                      <img
                        src={'/about.jpg'}
                        width={38}
                        height={38}
                        alt="avatar"
                        className="h-10 w-10 rounded-full"
                      />
                      <dl className="whitespace-nowrap text-sm font-medium leading-5">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-gray-900 dark:text-gray-100">{siteMetadata.author}</dd>
                        <dt className="sr-only">Twitter</dt>
                        <dd>
                          {siteMetadata.github && (
                            <Link
                              href={siteMetadata.github}
                              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            >
                              @airalina
                            </Link>
                          )}
                        </dd>
                      </dl>
                    </li>
                  </ul>
                </dd>
              </dl>
              <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
                <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">{post.summary}</div>
                <div className="pb-6 pt-6 text-sm text-gray-700 dark:text-gray-300">
                  <Link href={siteMetadata.github} rel="nofollow">
                    Discuss on Twitter
                  </Link>
                  {` • `}
                  <Link href={siteMetadata.github}>View on GitHub</Link>
                </div>
              </div>
              <footer>
                <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                  {post.tags.length > 0 && (
                    <div className="py-4 xl:py-8">
                      <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Tags
                      </h2>
                      <div className="flex flex-wrap">
                      <ul>
                        {post.tags.map((tag) => (
                          <li key={tag} className="my-3">
                            <Link
                              href={`/tags/${tag}`}
                              className="mr-3 text-sm font-medium uppercase text-fuchsia-500 hover:text-fuchsia-600 dark:hover:text-primary-400"
                            >
                              {tag?.split(' ').join('-')}
                            </Link>
                          </li>
                        ))}
                          </ul>
                      </div>
                    </div>
                  )}
                  {(post.next || post.previous) && (
                    <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                      {post.previous && Object.keys(post.previous).length != 0 && (
                        <div>
                          <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Previous Article
                          </h2>
                          <div>
                            <Link className="text-fuchsia-500 hover:text-fuchsia-600 dark:hover:text-fuchsia-400" href={`/post/${post.previous.slug}`}>{post.previous.title}</Link>
                          </div>
                        </div>
                      )}
                      {post.next &&  Object.keys(post.next).length != 0 && (
                        <div>
                          <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Next Article
                          </h2>
                          <div>
                            <Link className="text-fuchsia-500 hover:text-fuchsia-600 dark:hover:text-fuchsia-400" href={`/post/${post.next.slug}`}>{post.next.title}</Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/blog`}
                    className="text-fuchsia-500 hover:text-fuchsia-600 dark:hover:text-fuchsia-400"
                    aria-label="Back to the blog"
                  >
                    &larr; Back to the blog
                  </Link>
                </div>
              </footer>
            </div>
          </div>
        </article>
      ) : (
        <p>No post found</p>
      )}
    </div>
  );
};

export default PostDetail;