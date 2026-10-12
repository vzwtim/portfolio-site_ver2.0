// Only composite reviewed editor face regions; keep documentary backgrounds original.
// Usage: node scripts/composite-privacy-edits.mjs /path/to/edit-inputs.json [output-directory]
// Input: [{file, source, generated}]; sources must be untouched originals.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const inputs = JSON.parse(await fs.readFile(process.argv[2], 'utf8'));
const regions = JSON.parse(await fs.readFile(new URL('./privacy-face-regions.json', import.meta.url), 'utf8'));
const outputDirectory = process.argv[3] || 'public/images';
function insidePolygon(x, y, vertices) {
  let inside = false;
  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    const [xi, yi] = vertices[i], [xj, yj] = vertices[j];
    if (((yi > y) !== (yj > y)) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
for (const input of inputs) {
  const config = regions[input.file];
  if (!config) throw new Error('Unreviewed image: ' + input.file);
  const source = await sharp(input.source).rotate().resize({width:2048,height:2048,fit:'inside',withoutEnlargement:true}).png().toBuffer();
  const {width,height} = await sharp(source).metadata();
  const editor = await sharp(input.generated).resize(width,height).ensureAlpha().raw().toBuffer();
  const alpha = Buffer.alloc(width * height);
  config.faces.forEach(([cx,cy,rw,rh],index) => {
    if (index + 1 === config.preserveFace) return;
    const polygon = config.polygons?.[index + 1];
    const rx = rw * width * .7, ry = rh * height * .7;
    const xmin = polygon ? Math.min(...polygon.map(p => p[0])) * width : cx * width - rx;
    const xmax = polygon ? Math.max(...polygon.map(p => p[0])) * width : cx * width + rx;
    const ymin = polygon ? Math.min(...polygon.map(p => p[1])) * height : cy * height - ry;
    const ymax = polygon ? Math.max(...polygon.map(p => p[1])) * height : cy * height + ry;
    for (let y=Math.max(0,Math.floor(ymin));y<Math.min(height,Math.ceil(ymax));y++) {
      for (let x=Math.max(0,Math.floor(xmin));x<Math.min(width,Math.ceil(xmax));x++) {
        const distance = Math.sqrt(((x - cx * width) / rx) ** 2 + ((y - cy * height) / ry) ** 2);
        const opacity = polygon ? (insidePolygon(x/width,y/height,polygon) ? 255 : 0) : Math.round(255*Math.min(1,Math.max(0,(1-distance)/.12)));
        alpha[y * width + x] = Math.max(alpha[y * width + x], opacity);
      }
    }
  });
  for (let i=0;i<alpha.length;i++) editor[i*4+3] = alpha[i];
  const overlay = await sharp(editor,{raw:{width,height,channels:4}}).png().toBuffer();
  const composite = await sharp(source).composite([{input:overlay}]).png().toBuffer();
  if (config.preserveFace) {
    const [cx,cy,rw,rh] = config.faces[config.preserveFace-1];
    const crop = {left:Math.max(0,Math.floor((cx-rw*.25)*width)),top:Math.max(0,Math.floor((cy-rh*.25)*height)),width:Math.max(1,Math.floor(rw*.5*width)),height:Math.max(1,Math.floor(rh*.5*height))};
    const before = await sharp(source).extract(crop).removeAlpha().raw().toBuffer();
    const after = await sharp(composite).extract(crop).removeAlpha().raw().toBuffer();
    if (!before.equals(after)) throw new Error('Exempt face changed: '+input.file);
  }
  const destination = path.join(outputDirectory,input.file);
  await fs.mkdir(path.dirname(destination),{recursive:true});
  const versioned = destination.replace(/\.[^.]+$/,'-private.webp');
  await sharp(composite).webp({quality:90}).toFile(versioned);
  if (/\.png$/i.test(destination)) await sharp(composite).png().toFile(destination);
  else await sharp(composite).jpeg({quality:90}).toFile(destination);
  console.log(JSON.stringify({file:input.file,label:config.label,preserveFace:config.preserveFace,versioned}));
}
