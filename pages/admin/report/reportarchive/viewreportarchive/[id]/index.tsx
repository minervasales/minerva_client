
import React, { FC, useEffect, useState } from 'react'
import Head from 'next/head'
import { TbEdit, TbTrash, TbUsers, TbFiles, TbCalendar, TbShoppingBag, TbClock, TbGraph, TbFileAnalytics, TbList, TbArchive, TbClipboard, TbMessage, TbSettings2, TbLogout2, TbArrowLeft, TbChevronLeft, TbChevronRight, TbDownload } from 'react-icons/tb'
import { useRouter } from 'next/router'
import ArchivePDF from '@/components/archivePDF'
import Image from 'next/image'
import SideNavDash from '@/components/sideNavDash'


const View: FC = () => {

  const router = useRouter();
  

  const [ archive, setArchive ] = useState<any>(null)
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/archive/getAllArchive/${router.query.id}`, {
        method: "GET",
        cache: "default",
      })
      const result = await res.json();

      setArchive(result)
    }
    fetchData()
  }, [ router, archive ])
  
  console.log(archive)

  return (
    <>
    <title>View Report Archive</title>
    <SideNavDash/>
    
        <div className="h-screen bg-gray-200 sm:pl-20 lg:pl-2">
        <div className="flex w-full h-[1050px] bg-gradient-to-r from-amber-200 to-yellow-500 flex-col bg-white bg-clip-border text-gray-700 shadow-md">
        <div>
        <div className='text-3xl font-roboto font-bold leading-tight sm:ml-10 sm:mt-4 lg:ml-[400px] lt:mt-6 lt:ml-80 lg:mt-10 sm:text-[20px] sm:w-40'>Viewing Report Archive {archive?.id}</div>
        <div ></div>

        <div>

          <div className='flex justify-center lg:ml-80 lg:mt-10 lt:ml-20 lt:mt-2'>
<ArchivePDF generate={archive}/> 

     

</div>
        </div>
      </div>
                        </div>
    </div>
    </>
  )
}

export default View