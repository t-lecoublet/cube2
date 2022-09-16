
    import { useState } from "react";
    import { useRouter } from "next/router";
    import Link from "next/link";

export default function SignupCard() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [alert,setAlert]= useState(null);
    const [signup,setSignup]= useState(false);
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    async function handleAlert(errName, errMsg){
        setSignup(true);
        setAlert((
        <div className="animate-notification z-40 absolute bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 inset-x-0 -top-10 shadow-md" role="alert">
            <div className="flex">
            <div className="py-1"><svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
            <div>
                <p className="font-bold">{errName}</p>
                <p className="text-sm">{errMsg}</p>
            </div>
            </div>
        </div>))
        await sleep(4000);
        setAlert(null);
        setSignup(false);
      return null
    }
    
    const handleSubmit = async (event) => {

        event.preventDefault()
    
        const body = {
          password: event.target.password.value,
          email: event.target.email.value,
          name: event.target.name.value
        }

        if(body.email.length <= 0){
            handleAlert("Email Adress", "Plz entrer a valid email address")
        }
        if(body.name.length <= 0){
            handleAlert("Full Name", "Plz entrer a valid full name")
        }


        try {
        console.log(`POSTing ${JSON.stringify(body, null, 2)}`);
        const res = await fetch(`/api/user/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        if(res.status == 201){
            console.log(res)
        /*
            router.push(
                `signin${
                router.query.callbackUrl
                    ? `?callbackUrl=${router.query.callbackUrl}`
                    : ""
                }`,
            );*/
        }else {
            console.log(await res.json())
            
        }

        } catch (error) {
            console.error(error);
            handleAlert("Error during processing", "Plz try again later or contact our support")
        }
    
      }

    return (
        <div className="relative max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
            {alert}
            <Link href="/">
                <svg className="cursor-pointer w-11 h-11 p-2 rounded-full hover:bg-slate-100" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M224 480h640a32 32 0 110 64H224a32 32 0 010-64z" /><path fill="currentColor" d="M237.248 512l265.408 265.344a32 32 0 01-45.312 45.312l-288-288a32 32 0 010-45.312l288-288a32 32 0 1145.312 45.312L237.248 512z" /></svg>

            </Link>
            <h1 className="w-full text-4xl font-medium text-center">SignUp</h1>
            <p className="text-slate-500"></p>
            <form onSubmit={handleSubmit} className="my-10">
                <div className="flex flex-col space-y-5">

                    <label htmlFor="name">
                        <p className="font-medium text-slate-700 pb-2">Full Name</p>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            title="name should be name"
                            pattern="[a-zA-Z ]{2,35}"
                            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter your full name" />
                    </label>

                    <label htmlFor="email">
                        <p className="font-medium text-slate-700 pb-2">Email address</p>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            title="email should be email"
                            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address" />
                    </label>

                    <label htmlFor="password">
                        <p className="font-medium text-slate-700 pb-2">Password</p>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            pattern="[a-z0-9A-Z]{1,16}"
                            title="Password should be digits (0 to 9) or alphabets (a to z)."
                            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter your password" />
                    </label>
                    
                    <button disabled={signup} type="submit" className="disabled:opacity-75 disabled:bg-sky-500 disabled:cursor-not-allowed w-full py-3 font-medium text-white bg-sky-600 hover:bg-sky-500 rounded-lg border-sky-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        <span>SignUp</span>
                    </button>
                    <Link href={`signin${router.query.callbackUrl
                            ? `?callbackUrl=${router.query.callbackUrl}`
                            : ""
                        }`}>
                        <p className="text-center">Already register? <a href="#" className="text-sky-600 font-medium inline-flex space-x-1 items-center"><span>Signin now </span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg></span></a>
                        </p>
                    </Link>

                </div>
            </form>
        </div>/*
        <form >
            {alert}
        <label htmlFor="password">Password:</label>
        <input
            type="password"
            id="password"
            name="password"
            pattern="[a-z0-9A-Z]{1,16}"
            title="Password should be digits (0 to 9) or alphabets (a to z)."
        />
        <label htmlFor="email">Email:</label>
        <input
            type="email"
            id="email"
            name="email"
            title="email should be email"
            pattern=".{5,}"
        />
        <label htmlFor="name">Full Name:</label>
        <input
            type="text"
            id="name"
            name="name"
            title="name should be name"
            pattern="[a-zA-Z]{2,35}"
        />

        <button type="submit">Submit</button>
        </form>

*/
    );
    }
