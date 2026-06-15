import { type ReactNode } from "react";

interface IChildren{
    children : ReactNode
}

function Container({children} : IChildren){

    return(
        <div className="container mx-auto px-1">
            {children}
        </div>
    )
}


export default Container