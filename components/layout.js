import React from 'react'
import Head from 'next/head'
import Navbar from './navbar'
function Layout({ children, title, description, showCategories }) {
    return (
        <>
            <Head>
                <title>{`${title ? title : "Hotlava"}`}</title>
                {description ? <meta name="description" content={description} /> : <meta name="description" content="Events Platform trusted by all" />}
            </Head>
            <Navbar showCategories={showCategories} />
            {children}
        </>

    )
}

export default Layout