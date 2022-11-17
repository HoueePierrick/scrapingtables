import request from "request-promise";
import cheerio from "cheerio";
import { stringify } from "querystring";

async function main() {
  const result = await request.get(
    "https://www.codingwithstefan.com/table-example/"
  );
  const $ = cheerio.load(result);
  const scrappedrows: random[] = [];
  interface random {
    [index: string]: any;
  }
  let tableheaders: any[] = [];
  // Getting the table headers and fetching them into an array
  $("body > table > tbody > tr").each((i, e) => {
    if (i === 0) {
      const ths = $(e).find("th");
      ths.each((i, e) => {
        tableheaders.push($(e).text().toLowerCase);
      });
      return true; // To avoid running the rest of the code on the first row (headers)
    }

    // Getting table datas
    const tds = $(e).find("td");
    let tablerow: random = {};
    tds.each((i, e) => {
      // Creating object properties based on the headers
      tablerow[tableheaders[i]] = $(e).text();
    });
    scrappedrows.push(tablerow);
  });
  console.log(scrappedrows);
}

main();
