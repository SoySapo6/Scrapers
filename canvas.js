/* jangan hapus wm bang 
script by rijalganzz
base? tio nightmare 
whatsapp 34604216991 ( rijalganzz)
*/
import { loadImage, createCanvas, registerFont } from 'canvas'
import path from 'path'

export async function welcome(pp, wm) {

   // Load background and profile picture
   const bg = await loadImage('https://i.ibb.co/7YzD4sP/image.jpg');
   const profilePic = await loadImage(pp);

   // Register font
   registerFont(path.join('src/font/maxim.ttf'), { family: 'Maxim' });

   // Create canvas
   const canvas = createCanvas(bg.width, bg.height);
   const ctxCanvas = canvas.getContext('2d');

   // Draw background
   ctxCanvas.drawImage(bg, 0, 0, bg.width, bg.height);

   // Draw profile picture (centered and circular)
   const centerX = canvas.width / 4.5;
   const centerY = canvas.height / 2.02;
   const radius = canvas.width / 7.5; 

   ctxCanvas.save();
   ctxCanvas.beginPath();
   ctxCanvas.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
   ctxCanvas.clip();
   ctxCanvas.drawImage(profilePic, centerX - radius, centerY - radius, radius * 2, radius * 2);
   ctxCanvas.restore();

   ctxCanvas.font = '15px "Maxim"';
   ctxCanvas.fillStyle = '#FFFFFF'; 
   ctxCanvas.textAlign = 'left';
   ctxCanvas.fillText(wm, centerX - radius + 318, centerY + 72);
let result = canvas.toBuffer('image/jpeg')
return result
}

export async function leave(pp, wm) {
   
   // Load background and profile picture
   const bg = await loadImage('https://i.ibb.co/hRnrY40/image.jpg');
   const profilePic = await loadImage(pp);

   // Register font
   registerFont(path.join('src/font/maxim.ttf'), { family: 'Maxim' });

   // Create canvas
   const canvas = createCanvas(bg.width, bg.height);
   const ctxCanvas = canvas.getContext('2d');

   // Draw background
   ctxCanvas.drawImage(bg, 0, 0, bg.width, bg.height);

   // Draw profile picture (centered and circular)
   const centerX = canvas.width / 4.5;
   const centerY = canvas.height / 2.02;
   const radius = canvas.width / 7.5; 

   ctxCanvas.save();
   ctxCanvas.beginPath();
   ctxCanvas.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
   ctxCanvas.clip();
   ctxCanvas.drawImage(profilePic, centerX - radius, centerY - radius, radius * 2, radius * 2);
   ctxCanvas.restore();

   ctxCanvas.font = '15px "Maxim"';
   ctxCanvas.fillStyle = '#FFFFFF'; 
   ctxCanvas.textAlign = 'left';
   ctxCanvas.fillText(wm, centerX - radius + 318, centerY + 72);

  let result = canvas.toBuffer('image/jpeg')
  return result
}