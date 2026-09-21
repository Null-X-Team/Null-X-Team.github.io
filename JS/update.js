const fs = require('fs');

// Repositories to check
const repos = ['gfiles', 'gfiles2', 'gfiles3', 'gfiles4', 'gfiles5'];
const owner = 'declineoptionalcookies';

async function fetchRepoContents() {
  const allEntries = [];

  for (const repo of repos) {
    try {
      // Fetch public repository file tree using GitHub API
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`);
      if (!response.ok) continue;

      const files = await response.json();

      // Filter for numbered directories (e.g., "1", "2")
      for (const file of files) {
        if (file.type === 'dir' && !isNaN(file.name)) {
          const id = file.name;
          allEntries.push({
            id: id,
            title: id,
            url: `https://${owner}.github.io/${repo}/${id}/index.html`,
            desc: `Play ${id} online in your browser.`,
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
  
  // Format as JavaScript array content
  const content = `const items = ${JSON.stringify(entries, null, 2)};\n\nmodule.exports = items;\n`;

  fs.writeFileSync('main.js', content, 'utf-8');
  console.log('main.js updated successfully!');
}

updateMainJs();
