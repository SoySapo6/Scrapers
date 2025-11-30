/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import fetch from "node-fetch";
import {
    FormData,
    Blob
} from "formdata-node";
import { fileTypeFromBuffer } from "file-type";

export async function uploadPomf2(buffer) {
        try {
            const {
                ext,
                mime
            } = await fileTypeFromBuffer(buffer) || {};
            let form = new FormData();
            const blob = new Blob([buffer.toArrayBuffer()], {
                type: mime
            });
            form.append('files[]', blob, 'tmp.' + ext);
            let res = await fetch('https://pomf2.lain.la/upload.php', {
                method: 'POST',
                body: form
            });
            let json = await res.json();
            if (!json.success) throw json;
            return json;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }