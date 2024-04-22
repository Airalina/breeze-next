
import '@/app/global.css'
import Footer from '@/components/Footer'
import ThemeProvider from '@/app/ThemeProvider'

export const metadata = {
    title: 'Laravel',
}
const RootLayout = ({ children }) => {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body className="antialiased bg-gray-100  text-black  dark:bg-slate-900 dark:text-white">
                <ThemeProvider>
                    {children}
                    <Footer />
                </ThemeProvider>
            </body>

        </html>
    )
}

export default RootLayout
