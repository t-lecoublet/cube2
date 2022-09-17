import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  const id = req.query.id.toString();

  if (req.method === "GET") {

    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    console.log("my user",user)
    res.status(200).json(user);

  } else if (req.method === "POST") {

    handlePOST(id, res, req);

  } else {

    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}



// GET /api/user/:id
async function handlePOST(userId, res, req) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { ...req.body },
  });
  return res.json(user);
}


