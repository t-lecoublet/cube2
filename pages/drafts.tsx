// pages/drafts.tsx

import React from 'react';
import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import Post, { PostProps } from '../components/Post';
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.post.findMany({
    orderBy: [
      {
        lastModified: 'desc',
      },
    ],
    where: {
      author: { email: session.user.email },
      published: false,
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
    },
  });
  serializing(drafts);
  return {
    props: { drafts },
  };
};

type Props = {
  drafts: PostProps[];
};

function serializing(el){
  el.map(subel => {
    let date = subel.lastModified.toISOString();
    delete subel.lastModified;
    Object.assign(subel,{lastModified : date})
  })
}

const Drafts: React.FC<Props> = (props) => {
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
          {props.drafts.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Drafts;
