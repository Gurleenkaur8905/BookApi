const books = require('google-books-search');
const { googleapi, dbooks, amazon } = require('./utils')
const amazonScraper = require('amazon-buddy');
// const serp = require("serp");
// const axios = require('axios');

exports.search1 = (req) => {
    return new Promise(async (resolve, reject) => {
        books.search(req, async (error, results) => {
            if (!error) {
                try {
                    const res = await googleapi(results);

                    // console.log(res);
                    resolve(res); // Resolve the Promise with the result
                } catch (error) {
                    console.log(error);
                    reject(error); // Reject the Promise if an error occurs
                }
            } else {
                console.log(error);
                reject(error); // Reject the Promise if an error occurs
            }
        });
    });
}
exports.search2 = async (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch("https://www.dbooks.org/api/search/" + req);
            const json = await response.json();
            // console.log(json);
            if (json.status === "ok") {

                // console.log(json);
                resolve(dbooks(json));
            } else {
                reject("Not found"); // Reject the promise with an error message
            }
        } catch (error) {
            reject(error); // Reject the promise with the error caught during the API call
        }
    });
};

exports.search3 = async (req) => {

    // return new Promise(async (resolve, reject) => {
    try {
        // Collect 50 products from a keyword 'xbox one' from Amazon.NL
        const products = await amazonScraper.products({ keyword: req + ' book', number: 10, country: 'IN' });
        // console.log(products)
        // console.log(amazon(products));
        return amazon(products);

        // // Get single product details by using ASIN id
        // const product_by_asin = await amazonScraper.asin({ asin: '9352314166' });
        // console.log(product_by_asin.result[0])

        // // // Get categories from amazon.COM.AU
        // const categories_AU = await amazonScraper.categories({ categories: "stripbooks", country: 'AU' });
        // console.log(categories_AU)

        // // Get categories from amazon.CN
        // const categories_CN = await amazonScraper.categories({ country: 'CN' });
    } catch (error) {
        console.log(error);
    }

    // });

}

exports.googleapibook = (req) => {
    return new Promise(async (resolve, reject) => {
        books.lookup(req, async (error, results) => {
            if (!error) {
                try {
                    console.log(results);
                    const res = await results;
                    // console.log(res);
                    resolve(res); // Resolve the Promise with the result
                } catch (error) {
                    console.log(error);
                    reject(error); // Reject the Promise if an error occurs
                }
            } else {
                console.log(error);
                reject(error); // Reject the Promise if an error occurs
            }
        });
    });
}
exports.dbooksbook = async (req) => {
    return new Promise(async (resolve, reject) => {
        try {

            const response = await fetch("https://www.dbooks.org/api/book/" + req.replace(/[a-zA-Z]/g, ''));
            // console.log(response);
            const json = await response.json();
            // console.log(json);
            // if (json.status === "ok") {

            // console.log(dbooks(json));
            // console.log(json)
            resolve(json);
            // } else {
            //     reject("Not found"); // Reject the promise with an error message
            // }
        } catch (error) {
            reject(error); // Reject the promise with the error caught during the API call
        }
    });
};

exports.amazonbook = async (req) => {

    // return new Promise(async (resolve, reject) => {
    try {
        // Collect 50 products from a keyword 'xbox one' from Amazon.NL
        // const products = await amazonScraper.products({ keyword: req + ' book', number: 10, country: 'IN' });
        // // console.log(products)
        // // console.log(amazon(products));
        // return amazon(products);

        // // Get single product details by using ASIN id
        //'9352314166'
        const product_by_asin = await amazonScraper.asin({ asin: req });
        return product_by_asin.result[0]

        // // // Get categories from amazon.COM.AU
        // const categories_AU = await amazonScraper.categories({ categories: "stripbooks", country: 'AU' });
        // console.log(categories_AU)

        // // Get categories from amazon.CN
        // const categories_CN = await amazonScraper.categories({ country: 'CN' });
    } catch (error) {
        console.log(error);
    }

    // });

}


// exports.pdfLink = async (req) => {
//     var options = {
//         host: "google.fr",
//         qs: {
//             q: req,
//             filter: 0,
//             pws: 0
//         },
//         num: 100
//     };
//     console.log("step 1");

//     const links = await serp.search(options);
//     var arr = [];
//     links.forEach(element => {
//         if (element.url.endsWith(".pdf")) {
//             arr.push(element.url);
//         }
//     });

//     console.log("step 2");

//     if (Array.isArray(arr) && arr.length === 0) {
//         try {
//             const products = await amazonScraper.products({ keyword: req, number: 10, country: 'IN' });
//             const productUrl = products?.result?.[0]?.url;

//             if (productUrl) {
//                 // console.log(productUrl);
//                 return productUrl;
//             } else {
//                 return "Default URL";
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     return arr;
// let query = req.split(" ").slice(0, -4);
// // let arr2 = [];

// console.log("step 3");
// // Use Promise.all() and map() to perform HEAD requests in parallel
// const validatedLinks = await axios.all(
//     arr.map(async (pdfLink) => {
//         let linkName = pdfLink.toLowerCase();
//         if (query.some(word => linkName.includes(word.toLowerCase()))) {
//             try {
//                 const response = await axios.head(pdfLink);
//                 if (response.status >= 200 && response.status < 300) {
//                     return pdfLink; // Resolves with the valid link
//                 }
//             } catch (error) {
//                 // Handle specific errors if needed
//             }
//         }
//         return null; // Resolves with null for invalid links
//     })
// );

// // Filter out null values (invalid links) using Array.filter()
// const arr2 = validatedLinks.filter(link => link !== null);

// console.log("Valid PDF Links:", arr2);
// return arr2;
// };



// googlesearch("Engineering mathematics filetype pdf doctype pdf");




//serp -- for searching on google and for extracting pdfs if available
//google-book-search --> detials of all book but not link pdf
//dbooks--> for studies subject or category
//amazon-buddy --> for searching on amazon for paid books and the books which are not available freely

//Searching ---> book name , author name , thumbnail, api type
//one Book --> pushblished, price, isbn , page,  rating , pending