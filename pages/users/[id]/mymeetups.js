import {useRouter} from 'next/router'
import Topnav from '../../components/topnav'
import {app, db}  from "../../../firebaseConfig"
import { collection, addDoc, getDocs } from 'firebase/firestore';
import UniHead from "../../components/header"
import MeetupList from "../../components/meetupList"
import {useState} from "react"
import styles from "../../../styles/mymeetups/mymeetups.module.css"

export default function UserPage(){

    const router = useRouter()
    const userId = router.query.id
    let [userMeetUps, setUserMeetUps] = useState([])

    const dbInstance = collection(db, `meetups/${userId}/userMeetups`);

    getDocs(dbInstance)
        .then((data) => {
            setUserMeetUps(data.docs.map((item) =>{
                return{...item.data(), id: item.id}
            }))
        })
        .then(() => {
        })
    return(
        <div className={styles.container}>
            <UniHead title="UrmeetUps My Meetups" description="User Page for UrmeetUps" icon="../../../public/favicon.ico"></UniHead>
            <Topnav user={userId} />
            <MeetupList list={userMeetUps} className={styles.meetupList} />
        </div>
    )
}