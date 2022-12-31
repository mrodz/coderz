import express, { Request, Response } from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

import jwksRsa from 'jwks-rsa'
import { expressjwt as jwt } from 'express-jwt'

const app = express()
const port = 5000
dotenv.config()

export const prisma = new PrismaClient()

app.use(express.json()) // allow POST requests to take JSON inputs.
app.use(cors())         // allow cross-origin requests.

export const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://coderz-app.us.auth0.com/.well-known/jwks.json`
	}) as any,

	// Validate the audience and the issuer.
	audience: "https://coderz-app.us.auth0.com/api/v2/",
	issuer: "https://coderz-app.us.auth0.com/",
	algorithms: ["RS256"]
})

/////////////////////
/// PUBLIC ROUTES ///
/////////////////////

app.get('/public', (req, res) => {
	res.send('public!!')
})

app.use(checkJwt)

//////////////////////
/// PRIVATE ROUTES ///
//////////////////////

app.get('/private', (req, res) => {
	res.send('hi')
})

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
// app.post()