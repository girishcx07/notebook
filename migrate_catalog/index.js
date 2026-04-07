import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const rootDir = '/Users/girishchaudhari/tanstack-start-monorepo';
const workspaceFile = path.join(rootDir, 'pnpm-workspace.yaml');

// Load pnpm-workspace.yaml
const workspaceContent = fs.readFileSync(workspaceFile, 'utf8');
const workspaceData = yaml.load(workspaceContent);

if (!workspaceData.catalog) {
  workspaceData.catalog = {};
}

// Function to find all package.json files
function findPackageJsons(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    // skip node_modules, .git, turbo, migrate_catalog
    if (file === 'node_modules' || file === '.git' || file === '.turbo' || file === 'migrate_catalog') {
      continue;
    }
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      findPackageJsons(fullPath, fileList);
    } else if (file === 'package.json') {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const packageJsons = findPackageJsons(rootDir);

let modifiedCount = 0;

for (const pkgPath of packageJsons) {
  // don't process root package.json
  if (pkgPath === path.join(rootDir, 'package.json')) continue;

  const pkgContent = fs.readFileSync(pkgPath, 'utf8');
  let pkgData;
  try {
    pkgData = JSON.parse(pkgContent);
  } catch (e) {
    console.error(`Failed to parse ${pkgPath}`);
    continue;
  }

  let pkgModified = false;

  const depTypes = ['dependencies', 'devDependencies', 'peerDependencies'];
  for (const depType of depTypes) {
    if (!pkgData[depType]) continue;
    
    for (const [dep, version] of Object.entries(pkgData[depType])) {
      if (
        version.startsWith('workspace:') ||
        version.startsWith('catalog:') ||
        version.startsWith('catalog-') // future proofing
      ) {
        continue;
      }
      
      // We found a literal version! Add to catalog if not present, or if it differs (we'll just use the first we find or overwrite)
      if (!workspaceData.catalog[dep]) {
        console.log(`Adding ${dep}@${version} from ${pkgData.name || pkgPath} to workspace catalog.`);
        workspaceData.catalog[dep] = version;
      } else if (workspaceData.catalog[dep] !== version) {
        console.log(`Warning: Catalog already has ${dep}@${workspaceData.catalog[dep]} but ${pkgData.name} requested ${version}. Kept catalog version.`);
      }

      // Update package.json
      pkgData[depType][dep] = 'catalog:';
      pkgModified = true;
    }
  }

  if (pkgModified) {
    fs.writeFileSync(pkgPath, JSON.stringify(pkgData, null, 2) + '\n', 'utf8');
    modifiedCount++;
    console.log(`Updated ${pkgPath}`);
  }
}

// Write back pnpm-workspace.yaml
// We use dump but it might remove empty lines or change formatting a bit. 
// However, since it's just a config, it's fine. We can format it later or let prettier do it if setup.
const newYaml = yaml.dump(workspaceData, {
  styles: {
    '!!null': 'empty' // dump null as empty
  },
  lineWidth: -1
});

fs.writeFileSync(workspaceFile, newYaml, 'utf8');
console.log(`Updated pnpm-workspace.yaml, inserted new dependencies into catalog.`);
console.log(`Process complete. Modified ${modifiedCount} package.json files.`);
