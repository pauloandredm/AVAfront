import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FiPhoneCall } from 'react-icons/fi'
import { HiOutlineMail } from 'react-icons/hi'
import { MdOutlineLocationOn } from 'react-icons/md'
import styles from './Footer.module.css'
import { Link, useNavigate } from "react-router-dom";
import logo from './Assembleia-logo-negativo.png'
import alrn3 from './alrn3.png'


function Footer() {
  return (
    <footer className={styles.footer}>

      <ul className={styles.social_list}>

        <li style={{ listStyle: 'none', paddingLeft: "15px" }}> 
          <Link to="/">
            <img src={logo} alt="Logo" className={styles.logo_footer} />
          </Link>
        </li>

        <li>
          <a href="https://www.instagram.com/soualrn/" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <FaInstagram className={styles.itens} />
            Instagram
          </a>
        </li>

        <li style={{ color: 'white', textDecoration: 'none', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>
            <FiPhoneCall className={styles.itens} />
            (84) 9 8807-4270
        </li>

        <li style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <HiOutlineMail className={styles.itens} />
            assecom.alrn@gmail.com
        </li>

        <li style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <MdOutlineLocationOn className={styles.itens} />
            Praça Sete de Setembro, 120 
            Cidade Alta Natal/RN - CEP 59025-300
        </li>

        <li style={{ listStyle: 'none', paddingLeft: "15px"}}> 
          <Link to="/">
            <img src={alrn3} alt="alrn3" className={styles.logo_footer} />
          </Link>
        </li>

      </ul>
      
    </footer>
  )
}

export default Footer