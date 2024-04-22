


import PostDetail from '@/app/(auth)/post/PostDetail';
import Header from '@/app/(app)/Header' // Importa tu componente PostDetail

const PostPage = () => {
  return (<>
    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px- min-h-screen">
      <Header title="Dashboard" />
      <PostDetail />
    </div>
  </>
  );
};

export default PostPage;