import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/home/Home.module.css'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import UniHead from "../components/header"
import {app, db}  from "../firebaseConfig"
import { collection, addDoc, getDocs } from 'firebase/firestore';
import {useRef, useState} from "react"
import Link from "next/link"
import { useRouter } from 'next/router'
import LoaderScene from "../components/loader";



export default function RegistryPage() {


   
  const userName = useRef()
  const passWord = useRef()
  const router = useRouter();
  let [usersArray, setUsersArray] = useState([])
  let isLoggedIn = false
  let areInputsFilled = true;
  let [loadingScene, setLoadingScene] = useState(false);



  function registrate()  {

    const dbInstance = collection(db, 'users')

    if(userName.current.value === "" || passWord.current.value === ""){
      areInputsFilled = false;
    }

    getDocs(dbInstance)
        .then((data) => {
            setUsersArray(data.docs.map((doc) =>{
                return{...doc.data(), id: doc.id}
            }))
        })
        .then(() => {
            usersArray.map((user) => {
              if(user.username === userName.current.value){
                isLoggedIn = true;
              }
            })
        })
        .then(() => {
            if(areInputsFilled === false){
              alert('Please fill both fields!')
            }
            else if(isLoggedIn === true){
              alert('You are logged in already!')
            }
            else{
              setLoadingScene(true)
              addDoc(
                dbInstance,
                {
                    username : userName.current.value,
                    password : passWord.current.value
                }
              )
                .then(() => {
                    router.push("/")
                })
            }
        })
  }


  return (


    <>
      <UniHead title="Registrate" description="Get started with UrmeetUps" icon="../public/vercel.svg"></UniHead>
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
          <button onClick={registrate} type="submit">Registrate</button>
          <div className={styles.additionals}>
            <Link href="/">
              <a>Got an account? Log in!</a>
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

RegistryPage.displayName = "My Meetups Page"