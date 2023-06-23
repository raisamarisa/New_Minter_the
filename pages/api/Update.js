import {SIGNATURE_HEADER_NAME,isValidSignature} from "@sanity/webhook"
//import type { NextApiRequest,NextApiResponse} from "next";

const handler=  async(req,res) =>{
try{
const signature = req.headers[SIGNATURE_HEADER_NAME]?.toString();
if(!isValidSignature(
JSON.stringify(req.body),
signature,
process.env.SANITY_WEBHOOK,
    )
)
return res.status(401).json({msg:"invalid request"});
await res.revalidate("/");
await res.status(200).json({msg:"page revalidate"});

}catch(error){
    res.status(200).json({msg:"something wrong"})
}


}

export default handler;