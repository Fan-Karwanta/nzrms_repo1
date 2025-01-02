import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'
import {
  MailOutline,
  FacebookTwoTone as FacebookIcon,
  X,
  LinkedIn,
  Instagram,
} from '@mui/icons-material'
import { strings } from '@/lang/footer'

import SecurePayment from '@/assets/img/secure-payment.png'
import '@/assets/css/footer.css'

const Footer = () => {
  const navigate = useNavigate()

  return (
    <div className="footer">
      <div className="header">NZ&apos; RMS</div>
      <section className="main">
        <div className="main-section">
          <div className="title">{strings.CORPORATE}</div>
          <ul className="links">
            <li onClick={() => navigate('/about')}>{strings.ABOUT}</li>
            <li onClick={() => navigate('/tos')}>{strings.TOS}</li>
          </ul>
        </div>
        <div className="main-section">
          <div className="title">{strings.RENT}</div>
          <ul className="links">
            <li onClick={() => navigate('/agencies')}>{strings.AGENCIES}</li>
            <li onClick={() => navigate('/destinations')}>{strings.LOCATIONS}</li>
          </ul>
        </div>
        <div className="main-section">
          <div className="title">{strings.SUPPORT}</div>
          <ul className="links">
            <li onClick={() => navigate('/contact')}>{strings.CONTACT}</li>
          </ul>
          <div className="footer-contact">
            <MailOutline className="icon" />
            <a href="mailto:info@nzrms.io">infon@nzrms.io</a>
          </div>
          <div className="footer-contact">
            <IconButton href="https://www.facebook.com/" target="_blank" aria-label="Facebook" className="social-icon"><FacebookIcon /></IconButton>
            <IconButton href="https://x.com/" target="_blank" aria-label="X" className="social-icon"><X /></IconButton>
            <IconButton href="https://www.linkedin.com/" target="_blank" aria-label="LinkedIn" className="social-icon"><LinkedIn /></IconButton>
            <IconButton href="https://www.instagram.com/" target="_blank" aria-label="Instagram" className="social-icon"><Instagram /></IconButton>
          </div>
        </div>
      </section>
      <section className="payment">
        <div className="payment-text">{strings.SECURE_PAYMENT}</div>
        <img src={SecurePayment} alt="" />
      </section>
      <section className="copyright">
        <div className="copyright">
          <span>{strings.COPYRIGHT_PART1}</span>
          <span>{strings.COPYRIGHT_PART2}</span>
        </div>
      </section>
    </div>
  )
}
export default Footer