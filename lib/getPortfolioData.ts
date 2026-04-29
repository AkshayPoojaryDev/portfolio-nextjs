import fs from 'fs'
import path from 'path'

const DATA_PATH = path.join(process.cwd(), 'data', 'portfolio.json')

// Read at request time — never compiled into client bundle
export function getPortfolioData() {
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'))
}
