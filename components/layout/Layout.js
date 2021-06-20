import React from 'react'
import Head from 'next/head'
import Header from './Header';
import Footer from './Footer';

const Layout = (props) => {
  return (  
    <>
      <Head>
        <title>BlogTer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <Header/>
      <main>{props.children}</main>
      <Footer/>
    </>
  );
}
 
export default Layout;