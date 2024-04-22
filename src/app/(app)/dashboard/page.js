import Header from '@/app/(app)/Header'
import IndexPage from '@/app/IndexPage'

export const metadata = {
    title: 'Laravel - Dashboard',
}

const Dashboard = () => {
    return (
        <>
         <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px- min-h-screen">
            <Header title="Dashboard" />
            <IndexPage />
            </div>
        </>
    )
}

export default Dashboard