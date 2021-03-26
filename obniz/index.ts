import * as dotenv from "dotenv";
import Obniz from 'obniz';
dotenv.config()

const obniz = new Obniz(process.env.OBNIZ_ID || '')

// obniz.onconnect = async () => {
//     obniz.io2?.output(false)
//     obniz.io3?.drive('5v')
//     obniz.io3?.output(true)
//     obniz.io0?.pull('5v')
//     obniz.io0?.input(bool => {
//         if(bool) {
//             console.log('on')
//         } else {
//             console.log('off')
//         }
//     })
// };
obniz.onconnect = async () => {
    obniz.io2?.output(false)
    obniz.io3?.drive('5v')
    obniz.io3?.output(true)
    obniz.ad0?.start(num => {
        console.log(num)
    })
};
