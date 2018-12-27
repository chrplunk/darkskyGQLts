import { ResolverMap } from "../../types/graphqltypes";
//import { fakeweather } from "./fakeweather";
const dotenv = require("dotenv").config();

const fetch = require("node-fetch");

export const resolvers: ResolverMap = {
    Query: {
        
        weatherQuery: async (_: any, args: any, context: any) => {
            
            try {
                const darkskyurl = process.env.DARKSKY_URL 
                const darkskykey = process.env.DARKSKY_API_KEY
                let latlong = "37.8267,-122.4233" //change later to args.latlong 

                var options = { "url": darkskyurl + darkskykey + latlong }    
                
                console.log("******* The url to DarkSky is:" + options.url);
                const darkskyResponse = await fetch(options.url);
                const jsonResult = await darkskyResponse.json();
                            
                let mappedResult = {
                    timezone: jsonResult.timezone,
                    currentlyTime: jsonResult.currently.time,
                    currentlySummary: jsonResult.currently.summary,
                    currentlyTemperature: jsonResult.currently.temperature,
                    currentlyHumidity: jsonResult.currently.humidity
                }
                
                console.log("timezone: " + mappedResult.timezone);
                console.log("current time: " + mappedResult.currentlyTime);
                console.log("current summary: " + mappedResult.currentlySummary);
                console.log("current temp: " + mappedResult.currentlyTemperature);
                console.log("current humidity: " + mappedResult.currentlyHumidity);

                return mappedResult;
            } 
            catch (e) { console.log(e); }
        }
    }
}