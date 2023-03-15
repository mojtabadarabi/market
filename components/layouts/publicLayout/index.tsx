import PublicHeader from '@/components/headers/publicHeader'
import PublicFooter from '@/components/footers/publicFooter'
import {i18n} from "next-i18next";
import Head from "next/head";
import {useEffect, useState} from "react";
import Router from "next/router";
import LoadingMainPage from "@/helpers/components/loadingMainPage";

export default function Index({children}: { children: JSX.Element }) {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        Router.events.on('routeChangeStart', () => setLoading(true));
        Router.events.on('routeChangeComplete', () => setLoading(false));
        Router.events.on('routeChangeError', () => setLoading(false));
        return () => {
            Router.events.off('routeChangeStart', () => setLoading(true));
            Router.events.off('routeChangeComplete', () => setLoading(false));
            Router.events.off('routeChangeError', () => setLoading(false));
        };
    }, [Router.events]);
    return (
        <div>
            {
                loading && <LoadingMainPage/>
            }
            <div dir={i18n?.dir()} className='px-4 '>
                <Head>
                    <title>title</title>
                </Head>
                <PublicHeader/>
                <div className=''>
                    {children}
                </div>
                <PublicFooter/>
            </div>
        </div>

    )
}