import http from "@/util/http.js"

export const getDetail = (type) =>{                //获取币种详情
    return http({
        url:`/market/detail?symbol=${type}usdt`,
    })
}

export const getKline = (type,period) =>{
    return http({
        url:`/market/history/kline?period=${period}&size=200&symbol=${type}usdt`
    })
}

export const getDepth = (type) =>{
    return http({
        url:`/market/depth?symbol=${type}usdt&depth=5&type=step0`
    })
}