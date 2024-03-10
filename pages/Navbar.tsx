import React from 'react'
import Link from 'next/link'
import { AppProps } from 'next/app'

type Props= {
}

 const Navbar =(props:Props)=>{
    return (
        <nav className='flex justify-between h-16 p-6'>
            <ul>
                <Link href="/"><strong>Journal App</strong></Link>
            </ul>
            <ul>
                <Link href="/entry/create" role={'button'} className='p-2 bg-blue-700 text-cyan-50'>Create</Link>
            </ul>
        </nav>
      )
}

export default Navbar;
