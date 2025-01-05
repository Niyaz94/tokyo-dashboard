import { useState, useEffect } from 'react';

const useScreenSize = () => {

  const screen_size= ()=>{
    if(window.innerWidth>1536){
      return "xl2"
    }else if(window.innerWidth>1280){
      return "xl"
    }else if(window.innerWidth>1024){
      return "lg"
    }else if(window.innerWidth>768){
      return "md"
    }else{
      return "sm"
    }
  }
  const [screenLen, setScreenLen] = useState({width: window.innerWidth,height: window.innerHeight});
  const [screenSize,setScreenSize]=useState(screen_size())

  useEffect(() => {
    const handleResize = () => {
        setScreenLen({width: window.innerWidth,height: window.innerHeight});
        setScreenSize(screen_size())
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {screenSize,screenLen};
};
export default useScreenSize;