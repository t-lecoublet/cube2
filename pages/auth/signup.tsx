
    import { useState } from "react";
    import { useRouter } from "next/router";

    export default function SignupCard() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (event) => {

        event.preventDefault()
    
        const body = {
          password: event.target.password.value,
          email: event.target.email.value,
          name: event.target.name.value
        }


        try {
        console.log(`POSTing ${JSON.stringify(body, null, 2)}`);
        const res = await fetch(`/api/user/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        if(res.status == 201){
        /*
        router.push(
            `signin${
            router.query.callbackUrl
                ? `?callbackUrl=${router.query.callbackUrl}`
                : ""
            }`,
        );*/
        }else {
            console.log(res)
        }

        } catch (error) {
            console.error(error);
        }
    
        // Send the data to the server in JSON format.
        // const JSONdata = JSON.stringify(data)
    
        // // API endpoint where we send form data.
        // const endpoint = '/api/form'
    
        // Form the request for sending data to the server.
        // const options = {
        //   // The method is POST because we are sending data.
        //   method: 'POST',
        //   // Tell the server we're sending JSON.
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   // Body of the request is the JSON data we created above.
        //   body: JSONdata,
        // }
    
        // Send the form data to our forms API on Vercel and get a response.
        // const response = await fetch(endpoint, options)
    
        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        // const result = await response.json()
        // alert(`Is this your full name: ${result.data}`)
      }

    return (

        <form onSubmit={handleSubmit}>
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


    );
    }
