import request from "request-promise";
import cheerio from "cheerio";
import { stringify } from "querystring";
// cheerio is like the JQuery injection

async function main() {
  const result = await request.get(
    "https://www.codingwithstefan.com/table-example/"
  );
  const $ = cheerio.load(result);
  //   $("body > table > tbody > tr > td").each((i, e) => {
  //     console.log($(e).text());
  //   });
  const scrappedrows: rowcontent[] = [];
  interface rowcontent {
    company: string;
    contact: string;
    country: string;
  }
  $("body > table > tbody > tr").each((i, e) => {
    // Skipping the first row
    if (i === 0) return true;
    // Need to reput everything again in the cheerio selector for it to work
    // Finding all tds of the first column
    const tds = $(e).find("td");
    const company = $(tds[0]).text();
    const contact = $(tds[1]).text();
    const country = $(tds[2]).text();
    const scrappedrow = { company, contact, country };
    scrappedrows.push(scrappedrow);
  });
  console.log(scrappedrows);
}

main();
