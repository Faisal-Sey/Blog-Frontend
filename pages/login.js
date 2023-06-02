import React from 'react'
import styles from '../styles/auth.module.css'
// import Image from 'next/image'
// import Navbar from '../components/navbar'
import LoginForm from '../components/forms/login'
import Layout from '../components/layout'
// import Facebook from '../assets/svgs/facebook.svg'


export default function Login() {
    return (
        <main className={styles.container}>
            <Layout title="Hotlava-login">
                <div className="main primary-bg pt-12">
                    <LoginForm theme="primary" isLogin={true} />
                </div>

            </Layout>
        </main>
    )
}

