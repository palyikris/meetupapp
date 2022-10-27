import styles from '../styles/loader/loader.module.css'



export default function LoaderScene(){
    return(
        <div className={styles.container}>
            <div className={styles.loader}></div>
        </div>
    )
}