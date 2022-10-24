import { useRouter } from "next/router"
import Topnav from '../../components/topnav'
import {app, db}  from "../../../firebaseConfig"
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import UniHead from "../../components/header"
import LoaderScene from "../../components/loader"
import {useState, useEffect, useRef} from "react"
import styles from "../../../styles/meetupdetail/meetupdetail.module.css"



export default function MeetupDetailPage(){

    const router = useRouter()
    const userId = router.query.id
    const meetupId = router.query.meetupId
    const dbInstance = collection(db, `meetups/${userId}/userMeetups/`)
    let [meetupsArray, setmeetupsArray] = useState([])
    let [loadingScene, setLoadingScene] = useState(false)
    let name = useRef();
    let description = useRef();
    let place = useRef();
    let date = useRef();
    let time = useRef();

    const fetchData = () => {
        getDocs(dbInstance)
        .then(data => {
            setmeetupsArray(data.docs.map((doc) => {
                return{...doc.data(), id: doc.id}
            }))
        })
    }

    const fillInputs = () => {
        if(meetupsArray.length === 0) {
            fetchData()
        }
        else{
            meetupsArray.forEach((meetup) =>{
                if(meetup.id === meetupId){
                    name.current.value = meetup.name
                    description.current.value = meetup.description
                    place.current.value = meetup.place
                    date.current.value = meetup.date
                    time.current.value = meetup.time
                }
            })
        }
    }


    const saveData = () => {
        const docRef = doc(db, `meetups/${userId}/userMeetups/${meetupId}`)
        updateDoc(docRef, {
            name: name.current.value,
            description: description.current.value,
            place: place.current.value,
            date: date.current.value,
            time: time.current.value
        })
        .then((err) => {
            if(err){
                console.error(err)
            }
            else{
                console.log("Success")
            }
        })
    }

    fillInputs()

    return(
       <div className={styles.container}>
            <UniHead title="MymeetUps Details" description="MymeetUps Meetup Detail Page" icon="../../../public/favicon.ico"></UniHead>
            <Topnav user={userId}></Topnav>
            {loadingScene ? (
                <LoaderScene></LoaderScene>
            ) : (
                <div className={styles.form}>
                    <div className={styles.data}>
                        <label htmlFor="">Title</label>
                        <input type="text" ref={name}/>
                    </div>
                    <div className={styles.data}>
                        <label htmlFor="">Description</label>
                        <input type="text" ref={description}/>
                    </div>
                    <div className={styles.data}>
                        <label htmlFor="">Place</label>
                        <input type="text" ref={place}/>
                    </div>
                    <div className={styles.data}>
                        <label htmlFor="">Date</label>
                        <input type="text" ref={date}/>
                    </div>
                    <div className={styles.data}>
                        <label htmlFor="">Time</label>
                        <input type="text" ref={time}/>
                    </div>
                    <button type="submit" className={styles.button} onClick={saveData}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            )}
       </div>
    )

}