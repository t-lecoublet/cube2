import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import sha256 from "crypto-js/sha256";


export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
  ){
  if (req.method === "POST") {
    const emailDoesNotExist : boolean = await checkEmail(res, req);
    if(emailDoesNotExist){
        console.log()
       await handlePOST(res, req); 
    }else{
        console.log("not exist")
        res.statusCode = 409;
        const body : string = JSON.stringify({message:"Email already used"})
        res.json(body);
    }
    
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}


const hashPassword = (password: string) => {
  return sha256(password).toString();
};

// POST /api/user
async function handlePOST(res, req) {

  const user = await prisma.user.create({
    data: { ...req.body, password: hashPassword(req.body.password) },
  });
  console.log(user)
  res.json(user);
}

async function checkEmail(res, req) {
    const user = await prisma.user.findFirst({
        where: {
            email: String(req.body.email),
          }
    });

    
    return (user? false : true);
}
