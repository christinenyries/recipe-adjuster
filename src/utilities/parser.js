
import { fraction as makeFraction, add } from 'mathjs';

// source: https://www.unicode.org/charts/nameslist/n_2150.html
const fractionUnicodePattern = '[\\u2150-\\u215e\\u00bc-\\u00be]';

// e.g. 1, 1.25
const floatPattern = '((?<decimal>\\d+)(?<fraction>.\\d+)?)';

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
    // remove capture group names because these patterns have the same capture group names (e.g. decimal, fraction)
    acc.push(pattern.replace(/\?<\w+>/g, ''));
    return acc;
}, []).join('|')})`;

function parseIngredients(ingredients) {
    const results = [];
    ingredients.split('\n').forEach((ingredient, index) => {
        try {
            results.push(parseIngredient(ingredient.trim()));
        }
        catch (error) {
            throw new Error(`Cannot parse ingredient on line ${index + 1} - ${error.message}`);
        }
    });
    return results
}

function parseIngredient(ingredient) {
    const ingredientPattern = new RegExp(`^(?<amount>${amountPattern})\\s+(?<unit>\\w+)\\s+(?<name>.*)$`);

    const match = ingredient.match(ingredientPattern);
    if (!match) {
        throw new Error(`(${ingredient}) does not match expected pattern: <amount> <unit> <name>`);
    }

    const { amount, unit, name } = match.groups;
    return {
        amount: parseAmount(amount),
        unit,
        name
    };
}

function parseAmount(amount) {
    for (const amountPattern of amountPatterns) {
        if (!(new RegExp(`^${amountPattern}$`)).test(amount)) {
            continue;
        }

        const match = amount.match(amountPattern);
        const { decimal, fraction } = match.groups;

        if (fraction) {
            const normalizedFraction = normalize(fraction);
            const sum = add(decimal, makeFraction(normalizedFraction));
            return parseFloat(sum.toString());
        } else {
            return parseFloat(decimal);
        }
    }
    throw new Error(`Amount (${amount}) doesn't match any of the expected formats (e.g. 1, 1.25, 1/4, 1 1/4, ½, 1½)`)
}

function normalize(fraction) {
    if ((new RegExp(fractionUnicodePattern)).test(fraction)) {
        return fraction.normalize('NFKD').replace('⁄', '/');
    }
    return fraction;
}

export { parseIngredients };