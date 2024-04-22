
import Link from '@/components/NavLink'
import MobileNav from '@/components/MobileNav'
import ThemeSwitch from '@/components/ThemeSwitch'
import siteMetadata from '@/data/siteMetadata'


const Header = () => {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="text-black dark:text-white w-1/2 flex items-center justify-between">
            <div className="mr-3">
              <img src={'/logo.png'} className="max-w-[3rem]" alt="Logo" />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {siteMetadata.headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hidden font-medium text-gray-900 dark:text-gray-100 hover:text-gray-300 focus:text-gray-300 sm:block"
            >
              {link.title}
            </Link>
          ))}
          
        {/*<SearchButton />  */}
          <ThemeSwitch /> 
        <MobileNav />
      </div>
    </header>

    // <header className="bg-white shadow">
    //     <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">

    //         <h2 className="font-semibold text-xl text-gray-800 leading-tight">
    //             {title}
    //         </h2>
    //     </div>
    // </header>
  )
}

export default Header