import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const toastOpts = {
  position: "bottom-right",
  autoClose: 100000,
  hideProgressBar: true,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: false,
  draggable: true,
  pauseOnHover: false,
  theme: "dark",
};

export default function ToastNotification() {
  const pathname = usePathname();

  const basePath = pathname.split("/")[1];

  useEffect(() => toast.dismiss(), [basePath]);

  return <ToastContainer {...toastOpts} />;
}
