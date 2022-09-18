// pages/drafts.tsx

import React from 'react';
import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import Post, { PostProps } from '../components/Post';
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  console.log(session)
  if (!session) {
    res.statusCode = 403;
    return { props: { myfeed: [] } };
  }

  const myfeed = await prisma.post.findMany({
    orderBy: [
      {
        publishedDate: 'desc',
      },
    ],
    where: {
      author: { email: session.user.email },
      published: true,
    },
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
      comments : true
    },
  });
  serializing(myfeed)
  return {
    props: { myfeed },
  };
};

type Props = {
  myfeed: PostProps[];
};

function serializing(el){
  el.map(subel => {
    let date = subel.publishedDate.toISOString();
    delete subel.lastModified;
    delete subel.publishedDate;
    Object.assign(subel,{publishedDate : date})
  })
}

const Myfeed: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">    
        <main>
          {props.myfeed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Myfeed;
