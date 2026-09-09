const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function benchmark() {
  const data = {};

  try {
    // 1. Choose Your Battery (Battery Finder)
    let res = await axios.get('https://www.amaron.com/choose-your-battery');
    let $ = cheerio.load(res.data);
    data.batteryFinder = {
      inputs: $('select, input').map((i, el) => ({
        name: $(el).attr('name'),
        type: $(el).attr('type') || 'select',
        id: $(el).attr('id')
      })).get(),
      notes: "Looks for dropdowns for Make, Model, Variant, Fuel Type"
    };

    // 2. Product Page Template
    res = await axios.get('https://www.amaron.com/passenger-vehicles');
    $ = cheerio.load(res.data);
    data.productPage = {
      specLabels: $('.spec-label, th').map((i, el) => $(el).text().trim()).get().filter(x => x),
      badges: $('.badge, .premium-tag').map((i, el) => $(el).text().trim()).get(),
      layout: "Checks what tables/specs are displayed"
    };

    // 3. Pitstop Locator
    res = await axios.get('https://www.amaron.com/pitstoplocator');
    $ = cheerio.load(res.data);
    data.dealerLocator = {
      inputs: $('input, select').map((i, el) => ({
        name: $(el).attr('name'),
        placeholder: $(el).attr('placeholder')
      })).get(),
    };

    // 4. Warranty Registration
    res = await axios.get('https://www.amaron.com/warranty-registration');
    $ = cheerio.load(res.data);
    data.warranty = {
      inputs: $('input, select').map((i, el) => ({
        name: $(el).attr('name'),
        type: $(el).attr('type')
      })).get(),
    };

    fs.writeFileSync('amaron_benchmark.json', JSON.stringify(data, null, 2));
    console.log("Benchmark script finished.");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

benchmark();
