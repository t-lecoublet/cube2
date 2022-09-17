import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import prisma from '../lib/prisma';

function serializing(el){
  el.map(subel => {
    let date = subel.publishedDate.toISOString();
    delete subel.lastModified;
    delete subel.publishedDate;
    Object.assign(subel,{publishedDate : date})
  })
}

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    orderBy: [
      {
        publishedDate: 'desc',
      },
    ],
    where: { published: true },
    include: {
      author: {
        select: { 
          name: true,
          email: true,
          image: true,
          customImage: true,
          customName: true
        },
      },
    },
  });
  serializing(feed)
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  )
}

export default Blog
