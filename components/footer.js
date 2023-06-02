import React from "react";
import Image from "next/dist/client/image";
function Footer({ theme }) {
  return (
    <div
      className={`py-8 px-8 lg-px-14 py-18 lg:flex justify-between bg-${theme}-secondary text-white`}
    >
      <div className="lg:w-1/4">
        <h1 className="md:text-3xl text-xl font-extrabold text-white">
          BRAND NAME
        </h1>
        <div className="md:text-md mt-2">
          Lorem ipsum, dolor sit reiciendis explicabo quae facere at harum odio
          deleniti, atque distinctio maxime suscipit tempora? Corrupti nihil
          doloribus veniam cupiditate dolor delectus?
        </div>
      </div>
      <div className="lg:w-1/6 my-4 lg:my-0">
        <div className="md:text-xl font-medium">Connect with us</div>
        <div className="">
          <span className="mx-2">
            <Image
              width="25"
              height="25"
              src={"/svgs/twitter.svg"}
              alt="twitter"
            />
          </span>
          <span className="mx-2">
            <Image
              width="25"
              height="25"
              src={"/svgs/facebook.svg"}
              alt="twitter"
            />
          </span>
          <span className="mx-2">
            <Image
              width="25"
              height="25"
              src={"/svgs/linkedin.svg"}
              alt="twitter"
            />
          </span>
          <span className="mx-2">
            <Image
              width="25"
              height="25"
              src={"/svgs/google.svg"}
              alt="twitter"
            />
          </span>
        </div>
        <div className="mt-4 md:text-base text-xs">
          Prodigee Technologies ©2022. All rights reserved. Privacy & Terms.
        </div>
      </div>
    </div>
  );
}

export default Footer;
