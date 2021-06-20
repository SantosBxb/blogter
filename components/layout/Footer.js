import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="card m-2 shadow ">
        <div className="row my-2 mx-5">
          <div className="m-2 col-12 d-flex justify-content-center">
            <Link href="/">
              <a className="text-decoration-none  rounded-3 ">
                <h1 className="d-inline shadow  ">BlogTer</h1>
              </a>
            </Link>
          </div>
          <div className="m-2 col-12 d-flex justify-content-center">Por @Bryan Santos</div>
          <div className="m-2 col-12 d-flex justify-content-center">
            <a href="https://github.com/SantosBxb" target="_blank" rel="noreferrer" className='d-flex align-items-center'>
              <Image src="/images/github.png" width={30} height={30} alt="Imagen"/>
              <p className='mx-1 mt-2 mb-2'>@SantosBxb</p>
            </a>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
