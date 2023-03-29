function getRandomInt(max = 0) { // max inclusive
    const num =  Math.floor(Math.random() * max);
    return num;
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

function getElementByXPath(xpathString = '') {
    return document.evaluate(xpathString, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue || null;
}

function sendOpeners() {

    const OPENERS = [
        'Hi, you seem interesting. If you want to chat, just say hi',
        'Hi, you seem interesting. If you want to talk, just say hi',
        'Hey, you seem interesting. If you want to chat, just say hi',
        'Hey, you seem interesting. If you want to talk, just say hi',
    ];

    const selector = `//*[@class='P(8px)']//a`;
    const matchElements = getElementsByXPath(selector);
    matchElements.splice(0, 3) // drop first two bc they are non match cards

    debugger
    matchElements.forEach((matchElement) => {
        matchElement.click();
        
        const msgInputSelector = `//*[@placeholder="Type a message"]`;
        const msgInputElement = getElementByXPath(msgInputSelector);
        msgInputElement.click();

        const openerMsg = OPENERS[getRandomInt(OPENERS.length-1)];
        msgInputElement.value = openerMsg
        msgInputElement.blur();

        const sendMsgButtonSelector = `//*[@type="submit"]`;
        const sendMsgButtonElement = getElementByXPath(sendMsgButtonSelector);
        sendMsgButtonElement.click();
        debugger;
        
    })
}


sendOpeners()