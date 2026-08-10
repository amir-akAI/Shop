import { type ReactNode } from "react";

interface IChildren{
    children : ReactNode
}

function Container({children} : IChildren){

    return(
        <div className="container pt-24 mx-auto px-1">
            {children}
        </div>
    )
}


export default Container