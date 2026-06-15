import type { ComponentProps } from "react"

type TVarient = "danger" | "primary" | "secondary" | "success" | "warning"

type IButton = ComponentProps<"button"> & {
    varient?: TVarient
}


function Button({ children, varient, style ,  ...rest }: IButton) {
// console.log(checkVarient(varient))
    return (
        <button {...rest} style={{ cursor:"pointer" , borderRadius:"4px", padding:"4px" , ...style , ...checkVarient(varient)}}>
            {children}
        </button >
    )
}

export default Button


function checkVarient(varient?: TVarient) {
    if (varient === "danger") {
        return { backgroundColor: "red", color: "white" }
    }
    else if (varient === "primary") {
        return { backgroundColor: "#2f2fba", color: "white" }
    }
    else if (varient === "secondary") {
        return { backgroundColor: "gruy", color: "black" }
    }
    else if (varient === "success") {
        return { backgroundColor: "green", color: "white" }
    }
    else if (varient === "warning") {
        return { backgroundColor: "yellow", color: "black" }
    }
}