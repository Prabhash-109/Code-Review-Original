import {toast} from 'react-toastify';
export const handleSucces=(msg)=>{
    toast.success(msg,{
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
    })
}

export const handleError=(msg)=>{
    toast.error(msg,{
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
    })
}