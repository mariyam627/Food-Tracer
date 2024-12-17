import React from "react";

function CardComponent() {
  return (
    <>
   
      <div
        style={{ backgroundColor: "#023047" }}
        class="p-4  shadow-lg rounded-2xl w-40  mx-5"
      >
        <div class="flex items-center">
          <span class="relative w-4 h-4 p-2 bg-green-500 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              height="25"
              width="25"
              stroke="currentColor"
              class="absolute h-3 text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </span>

          <p class="ml-2 text-gray-700 text-md dark:text-gray-50">sold</p>
        </div>
        <div class="flex flex-col justify-start">
          <p class="my-4 text-4xl font-bold text-left text-gray-800 dark:text-white">
            10
          </p>
        </div>
      </div>
      <div
        style={{ backgroundColor: "#023047" }}
        class="p-4  shadow-lg rounded-2xl w-40 "
      >
        <div class="flex items-center">
          <span class="relative w-4 h-4 p-2 bg-yellow-500 rounded-full">
           
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
                            class="absolute h-3 text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"

            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
          </span>
          <p class="ml-2 text-gray-700 text-md dark:text-gray-50">Food</p>
        </div>
        <div class="flex flex-col justify-start">
          <p class="my-4 text-4xl font-bold text-left text-gray-800 dark:text-white">
            36
          </p>
        </div>
      </div>
    </>
  );
}

export default CardComponent;
