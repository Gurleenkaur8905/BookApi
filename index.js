const { search1, search2, search3, googleapibook, dbooksbook, amazonbook } = require("./Functions.js");
const express = require("express");
const cors = require("cors");
const amazonScraper = require('amazon-buddy');
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.sendStatus(404);
});
app.get("/getinfo", (req, res) => {
    // getinfo();
})
app.get("/search", async (req, res) => {
    if (req.query.q) {
        try {
            // console.log("Entering");
            // let search_results = await search1(req.query.q);
            // // console.log("Results 1");
            // // console.log(search_results);
            // const result3 = await search3(req.query.q);
            // search_results.splice(0, 0, result3);
            // // console.log("Result 3 ");
            // // console.log(search_results);
            // const result2 = await search2(req.query.q);
            // // console.log(result2);
            // search_results = search_results.concat(result2);
            // console.log("Result2 concat ---> final result ");
            // // console.log(search_results);
            // res.json(search_results);
            console.log("Entering");
            let search_results = [];

            try {
                const result1 = await search1(req.query.q);
                if (result1) {
                    search_results = search_results.concat(result1);
                }
            } catch (error) {
                console.error("Error in search1:", error);
            }

            try {
                const result3 = await search3(req.query.q);
                if (result3) {
                    // search_results.push(result3);
                    search_results.splice(0, 0, result3);
                }
            } catch (error) {
                console.error("Error in search3:", error);
            }

            try {
                const result2 = await search2(req.query.q);
                if (result2 && Array.isArray(result2)) {
                    search_results = search_results.concat(result2);
                }
            } catch (error) {
                console.error("Error in search2:", error);
            }

            console.log("Result2 concat ---> final result ");
            console.log(search_results);
            res.json(search_results);


        }
        catch (error) {
            console.log(error);
        }
    }
    // res.json({ "type": "check" });

})
app.get("/book", async (req, res) => {
    let result = [];
    if (req.query.type == "googleapi") {
        result = await googleapibook(req.query.q);
        author = result?.authors?.join(' ');
        await fetch(`https://ddgapi.abhicracker.com/?q=${result.title} by ${author} `).then(res => res.json()).then(data => {
            result.downloadLinks = data;
        });

        try {
            const products = await amazonScraper.products({ keyword: result.title, number: 10, country: 'IN' });
            const productUrl = products?.result?.[0]?.url;
            if (productUrl) {
                result.amazonLink = productUrl;
            } else {
                result.amazonLink = null;
            }
        } catch (error) {
            console.log(error);
        }
        // let array = await pdfLink(result.title + " filetype pdf doctype pdf");
        res.json(result);
    }
    else if (req.query.type == "dbooks") {
        try {
            result = await dbooksbook(req.query.q);
            author = result?.authors;
            // let array = await pdfLink(result.title + " filetype pdf doctype pdf");
            await fetch(`https://ddgapi.abhicracker.com/?q=${result.title}by ${author} `).then(res => res.json()).then(data => {

                result.downloadLinks = data;
            });
            result.downloadLinks.splice(0, 0, result.download);
            try {
                const products = await amazonScraper.products({ keyword: result.title, number: 10, country: 'IN' });
                const productUrl = products?.result?.[0]?.url;
                if (productUrl) {
                    result.amazonLink = productUrl;
                } else {
                    result.amazonLink = null;
                }
            } catch (error) {
                console.log(error);
            }
            res.json(result);
        }
        catch (error) {
            console.log("Error in Dbook")
        }
    }
    else if (req.query.type == "amazon") {
        result = await amazonbook(req.query.q);
        author = result?.authors?.[0]?.author;
        await fetch(`https://ddgapi.abhicracker.com/?q=${result.title} by ${author} `).then(res => res.json()).then(data => {

            result.downloadLinks = data;
        });
        result.amazonLink = result.url;
        res.json(result);
    }

})

app.listen(8080, () => {
    console.log("http://localhost:8080");
});


