import {
  Mail,
  Github,
  Linkedin,
} from './icons'

const components = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
}


const SocialIcon = ({ kind, href, size = 8 }) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const SocialSvg = components[kind]

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current text-gray-700 hover:text-fuchsia-500 dark:text-gray-200 dark:hover:text-fuchsia-400 h-${size} w-${size}`}
      />
    </a>
  )
}

export default SocialIcon
