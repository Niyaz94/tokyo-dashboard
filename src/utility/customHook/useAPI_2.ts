import { use } from "react";

import { useSelector}          from 'react-redux'
import { RootState }           from '../../store/Reducer';

const requestCache = new Map<string, Promise<any>>();

interface useAPIInterface {
    url: string;
    // setTable: (updater: (prev: any[]) => any[]) => void;
    // setPagination: (pagination: { count: number; next: number; previous: number }) => void;
    setUseTableData?: (prev:boolean) => void;
    useTableData?:boolean;
    tableData?:any[];
}   

function cacheResolved(url, data) {
    requestCache.delete(url);
    requestCache.set(url, Promise.resolve(data));
  
}

export function useAPI<T = unknown>({url,setUseTableData,useTableData,tableData}:useAPIInterface): T {

    const loginDetail = useSelector((state: RootState) =>state.auth);

    let requestHeader={}
    if(loginDetail.token){
      requestHeader={
          Authorization: `Token ${loginDetail.token}`,
      }
    }

    if (!requestCache.has(url)) {
        requestCache.set(url,fetch(`http://127.0.0.1:8000/${url}`,{
            headers: requestHeader
        }).then(res => {
            if (!res.ok) {
                throw new Error(`Failed to fetch ${url}`);
            }
            return res.json();
        }))
        setUseTableData && setUseTableData(true);
    }
    // I tried to update the cache with the new data but has some issues.
    // else if(useTableData && tableData && tableData.length > 0){
    //     requestCache.delete(url);
    //     requestCache.set(url, Promise.resolve(tableData));
    // }

    return use(requestCache.get(url)!);
}
