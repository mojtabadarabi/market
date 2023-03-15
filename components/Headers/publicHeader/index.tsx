import {useAppSelector} from "@/hooks/redux";
import {useRouter} from "next/router";
import Link from "next/link";
import {BsFillCartFill} from 'react-icons/bs'
import {HiOutlineLightBulb} from 'react-icons/hi'
import SearchMain from '@/helpers/components/searchMain'
import {IconButton} from "@mui/material";
import LanguagePicker from "@/helpers/components/languagePicker";
import {BsFillBellFill} from 'react-icons/bs'
import {AiFillHeart} from 'react-icons/ai'
import {BsPersonCircle} from 'react-icons/bs'

export default function Index() {
    const state = useAppSelector(state => state)
    const router = useRouter()
    console.log(state)
    return (
        <div className='flex items-center justify-between p-3'>
            {/*<Link href={router.pathname} locale="en" dir='ltr' lang='fa'>*/}
            {/*    To /en/another*/}
            {/*</Link>*/}
            {/*<Link href={router.pathname} locale="fa" dir='rtl' lang='en'>*/}
            {/*    To /fa/another*/}
            {/*</Link>*/}
            <div className='flex items-center justify-start md:gap-10 gap-2 w-1/2'>
                <h1 className='text-3xl font-bold text-blue-600'>مارکت</h1>
                <SearchMain/>
            </div>
            <div className='flex  md:gap-2 gap-1 items-center justify-end'>
                <LanguagePicker/>
                <IconButton>
                    <HiOutlineLightBulb/>
                </IconButton>
                <IconButton>
                    <BsFillBellFill/>
                </IconButton>
                <IconButton>
                    <AiFillHeart/>
                </IconButton>
                <IconButton>
                    <BsFillCartFill/>
                </IconButton>
                <IconButton>
                    <BsPersonCircle/>
                </IconButton>
            </div>
        </div>
    )
}