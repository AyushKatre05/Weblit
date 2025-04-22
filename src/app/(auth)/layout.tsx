
import { Suspense } from "react";

export default function AuthLayout({children} : { children : React.ReactNode}){
    return(
        <div className="min-h-screen max-h-screen h-full">        
            <Suspense fallback={<p>Loading...</p>}>
            <div className="h-full flex flex-col mt-14 lg:mt-0 lg:justify-center px-4 lg:p-6 overflow-auto">
                {children}
            </div>
            </Suspense>
        </div>
    )
}