import React from 'react'

function Login() {

  return (
 <>
<div  style={{height:'100vh' ,alignItems:'center',justifyContent:'center', display:'flex', backgroundImage:` url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG6YkqMmxeFcMT4LQhoXhKiejXkUrpDSHtDQ&usqp=CAU")`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover', }} >

    
<div style={{width:'510px',height:'560px',backgroundColor:'#F6FBF9'}}  class=" flex flex-col absolute  justify-center items-center  px-4 py-8  rounded-3xl shadow sm:px-6 md:px-8 lg:px-10">
    <div class="self-center mb-2 karla font-black  text-black text-4xl ">
        Login To Account
    </div>
    <div class="text-center mx-20  karla  ">
        Login  to enjoy all the services without any ads for free!
    </div>
    <div class="mt-8">
        <form action="#" autoComplete="off">
            <div class="flex flex-col mb-2">
                <div class="flex relative ">
                   
                    <input type="text" id="sign-in-email" class=" rounded-xl flex-1 appearance-none w-[427px] border border-gray-300  h-12 mb-3 py-2 px-4 bg-white text-gray-800 placeholder-gray-600 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your email"/>
                    </div>
                </div>
                <div class="flex flex-col mb-6">
                    <div class="flex relative ">
                       
                        <input type="password" id="sign-in-email" class=" rounded-xl flex-1 w-[427px] appearance-none border border-gray-300  h-12 py-2 px-4 bg-white text-gray-800 placeholder-gray-600 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your password"/>
                        </div>
                    </div>
                    <div class="flex items-center mb-6 -mt-4">
                        <div class="flex ml-auto">
                            <a href="#" class="inline-flex text-xs  text-black sm:text-sm hover:text-gray-700 ">
                                Forgot Your Password?
                            </a>
                        </div>
                    </div>
                    <div style={{flexDirection:"column"}} class="flex w-full ">
                        <button type="submit" style={{fontSize:'20px', backgroundColor:'#84C7AE'}} class="py-2 px-4 text-xl mb-2  focus:ring-black-500 focus:ring-offset-black-200 text-white w-[300px] transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-2xl h-14 mx-auto">
                            Login Account 
                        </button>
                        <div  class=" m-auto">
                            <h2  class="font-semibold">OR</h2>
                        </div>

                        <button type="submit" style={{fontSize:'20px', backgroundColor:'#f6851b'}} class="py-2 px-4 text-xl mt-2 focus:ring-black-500 focus:ring-offset-black-200 text-white w-[300px] transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-2xl h-14 mx-auto">
                            Metamask 
                        </button>
                    </div>
                </form>
            </div>
            <div class="flex items-center justify-center  mt-6">
                <a href="/signup" class="inline-flex items-center   text-center text-black hover:text-gray-700 ">
                    <span class="ml-2">
                        You don&#x27;t have an account?
                    </span>
                
                    <p
               
                style={{ fontWeight: 600, color: "#84C7AE" }}
                class="font-semibold   poppins ml-1 inline hover:cursor-pointer "
              >
                SignUp here.
              </p>
                </a>
            </div>
        </div>


    </div>
  </>

  )
}

export default Login