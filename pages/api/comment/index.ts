import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { id, content } = req.body;

  const session = await getSession({ req });
  const result = await prisma.comment.create({
    data: {
      content: content,
      author: { connect: { email: session?.user?.email } },
      post: { connect: { id: id}}
    },
  });
  if(result){
    res.status(209).json(result);
  }else {
    res.status(500).json({message: "Server Error"})
  }
  
}
