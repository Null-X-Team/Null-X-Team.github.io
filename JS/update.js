const fs = require('fs');
const path = require('path');

const repos = ['gfiles', 'gfiles2', 'gfiles3', 'gfiles4', 'gfiles5'];
const owner = 'DeclineOptionalCookies';
const MAIN_JS = path.join('JS', 'main.js');

function formatTitle(name) {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

async function fetchRepoContents() {
  const allEntries = [];

  for (const repo of repos) {
    try {
      const headers = { 'User-Agent': 'Null-X-Sync-Bot' };
      if (process.env.GITHUB_TOKEN) {
        headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
      }

      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents`,
        { headers }
      );

      if (!response.ok) {
        console.error(`Failed to fetch ${repo}: ${response.status} ${response.statusText}`);
        continue;
      }

      const files = await response.json();
      if (!Array.isArray(files)) {
        console.error(`Unexpected response for ${repo}`);
        continue;
      }

      for (const file of files) {
        if (file.type === 'dir' && !file.name.startsWith('.')) {
          const folderName = file.name;
          const formattedTitle = formatTitle(folderName);
          allEntries.push({
            id: folderName,
            title: formattedTitle,
            url: `https://${owner.toLowerCase()}.github.io/${repo}/${folderName}/index.html`,
            desc: `Play ${formattedTitle} online in your browser.`,
            popular: true,
          });
        }
      }
      console.log(`Fetched ${repo}: folders so far = ${allEntries.length}`);
    } catch (error) {
      console.error(`Error fetching from ${repo}:`, error.message || error);
    }
  }

  return allEntries;
}

function entriesToJsArray(entries) {
  return entries
    .map((e) => {
      const id = String(e.id).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      const title = String(e.title).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      const url = String(e.url).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      const desc = String(e.desc).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      return `  { id: "${id}", title: "${title}", url: "${url}", desc: "${desc}", popular: true }`;
    })
    .join(',\n');
}

async function updateMainJs() {
  if (!fs.existsSync(MAIN_JS)) {
    throw new Error(`Cannot find ${MAIN_JS}`);
  }

  const entries = await fetchRepoContents();
  if (!entries.length) {
    console.log('No game folders found — leaving JS/main.js unchanged.');
    return;
  }

  const seen = new Set();
  const unique = [];
  for (const e of entries) {
    const key = e.id.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(e);
  }

  let content = fs.readFileSync(MAIN_JS, 'utf8');

  const arrayBody = entriesToJsArray(unique);
  const newBlock = `let _0xData = [\n${arrayBody}\n];`;

  const replaced = content.replace(
    /let\s+_0xData\s*=\s*\[[\s\S]*?\];/,
    newBlock
  );

  if (replaced === content) {
    const replaced2 = content.replace(
      /(?:let|var|const)\s+_0xData\s*=\s*\[[\s\S]*?\];/,
      newBlock
    );
    if (replaced2 === content) {
      throw new Error('Could not find let _0xData = [...] in JS/main.js');
    }
    content = replaced2;
  } else {
    content = replaced;
  }

  fs.writeFileSync(MAIN_JS, content, 'utf8');
  console.log(`JS/main.js updated successfully with ${unique.length} games.`);
}

updateMainJs().catch((err) => {
  console.error(err);
  process.exit(1);
});
