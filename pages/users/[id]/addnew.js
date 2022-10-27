import UniHead from "../../components/header"
import Topnav from '../../components/topnav'
import { useRouter } from "next/router"
import styles from "../../../styles/addnew/addnew.module.css"
import {useRef, useState} from "react"
import {app, db}  from "../../../firebaseConfig"
import { collection, addDoc, getDocs } from 'firebase/firestore';
import LoaderScene from "../../components/loader"



export default function AddNewPage(){
    
    const router = useRouter()
    const userId = router.query.id

    const title = useRef();
    const description = useRef();
    const place = useRef();
    const date = useRef();
    const time = useRef();
    const dataList = [title, description, place, date, time]
    let areInputsFilled = true;
    let [loadingScene, setLoadingScene] = useState(false);
    const dbInstance = collection(db, `meetups/${userId}/userMeetups`)

    
    function addMeetup(){

        dataList.map((data) => {
            if(data === ""){
                areInputsFilled = false;
            }
        })      
        
        if(areInputsFilled === false){
            alert("Please fill in all the fields!")
        }
        else{
            setLoadingScene(true)
            addDoc(
                dbInstance,
                {
                    name: title.current.value,
                    description: description.current.value,
                    place: place.current.value,
                    date: date.current.value,
                    time: time.current.value,
                    isFavorite: false
                }
            )
            .then(() => {
                router.push(`/users/${userId}/mymeetups`)
            })
        
        }

    }

    return(
        <div className={styles.container}>
            <UniHead title="UrmeetUps New Meetup" description="Add a new Meetup for UrmeetUps" icon="../../../public/favicon.ico"></UniHead>
            <Topnav user={userId} />

            {loadingScene ? (
                <LoaderScene></LoaderScene>
            ) : (
                <div className={styles.form}>
                    <div>
                        <label htmlFor="">Title</label>
                        <input type="text" placeholder="Title of Meetup..." ref={title}/>
                    </div>
                    <div>
                        <label htmlFor="">Description</label>
                        <input type="text" placeholder="Description of Meetup..." ref={description}/>
                    </div>
                    <div>
                        <label htmlFor="">Place</label>
                        <input type="text" placeholder="Place of Meetup..." ref={place}/>
                    </div>
                    <div>
                        <label htmlFor="">Date</label>
                        <input type="text" placeholder="Date of Meetup..." ref={date}/>
                    </div>
                    <div>
                        <label htmlFor="">Time</label>
                        <input type="text"  placeholder="Time of Meetup..." ref={time}/>
                    </div>
                    <button type="submit" className={styles.submitButton} onClick={addMeetup}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    )

}

AddNewPage.displayName = "My New Meetups Page"