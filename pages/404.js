import UniHead from "./components/header"


export default function errorPage(){
    return (
        <>
            <UniHead title="No such page" description="The user found a non-existent page" icon="../public/favicon.ico"></UniHead>
            <p>Anyadseszeret</p>
        </>
    )
}