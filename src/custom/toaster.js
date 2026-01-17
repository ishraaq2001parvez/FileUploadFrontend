import toast from "react-hot-toast";

// success toast
export const showSuccess = (message) => toast.success(message); 

// toast failed
export const showFailure = (message) => toast.error(message) ;
