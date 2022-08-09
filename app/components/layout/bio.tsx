import { SITE_CONFIG } from '~/utils/constants'
import { GitHub, Twitter } from 'iconoir-react'

const { author } = SITE_CONFIG

export const Bio = () => {
  return (
    <div className="flex items-center justify-center gap-8">
      <div className="tooltip" data-tip={author.name}>
        <img
          className="inline-block h-10 w-10 rounded-full"
          src="/assets/profile-pic.jpg"
          alt=""
        />
      </div>

      <div className="flex items-center gap-8">
        <a
          href="https://github.com/nnecec/nnecec.github.io"
          target="_blank"
          referrerPolicy="no-referrer"
          rel="noreferrer"
        >
          <div className="tooltip" data-tip="github.com/nnecec">
            <GitHub />
          </div>
        </a>
        <a
          href="https://twitter.com/nnecec_cn"
          target="_blank"
          referrerPolicy="no-referrer"
          rel="noreferrer"
        >
          <div className="tooltip" data-tip="twitter.com/nnecec_cn">
            <Twitter />
          </div>
        </a>
      </div>
    </div>
  )
}
