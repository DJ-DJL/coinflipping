/*
While watching this excellent video by Another Roof: https://www.youtube.com/watch?v=-QjgvbvFoQA
I wondered whether the problem of coin flips not being 50:50 can be solved by tossing two coins and calling "same" or "different" instead.
It then occurred to me that I can test this in code...

*/

const totalFlipPairs = 10000000000;


console.time('runtime');
const results = test(totalFlipPairs, 0.508);
console.timeEnd('runtime');

console.table(results)

function test(totalFlipPairs: number, bias: number) {
    let same = 0;
    let different = 0;
    for (let flip = 0; flip < totalFlipPairs; flip++) {
        const a = Math.random() > bias;
        const b = Math.random() > bias;
        if (a == b) {
            same++;
        } else {
            different++;
        }
    }
    return { same, different }
}
/*
Here the null hypothesis is that same == different
We want to measure the sigma probability of the results given this hypothesis
I asked chatGPT for help with that:
https://chatgpt.com/c/673b2d7a-f060-8001-9853-4c2b94947d48
*/
const sigma = Math.sqrt(totalFlipPairs * 0.5 * (1 - 0.5));
const zScore = (results.same - (totalFlipPairs / 2)) / sigma;

console.table({sigma, zScore});
