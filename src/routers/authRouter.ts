import express, { Router } from "express"
import axios from "axios"

// Config env variables
if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const ACCESS_TOKEN_REDIRECT_URI = "http://localhost:3001/redirect"
const API_URL = "https://timetreeapis.com"
const ACCESS_TOKEN = process.env.ACCESS_TOKEN

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
        const { access_token, token_type, created_at } = res.data
        if(access_token && token_type && created_at) {
            // Authorization successful
            // 1. Save access token in config file
            console.log(access_token)

            // If the accesstoken exists inside .env file it means that it stored correctly, otherwise not ...
        }

    }).catch(err => {
        console.log(err)
    })

})

router.get("/user", (req: express.Request, res: express.Response) => {
    // Request timetree api to retrieve user data
    axios.get(API_URL + "/user", {
        headers: {
            Accept: "application/vnd.timetree.v1+json",
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    }).then(res => {
        console.log(res.data)
    }).catch(err => {
        console.log(err)
    })
})

export default router;