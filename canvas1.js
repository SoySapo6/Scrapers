import ling from 'knights-canvas'
import fs from 'fs'

async function welcome1(a, b, c, d, e, f) {
const imeg = await new ling.Welcome()
    .setUsername(a)
    .setGuildName(b)
    .setGuildIcon(c)
    .setMemberCount(d)
    .setAvatar(e)
    .setBackground(f)
    .toAttachment();
    
 let dat = imeg.toBuffer();
  await fs.writeFileSync('./src/welcome1.png', dat)
}

async function goodbye1(g, h, i, j, k, l) {
const image = await new ling.Goodbye()
    .setUsername(g)
    .setGuildName(h)
    .setGuildIcon(i)
    .setMemberCount(j)
    .setAvatar(k)
    .setBackground(l)
    .toAttachment();
  
 let tad = image.toBuffer();
  await fs.writeFileSync('./src/goodbye1.png', tad)
}

export {
welcome1,
goodbye1
}