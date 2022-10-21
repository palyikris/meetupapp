import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/home/Home.module.css'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import UniHead from "./components/header"
import {app, db}  from "../firebaseConfig"
import { collection, addDoc, getDocs } from 'firebase/firestore';
import {useRef, useState} from "react"
import Link from "next/link"
import { useRouter } from "next/router";


export default function Home() {

  const userName = useRef()
  const passWord = useRef()
  const router = useRouter();
  let [usersArray, setUsersArray] = useState([])
  let isUserValid = false; 
  let thisUser = null;

  function login()  {

    const dbInstance = collection(db, 'users');

    getDocs(dbInstance)
        .then((data) => {
            setUsersArray(data.docs.map((doc) =>{
                return{...doc.data(), id: doc.id}
            }))
        })
        .then(() => {
            usersArray.map(user => {
                if(userName.current.value === user.username) {
                  if(passWord.current.value === user.password) {
                    isUserValid = true;
                    thisUser = user
                  }
                }
            })
        })
        .then(() => {
            if(isUserValid) {
              router.push(`/users/${thisUser.id}/mymeetups`)
            }
            else{
              alert("Invalid username or password")
            }
        })
  }

  function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }


  return (


    <>
      <UniHead title="Login" description="Get started with UrmeetUps" icon="../public/vercel.svg"></UniHead>
      <div className={styles.container}>
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
      </div>
    </>
  )
}
