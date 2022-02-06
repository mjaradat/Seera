import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Layout: NextPage = ({ children }) => {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
            </Head>
            <header className="d-flex align-items-center bg-white">
                <div className="container">
                    <Image
                        src="/seeraLogo.jpg"
                        width={75}
                        height={75}
                    />
                </div>
            </header>

            <div className="container">
                {children}
            </div>
        </>
    )
};

export default Layout;