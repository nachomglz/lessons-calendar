import express, { Router } from "express"
import axios from "axios"
import dotenv from "dotenv"

// Config dotenv
dotenv.config()

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const ACCESS_TOKEN_REDIRECT_URI = "http://localhost:3001/redirect"

const router = Router();

router.get("/redirect", (req: express.Request, res: express.Response) => {

    const {code} = req.query 

    // Request to get the access token
    axios.post("https://timetreeapp.com/oauth/token", {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: ACCESS_TOKEN_REDIRECT_URI,
        code: code,
        grant_type: "authorization_code",
    }).then(res => {
        const {access_token, token_type, created_at} = res.data
    }).catch(err => {
        console.log(err)
    })

})

router.get("/authorized", (req: express.Request, res: express.Response) => {
    console.log(req.query)
})

export default router;