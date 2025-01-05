import { useState, useEffect } from 'react';

import useFetch, {FetchData}            from './useGetAPI';
import useScreenSize                    from './useScreenSize';



interface paginationType {
  page_url:string,
  total:number;
  cardsPerPage:number;
}


const usePagination = <T>(page_url:string) => {

    type cardType = {
      data:T[],
      counts:number
    };

    const [cardsPerPage, setCardsPerPage] = useState(3);
    const {screenSize,screenLen:_}        = useScreenSize();
    const [currentPage, setCurrentPage]   = useState(1);
    const [sliceState, setSliceState]     = useState("first");
    const [pagText, setPagText]           = useState("1 of 1");
    const [url, setUrl]                   = useState(`${page_url}?page=1&len=${cardsPerPage}`);
    const [sliceNumber, setSliceNumber]   = useState(0);

    const { data:{data:cards,counts:total},success}: FetchData<cardType> = useFetch <cardType>(url,{data:[],counts:0});
    
    useEffect(()=>{
        setCardsPerPage((screenSize==="sm"?1:3))
        //it reset the current page, which means starting from begining. It is strong it should calculate the page number based on new slice
        setCurrentPage(1)
    },[screenSize])

    useEffect(()=>{
        setUrl(`${page_url}?page=${currentPage}&len=${cardsPerPage}`)
        setSliceNumber(Math.ceil(total/cardsPerPage))

        if(currentPage===1){
          setSliceState("first")
        }else if(currentPage==sliceNumber){
          setSliceState("last")
        }else{
          setSliceState("normal")
        }
        setPagText(`${currentPage} of ${Math.ceil(total/cardsPerPage)}`)
    },[currentPage,cardsPerPage,total])
    
    const paginFront = ()=> (currentPage < sliceNumber && setCurrentPage(currentPage+1))
    const paginBack  = ()=> (currentPage>1 && setCurrentPage(currentPage-1))


  return {cards,pagText,sliceState,cardsPerPage,paginBack,paginFront};
};
export default usePagination;