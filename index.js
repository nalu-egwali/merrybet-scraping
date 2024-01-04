import puppeteer from "puppeteer";

const getQuotes = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();

  // On this new page:
  // - open the "http://quotes.toscrape.com/" website
  // - wait until the dom content is loaded (HTML is ready)
  /*await Promise.all([
    page.goto("https://www.merrybet.com/virtualFootballLeagueMode", {
      waitUntil: "domcontentloaded",
    }),
    page.waitForSelector("#clockView", { visible: true }),
  ]);
*/
  //await page.goto("https://www.merrybet.com/virtualFootballLeagueMode");

  await Promise.all([
    page.goto("https://www.merrybet.com/virtualFootballLeagueMode", {
      waitUntil: "domcontentloaded",
    }),
    page.waitForFrame(
      (frame) => frame.url().match("https://vflive-vs001.akamaized.net/vflm/desktop/index?clientid=371&lang=en&layout=Vflm2") || frame.name() == "myframe"
    ),
  ]);

  //const iframeSelector = 'iframe[class="StyledVirtual__Iframe-kkosrT dZYzpF"]';
  const iframeElementHandle = await page.$("#virtual-CF0c3SPp2R > div > div.StyledVirtual__IframeWrapper-bKnAA.dERtIZ > iframe");
  console.log(iframeElementHandle)
  //await iframeElementHandle.waitForSelector("#clockView", { visible: true });

  const iframe = iframeElementHandle.contentFrame();
  CurrentTime = await iframe.evaluate(() => {
    document.querySelector("#clockView");
  });



  // Get page data
  //const CurrentTime = await page.evaluate(() => {
    // Fetch the first element with class "quote"
    // const quote = document.querySelector("#clockView");

    // Fetch the sub-elements from the previously fetched quote element
    // Get the displayed text and return it (`.innerText`)
    //const text = quote.querySelector(".text").innerText;
    //const author = quote.querySelector(".author").innerText;

    //return quote;
 // });

  // Display the quotes
  console.log(CurrentTime);
};

// Start the scraping
getQuotes();
