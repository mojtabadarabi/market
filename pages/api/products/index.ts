import type {NextApiRequest, NextApiResponse} from 'next'
import clientPromise from "@/app/helpers/database";
import {getDataByLang, getQueryByLang} from "@/helpers/apiHelpers";
import ClientProductController from "@/app/controlers/products/client";
import {connectToDb} from "@/app/helpers";
import {DataWithPagination, productType} from "@/app/types/products";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<DataWithPagination<productType[]>>) {

    const db = await connectToDb()
    const productController = new ClientProductController(req,res,db)
    switch (req.method) {
        case "POST":
            res.status(201).json({status: 201})
            break;
        case "GET":
            return productController.getAllProducts()
    }
}

