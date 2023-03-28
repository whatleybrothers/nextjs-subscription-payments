const APP_STATE = {
    likeFailedAttempts: 0
}
const MAX_LIKE_FAILED_ATTEMPTS = 5;

function getRandomIntFrom1ToMax(max = 0) {
    const num =  Math.floor(Math.random() * max + 1);
    console.log('Wait time: ', num);
    return num;
}

// TODO: UPDATE this metod when adding a new domain. See all sections
function getLikeElement() {

    // 1. add app name
    const APP_NAMES = {
        tinder: 'tinder',
        okcupid: 'okcupid',
        bumble: 'bumble',
        pof: 'pof',
        badoo: 'badoo',
        happn: 'happn',
    }

    let appName = '';
    let domain = window.location.href;

    // 2. add app name check
    if (domain.includes(APP_NAMES.tinder)) {
        appName = APP_NAMES.tinder
    } else if (domain.includes(APP_NAMES.okcupid)) {
        appName = APP_NAMES.okcupid
    } else if (domain.includes(APP_NAMES.bumble)) {
        appName = APP_NAMES.bumble
    } else if (domain.includes(APP_NAMES.pof)) {
        appName = APP_NAMES.pof
    } else if (domain.includes(APP_NAMES.badoo)) {
        appName = APP_NAMES.badoo
    }  else if (domain.includes(APP_NAMES.happn)) {
        appName = APP_NAMES.happn
    } else {
        appName = 'Error: unknown app name'
    }

    // 3. add app selector
    const APP_SELECTORS = {
        tinder: {
            likeButtonSelector: "//button//span[text()='Like']"
        },
        okcupid: {
            likeButtonSelector: "//*[@aria-label='LIKE']"
        },
        bumble: {
            likeButtonSelector: "//*[@aria-label='LIKE']"
        },
        pof: {
            likeButtonSelector: "//*[@id='meetmevotebutton-yes']"
        },
        badoo: {
            likeButtonSelector: "//*[@data-choice='yes']//*[@class='icon icon--stretch']"
        },
        happn: {
            likeButtonSelector: "//*[@data-testid='profile-btn-like']"
        },
    }

    console.log('log: detected app ', appName)
    const likeSelector = APP_SELECTORS[appName].likeButtonSelector
    return getElementByXPath(likeSelector);
}

function getElementByXPath(xpathString = '') {
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

function clickLikeButton() {

    // 4. add word that display that max likes has been reached for the day
    const POF_OUT_OF_LIKES_TEXT = 'reached your liking limit for the day';
    const BADOO_OUT_OF_LIKES_TEXT = 'Your subscription will automatically renew and your payment method will be charged for the same period and price unless you cancel before the period ends';
    const HAPPN_OUT_OF_LIKES_TEXT = 'You can Like profiles again in';
    // const TINDER_OUT_OF_LIKES_TEXT = `You're Out of Likes!`;
    const MAX_LIKE_REACHED_WORDS = [
        POF_OUT_OF_LIKES_TEXT,
        BADOO_OUT_OF_LIKES_TEXT,
        HAPPN_OUT_OF_LIKES_TEXT,
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

function autoLikeCurrentPerson() {
    const intervalSeconds = 5;
    const intervalTimeMs =  getRandomIntFrom1ToMax(intervalSeconds) * 1000;
    const timeoutId = setTimeout(clickLikeButton, intervalTimeMs);
}

// start
autoLikeCurrentPerson();