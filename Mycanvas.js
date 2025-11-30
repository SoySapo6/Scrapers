import https from 'https'
import fs from 'fs'

async function canvas(text, pp, salam) {

// All these values are dynamic
let data = {
    "bi": "https://source.unsplash.com/n2XqPm7Bqhk/1280x720",
    "h": "720",
    "w": "1280",
    "a.tp": "rect",
    "a.x": "738",
    "a.y": "457",
    "a.w": "980",
    "a.h": "480",
    "a.c": "#ffffff",
    "a.sdw": "2 0 0 rgb(0,0,0)",
    "a.rx": "45",
    "a.ry": "45",
    "b.tp": "rect",
    "b.ox": "right",
    "b.x": "1228",
    "b.y": "580",
    "b.w": "976",
    "b.h": "12",
    "b.c": "#000",
    "b.a": "0",
    "c.tp": "textbox",
    "c.x": "735",
    "c.y": "296",
    "c.w": "663",
    "c.h": "167",
    "c.c": "#000000",
    "c.a": "0",
    "c.t": text,
    "c.ta": "center",
    "c.fs": "33",
    "c.fw": "400",
    "c.ff": "Duru Sans",
    "c.oy": "top",
    "c.maxHeight": "183",
    "c.padding": "20",
    "d.tp": "textbox",
    "d.x": "738",
    "d.y": "645",
    "d.w": "640",
    "d.h": "68",
    "d.c": "#000000",
    "d.sc": "15",
    "d.t": "open",
    "d.ta": "center",
    "d.fs": "60",
    "d.fw": "400",
    "d.ff": "Alegreya SC",
    "d.maxHeight": "183",
    "d.padding": "20",
    "e.tp": "image",
    "e.x": "148",
    "e.y": "142",
    "e.w": "400",
    "e.h": "400",
    "e.sw": "1",
    "e.sx": "0.58",
    "e.sy": "0.58",
    "e.rx": "500",
    "e.ry": "500",
    "e.src": pp,
    "f.tp": "textbox",
    "f.x": "733",
    "f.y": "136",
    "f.w": "708",
    "f.h": "68",
    "f.c": "#ffff00",
    "f.bc": "transparent",
    "f.t": salam,
    "f.ta": "center",
    "f.fs": "60",
    "f.fw": "400",
    "f.ff": "Aclonica",
    "f.tbc": "transparent",
    "f.maxHeight": "183",
    "f.padding": "20"
} 

// Generate apiURL from data
let results = 'https://img.bruzu.com/?'+new URLSearchParams(data).toString();
return results

}

export {
canvas
}