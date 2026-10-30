import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../public/brand/', import.meta.url));
for (const variant of ['primary', 'reversed']) {
  const prefix = `${root}invest-logo-3d-${variant}`;
  await sharp(`${prefix}.svg`, { density: 300 }).trim({ threshold: 1 }).png().toFile(`${prefix}.png`);
  await sharp(`${prefix}.png`).webp({ quality: 95, alphaQuality: 100 }).toFile(`${prefix}.webp`);
}
for (const size of [32, 192, 512, 1024]) {
  await sharp(`${root}invest-icon-3d.svg`, { density: 640 }).resize(size, size).png().toFile(`${root}invest-icon-3d-${size}.png`);
}
