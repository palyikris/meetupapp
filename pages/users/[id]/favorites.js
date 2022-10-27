import UniHead from "../../../components/header"
import Topnav from '../../../components/topnav'
import { useRouter } from "next/router"
import {app, db}  from "../../../firebaseConfig"
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore"
import {useState} from "react"
import MeetupList from "../../../components/meetupList"
import styles from "../../../styles/favorite/favorite.module.css"

 
export default function FavoritesPage(){
    
    const router = useRouter()
    const userId = router.query.id
    const dbInstance = collection(db, `meetups/${userId}/userMeetups`)  
    let [meetupsArray, setMeetupsArray] = useState([])
    let favorites = []

    const fetchData = () => {
        getDocs(dbInstance)
        .then((data) => {
            setMeetupsArray(data.docs.map((doc) => {
                return{...doc.data(), id: doc.id}
            }))
        })
    }

    const loadMeetups = () => {
        if(meetupsArray.length === 0){
            fetchData()
        }
        else{
            meetupsArray.map((meetup) => {
                if(meetup.isFavorite === true){
                    favorites.push(meetup)
                }
            })
        }
    }
    
    loadMeetups()



    return(
        <div className={styles.container}>
            <UniHead title="UrmeetUps My Favorites" description="Favorite Meetups for UrmeetUps" icon="../../../public/favicon.ico"></UniHead>
            <Topnav user={userId} />
            <MeetupList list={favorites} userId={userId} loadMeetups={loadMeetups} className={styles.meetupList} />
        </div>
    )

}

FavoritesPage.displayName = "My Favorite Meetups Page"