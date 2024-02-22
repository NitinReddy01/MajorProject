import { CorsOptions } from "cors"

const origins = [
    'http://localhost:5173'
]

export const corsConfig:CorsOptions = {
    origin:(origin,callback)=>{
        if( !origin ||  origins.indexOf(origin) !==-1 ){
            callback(null,true);
        }else{
            callback(new Error('Blocked By CORS'));
        }
    },
    credentials:true
}