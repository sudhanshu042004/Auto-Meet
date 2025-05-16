import { BotIcon, Sparkles } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './button'
import logo from "/logo.svg"
import { cn } from '@/lib/utils'

interface navItems {
    href: string,
    label: string,
}
const navItems: navItems[] = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How it works" },
    {href : "#about",label : "About"}
]

const Header = () => {
    const [visible, setVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [prevScrollPos, setPreScrollPos] = useState(0);

    useEffect(()=>{
        const handleScroll = ()=>{
            const currentScrollPos = window.scrollY;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setIsScrolled(currentScrollPos >50);
            setPreScrollPos(currentScrollPos);
        }

        window.addEventListener("scroll",handleScroll);
        return ()=> window.removeEventListener("scroll",handleScroll);
    },[])

    return (
        <header className={cn(
            "fixed z-50 transition-all duration-500",
            "left-0 right-0 backdrop-blur-xl",
            "bg-[#0E103D]/70 rounded-xl border border-[#323232]/70",
            "shadow-[0_10px_30px_rgba(0,0,0,0.7)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)]",
            "mx-4 mt-4",
            "sm:mx-6 sm:mt-6",
            "lg:mx-40 lg:mt-6",
            {
                "-translate-y-full opacity-0" : !visible,
                "lg:mx-60 lg:translate-y-4" : isScrolled
            }
        )}>
            <div className='flex items-center justify-between h-[70px] px-4 py-2' >
                <Link to="/" className='relative flex-shrink-0 group' >
                    <div className="flex items-center">
                        <img src={logo} alt='logo' width={50} height={50} />
                    </div>
                </Link>

                <nav className='hidden md:block mx-4 flex-grow' >
                    <ul className='flex items-center justify-center space-x-6 lg:space-x-12' >
                        {navItems.map(navItem => (
                            <li>
                                <Link
                                    to={navItem.href}
                                    className='text-gray-300 hover:text-[#D3BCC0] font-medium text-base lg:text-lg transition-colors whitespace-nowrap relative group'
                                >
                                    {navItem.label}
                                    <span className="bg-[#D3BCC0] left-0 h-[2px] absolute -bottom-1 w-0 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className='hidden md:flex space-x-3' >
                    <Link to="/login"
                    className='flex justify-center items-center text-gray-300 font-medium text-sm px-4 lg:px-6 py-2 rounded-lg hover:border-[#F2D7EE] transition-colors border border-transparent'
                    >
                        Log In
                    </Link>
                    <Link to='/signup'
                    className='flex justify-center items-center px-4 lg:px-6 text-sm py-2 rounded-lg bg-[#F2D7EE] hover:bg-white h-11 min-w-[120px] lg:w-36
                    transition-colors whitespace-nowrap
                    '
                    >
                    <span className='flex items-center z-10 relative' >
                    Sign up
                    <Sparkles className='ml-2 h-4 w-4' />
                    </span>
                    </Link >
                </div>
            </div>
        </header>
    )
}

export default Header
