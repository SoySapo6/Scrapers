/* jangan hapus wm bang 
script by rijalganzz
base? tio nightmare 
whatsapp 34604216991 ( rijalganzz)
*/

"use strict";

import axios from 'axios';

const baseurl = "https://hercai.onrender.com/v2/hercai";

/**
 * @typedef {Class} Hercai
 * @see {Hercai}
 * @param {Class} Hercai
 * @example const { Hercai } = require("hercai");
 * @example import { Hercai } from "hercai";
 * @type {Class}
 * @class
 */
class Hercai {
    constructor() {}

    /**
     * The Question You Want to Ask Artificial Intelligence.
     * @param {string} model "v2"
     * @param {string} model "beta"
     * @param {string} model "v3-beta" (GPT-4)
     * @param {string} content The Question You Want to Ask Artificial Intelligence.
     * @example client.question({model:"v2",content:"how are you?"})
     * @type {string} The Question You Want to Ask Artificial Intelligence.
     * @returns {Hercai}
     * @async
     */
    async question({
        model = "v3",
        content
    }) {
        if (!["v3" , "v3-32k" , "turbo" , "turbo-16k" , "gemini"].some(ind => model == ind)) model = "v3";
        if (!content || content == undefined || content == null) throw new Error("Please specify a question!");
        try {
            var api = await axios.get(`https://hercai.onrender.com/${model}/hercai?question=` + encodeURI(content), {
                headers: {
                    "content-type": "application/json",
                },
            })
            return api.data;
        } catch (err) {
            throw new Error("Error: " + err.message)
        }
    }

    /**
     * Tell Artificial Intelligence What You Want to Draw.
     * @param {string} model "v1" , "v2" , "v2-beta" , "v3" (DALL-E) , "lexica" , "prodia"
     * @param {string} prompt Tell Artificial Intelligence What You Want to Draw.
     * @example client.drawImage({model:"v1",prompt:"anime girl"})
     * @type {string} Tell Artificial Intelligence What You Want to Draw.
     * @returns {Hercai}
     * @async
     */
    async drawImage({
        model = "v3",
        prompt
    }) {
        if (!["v3" , "lexica" , "animefy", "raava", "shonin"].some(ind => model == ind)) model = "v3";
        if (!prompt || prompt == undefined || prompt == null) throw new Error("Please specify a prompt!");
        try {
            var api = await axios.get(`https://hercai.onrender.com/${model}/text2image` + "?prompt=" + encodeURI(prompt), {
                headers: {
                    "content-type": "application/json",
                },
            })
            return api.data;
        } catch (err) {
            throw new Error("Error: " + err.message)
        }
    }
}

export default Hercai;