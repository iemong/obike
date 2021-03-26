import Obniz from "obniz";

const obniz = new Obniz("");
obniz.onconnect = async () => {
    obniz.io2?.output(false)
    obniz.io3?.output(true)
    obniz.ad0?.start(num => {
        console.log(`changed to ${num}v`)
    })
};
