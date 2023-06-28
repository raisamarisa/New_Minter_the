import { useConnect } from 'wagmi';
import { useTheme } from "next-themes" 
import { ExampleButton } from './connect';
import {Popover, Transition} from '@headlessui/react'
import logo from "../../public/logo.webp"
import { useState ,useEffect} from 'react';
import { AiOutlineTwitter } from "react-icons/ai";

import Link from 'next/link';
export function Header() {
    const { theme, setTheme } = useTheme(); 
    const [isMounted, setIsMounted] = useState(false);



useEffect(() => {
    setIsMounted(true);
    setTheme("dark");
  },[]);


  const ChangeToDarkMood = ()=>{
    if (isMounted) {
        setTheme(theme === "light" ? "dark" : "light");
      }
  }



 return (
<Popover className="w-full ">
            <div
                className='flex items-center px-4 justify-between max-w-7xl m-auto
    transform  dark:backdrop-blur-none text-black
     dark:text-white z-50  top-[0px]
      sticky py-6'>

                <div className="cursor-pointer flex justify-center items-center">
                    {/* logo */}
        
                    <a href=""  rel="noreferrer" target="_blank">
                        <AiOutlineTwitter size={30} className='text-white'/>
                     </a>
                </div>
                {/* logo */}

                {/* ul */}
                <div className='flex items-center gap-x-8'>
                
                    {/* ul */}

                    {/* button */}
                    <div className="flex items-center gap-2">
                
                   
                     <ExampleButton />
                    </div>
                </div>
                {/* button */}

                {/* mobile manu */}

           

                {/* mobile manu */}

            </div>
        </Popover>
 )
}
