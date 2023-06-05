import React from "react";
import Button from "./Button";

export default function Card({ data }) {
  return (
    <div class="w-full flex flex-col justify-between max-w-sm backdrop-blur-sm bg-white/30 border border-gray-200 rounded-md shadow dark:bg-gray-800 dark:border-gray-700">
      <div>
        <a href="#">
          {data?.image?.slice(0, 1)?.map((im) => (
            <img class="p-8 rounded-t-lg" src={im?.file} alt="product image" />
          ))}
        </a>
      </div>
      <div class="flex flex-col items-center mt-2.5 mb-5 px-5 pb-2">
        <a href="#">
          <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {data?.title}
          </h5>
        </a>

        {data?.more?.slice(0, 1)?.map((mo) => {
          return (
            <div class="flex items-center justify-center">
              <span className="text-red-500">BDT-{mo?.price}</span>
            </div>
          );
        })}
      </div>
      <div class="grid grid-cols-2 items-center justify-between gap-2 px-5 pb-2">
        <Button
          style="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm  py-2.5 mr-2 mb-2"
          text="BUY NOW"
        />
        <Button
          style="w-full text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm  py-2.5 mr-2 mb-2"
          text="ADD TO CART"
        />
      </div>
    </div>
  );
}
