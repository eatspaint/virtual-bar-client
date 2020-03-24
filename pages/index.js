import Head from 'next/head';
import MainUI from '../components/MainUI';
import { Reset } from 'styled-reset';

const Home = () => (
  <>
    <Head>
      <title>Virtual Bar</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Reset />
    <MainUI />
  </>
);

export default Home;
