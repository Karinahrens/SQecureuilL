const { deepStrictEqual } = require('assert');
const renderDOM = require ('./helpers')

let dom;
let document;

describe('home.html', () =>{
    beforeEach(async() => {
        dom = await renderDOM ('./home.html') ;
        document = await dom.window.document;
    })

    it(('Has a button'),() => {
        const btn = document.querySelector('button');
        expect (btn).toBeTruthy;
    })

    it(('Has a Navigation Bar'),() => {
        const navBar = document.querySelector('nav');
        expect (navBar).toBeTruthy;
    })

    it(('Has a division'),() => {
        const Div = document.querySelector('div');
        expect (Div).toBeTruthy;
    })
    
    it(('Has a Header1'),() => {
        const h1 = document.querySelector('h1');
        expect (h1).toBeTruthy;
    })

    it(('Has a Label'),() => {
        const label = document.querySelector('label');
        expect (label).toBeTruthy;
    })
})