import { useAppSelector} from "@/hooks/redux";
import {useRouter} from "next/router";
import Link from "next/link";

export default  function Index(){
    const state = useAppSelector(state=>state)
    const router = useRouter()
    console.log(state)
    return (
        <div>
            <Link href={router.pathname} locale="en" dir='ltr' lang='fa'>
                To /en/another
            </Link>
            <Link href={router.pathname} locale="fa" dir='rtl' lang='en'>
                To /fa/another
            </Link>
            header
        </div>
    )
}