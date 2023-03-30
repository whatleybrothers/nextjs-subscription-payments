/* How to use it?
 *  run this script in the chrome dev tools.
 * 
 * How to minify and ugligy this script?
 *  use https://skalman.github.io/UglifyJS-online/
 *  use these options in the site below for the mangling
 *  update generatedTdAutoLiker.js so it can be used later
    {
        parse: {
        bare_returns     : false,
        ecma             : 8,
        expression       : false,
        filename         : null,
        html5_comments   : true,
        shebang          : true,
        strict           : false,
        toplevel         : null
        },
        compress: {
        arrows           : true,
        booleans         : true,
        collapse_vars    : true,
        comparisons      : true,
        computed_props   : true,
        conditionals     : true,
        dead_code        : true,
        drop_console     : false,
        drop_debugger    : true,
        ecma             : 5,
        evaluate         : true,
        expression       : false,
        global_defs      : {},
        hoist_funs       : false,
        hoist_props      : true,
        hoist_vars       : false,
        ie8              : false,
        if_return        : true,
        inline           : true,
        join_vars        : true,
        keep_classnames  : false,
        keep_fargs       : true,
        keep_fnames      : false,
        keep_infinity    : false,
        loops            : true,
        negate_iife      : true,
        passes           : 1,
        properties       : true,
        pure_getters     : "strict",
        pure_funcs       : null,
        reduce_funcs     : true,
        reduce_vars      : true,
        sequences        : true,
        side_effects     : true,
        switches         : true,
        top_retain       : null,
        toplevel         : false,
        typeofs          : true,
        unsafe           : false,
        unsafe_arrows    : false,
        unsafe_comps     : false,
        unsafe_Function  : false,
        unsafe_math      : false,
        unsafe_methods   : false,
        unsafe_proto     : false,
        unsafe_regexp    : false,
        unsafe_undefined : false,
        unused           : true,
        warnings         : false
        },
        mangle: {
        eval             : true,
        ie8              : false,
        keep_classnames  : false,
        keep_fnames      : false,
        properties       : true,
        reserved         : [],
        safari10         : false,
        toplevel         : true
        },
        output: {
        ascii_only       : false,
        beautify         : false,
        bracketize       : false,
        comments         : /@license|@preserve|^!/,
        ecma             : 5,
        ie8              : false,
        indent_level     : 4,
        indent_start     : 0,
        inline_script    : true,
        keep_quoted_props: false,
        max_line_len     : false,
        preamble         : null,
        preserve_line    : false,
        quote_keys       : false,
        quote_style      : 0,
        safari10         : false,
        semicolons       : true,
        shebang          : true,
        source_map       : null,
        webkit           : false,
        width            : 80,
        wrap_iife        : false
        },
        wrap: false
    }
*/


const APP_STATE = {
    likeFailedAttempts: 0
}
const MAX_LIKE_FAILED_ATTEMPTS = 5;

const getRandomIntFrom1ToMax = (max = 0) => {
    const num =  Math.floor(Math.random() * max + 1);
    console.log('Wait time: ', num);
    return num;
}

// TODO: UPDATE this metod when adding a new domain. See all sections
const getLikeElement = () => {

    // 1. add app name
    const APP_NAMES = {
        tinder: 'tinder',
    }

    let appName = '';
    let domain = window.location.href;

    // 2. add app name check
    if (domain.includes(APP_NAMES.tinder)) {
        appName = APP_NAMES.tinder
    }

    // 3. add app selector
    const APP_SELECTORS = {
        tinder: {
            likeButtonSelector: "//button//span[text()='Like']"
        }
    }

    console.log('log: detected app ', appName)
    const likeSelector = APP_SELECTORS[appName].likeButtonSelector
    return getElementByXPath(likeSelector);
}

const getElementByXPath = (xpathString = '') => {
    return document.evaluate(xpathString, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue || null;
}

function getElementsByXPath(xpathString = '') {
    const results = [];
    const xpathResult = document.evaluate(
        xpathString, 
        document,
        null,
        XPathResult.ORDERED_NODE_ITERATOR_TYPE,
        null
    );

    let node;
    while ((node = xpathResult.iterateNext()) != null) {
        results.push(node);
    }
    return results;
}

const clickLikeButton = () => {

    // 4. add word that display that max likes has been reached for the day
    // const TINDER_OUT_OF_LIKES_TEXT = `You're Out of Likes!`;
    const MAX_LIKE_REACHED_WORDS = [
        // TINDER_OUT_OF_LIKES_TEXT,
    ]

    const documentBody = document.body.textContent.toLowerCase();
    if (MAX_LIKE_REACHED_WORDS.some((phrase) => documentBody.includes(phrase.toLowerCase()))) {
        console.log('Exiting because encountered text max free likes has been reached.')
        return;
    } 

    const element = getLikeElement() 
    if (element) {
        console.log('log: element ', element)

        element.click();
        APP_STATE.likeFailedAttempts = 0;
    } else {
        APP_STATE.likeFailedAttempts++;
        console.log(`Couldn't find LIKE button.`)
        if (APP_STATE.likeFailedAttempts > MAX_LIKE_FAILED_ATTEMPTS) {
            console.log(`Couldn't find LIKE button after ${MAX_LIKE_FAILED_ATTEMPTS} times. Exiting...`)
            return;
        } 

        // it's possible that popup happend, close the pop up
        // eg tinder will show a popup if it's a match, liked a popular profile, etc
    }
    autoLikeCurrentPerson()
}

const autoLikeCurrentPerson = () => {
    const intervalSeconds = 5;
    const intervalTimeMs =  getRandomIntFrom1ToMax(intervalSeconds) * 1000;
    const timeoutId = setTimeout(clickLikeButton, intervalTimeMs);
}

// start
autoLikeCurrentPerson();