import {Suspense} from 'react';
import { ErrorBoundary } from "react-error-boundary";

import {ErrorFallback} from './ErrorFallback';
import {PageLoader} from './PageLoader';

export default ({children})=>{
    return(
        <ErrorBoundary fallback={<ErrorFallback />}>
            <Suspense fallback={<PageLoader />}>
                    {children}
            </Suspense>
        </ErrorBoundary>
    )
}