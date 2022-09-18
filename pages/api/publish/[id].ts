import prisma from '../../../lib/prisma';


export default async function handle(req, res) {
  const postId = req.query.id;
  const post = await prisma.post.update({
    where: { id: postId },
    data: { published: true, publishedDate: (new Date()).toISOString() },
  });
  res.json(post);
}
