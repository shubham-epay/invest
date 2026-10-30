import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../public/brand/', import.meta.url));
for (const variant of ['primary', 'reversed', 'mono-dark', 'mono-white']) {
  await sharp(`${root}invest-logo-${variant}.svg`, { density: 300 }).png().toFile(`${root}invest-logo-${variant}.png`);
}
for (const size of [32, 192, 512, 1024]) {
  await sharp(`${root}invest-icon.svg`, { density: 600 }).resize(size, size).png().toFile(`${root}invest-icon-${size}.png`);
}
