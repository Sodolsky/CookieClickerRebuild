import type { NextPage } from "next";
import Head from "next/head";
import { MainPage } from "../components/MainPage";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Coockie Clicker Rebuild</title>
        <meta
          name="description"
          content="Coockie Clicker v2 is Clicker game created by Sodolsky."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainPage />
    </>
  );
};

export default Home;
