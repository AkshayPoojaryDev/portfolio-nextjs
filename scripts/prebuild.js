const fs = require('fs');
const path = require('path');

async function main() {
  const dataPath = path.join(process.cwd(), 'data', 'portfolio.json');
  const examplePath = path.join(process.cwd(), 'data', 'portfolio.example.json');
  
  const url = process.env.PORTFOLIO_DATA_URL;
  
  if (url) {
    console.log('Downloading portfolio data from PORTFOLIO_DATA_URL...');
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.text();
      
      // Validate it's actual JSON before saving
      JSON.parse(data);
      
      fs.writeFileSync(dataPath, data);
      console.log('Successfully downloaded and saved portfolio.json');
    } catch (err) {
      console.error('Error downloading or parsing data:', err.message);
      process.exit(1);
    }
  } else {
    if (!fs.existsSync(dataPath)) {
      console.log('No PORTFOLIO_DATA_URL provided. Falling back to portfolio.example.json...');
      fs.copyFileSync(examplePath, dataPath);
    } else {
      console.log('Local portfolio.json found. Proceeding...');
    }
  }
}

main();
