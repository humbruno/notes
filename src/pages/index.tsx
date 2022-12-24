import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import SEO from 'components/SEO';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <SEO
        description="Keep your notes readily at hand!"
        tabName="Login"
        title="NOTE.me"
      />
      <main>
        <div>
          <p>Home!</p>
        </div>
      </main>
    </>
  );
}
