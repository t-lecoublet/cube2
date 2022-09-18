import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';
import Link from 'next/link';

const Draft: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      const res = await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/drafts');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
          <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <Link href="/">
        <svg className="cursor-pointer w-11 h-11 p-2 rounded-full hover:bg-slate-100" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M224 480h640a32 32 0 110 64H224a32 32 0 010-64z"/><path fill="currentColor" d="M237.248 512l265.408 265.344a32 32 0 01-45.312 45.312l-288-288a32 32 0 010-45.312l288-288a32 32 0 1145.312 45.312L237.248 512z"/></svg>

        </Link>
        <h1 className="w-full text-4xl font-medium text-center">Create Tweet draft</h1>
        <p className="text-slate-500"></p>

        <form onSubmit={submitData} className="my-10">
            <div className="flex flex-col space-y-5">
                <label htmlFor="title">
                    <p className="font-medium text-slate-700 pb-2">Title :</p>
                    <input
                    name="title"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    type="text"
                    value={title}
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"/>
                </label>
                <label htmlFor="content">
                    <p className="font-medium text-slate-700 pb-2">Content :</p>
                    <textarea 
                    name="content"
                    cols={50}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                    rows={8}
                    value={content}
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"/>
                </label>

                <input disabled={!content || !title} type="submit" value="Create" 
                className="w-full py-3 font-medium text-white bg-green-600 hover:bg-green-500 rounded-lg border-green-500 hover:shadow inline-flex space-x-2 items-center justify-center"/>
                <a href="#" onClick={() => Router.push('/')}
                className="back w-full py-3 font-medium text-white bg-sky-600 hover:bg-sky-500 rounded-lg border-sky-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                  Cancel
                </a>
                
            </div>
        </form>
        </div>

    </Layout>
  );
};

export default Draft;
