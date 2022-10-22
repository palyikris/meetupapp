import {useRouter} from 'next/router'
import Topnav from '../../components/topnav'
import {app, db}  from "../../../firebaseConfig"
import { collection, addDoc, getDocs } from 'firebase/firestore';
import UniHead from "../../components/header"
import MeetupList from "../../components/meetupList"
import {useState} from "react"
import styles from "../../../styles/mymeetups/mymeetups.module.css"
import LoaderScene from "../../components/loader"




export default function UserPage(){

    const router = useRouter()
    const userId = router.query.id
    let [userMeetUps, setUserMeetUps] = useState([])
    let [loadingScene, setLoadingScene] = useState(false)
    const dbInstance = collection(db, `meetups/${userId}/userMeetups`);

    getDocs(dbInstance)
        .then((data) => {
            setLoadingScene(true)
            setUserMeetUps(data.docs.map((item) =>{
                return{...item.data(), id: item.id}
            }))
        })
        .then(() => {
            setLoadingScene(false)
        })


    
    return(
        <div className={styles.container}>
            {loadingScene ? (
                <LoaderScene></LoaderScene>
            ) : (
                <div className={styles.container}>
                    <UniHead title="UrmeetUps My Meetups" description="User Page for UrmeetUps" icon="../../../public/favicon.ico"></UniHead>
                    <Topnav user={userId} />
                    <MeetupList list={userMeetUps} className={styles.meetupList} />
                </div>
            )}
        </div>
    )
}