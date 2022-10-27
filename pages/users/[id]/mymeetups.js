import {useRouter} from 'next/router'
import Topnav from '../../components/topnav'
import {app, db}  from "../../../firebaseConfig"
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import UniHead from "../../components/header"
import MeetupList from "../../components/meetupList"
import {useState} from "react"
import styles from "../../../styles/mymeetups/mymeetups.module.css"
import LoaderScene from "../../components/loader"
import Link from "next/link"




export default function UserPage(){

    const router = useRouter()
    const userId = router.query.id
    let [userMeetUps, setUserMeetUps] = useState([])
    let [loadingScene, setLoadingScene] = useState(false)
    const dbInstance = collection(db, `meetups/${userId}/userMeetups`);

    const fetchData = () => {
        getDocs(dbInstance)
        .then((data) => {
            setLoadingScene(true)
            data.docs.map((doc) =>{
                console.log(doc.data())
            })
            setUserMeetUps(data.docs.map((item) =>{
                return{...item.data(), id: item.id}
            }))
        })
        .then(() => {
            setLoadingScene(false)
        })
    }


    const loadMeetups = () => {
        if(userMeetUps.length === 0){
            fetchData()
        }
        else{
        }
    }



    const deleteMeetup = (id) => {
        // const deleteRef = doc(db, `meetups/${userId}/userMeetups/${id}`)
        // deleteDoc(deleteRef)
        // .then(() => {
        //     router.push(`/users/${userId}/mymeetups`)
        // })
        console.log("delete")
    }



    loadMeetups()


    if(userMeetUps.length > 0){
        return(
            <div className={styles.container}>
                {loadingScene ? (
                    <LoaderScene></LoaderScene>
                ) : (
                    <div className={styles.container}>
                        <UniHead title="UrmeetUps My Meetups" description="User Page for UrmeetUps" icon="../../../public/favicon.ico"></UniHead>
                        <Topnav user={userId} />
                        <MeetupList list={userMeetUps} userId={userId} loadMeetups={loadMeetups} className={styles.meetupList} />
                    </div>
                )}
            </div>
        )
    }
    else{
        return(
            <>
            {loadingScene ? (
                <LoaderScene></LoaderScene>
            ) : (
                <div className={styles.container}>
                    <UniHead title="UrmeetUps My Meetups" description="User Page for UrmeetUps" icon="../../../public/favicon.ico"></UniHead>
                    <Topnav user={userId} />
                    <h3>You have no Meetups at the moment!</h3>
                    <Link href={`/users/${userId}/addnew`}>
                        <a className={styles.addnewLink}>You can add a new Meetup here</a>
                    </Link>
                </div>
            )
            }
            </>
        )
    }
    
}

UserPage.displayName = "My Meetups Page"