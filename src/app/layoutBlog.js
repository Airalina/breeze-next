
import '@/app/global.css'

export const metadata = {
    title: 'Laravel',
}
const layoutBlog = ({ children }) => {
    return (
        <div class="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px- min-h-screen">
            {children}
        </div>
    )
}

export default layoutBlog


