const fs = require('fs');

const repos = ['gfiles', 'gfiles2', 'gfiles3', 'gfiles4', 'gfiles5'];
const owner = 'declineoptionalcookies';

// Helper function to turn folder names like "retro-bowl" into "Retro Bowl"
function formatTitle(name) {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

async function fetchRepoContents() {
  const allEntries = [];

  for (const repo of repos) {
    try {
      const headers = { 'User-Agent': 'node.js' };
      if (process.env.GITHUB_TOKEN) {
        headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
      }

      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`, { headers });
      if (!response.ok) {
        console.error(`Failed to fetch ${repo}: ${response.statusText}`);
        continue;
      }

      const files = await response.json();

      for (const file of files) {
        // Accept ANY folder, skipping hidden directories (like .github)
        if (file.type === 'dir' && !file.name.startsWith('.')) {
          const folderName = file.name;
          const formattedTitle = formatTitle(folderName);

          allEntries.push({
            id: folderName,
            title: formattedTitle,
            url: `https://${owner}.github.io/${repo}/${folderName}/index.html`,
            desc: `Play ${formattedTitle} online in your browser.`,
            popular: true
          });
        }
      }
    } catch (error) {
      console.error(`Error fetching from ${repo}:`, error);
    }
  }

  return allEntries;
}

async function updateMainJs() {
  const entries = await fetchRepoContents();
  
  const content = `const items = ${JSON.stringify(entries, null, 2)};\n\nmodule.exports = items;\n`;

  fs.writeFileSync('main.js', content, 'utf-8');
  console.log(`main.js updated successfully with ${entries.length} items!`);
}

updateMainJs();
