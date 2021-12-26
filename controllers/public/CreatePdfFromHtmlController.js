const puppeteer = require("puppeteer");
const generatePdfFunc = require("../../util/generatePdfFunc");

const CreatePdfFromHtmlController = async (req, res) => {
  const { id } = req.params;
  try {
    // let callback = function (pdf) {
    //   // do something with the PDF like send it as the response
    //   res.setHeader("Content-Type", "application/pdf");
    //   res.send(pdf);
    // };

    const puppeteerFunc = async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.goto(`${process.env.INVOICEURI}/${id}`, {
        waitUntil: "networkidle0",
      });

      const pdfGenerated = await page.pdf({
        displayHeaderFooter: false,
        printBackground: true,
        format: "a4",
      });

      //   await browser.close();
      return pdfGenerated;
    };
    await puppeteerFunc()
      .then(async (pdfGenerated) => {
        console.log("puppeteerFunc working");
        await res.setHeader("Content-Type", "application/pdf");
        await res.send(pdfGenerated);
      })
      .catch((e) => {
        console.log("puppeteerFunc not working");
        console.log(e.message, " err msg in pupeeterFunc");
        console.log(e, " err  in pupeeterFunc");
      })
      .finally(() => console.log("puppeteerFunc finally"));
  } catch (e) {
    console.log(e.message, " err- generatePdfFunc");
    res.status(500).send({ msg: "Server issue", type: "error" });
  }
};

module.exports = CreatePdfFromHtmlController;
