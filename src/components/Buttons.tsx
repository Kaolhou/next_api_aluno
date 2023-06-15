import { ButtonHTMLAttributes } from "react";
interface ButtonProps {
  color?: "default" | "light" | "green" | "red";
  onClick?: (a: any) => unknown;
  children: string | JSX.Element;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export function Buttons({
  color = "default",
  onClick,
  children,
  type,
}: ButtonProps) {
  let colorB: string = "";
  switch (color) {
    case "default":
      colorB =
        "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";
      break;
    case "light":
      colorB =
        "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700";
      break;
    case "red":
      colorB =
        "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900";
      break;
    case "green":
      colorB =
        "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800";
      break;
    default:
      colorB =
        "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";
      break;
  }

  return (
    <button onClick={onClick} type={type} className={colorB}>
      {children}
    </button>
  );
}
