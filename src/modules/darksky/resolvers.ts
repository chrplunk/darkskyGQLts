import { ResolverMap } from "../../types/graphqltypes";
//import { fakeweather } from "./fakeweather";

const fetch = require("node-fetch");

export const resolvers: ResolverMap = {
    Query: {
        
        weatherQuery: async (_: any, args: any, context: any) => {
            
            try {
                const darkskyurl = "https://api.darksky.net/forecast/"
                const darkskykey = "2f2275e2eb17536af6b1918e44dd63bf/" // put in .env later
                let latlong = "37.8267,-122.4233" //change later to args.latlong or something

                var options = { "url": darkskyurl + darkskykey + latlong }    
                
                console.log("******* The url to DarkSky is:" + options.url);
                const response = await fetch(options.url);
                const result = await response.json();
                            
                let mappedResult = {
                    timezone: result.timezone,
                    currentlyTime: result.currently.timezone,
                    currentlySummary: result.currently.summary,
                    currentlyHumidity: result.currently.humidity
                }
                
                console.log("timezone: " + mappedResult.timezone);
                console.log("current time: " + mappedResult.currentlyTime);
                console.log("current summary: " + mappedResult.currentlySummary);
                console.log("current humidity: " + mappedResult.currentlyHumidity);

                return mappedResult;
            } 
            catch (e) { console.log(e); }
        }
    }
}