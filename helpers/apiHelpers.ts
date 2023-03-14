// create object props by lang
export const getDataByLang = ({
                                  data,
                                  keys,
                                  lang
                              }: { data: Record<string, any>, keys: string[], lang: string }): Record<string, string> => {
    let langedData: Record<string, string> = {}
    const dataKeys = Object.keys(data)
    dataKeys.map((key: string) => {
        if (keys.includes(key)) {
            langedData[key] = data[key][lang]
        } else {
            langedData[key] = data[key]
        }
    })
    return langedData
}
// create array of object props by lang
export const getQueryByLang = ({
                                   data,
                                   keys,
                                   lang
                               }: { data: Record<string, any>, keys: string[], lang: any }) => {
    let langedData: any = []
    data.map((item: any) => {
        langedData.push(getDataByLang({data: item, keys, lang}))
    })
    return langedData
}