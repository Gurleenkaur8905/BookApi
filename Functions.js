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






//serp -- for searching on google and for extracting pdfs if available
//google-book-search --> detials of all book but not link pdf
//dbooks--> for studies subject or category
//amazon-buddy --> for searching on amazon for paid books and the books which are not available freely

//Searching ---> book name , author name , thumbnail, api type
//Book --> pushblished, price, isbn , page,  rating , pending
