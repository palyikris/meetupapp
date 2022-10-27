import styles from '../styles/home/Home.module.css'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import UniHead from "../components/header"
import {app, db}  from "../firebaseConfig"
import { collection, addDoc, getDocs } from 'firebase/firestore';
import {useRef, useState, useEffect} from "react"
import Link from "next/link"
import { useRouter } from "next/router";
import LoaderScene from '../components/loader';


export default function Home() {

  const userName = useRef()
  const passWord = useRef()
  let fetchedUsername = null
  let fetchedPassword = null
  const router = useRouter();
  let [usersArray, setUsersArray] = useState([])
  let isUserValid = false; 
  let thisUser = null;
  let [loadingScene, setLoadingScene] = useState(false)
  const dbInstance = collection(db, 'users')


  const fetchData = () => {
    getDocs(dbInstance)
    .then(data => {
        setLoadingScene(true);
        setUsersArray(data.docs.map((doc) => {
          return{...doc.data(), id: doc.id}
        }))
    })
    .then(() => {
        setLoadingScene(false)
    })
  }
  
  const loadData = () => {
    if(usersArray.length === 0){
      fetchData()
    }
    else{

    }
  }


  function login()  {

      setLoadingScene(true)
      usersArray.map((user) => {
          if(user.username === userName.current.value) {
              if(user.password === passWord.current.value){
                  isUserValid = true;
                  thisUser = user;
                  router.push(`/users/${thisUser.id}/mymeetups`)
              }
              else{
                  alert("Invalid username or password")
                  setLoadingScene(false);
              }
          }
      })
  }

  loadData()

  return (


    <>
      <UniHead title="Login" description="Get started with UrmeetUps" icon="../public/vercel.svg"></UniHead>
      <div className={styles.container}>
        {loadingScene ? (
          <LoaderScene></LoaderScene>
        ) : (
          <div className={styles.form}>
            <div className={styles.data}>
              <label htmlFor="">Username</label>
              <input type="text" placeholder="Username..." ref={userName}/>
            </div>
            <div className={styles.data}>
              <label htmlFor="">Password</label>
              <input type="password" placeholder="Password..." ref={passWord}/>
            </div>
            <button onClick={login}>Log in</button>
            <div className={styles.additionals}>
              <Link href="/registrate">
                <a>Registrate</a>
              </Link>
              <Link href="/forgottenpwd">
                <a>Forgot your password?</a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

Home.displayName = "My Meetups Page"