import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors'
import requestIp from 'request-ip'
import {BytesLike, ethers} from "ethers";
import { provider } from "../../utils/providerweb3";
import rateLimit, { ValueDeterminingMiddleware } from 'express-rate-limit'

const cors = Cors({
    methods: ['POST', 'OPTIONS'],
    origin: 'https://empyreansaga.com',
})
const VALIDATION_SIGNER = process.env.VALIDATION_SIGNER;

export const validationSigner = new ethers.Wallet(VALIDATION_SIGNER as BytesLike, provider);



const getIP = (request: NextApiRequest): string | undefined =>
  requestIp.getClientIp(request) ||
  request.connection.remoteAddress

export const rateLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, 
    max: 5,
    message: 'Too many requests', 
    standardHeaders: true,
    legacyHeaders: false,
    // @ts-ignore
    keyGenerator: getIP
});
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const origin = req.headers.origin || req.headers.referer;
    
    if (!origin || !origin.includes('empyreansaga.com')) {
            console.error("Bad Origin:", origin);
        return res.status(403).json({ message: 'Forbidden' });
    }
    
    await runMiddleware(req, res, cors)
//    await runMiddleware(req, res, rateLimiter)
    const message = ethers.utils.solidityKeccak256(["string"], [req.body.msg]);
    const arrayifyMessage = await ethers.utils.arrayify(message);
    const result = await validationSigner.signMessage(arrayifyMessage)
    res.status(200).json({result: result});
}
