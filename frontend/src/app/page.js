"use client";

import Image from "next/image"; 
import Link from "next/link";
import { motion } from 'motion/react'; 
import image from "./image.jpg";
import { redirect } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function Page() {
  
  const { user } = useUser();
    if(user)
    {
        redirect("/home");
    }

  return (
    <motion.section animate={{ x: [ -75, 0 ], opacity: [ 0, 0.5, 0.7, 0.9, 1 ] }} transition={{ ease: 'easeIn', duration: 1.5 }}>
      <div
        className='container text-black rounded flex flex-col-reverse md:ml-24 lg:ml-32 items-center px-6 text-white mx-auto mt-1 space-y-12 md:space-y-0 md:mt-20 md:flex-row'
      >
          <div className='flex flex-col mb-32 space-y-12 md:w-1/2'>
            <motion.h1
                
                className='max-w-md text-4xl text-black font-bold text-center md:text-5xl md:text-left'
            >
              Best Articulated Blogs
            </motion.h1>

            <div> 
              <p className='max-w-sm text-center text-black md:text-left'>
                  Write and read the best articulated articles and blogs currently trending online.
                  Get paid to write and read cheap life-long information.
              </p>
            </div>    

            <div className='flex justify-center md:justify-start'>
                <motion.div
                animate={{ y: [ 0, -20, 0 ], opacity: 1 }}
                transition={{
                  delay: 4,
                  ease: 'easeInOut',
                  y: { type: 'bounce', stiffness: 15, repeat: Infinity, duration: 1.5 },
                  default: { duration: 1.5, repeat: Infinity },
                }}
                className='mt-5'>
                  <Link href='/register'> 
                    <button className='bg-red-500 font-bold rounded text-white px-6 p-3 hover:opacity-75'>Read now</button>
                  </Link>
                </motion.div>
            </div>
          </div>

          <motion.div 
            className='md:w-1/2'
            animate={{ opacity: 1, y: [ 0, -50]}}
            transition={
              {
                delay: 1,
                y: { type: 'bounce', stiffness: 15 },
                default: { duration: 3, repeatType: 'loop', repeat: Infinity },
              }}
            >
              <Image className='sm:w-auto md:w-9/12 rounded-[30%]' height={0} width={0} src={image} alt='' />
          </motion.div>
      </div>

    </motion.section>
  );
}
