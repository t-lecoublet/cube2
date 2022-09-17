import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import prisma from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    console.log(params?.id)
    const user = await prisma.user.findUnique({
        where: {
          customLink: params?.id,
        },
        select: {
            name: true,
            bio:true,
            image: true,
            customImage: true,
            customName: true,
            customLink: true
          },
      });
    return {
      props: { user },
    };
  };
  
  
  async function getFullProfile(id: string): Promise<void> {

    const response = await fetch(`/api/user/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    const result = await response;
    console.log(response);
    //await Router.push('/');
  }

const Profile: React.FC = (props) => {
    console.log(props.user)
    if(!props.user){
        return(
            <Layout>
            <div>
            It turns out that this profile does not exist
            </div>
      
          </Layout>
        )
    }
    const { data: session } = useSession();

    if(session && session.link == props.user.customLink){
        const fullProfile = getFullProfile(session.userId)
    }
    return (
      <Layout>
        <div>
          About 
        </div>
  
      </Layout>
    );
  };
  

export default Profile;
