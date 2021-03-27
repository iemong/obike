import * as dotenv from "dotenv";
import Obniz from 'obniz';
dotenv.config()

const obniz = new Obniz(process.env.OBNIZ_ID || '')

obniz.onconnect = async () => {
    obniz.io3?.drive('5v')
    obniz.io3?.output(true)
    obniz.io2?.output(false)
    obniz.ad0?.start(num => {
        if(num < 2) {
            console.log(num)
        }
    })
};
