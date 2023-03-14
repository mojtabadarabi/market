import {supportedLocales} from "@/configs";

export const getLang = (language: string | undefined): string => {
    const foundedLang = supportedLocales.find((lang:{lang:string,name:string})=>lang.name===language)
    if(foundedLang){
        return foundedLang.name
    }
    else return <string>process.env["DEFAULT_LANG "]
}