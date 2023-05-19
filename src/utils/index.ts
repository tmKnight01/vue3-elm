/*
存储localStorage
*/
export  const setStore = (name: string, content: string) => {
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};


/*
获取localStorage中的key
*/
export const getStore = (key:string)=>{
  return window.localStorage.getItem(key);
}

