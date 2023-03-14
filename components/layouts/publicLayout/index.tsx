import PublicHeader from '@/components/headers/publicHeader'
import PublicFooter from '@/components/footers/publicFooter'
import {i18n} from "next-i18next";

export default function Index({children}: { children: JSX.Element }) {
    return (
        <div dir={i18n?.dir()}>
            <PublicHeader/>
            <div className='p-4'>
                {children}
            </div>
            <PublicFooter/>
        </div>
    )
}