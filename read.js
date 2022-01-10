const path = require("path")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// This is the parts that the user will see
// Basically the index, page, previews and
// all.

File = require("fs")
Stream = require("stream")
Express = require('express')
Path = require('path'); 
const { v4: UUID } = require('uuid')


const asyncHandler = fn => (req, res, next) =>
  Promise
    .resolve(fn(req, res, next))
    .catch(next)



var routes = Express.Router();



routes.post('/usr/getSession', asyncHandler( async (request , reply) => {
	// console.log('body is ',request.body); 
	let dataSendCollector = []
	dataJSON = {}
	console.log(request.body.sessionID)
	
	if (request.body.sessionID == "#AB98D94L239274862484B47FFB33R6386236856656723423GBF")
	{
		dataSendCollector.push({
			status: "~200",
			id: UUID(),
			name: "StringentDev",
			roles: [
				"Creator"
			]
		})	
	}
	else
	{
		dataSendCollector.push({
			status: "~404"
		})	
	}

	for (const data of dataSendCollector)
	{ 
		dataJSON = {
			...dataJSON,
			...data
		}
	}
	console.log(dataJSON)
	reply.send(dataJSON)
	reply.end()
}))
		
module.exports = routes