import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = req.query.id;
  if (req.method === "GET") {
    handleGET(id, res);
  } else if (req.method === "POST") {
    handlePOST(id, res, req);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}

// GET /api/user/:id
async function handleGET(userId, res) {
  console.log("on passe",userId)
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  console.log(user)

  res.status(201).json(user);
}

// GET /api/user/:id
async function handlePOST(userId, res, req) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { ...req.body },
  });
  return res.json(user);
}


