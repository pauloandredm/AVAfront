import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FiPhoneCall } from 'react-icons/fi'
import { HiOutlineMail } from 'react-icons/hi'
import { MdOutlineLocationOn } from 'react-icons/md'
import styles from './Footer.module.css'
import { Link, useNavigate } from "react-router-dom";
import logo from './Assembleia-logo-negativo.png'

function Footer() {
  return (
    <footer className={styles.footer}>

      <ul className={styles.social_list}>

        <li style={{ listStyle: 'none', paddingLeft: "40px" }}> 
          <Link to="/">
            <img src={logo} alt="Logo" style={{ height: '120px', width: 'auto'}} />
          </Link>
        </li>

        <li>
          <a href="https://www.instagram.com/AssembleiaRN/" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <FaInstagram style={{ marginRight: '10px' }} />
            Instagram
          </a>
        </li>

        <li style={{ color: 'white', textDecoration: 'none', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>
            <FiPhoneCall style={{ marginRight: '10px' }} />
            (84) 8807-4270
        </li>

        <li style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <HiOutlineMail style={{ marginRight: '10px' }} />
            assecom.alrn@gmail.com
        </li>

        <li style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <MdOutlineLocationOn style={{ marginRight: '10px' }} />
            Praça Sete de Setembro, 120 
            Cidade Alta Natal/RN - CEP 59025-300
        </li>

      </ul>
      
    </footer>
  )
}

export default Footer