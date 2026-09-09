const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function scrapeData() {
  const data = {
    brand: { colors: [], fonts: [], logos: [], taglines: [] },
    companyInfo: { about: "", mission: "", usps: [] },
    productCatalog: [],
    fitmentData: [],
    applications: [],
    dealers: { structure: "", requirements: "" },
    support: { contact: {}, faqs: [], warranty: "" },
    siteStructure: { nav: [], social: [], meta: [] }
  };

  try {
    // 1. Homepage
    console.log("Scraping homepage...");
    let res = await axios.get('https://goodwinbatteries.in/');
    let $ = cheerio.load(res.data);
    
    // Extract Logo
    data.brand.logos.push($("link[rel='icon']").attr("href"));
    $('img').each((i, el) => {
      const src = $(el).attr('src');
      if (src && src.includes('logo')) {
        data.brand.logos.push(src);
      }
    });
    
    // Extract Colors from inline CSS
    const cssText = $('style').text();
    const colorMatch = cssText.match(/--accent-color:\s*(#[0-9a-fA-F]+)/);
    if (colorMatch) data.brand.colors.push(colorMatch[1]);
    
    // Site Structure Nav
    $('#menu-main-menu a').each((i, el) => {
      data.siteStructure.nav.push({ text: $(el).text().trim(), url: $(el).attr('href') });
    });
    
    // Taglines
    $('h1, h2, h3').each((i, el) => {
      const text = $(el).text().trim();
      if (text.length > 10 && text.length < 100 && !data.brand.taglines.includes(text)) {
        data.brand.taglines.push(text);
      }
    });

    // 2. About Us
    console.log("Scraping About...");
    res = await axios.get('https://goodwinbatteries.in/about-us/');
    $ = cheerio.load(res.data);
    data.companyInfo.about = $('p').map((i, el) => $(el).text().trim()).get().filter(t => t.length > 50).join('\n\n');

    // 3. Products
    const productPages = [
      'https://goodwinbatteries.in/two-wheeler-battery/',
      'https://goodwinbatteries.in/ups-battery/',
      'https://goodwinbatteries.in/agro-battery/',
      'https://goodwinbatteries.in/toy-battery/',
      'https://goodwinbatteries.in/torch-battery/'
    ];

    for (let page of productPages) {
      console.log("Scraping " + page + "...");
      try {
        res = await axios.get(page);
        $ = cheerio.load(res.data);
        
        $('table tr').each((i, el) => {
          if (i === 0) return; // Skip header
          const cols = $(el).find('td').map((j, td) => $(td).text().trim()).get();
          if (cols.length > 0) {
            data.productCatalog.push({
              source: page,
              model: cols[0],
              specs: cols.slice(1).join(' | ')
            });
          }
        });
        
        // Also capture product images
        $('img').each((i, el) => {
           const src = $(el).attr('src');
           if (src && !src.includes('logo') && !src.includes('icon') && src.includes('wp-content/uploads')) {
              data.productCatalog.push({ source: page, image: src });
           }
        });
      } catch (e) {
        console.error("Error on " + page + ": " + e.message);
      }
    }

    // 4. Contact
    console.log("Scraping Contact...");
    res = await axios.get('https://goodwinbatteries.in/contact-us/');
    $ = cheerio.load(res.data);
    data.support.contact.raw = $('p, h4').map((i, el) => $(el).text().trim()).get().filter(t => t.length > 0);

    // Save output
    fs.writeFileSync('goodwin_data_extraction.json', JSON.stringify(data, null, 2));
    console.log("Scraping finished!");

  } catch (error) {
    console.error("Scraping failed:", error.message);
  }
}

scrapeData();
