import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Images from '../../../public/assets/image'

function Header () {
  return (
    <header className='flex justify-between items-center space-x-2 font-bold px-10 py-5'>
<div className='flex items-center space-x-2'>
    <Link href='/'> <Image
    src={Images.logo}
    width={50}
    height={50}
    alt='logo'
    className='rounded-full'
    /></Link>
    </div>
<div><Link 
href='/'
className='px-5 py-3 md:txt-base text-sm flex text-center bg-gray-900 items-center rounded-full text-white'
>
    Sign up for regular updates
    </Link></div>

    </header>
  )
}

export default Header
