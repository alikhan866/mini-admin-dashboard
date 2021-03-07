import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomToast = ({
  showToast,
  setShowToast,
  toastDetails
}) => {
  const emitToast = () => {
    if (showToast) {
      if (toastDetails.toastColor === "red") {
        toast.error(`${toastDetails.toastBody}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      } else if (toastDetails.toastColor === "green") {
        toast.success(`${toastDetails.toastBody}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
        setShowToast(false);      
    }
  };
    
  useEffect(() => {
     emitToast() 
  },[toastDetails])

  return (
    <>
      <ToastContainer
        hideProgressBar={false}
        position="top-right"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </>
  );
};

export default CustomToast;
