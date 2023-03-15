import {useAppDispatch, useAppSelector} from "@/hooks/redux";
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

import {GiHamburgerMenu} from 'react-icons/gi'
import {toggleMenu} from "@/mainSlice/slice";

export default function Index() {
    const state = useAppSelector(state => state.main)
    const dispatch = useAppDispatch()
    const router = useRouter()
    console.log(state)
    console.log('state')

    return (
        <div className='block items-center justify-between p-3 md:block lg:flex '>

            <div className='flex items-center justify-start md:gap-10 gap-2 lg:w-1/2 md:w-full w-full'>
                <h1 className='text-3xl font-bold text-blue-600'>مارکت</h1>
                <SearchMain/>
                <IconButton onClick={()=>dispatch(toggleMenu())} className='sm:hidden block'><GiHamburgerMenu/></IconButton>
            </div>
            <div className='flex  md:gap-2 gap-1 items-center justify-end sm:flex hidden'>
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