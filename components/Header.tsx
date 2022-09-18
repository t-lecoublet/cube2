// Header.tsx
import React, { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import logout from '../pages/auth/signout';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let sub1 = useRef();
  let subHover : boolean = false;
  let subActive : boolean = false;

  function hiddenElement(ref){
    console.log(`active button${subActive}`)
    console.log(`hover profile${subHover}`)
    let thisclass = ref.current.className;
    (subActive || subHover) ? ref.current.className = thisclass.replace(" hidden",""):ref.current.className = thisclass+" hidden";
  }


  let navigation = [
    {
      title:"Feed",
      href:"/",
      data_active:"/",
      type:"simple"
    },
    {
      title:"About",
      href:"/about",
      data_active:"/about",
      type:"simple"
    }
  ];

  let giantRight = null;
  let smallRight = null;

  if (status === 'loading') {
    giantRight = (
      <div role="status">
        <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (!session) {
    giantRight = (
      <div className="right">
        <Link href={{
              pathname: "/api/auth/signin",
              query: {
                callbackUrl: router.asPath
              }
          }}>
          <a className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700">Login</a>
        </Link>
      </div>
      
    );
  }

  if (session) {
    navigation = [
      {
        title:"Feed",
        href:"/",
        data_active:"/",
        type:"simple"
      },
      {
        title:"My drafts",
        href:"/drafts",
        data_active:"/drafts",
        type:"simple"
      },
      {
        title:"My feed",
        href:"/myfeed",
        data_active:"/myfeed",
        type:"simple"
      },
      {
        title:"About",
        href:"/about",
        data_active:"/about",
        type:"simple"
      }
    ];
    
    giantRight = (
        // <p>
        //   {session.user.name} ({session.user.email})
        // </p>
        // <Link href="/create">
        //   <button>
        //     <a>New post</a>
        //   </button>
        // </Link>
        // <Link href="/profile">
        //   <button>
        //     <a>My profile</a>
        //   </button>
        // </Link>
        // <button onClick={() => signOut()}>
        //   <a>Log out</a>
        // </button>
        <div className="relative">
                <button onBlur={() => { subActive = false; hiddenElement(sub1) }} onFocus={() => {subActive = true; hiddenElement(sub1) }} type="button" className="flex w-full items-center justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2" aria-expanded="false">
                <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
                  <span>Profile</span>
                  <svg className="text-gray-400 ml-2 h-5 w-5 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#ffffff" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>

                <div onMouseLeave={()=> {subHover = false;hiddenElement(sub1)}} onMouseEnter={()=> {subHover = true}} ref={sub1} className="absolute right-1 z-10 mt-3 w-screen max-w-md transform px-2 sm:px-0 hidden">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    


                  <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                      <div className="h-full flex items-center">
                        <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={session.user.image}/>
                        <div className="flex-grow">
                          <h2 className="text-gray-900 title-font font-medium">{session.user.name}</h2> 
                          <p className="text-gray-500">{session.user.email}</p>
                        </div>
                      </div>
                    </div>



                    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                      <Link href={`/profile/${session.link}`}>
                        <a href="#" className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50">
                          
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-6 w-6 flex-shrink-0 text-sky-600" viewBox="0 0 16 16">
                            <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"/>
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                          </svg>
                          <div className="ml-4">
                            <p className="text-base font-medium text-gray-900">Profile</p>
                            <p className="mt-1 text-sm text-gray-500">Edit and custom your profile : custom url, name...</p>
                          </div>
                        </a>
                      </Link>

                      
                      <Link href={"/create"}>
                        <a href="#" className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-6 w-6 flex-shrink-0 text-sky-600" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                          </svg>
                          <div className="ml-4">
                            <p className="text-base font-medium text-gray-900">Tweets</p>
                            <p className="mt-1 text-sm text-gray-500">Create, store and share your tweets</p>
                          </div>
                        </a>
                      </Link>
             
                        <a onClick={()=> {let callbackUrl:any = router.asPath;logout(callbackUrl)}} className=" inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700">
                          LogOut
                        </a>
                      
                    </div>
                    <div className="bg-gray-50 px-5 py-5 sm:px-8 sm:py-8">
                      {/* <div>
                        <h3 className="text-base font-medium text-gray-500">Recent Posts</h3>
                        <ul role="list" className="mt-4 space-y-4">
                          <li className="truncate text-base">
                            <a href="#" className="font-medium text-gray-900 hover:text-gray-700">Boost your conversion rate</a>
                          </li>
                        </ul>
                      </div> */}
                      <a>:3</a>
                    </div>
                  </div>
                </div>
              </div>
    );
  }

  return (
    <nav>
      <div className="relative bg-white shadow shadow-slate-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <span className="sr-only">Twisher</span>
                <svg className="h-20 w-auto" role="img" viewBox="0 0 42 42" version="1.1" id="svg22" width="42" height="42" xmlns="http://www.w3.org/2000/svg">
                  <defs id="defs26" />
                  <title id="title18">Twisher</title>
                  <path id="path20" fill="#38bdf8" d="m 2.6328109,11.23244 c -0.4411563,0.749693 -0.671265,1.604763 -0.6660156,2.474609 0,1.709996 0.8695033,3.212704 2.1875,4.095703 -0.7812528,-0.02455 -1.5453237,-0.235488 -2.2285157,-0.615235 v 0.06055 c -5.852e-4,2.34248 1.6494913,4.360965 3.9453126,4.826172 -0.7212922,0.193533 -1.476799,0.222897 -2.2109376,0.08594 0.6377967,1.969492 2.4357457,3.325529 4.4980468,3.408202 0.049426,1.101967 0.4319,2.074993 1.1523442,2.916016 0.9499994,1.109999 2.2027674,1.662109 3.7597654,1.66211 1.435998,0 2.749548,-0.483173 3.935546,-1.451172 0.01309,0.01338 0.02784,0.02392 0.04102,0.03711 -0.02021,-0.0012 -0.01601,0.0035 -0.04687,0 1.590237,1.733542 3.952499,2.037093 6.630859,2.035156 9.052981,0 13.998047,-7.497341 13.998047,-13.986328 0,-0.209999 -6.2e-4,-0.418906 -0.01563,-0.628906 0.966402,-0.695296 1.799967,-1.558632 2.460938,-2.548828 l -0.04687,-0.01953 c -0.898866,0.395828 -1.851172,0.657126 -2.826181,0.775387 1.026445,-0.616471 1.79513,-1.58357 2.164062,-2.722656 -0.950998,0.554999 -2.004955,0.958594 -3.126953,1.183594 -0.994051,-1.063284 -2.407901,-1.631828 -3.861328,-1.552738 -3.016486,0.163834 -5.161154,2.977641 -4.546875,5.916015 -0.154389,-0.252138 -0.510348,-0.427734 -0.951172,-0.427734 h -1.5 v -0.002 c -0.626999,0 -1.209875,0.510766 -1.296875,1.134765 l -0.86914,6.585937 c -0.07,0.507 -0.312563,0.94536 -0.726563,1.31836 -0.414999,0.372 -0.882391,0.55664 -1.400391,0.55664 -0.503999,0 -0.912609,-0.181875 -1.224609,-0.546874 -0.313,-0.365 -0.431375,-0.807126 -0.359375,-1.328126 l 0.384766,-2.820312 c 0.02228,-0.558953 -0.434995,-1.020584 -0.994141,-1.003909 h -1.525391 c -0.581999,0 -1.126531,0.440908 -1.269531,1.003906 l -0.396484,2.820312 c -0.07025,0.518149 -0.330868,0.990882 -0.730469,1.328126 -0.412999,0.364999 -0.871,0.546874 -1.375,0.546874 -0.475131,0.01304 -0.930355,-0.191274 -1.234375,-0.55664 -0.318999,-0.372 -0.443046,-0.81136 -0.373046,-1.31836 l 0.855468,-6.166015 c 0.04177,-0.278494 -0.01636,-0.562272 -0.140625,-0.8125 -0.02853,-0.116347 -0.122223,-0.242622 -0.263672,-0.375 -0.07656,-0.07935 -0.161412,-0.147664 -0.253906,-0.207031 -1.778783,-1.30481 -7.5856625,-3.276091 -9.5527341,-5.68164 z" />
                </svg>


              </a>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              <button type="button" className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500" aria-expanded="false">
                <span className="sr-only">Open menu</span>
                <svg className="h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
            <nav className="hidden space-x-10 md:flex navigation">

              {navigation.map((el) => (
                <Link key={el.title} href={el.href}>
                  <a className="text-base font-medium text-gray-500 hover:text-gray-900" data-active={isActive(el.data_active)}>
                    {el.title}
                  </a>
                </Link>
              ))}

              
            </nav>
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              {giantRight}
            </div>
          </div>
        </div>


        <div className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <svg className="h-8 w-auto" role="img" viewBox="0 0 42 42" version="1.1" id="svg22" width="42" height="42" xmlns="http://www.w3.org/2000/svg" >
                    <defs id="defs26" />
                    <title id="title18">Wish</title>
                    <path id="path20" fill="#38bdf8" d="m 2.6328109,11.23244 c -0.4411563,0.749693 -0.671265,1.604763 -0.6660156,2.474609 0,1.709996 0.8695033,3.212704 2.1875,4.095703 -0.7812528,-0.02455 -1.5453237,-0.235488 -2.2285157,-0.615235 v 0.06055 c -5.852e-4,2.34248 1.6494913,4.360965 3.9453126,4.826172 -0.7212922,0.193533 -1.476799,0.222897 -2.2109376,0.08594 0.6377967,1.969492 2.4357457,3.325529 4.4980468,3.408202 0.049426,1.101967 0.4319,2.074993 1.1523442,2.916016 0.9499994,1.109999 2.2027674,1.662109 3.7597654,1.66211 1.435998,0 2.749548,-0.483173 3.935546,-1.451172 0.01309,0.01338 0.02784,0.02392 0.04102,0.03711 -0.02021,-0.0012 -0.01601,0.0035 -0.04687,0 1.590237,1.733542 3.952499,2.037093 6.630859,2.035156 9.052981,0 13.998047,-7.497341 13.998047,-13.986328 0,-0.209999 -6.2e-4,-0.418906 -0.01563,-0.628906 0.966402,-0.695296 1.799967,-1.558632 2.460938,-2.548828 l -0.04687,-0.01953 c -0.898866,0.395828 -1.851172,0.657126 -2.826181,0.775387 1.026445,-0.616471 1.79513,-1.58357 2.164062,-2.722656 -0.950998,0.554999 -2.004955,0.958594 -3.126953,1.183594 -0.994051,-1.063284 -2.407901,-1.631828 -3.861328,-1.552738 -3.016486,0.163834 -5.161154,2.977641 -4.546875,5.916015 -0.154389,-0.252138 -0.510348,-0.427734 -0.951172,-0.427734 h -1.5 v -0.002 c -0.626999,0 -1.209875,0.510766 -1.296875,1.134765 l -0.86914,6.585937 c -0.07,0.507 -0.312563,0.94536 -0.726563,1.31836 -0.414999,0.372 -0.882391,0.55664 -1.400391,0.55664 -0.503999,0 -0.912609,-0.181875 -1.224609,-0.546874 -0.313,-0.365 -0.431375,-0.807126 -0.359375,-1.328126 l 0.384766,-2.820312 c 0.02228,-0.558953 -0.434995,-1.020584 -0.994141,-1.003909 h -1.525391 c -0.581999,0 -1.126531,0.440908 -1.269531,1.003906 l -0.396484,2.820312 c -0.07025,0.518149 -0.330868,0.990882 -0.730469,1.328126 -0.412999,0.364999 -0.871,0.546874 -1.375,0.546874 -0.475131,0.01304 -0.930355,-0.191274 -1.234375,-0.55664 -0.318999,-0.372 -0.443046,-0.81136 -0.373046,-1.31836 l 0.855468,-6.166015 c 0.04177,-0.278494 -0.01636,-0.562272 -0.140625,-0.8125 -0.02853,-0.116347 -0.122223,-0.242622 -0.263672,-0.375 -0.07656,-0.07935 -0.161412,-0.147664 -0.253906,-0.207031 -1.778783,-1.30481 -7.5856625,-3.276091 -9.5527341,-5.68164 z" />
                  </svg>
                </div>
                <div className="-mr-2">
                  <button type="button" className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500">
                    <span className="sr-only">Close menu</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">


                  <a href="#" className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
                    <svg className="h-6 w-6 flex-shrink-0 text-sky-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12c0-1.232.046-2.453.138-3.662a4.006 4.006 0 013.7-3.7 48.678 48.678 0 017.324 0 4.006 4.006 0 013.7 3.7c.017.22.032.441.046.662M4.5 12l-3-3m3 3l3-3m12 3c0 1.232-.046 2.453-.138 3.662a4.006 4.006 0 01-3.7 3.7 48.657 48.657 0 01-7.324 0 4.006 4.006 0 01-3.7-3.7c-.017-.22-.032-.441-.046-.662M19.5 12l-3 3m3-3l3 3" />
                    </svg>
                    <span className="ml-3 text-base font-medium text-gray-900">Automations</span>
                  </a>
                </nav>
              </div>
            </div>
            <div className="space-y-6 py-6 px-5">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">Pricing</a>
              </div>
              <div>
                <a href="#" className="flex w-full items-center justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700">Login</a>

              </div>
            </div>
          </div>
        </div>
      </div>

    </nav>
  );
};

export default Header;