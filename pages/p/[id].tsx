import React, { useState } from 'react';
import { GetServerSideProps } from 'next';

import Router from 'next/router';
import Layout from '../../components/Layout';
import { PostProps } from '../../components/Post';
import { useSession } from 'next-auth/react';
import prisma from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { 
          name: true,
          email: true,
          image: true,
          customLink: true,
          customImage: true,
          customName: true,

        },
      },
      comments : {
        select: {
          author: {
            select: { 
              name: true,
              email: true,
              image: true,
              customLink: true,
              customImage: true,
              customName: true
          }},
          content: true,
          id:true
        }
      }
    },
  });
  // UNserializable dateTime object in SRR, idk why ¯\_(ツ)_/¯
  if(post.lastModified){
    let date = post.lastModified.toISOString();
    delete post.lastModified;
    Object.assign(post,{lastModified : date})
  }
  if(post.publishedDate){
    let date = post.publishedDate.toISOString();
    delete post.publishedDate;
    Object.assign(post,{publishedDate : date})
  }

  return {
    props: post,
  };
};

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}


async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  });
  Router.push('/');
}

async function createComment(id: string,content: string): Promise<void> {
  if(content && content.length > 0){
    try {
      const body = { id, content };
      const res = await fetch('/api/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const result = await res.json();

    } catch (error) {
      console.error(error);
    }
    await Router.push(Router.asPath);
  }
}


const Post: React.FC<PostProps> = (props) => {
  const [comment,setComment]= useState('');
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }
  const author = props.author;

  return (
    <Layout>
      
      <div className="flex flex-col bg-white shadow-lg rounded-lg mx-2 md:mx-auto w-full my-4 max-w-md md:max-w-2xl ">
      <div className="flex flex-col items-start px-4 py-6 w-full">
        <h2 className="text-lg font-semibold text-gray-900 -mt-1">{props.title} </h2>
        <p className="mt-3 text-gray-900">
                {props.content}
        </p>
      </div>
        <div className="flex items-start px-4 py-6 w-full" >
            <img className="w-12 h-12 rounded-full object-cover mr-4 shadow" src={author.customImage??author.image} alt="avatar" />
            <div className="w-full" onClick={()=>{Router.push(`/profile/${props.author.customLink}`)}}>
              <div className="cursor-pointer flex items-center justify-between w-full">
                <a></a>
                <small className="text-sm text-gray-700">{props.publishedDate?.toString().split('T')[0]}</small>
              </div>
              <p className="cursor-pointer text-gray-700">By {author.customName??author.name}</p>
              
            </div>



        
        </div>
        <div className="flex items-start px-4 py-6 w-full">
        {
            !props.published && userHasValidSession && postBelongsToUser && (
              <div>
              <button onClick={() => publishPost(props.id)}
              className="flex w-1/4 items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 "
              >Publish</button>
              <br />
              <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                <p className="font-bold">Be Warned</p>
                <p>A published tweet, after having been commented, cannot be deleted anymore!</p>
              </div>
              </div>

            )
          }
          {
            userHasValidSession && postBelongsToUser && (props.comments.length < 1)&&(
              <button onClick={() => deletePost(props.id)}
              className="flex w-1/4 items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 "
              >Delete</button>
            )
          }

        </div>

      </div>
        {
          userHasValidSession && props.published &&(
            <div className="flex flex-col px-4 py-6 bg-white shadow-lg rounded-lg mx-2 md:mx-auto w-full my-4 max-w-md md:max-w-2xl ">
            <label htmlFor="content">
              <p className="font-medium text-slate-700 pb-2 text-lg font-semibold text-gray-900 -mt-1"> Comment</p>
              <input
                  onChange={(e)=>setComment(e.target.value)}
                  type="text"
                  id="content"
                  name="content"
                  title="Comment section"
                  pattern="[a-zA-Z]{2,2048}"
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter comment" />
            </label>
            <button onClick={() => {createComment(props.id,comment)}}
              className="flex w-full items-end justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 "
              >Post comment</button>
            </div>

          )
        }
        {
          (props.comments.length>0) && (
            <div className='flex flex-col mx-2 md:mx-auto w-full my-4 max-w-md md:max-w-2xl '>
              <h2 className='text-lg font-semibold text-gray-900'>Comments:</h2>
            </div>
          )
        }
        {
           props.comments.map(el=>
            <div key={el.id} className="flex flex-col bg-white shadow-lg rounded-lg mx-2 md:mx-auto w-full my-4 max-w-md md:max-w-2xl ">
               
               <div className="flex items-start px-4 py-6 w-full">
               <img className="w-12 h-12 rounded-full object-cover mr-4 shadow" src={el.author.customImage??el.author.image} alt="avatar" />
                <div className="w-full">
                  <p className="text-gray-700">{el.author.customName??el.author.name}</p>
                  <p className="mt-3 text-gray-700 text-sm">
                      {el.content}
                  </p>
                </div>
               </div>

             </div>
       )
        }
    </Layout>
  );
};

export default Post;
