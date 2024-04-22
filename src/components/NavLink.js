import Link from 'next/link'

const NavLink = ({ active = false, children, ...props }) => (
    <Link
        className={`font-['SpaceGrotesk']  items-center  pt-1 border-b-2 text-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${active
                ? 'border-indigo-400 text-gray-900 focus:border-indigo-700'
                : "border-transparent  text-gray-100  hover:text-gray-300 focus:text-gray-300 focus:border-gray-300"
            }`}   {...props}>
        {children}
    </Link>
)

export default NavLink
