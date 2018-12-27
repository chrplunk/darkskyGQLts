import { ResolverMap } from "../../types/graphqltypes";
import { fakeweather } from "./fakeweather";

export const resolvers: ResolverMap = {
    Query: {
        
        weatherQuery: async (_: any, args: any, context: any) => {
            return fakeweather[0]
        }
    }
}