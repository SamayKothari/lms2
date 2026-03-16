import React from 'react'
import { Link } from 'react-router-dom'
import { 
  FacebookLogo,  
  LinkedinLogo,  
  WhatsappLogo 
} from 'phosphor-react'
import { FaXTwitter, FaGithub } from "react-icons/fa6";
const SocialIcons = () => {
  return (
    <div className='flex items-center gap-3 mt-5 ml-1 mb-2 max-md:mt-4'>
      <Link 
        target='_blank' 
        to='https://www.facebook.com/'
        className="group transition transform hover:scale-110 text-[#0b16f1] hover:text-blue-500"
      >
        <FacebookLogo size={34} weight="fill" className="transition-colors duration-300" />
      </Link>
      <Link 
        target='_blank' 
        to='https://x.com/'
        className="group transition transform hover:scale-110 text-[#cbc3c3] hover:text-gray-700"
      >
        <FaXTwitter size={30} weight="fill" className="transition-colors duration-300" />
      </Link>
      <Link 
        target='_blank' 
        to='https://www.linkedin.com/in/'
        className="group transition transform hover:scale-110 text-[#1e17ea] hover:text-blue-600"
      >
        <LinkedinLogo size={34} weight="fill" className="transition-colors duration-300" />
      </Link>
      <Link 
        target='_blank' 
        to='https://github.com/'
        className="group transition transform hover:scale-110 text-[#c2baba] hover:text-gray-500"
      >
        <FaGithub size={30} weight="fill" className="transition-colors duration-300" />
      </Link>
      <Link 
        target='_blank' 
        to='https://wa.me/918655039693?text=Hey%20%F0%9F%91%8B%2C%20how%20can%20I%20help%20you%3F'
        className="group transition transform hover:scale-110 text-[#0fc865] hover:text-green-500"
      >
        <WhatsappLogo size={34} weight="fill" className="transition-colors duration-300" />
      </Link>
    </div>
  )
}

export default SocialIcons
