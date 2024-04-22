
'use client'

import Blog from '@/app/(auth)/blog/page'
import { useParams } from 'next/navigation';

const TagPage = () => {
  const  tag  =  useParams();
  
  return ( <>
      <Blog tag={tag?.name} />
  
    </>
  );
};

export default TagPage;