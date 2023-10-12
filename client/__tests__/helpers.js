// JEST setup to have access to a fake dom

// Tool to work with directors and files paths
const path = require ('path');

// Import of JSDOM Constructor, which will allow us to build the fake DOM
const jsdom=require('jsdom');
const {JSDOM} =jsdom

const fetchMock = require('jest-fetch-mock');
fetchMock.enableMocks();

const renderDOM= async (filename)=>{
    console.log(process.cwd())
    const filePath = path.join(process.cwd(),filename)

    const dom= await JSDOM.fromFile(filePath,{
        // Execute scripts inside the DOM
        runScripts:'dangerously',
        // Load external scripts inside the DOM
        resources:'usable'
    })

    //We wait for the DOM content to have loaded and then we can resolve 
    return new Promise((resolve) => {
        dom.window.document.addEventListener('DOMContentLoaded', () => {
            resolve(dom);
        });
    });
}

module.exports = renderDOM;