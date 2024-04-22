'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from '@/app/(app)/Navigation'
import Loading from '@/app/(app)/Loading'

const AppLayout = ({ children, header }) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-slate-900 text-black dark:bg-gray-950 dark:text-white">
            <Navigation user={user} />

            <main>{children}</main>
        </div>
    )
}

export default AppLayout
