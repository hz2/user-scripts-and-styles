const line = readline();

function getLastWordLength(str) {
    let i = str.length - 1;

    while (i > -1) {
        if (str[i] === ' ') break;
        i -= 1;
    }

    return str.length - 1 - i;
}

console.log(getLastWordLength(line));
