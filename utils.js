
exports.googleapi = async (req) => {
    var arr = [];
    req.forEach(element => {
        var temp = {};
        temp.title = element.title;
        temp.author = element.authors;
        temp.book_image = element.thumbnail;
        temp.language = element.language;
        temp._id = element.id;
        temp.type = "googleapi";
        arr.push(temp);
    });
    return arr;
}

exports.dbooks = async (req) => {
    var arr = [];
    req.books.forEach(element => {
        var temp = {};
        temp.title = element.title;
        temp.author = element.authors;
        temp.book_image = element.image;
        temp._id = element.id;
        temp.type = "dbooks";
        arr.push(temp);
    });
    return arr;
}
exports.amazon = async (req) => {
    var temp = {};
    temp.title = req.result[0].title;
    temp.book_image = req.result[0].thumbnail;
    temp._id = req.result[0].asin;
    temp.type = "amazon";
    return temp;
}

// function generateWordCombinations(queryArray) {
//     const combinations = [];
//     for (let i = 0; i < queryArray.length; i++) {
//         for (let j = i + 1; j < queryArray.length; j++) {
//             combinations.push(`${queryArray[i]} ${queryArray[j]}`);
//         }
//     }
//     return combinations;
// }

// async function checkpdf(pdfUrls, queryArray) {
//     const wordCombinations = generateWordCombinations(queryArray);
//     let matchingPdfs = [];

//     for (const pdfUrl of pdfUrls) {
//         try {
//             const response = await axios.get(pdfUrl, {
//                 responseType: 'arraybuffer'
//             });

//             const pdfData = response.data;
//             const pdfText = await extractTextFromPdf(pdfData);

//             // Check if any of the word combinations exist in the PDF text
//             if (wordCombinations.some(combination => pdfText.includes(combination))) {
//                 matchingPdfs.push(pdfUrl);
//             }
//         } catch (error) {
//             console.error(`Error processing PDF ${pdfUrl}:`, error);
//         }
//     }

//     return matchingPdfs;
// }

// async function extractTextFromPdf(pdfData) {
//     const dataBuffer = Buffer.from(pdfData);
//     const options = {}; // You can pass options to pdf-parse if necessary
//     const pdfText = await PDFParser(dataBuffer, options);
//     return pdfText.text;
// }
// exports.googlesearch = async (req) => {
//     var options = {
//         host: "google.fr",
//         qs: {
//             q: req,
//             filter: 0,
//             pws: 0
//         },
//         num: 100
//     };
//     const links = await serp.search(options);
//     var arr = [];
//     links.forEach(element => {
//         if (element.link.includes(".pdf")) {
//             arr.push(element.link);
//         }
//     });
//     pdf = checkpdf(arr, req);
//     // return pdf;
//     console.log(pdf);
// }
//extract pdf from google search and check whether pdf's first 5 pages make query or not

// var options = {
//   host: "google.fr",
//   qs: {
//     q: "Rich Dad Poor Dad - What the Rich Teach Their Kids About Money filetype pdf doctype pdf",
//     filter: 0,
//     pws: 0
//   },
//   num: 100
// };
// (async () => {
//   const links = await serp.search(options);
//   console.log(links);
// })();
