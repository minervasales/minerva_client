import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Transition, Disclosure } from "@headlessui/react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineIntegrationInstructions,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";
import {TbListSearch, TbUsers, 
    TbFiles, TbCalendar, TbShoppingBag, 
    TbClock, TbGraph, TbFileAnalytics, 
    TbList, TbArchive, TbClipboard, 
    TbMessage, TbSettings2, TbLogout2, 
    TbArrowLeft, TbChevronLeft, TbChevronRight, 
    TbSettings  } from 'react-icons/tb'
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";
import Image from "next/image";
import router, { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie'
import { FaQuestionCircle } from "react-icons/fa";
import { FaPhoneSquare } from "react-icons/fa";
import { BiSolidBookContent } from "react-icons/bi";



const routes = [
    { name: "Customer Management" , url: "/admin/customer", icons: <TbUsers size={30} />}, 
    { name: "Product Management", url: "/admin/product", icons: <TbFiles size={30} />},
    { name: "Service Management", url: "/admin/service", icons: <TbListSearch size={30} />}, 
    { name: "Order Management", url: "/admin/order", icons: <TbShoppingBag size={30} />},
    { name: "Appointments", url:"/admin/appointment", icons: <TbClock size={30} />},
    { name: "Inventory", url: "/admin/inventory", icons: <TbClipboard size={30}/>},
    
]


const submenu = [
    { name: "Generate Reports", url :"/admin/report/generatereport", icons: <TbFileAnalytics size={30}/>},
    { name: "Audit Logs", url: "/admin/report/auditlog", icons: <TbList size={30}/>},
    { name: "Report Archive", url: "/admin/report/reportarchive", icons: <TbArchive size={30}/>}
]

const submenu2 = [
  { name: "About Us", url: "/admin/content/aboutus", icons: <FaQuestionCircle size={30} /> },
  { name: "Contact Us", url: "/admin/content/contactus", icons: <FaPhoneSquare size={30} /> },
]


function SideNavbar() {


  const [open, setOpen] = useState(false);

  const handleClick = () => {
     setOpen(!open);
  };
  const [userId, setUserId] = useState("");
    
    useEffect(() => {
        const cookies = Cookies.get("ecom_token");
        if (cookies) {
          const { userID }: any = jwtDecode(cookies);
          setUserId(userID);
        }
      }, []);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
     
        const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/user/getUsersId/${router.query.id}`, {
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
          cache: "default",
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch user data: ${res.status}`);
        }

        const result = await res.json();

      };
      
    fetchData();
  }, [router ]);
  const [ content, setContent ] = useState(false)
  const [ reports, setReports ] =  useState(false)

  const onLogoutBtn = () => {
    Cookies.remove("ecom_token")
    router.push("/")
  }

  return (
    <div>
      <Disclosure as="nav">
        <Disclosure.Button className="absolute top-4 right-4 z-20 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu
            className="block sm:hidden lg:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>
        <div className="p-6 lg:w-[350px] sm:w-[100px] sm:h-[1000px] overflow-y-auto h-screen bg-white z-20 absolute top-0 -left-96 lg:left-0 lt:mr-40 sm:absolute sm:left-0 peer-focus:left-0 peer:transition sm:peer-focus:left-0 sm:peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center">
            <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
                <div className="lg:pl-28 pb-4 sm:pl-2">
            <Image src="/logo.png" alt="" height={20} width={70} />
            </div>
        <span className="font-roboto lg:text-2xl sm:text-lg font-extrabold text-[#FFBD59] lg:flex pt-4 sm:hidden">Minerva Sales Corporation</span>
            </h1>
            
            <div className=" my-4 border-b border-gray-100 pb-4">
              <div className="flex flex-col mb-2 items-center gap-4 pl-5">
              {routes.map(({ name, url, icons}) => (
                <button key={name} onClick={() => router.push(`${url}`)} className="w-full flex gap-2 lg:pl-6 lg:hover:bg-gray-900 lg:p-2 lg:rounded-md  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                    <span className="text-2xl text-gray-600 group-hover:text-white sm:relative sm:left-[-20px]"> {icons} </span>
                   <span className="text-base text-gray-800 group-hover:text-white font-semibold lg:flex sm:hidden "> {name}</span>
                </button>
                ))}
              </div>
              <button onClick={() => setReports(() =>!reports)} className="w-60 mb-2 ml-[21px] sm:ml-2 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <div className='w-full flex gap-2 text-md text-gray-800 group-hover:text-white font-semibold'>
                    <TbGraph className='sm:relative sm:left-[-5px]' size={30}/>
                    <span className="pt-[1px] text-[16px] lg:flex sm:hidden">Reports</span>
                    <TbChevronRight className='pt-[1px] lg:relative lg:pl-2 sm:relative sm:left-[-15px]' size={25} />
                </div>
                
            </button>
              {
                reports ? 
              <div className='flex flex-col mb-2 items-center gap-4 pl-5'>    
                    {submenu.map(({name, url, icons}) => (
                        <button key={name} onClick={() => router.push(url)} className="w-full flex gap-2 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                            <span className="text-2xl text-gray-600 group-hover:text-white "> {icons} </span>
                            <span className="text-base text-gray-800 group-hover:text-white font-semibold  lg:flex sm:hidden"> {name}</span>
                        </button>
                    ))}
                </div>  : null
            }

<button onClick={() => setContent(() =>!content)} className="w-60 mb-2 ml-[21px] sm:ml-2 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <div className='w-full flex gap-2 text-md text-gray-800 group-hover:text-white font-semibold'>
                    <BiSolidBookContent size={30} className='sm:relative sm:left-[-5px]'/>
                    <span className="pt-[7px] text-[16px] lg:flex sm:hidden w-60">Content Management</span>
                    <TbChevronRight className='pt-[10px] lg:relative lg:pl-2 sm:relative sm:left-[-15px]' size={25} />
                </div>
                
            </button>
              {
                content ? 
              <div className='flex flex-col mb-2 items-center gap-4 pl-5'>    
                    {submenu2.map(({name, url, icons}) => (
                        <button key={name} onClick={() => router.push(url)} className="w-full flex gap-2 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                            <span className="text-2xl text-gray-600 group-hover:text-white "> {icons} </span>
                            <span className="text-base text-gray-800 group-hover:text-white font-semibold lg:flex sm:hidden"> {name}</span>
                        </button>
                    ))}
                </div>  : null
            }
              

            </div>
            {/* setting  */}
            <div className=" my-4 border-b border-gray-100 pb-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <span><MdOutlineSettings className="text-2xl text-gray-600 group-hover:text-white sm:-ml-2" size={30} /></span>
                <button onClick={() => router.push(`/admin/settings/${userId}`)} className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  <span className="lg:flex sm:hidden">Settings</span>
                </button>
              </div>
            </div>
            {/* logout */}
            <div className=" my-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <span><MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white sm:-ml-2" size={30} /></span>
                <button onClick={onLogoutBtn}
                  className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  <span className="lg:flex sm:hidden">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

export default SideNavbar;