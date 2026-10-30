import { spawn } from 'node:child_process';
import { copyFile, access, readdir, mkdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cli = path.join(projectRoot, 'node_modules', 'vinext', 'dist', 'cli.js');
await access(cli);
const exitCode = await new Promise((resolve, reject) => {
  const build = spawn(process.execPath, [cli, 'build'], { cwd: projectRoot, stdio: 'inherit' });
  build.on('error', reject);
  build.on('close', code => resolve(code ?? 1));
});
if (exitCode !== 0) process.exit(exitCode);
const outputRoot = path.join(projectRoot, 'dist', 'client');
// Export uses slashless routes to avoid Vinext beta's prerender redirect issue.
// Arrange each route as a directory index for ordinary static web hosting.
async function createDirectoryIndexes(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) { await createDirectoryIndexes(file); continue; }
    if (!entry.isFile() || !entry.name.endsWith('.html') || entry.name === 'index.html') continue;
    const routeDirectory = path.join(directory, entry.name.slice(0, -5));
    await mkdir(routeDirectory, { recursive: true });
    await rename(file, path.join(routeDirectory, 'index.html'));
  }
}
await createDirectoryIndexes(outputRoot);
await copyFile(path.join(outputRoot, '404', 'index.html'), path.join(outputRoot, '404.html'));
await access(path.join(outputRoot, 'index.html'));
console.log('\nStatic website ready: dist/client/\nUpload its contents to the website root.');
