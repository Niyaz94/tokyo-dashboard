import { use } from "react";

import { useSelector}          from 'react-redux'
import { RootState }           from '../../store/Reducer';

const requestCache = new Map<string, Promise<any>>();


export function useAPI<T = unknown>(url: string): T {

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
        }));
    }

    return use(requestCache.get(url)!);
}
