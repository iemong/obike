import * as dotenv from "dotenv";
import Obniz from 'obniz';
dotenv.config()

const obniz = new Obniz(process.env.OBNIZ_ID || '')

let on = false
let counter = 0

obniz.onconnect = async () => {
    obniz.io4?.drive('5v')
    obniz.io4?.output(true)
    obniz.io2?.output(false)
    obniz.io1?.output(false)
    obniz.ad0?.start(num => {
        if(num > 0.01) {
            if(!on) {
                counter++
                on = true
            }
        } else {
            on = false
        }
    })
};

setInterval(() => {
    console.log(counter / 3)
    counter = 0
}, 3000)
