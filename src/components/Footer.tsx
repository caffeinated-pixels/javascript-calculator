import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons'

export const Footer = () => {
  return (
    <footer>
      <p>
        Coded by{' '}
        <a
          href="https://steviegill-webportfolio.netlify.app/"
          title="Stevie's web app portofolio page"
        >
          Stevie Gill
        </a>
        {'; '}
        <a
          href="https://github.com/caffeinated-pixels/javascript-calculator"
          title="JS calculator Github repo"
        >
          <FontAwesomeIcon icon={faGithubSquare} className="githubIcon" /> repo
        </a>
      </p>
    </footer>
  )
}
