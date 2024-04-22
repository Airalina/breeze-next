import Link from 'next/link'
import { slug } from 'github-slugger'

const Tag = ({ text }) => {
  return (
    <Link
      href={`/tags/${text}`}
      className="mr-3 text-sm font-medium uppercase text-fuchsia-500 hover:text-fuchsia-600 dark:hover:text-primary-400"
    >
      {text}
    </Link>
  )
}

export default Tag
