import UniHead from "../../components/header"
import Topnav from '../../components/topnav'
import { useRouter } from "next/router"
import styles from "../../../styles/addnew/addnew.module.css"


export default function(){
    
    const router = useRouter()
    const userId = router.query.id


    return(
        <>
            <UniHead title="UrmeetUps New Meetup" description="Add a new Meetup for UrmeetUps" icon="../../../public/favicon.ico"></UniHead>
            <Topnav user={userId} />
            <div className={styles.form}>
                
            </div>
        </>
    )

}