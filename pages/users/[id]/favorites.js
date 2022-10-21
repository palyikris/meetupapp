import UniHead from "../../components/header"
import Topnav from '../../components/topnav'
import { useRouter } from "next/router"



export default function(){
    
    const router = useRouter()
    const userId = router.query.id


    return(
        <>
            <UniHead title="UrmeetUps My Favorites" description="Favorite Meetups for UrmeetUps" icon="../../../public/favicon.ico"></UniHead>
            <Topnav user={userId} />
        </>
    )

}