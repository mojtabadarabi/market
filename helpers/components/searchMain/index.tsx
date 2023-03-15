import {TfiSearch} from 'react-icons/tfi'
import {BsFilterRight} from 'react-icons/bs'
import {IconButton} from "@mui/material";

export default function SearchMain() {
    return (
        <div className='w-full px-3 shadow-md rounded-2xl py-1 flex items-center justify-start bg-white' style={{borderRadius:'2em'}}>
            <TfiSearch/>
            <input type='search' className='w-full px-4'/>
            <IconButton><BsFilterRight/></IconButton>
        </div>
    )
}