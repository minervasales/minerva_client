
import React, { FC, SyntheticEvent, useEffect, useState } from 'react'
import Head from 'next/head'
import { TbEdit, TbFile, TbFiles, TbShoppingBag, TbTrash, TbUsers } from 'react-icons/tb'
import { useRouter} from 'next/router'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { FormattedPrice, FormattedDate } from '@/helpers/index'
import { format } from 'date-fns'
import { Toaster, toast } from 'sonner'
import SideNavDash from '@/components/sideNavDash'

const EditOrdersPage: FC = ({}) => {

  const router = useRouter();
  
  const [ isOpen, setIsOpen ] = useState(false);
  const [ userId, setUserId ] = useState("")

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [ isOpen1, setIsOpen1 ] = useState(false);

  const toggleDropdown1 = () => {
    setIsOpen1(!isOpen1);
  };

  const [ ordersD, setOrdersD ] = useState<[]>()
  
  

  useEffect(() => {
    const cookies = Cookies.get("ecom_token")
    if (cookies) {
      const { userID }: any = jwtDecode(cookies)
      setUserId(userID)
    }
  }, [])

  const [ orders, setOrders ] = useState({
    orders: "",
    payment: "",
    total: "",
    createdAt: "",
    name: ""
  })

  const [ status, setStatus ] = useState("")
  const orderStatus =["Preparing Order", "Order Cancelled", "Ready for Pick-Up"];

  const [ selectedImage, setSelectedImage ] = useState<any>([])

  const onHandleImageUpload = (e: any) => {
    setSelectedImage(Array.from(e.target.files))
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/order/getmyorders/${router.query.id}`, {
        method: "GET",      
        headers: { 'Content-Type': 'application/json' },
        cache: "default"
      })

      const result = await res.json();
      setOrdersD(result)
  }

    fetchData()
  }, [router, orders.total, ordersD])

  useEffect(() => {
    ordersD?.map(({ orderID, name, orders, payment, total, createdAt, User}: any) => {

      name === null ?
      
      User.map(({ profile }: any) => (
        setOrders({
          orders: orders,
          payment: payment,
          createdAt: createdAt,
          total,
          name: `${profile.firstname} ${profile.lastname}`
        })

      )) : setOrders({
          orders: orders,
          payment: payment,
          createdAt: createdAt,
          total,
          name: name
      })
  })}, [ordersD])


  const promise = () => new Promise((resolve) => setTimeout(resolve, 5000));

  const orderEditForm = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await fetch(`https://minervasales-23b0919d60c1.herokuapp.com/order/updateOrderStatus/${router.query.id}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: status,
        adminUserID: userId//get userId current login
      })
    })


    if(!response.ok) throw new Error("There is something error while updating")

    return response.json();
  }

  const handleGoBack = () => {
    // Trigger the router.back() function
    router.back();

    toast.promise(promise, {
      loading: 'Loading...',
      success: (productsD) => {
        return `Updated order status succesfully`;
      },
      error: 'Error',
    });
  }


  return (

    <>
<SideNavDash/>

<div className="h-screen bg-gray-200">
    <div className="flex w-full h-[1050px] bg-gradient-to-r from-amber-200 to-yellow-500 flex-col bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="pt-10 md:pl-96 lt:pl-20 lg:pl-96 md:pt-[46px] sm:pl-28">
                    <div className="p-4 md:p-8">
                        <h1 className="text-black text-center font-bold pb-8 text-4xl md:text-5xl lg:text-6xl">Edit Order</h1>
                            <form encType='multipart/form-data' onSubmit={orderEditForm} className="flex flex-col items-center">
                                    <div className="md:w-4/5 sm:w-60 lg:w-3/4 xl:w-2/3">
                                            
                                            <div className="flex flex-col md:flex-row gap-4">
                                                

                                                <label htmlFor="name" className="text-lg absolute mt-2.5 text-black font-bold px-1 rounded ">
                                                   Order ID
                                                </label>
                                                
                                                <input id="name" type="text"
                                                    className="mt-10 py-4 px-4 pb-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                    placeholder="Input product name"
                                                    defaultValue={orders.orders} name="orders" disabled/>

                                                <label htmlFor="price" className="text-lg absolute lt:ml-[420px] lg:ml-[560px] md:ml-[560px] mt-[110px] xl:mt-0 text-black font-bold px-1 rounded">
                                                   Customer Name
                                                </label>
                                                
                                                <input id="price" type="text" name="price"
                                                    className="mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                    placeholder="ex. 1000"
                                                    defaultValue={orders.name} disabled/>

                                           
                                            </div>

                                            <div className="flex flex-col md:flex-row gap-4">
                                                

                                                <label htmlFor="price" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">
                                                   Date Ordered
                                                </label>
                                                
                                                <input id="price" type="text" name="price"
                                                    className="mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                    placeholder="ex. 1000"
                                                    defaultValue={orders.createdAt ? format(new Date(orders.createdAt), 'dd MMM yyyy') : ''}
                                                    disabled/>

                                                <label htmlFor="price" className="text-lg absolute mt-1.5 lt:ml-[420px] lg:ml-[560px] md:ml-[560px] sm:mt-28 lg:mt-2  text-black font-bold px-1 rounded">
                                                Payment Method
                                                </label>
                                                
                                                <input id="price" type="text" name="price"
                                                    className="mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                    placeholder="ex. 1000"
                                                    defaultValue={orders.payment} disabled />

                                           
                                            </div>

                                            <div className="flex flex-col md:flex-row gap-4">
                                                

                                                

                                                <label htmlFor="price" className="text-lg absolute mt-[100px] sm:mt-2 xl:mt-2 text-black font-bold px-1 rounded">
                                                Amount
                                                </label>
                                                
                                                <input id="price" type="text" name="price"
                                                    className="mt-10 py-4 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-600"
                                                    placeholder="ex. 1000"
                                                    defaultValue={isFinite(parseFloat((orders.total))) ? FormattedPrice(parseFloat(orders.total)) : ''} disabled/>
                                                                                        <div>
                      <label htmlFor="lastName" className="text-lg absolute mt-1.5 text-black font-bold px-1 rounded">Order Status </label>
                      <button name="status"type="button" className="inline-flex justify-center sm:mr-2 lg:mr-[365px] w-[180px] rounded-md border border-gray-700 shadow-sm mt-10 px-4 py-2 bg-gray-900 text-md font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                        onClick={toggleDropdown}
                      >
                       {status === "" ? "Set Order Status" : status}
                       
                        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 0 1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className={`w-full mt-[80px] ml-[555px] flex flex-col bg-gray-900 text-md font-medium text-white rounded-md shadow-lg p-4 ${isOpen ? 'xl:w-[190px] sm:w-40 sm:top-[655px] sm:left-[-395px] absolute lg:left-[680px] lg:w-40 lg:top-[380px] z-20' : 'hidden'}`}>
                    {isOpen ? (
 orderStatus.map((name) => (
    <button
      name="status"
      className='text-left'
      type="button"
      key={name}
      value={name}
      onClick={(e) => setStatus(e.currentTarget.value)}
    >
      {name}
    </button>
  ))
) : null}
</div>


</div>
                                            </div>

                                            <div className="my-4 flex flex-row md:gap-[620px]">
                                                


                                            
</div>
                                <button
                                    onClick={handleGoBack} className="border-2 text-md font-bold mt-5 rounded-md py-2 px-4 bg-[#FFBD59] shadow-md shadow-black hover:bg-yellow-500 text-gray-900 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900">
                                    Update Order Status
                                </button>
                            </form>
                            
                    </div>
                    </div>    
                    </div>
</div>

</>

  )
}


export default EditOrdersPage