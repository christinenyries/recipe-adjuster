import { fraction as makeFraction, add } from 'mathjs';

// source: https://www.unicode.org/charts/nameslist/n_2150.html
const fractionUnicodePattern = '[\\u2150-\\u215e\\u00bc-\\u00be]';

// e.g. 1, 1.25
const floatPattern = '((?<decimal>\\d+)(?<fraction>\\.\\d+)?)';

// e.g. 1/4, 1 1/4
const wholeAndFractionPattern = '(((?<decimal>\\d+) )?(?<fraction>\\d+/\\d+))';

// e.g. ½, 1½ 
const wholeAndFractionUnicodePattern = `((?<decimal>\\d+)?(?<fraction>${fractionUnicodePattern}))`;

const amountPatterns = [
    floatPattern,
    wholeAndFractionPattern,
    wholeAndFractionUnicodePattern
];

// combine all amount patterns into one
const amountPattern = `(${amountPatterns.reduce((acc, pattern) => {
    // remove capture group names because these amount patterns have the same capture group names (e.g. decimal, fraction)
    // and duplicate capture group names are not allowed
    acc.push(pattern.replace(/\?<\w+>/g, ''));
    return acc;
}, []).join('|')})`;

function parseIngredients(text) {
    const ingredients = [];

    text.split('\n').forEach((line, index) => {
        try {
            ingredients.push(parseIngredient(line.trim()));
        }
        catch (error) {
            throw new Error(`Cannot parse ingredient on line ${index + 1} - ${error.message}`);
        }
    });

    return ingredients
}

function parseIngredient(text) {
    const ingredientPattern = new RegExp(`^(?<amount>${amountPattern})\\s+(?<unit>\\w+)\\s+(?<name>.*)$`);

    const match = text.match(ingredientPattern);
    if (!match) {
        throw new Error(`(${text}) does not match expected pattern (<amount> <unit> <name>)`);
    }

    const { amount, unit, name } = match.groups;
    return {
        amount: parseAmount(amount),
        unit,
        name
    };
}

function parseAmount(text) {
    for (const amountPattern of amountPatterns) {
        if (!(new RegExp(`^${amountPattern}$`)).test(text)) {
            continue;
        }
        console.log(amountPattern)

        const match = text.match(amountPattern);
        const { decimal, fraction } = match.groups;
        try {
            if (decimal && fraction) {
                const sum = add(
                    decimal,
                    makeFraction(normalize(fraction))
                );
                return parseFloat(sum.toString());
            } else if (fraction) {
                return parseFloat(makeFraction(normalize(fraction)).toString());
            } else {
                return parseFloat(decimal);
            }
        }
        catch (e) {
            console.log(e)
            throw e
        }
    }
    throw new Error(`Amount (${text}) doesn't match any of the expected formats (e.g. 1, 1.25, 1/4, 1 1/4, ½, 1½)`)
}

function normalize(fraction) {
    if ((new RegExp(fractionUnicodePattern)).test(fraction)) {
        return fraction.normalize('NFKD').replace('⁄', '/');
    }
    return fraction;
}

export { parseIngredients };