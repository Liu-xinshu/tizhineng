import Cookie from "js-cookie"

export const setItem = (key,value,time)=>{
    Cookie.set(key,value,{
        expires:time
    })
}

export const getItem=(key)=>{
  return Cookie.get(key)
}

export const romoveItem =(key)=>{
   setItem(key,'',-1)
}