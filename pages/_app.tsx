import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {wrapper} from '@/Store'
import {Provider} from 'react-redux'
import PublicLayout from '@/components/layouts/publicLayout/index'
import i18nConfig from '@/helpers/next-i18next.config'
import {appWithTranslation} from 'next-i18next';
import {getCookies, removeCookies, setCookies} from "cookies-next";
import NApp from 'next/app'
import ServerSideTranslations from "@/helpers/serverSideTranslations";
import type {AppContext} from 'next/app';

function App({ Component, pageProps }: AppProps) {
  const {store, props} = wrapper.useWrappedStore(pageProps);
  return <Provider store={store} ><PublicLayout><Component {...pageProps} /></PublicLayout></Provider>
}
App.getInitialProps = async (appContext: AppContext) => {
  if (appContext.ctx.err)return {err:appContext.ctx.err}
  try {
    const coockies = getCookies(appContext.ctx)

    const appProps = await NApp.getInitialProps(appContext);

    if (!appProps.pageProps?.initialI18nStore){
      // @ts-ignore
      const translations = await ServerSideTranslations([],appContext.ctx)
      appProps.pageProps = {...appProps.pageProps ,...translations}
    }

    return { ...appProps, pageProps: { ...appProps.pageProps, lang: coockies?.LANG } }
  } catch (e) {
    console.log(";> sync_app error",e)
  }

  return {pageProps:{}}
}

export default appWithTranslation(App,i18nConfig)