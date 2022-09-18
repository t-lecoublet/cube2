import React, { useState } from 'react';
import Layout from '../components/Layout';
import ReactMarkdown from 'react-markdown';

const About: React.FC = () => {

  const content = `
  TEAMS - RIL 21-2 Voici le sujet de rattrapage pour ceux qui ont eu C ou D en individuel :

  Rattrapage individuel CUBES

  L'objectif de ce projet est de créer un clone de Twitter, le célèbre réseau social.

  Le but n'est pas de cloner Twitter dans son intégralité, mais de se concentrer sur les fonctionnalités de base.
  >> ㅤ 
  >>
  **Les fonctionnalités minimales requises sont :**
  - >> ㅤ -la connexion et la déconnexion ✓
  - >> ㅤ -la création de votre profil avec votre propre URL / nom d'utilisateur ✓
  - >> ㅤ -permettre à l'utilisateur d'écrire des tweets ✓
  - >> ㅤ -afficher les tweets ✓
  - >> ㅤ -permettre aux utilisateurs de répondre aux tweets ✓
  - >> ㅤ -supprimer vos propres tweets ✓
  >> ㅤ 
  >>
  **Technologies à utiliser :**
  - >> ㅤ -Next.js ✓
  - >> ㅤ -NextAuth ✓
  - >> ㅤ -PostgreSQL ✓
  - >> ㅤ -Prisma ✓
  - >> ㅤ -Tailwind (facultatif) ✓
  `;

  return (
    <Layout>
      <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <ReactMarkdown children={content} />
        <hr />
        <span className='text-sm w-full block text-right'>Specifications.md</span>
      </div>

    </Layout>
  );
};

export default About;