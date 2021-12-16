// --- Day 14: Extended Polymerization ---
// The incredible pressures at this depth are starting to put a strain on your submarine. The submarine has polymerization equipment that would produce suitable materials to reinforce the submarine, and the nearby volcanically-active caves should even have the necessary input elements in sufficient quantities.
//
//     The submarine manual contains instructions for finding the optimal polymer formula; specifically, it offers a polymer template and a list of pair insertion rules (your puzzle input). You just need to work out what polymer would result after repeating the pair insertion process a few times.
//
//     For example:
//
//     NNCB
//
// CH -> B
// HH -> N
// CB -> H
// NH -> C
// HB -> C
// HC -> B
// HN -> C
// NN -> C
// BH -> H
// NC -> B
// NB -> B
// BN -> B
// BB -> N
// BC -> B
// CC -> N
// CN -> C
// The first line is the polymer template - this is the starting point of the process.
//
//     The following section defines the pair insertion rules. A rule like AB -> C means that when elements A and B are immediately adjacent, element C should be inserted between them. These insertions all happen simultaneously.
//
//     So, starting with the polymer template NNCB, the first step simultaneously considers all three pairs:
//
//     The first pair (NN) matches the rule NN -> C, so element C is inserted between the first N and the second N.
//     The second pair (NC) matches the rule NC -> B, so element B is inserted between the N and the C.
//     The third pair (CB) matches the rule CB -> H, so element H is inserted between the C and the B.
//     Note that these pairs overlap: the second element of one pair is the first element of the next pair. Also, because all pairs are considered simultaneously, inserted elements are not considered to be part of a pair until the next step.
//
//     After the first step of this process, the polymer becomes NCNBCHB.
//
//     Here are the results of a few steps using the above rules:
//
//     Template:     NNCB
// After step 1: NCNBCHB
// After step 2: NBCCNBBBCBHCB
// After step 3: NBBBCNCCNBBNBNBBCHBHHBCHB
// After step 4: NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB
// This polymer grows quickly. After step 5, it has length 97; After step 10, it has length 3073. After step 10, B occurs 1749 times, C occurs 298 times, H occurs 191 times, and N occurs 865 times; taking the quantity of the most common element (B, 1749) and subtracting the quantity of the least common element (H, 161) produces 1749 - 161 = 1588.
//
// Apply 10 steps of pair insertion to the polymer template and find the most and least common elements in the result. What do you get if you take the quantity of the most common element and subtract the quantity of the least common element?

// --- Part Two ---
// The resulting polymer isn't nearly strong enough to reinforce the submarine. You'll need to run more steps of the pair insertion process; a total of 40 steps should do it.
//
//     In the above example, the most common element is B (occurring 2192039569602 times) and the least common element is H (occurring 3849876073 times); subtracting these produces 2188189693529.
//
// Apply 40 steps of pair insertion to the polymer template and find the most and least common elements in the result. What do you get if you take the quantity of the most common element and subtract the quantity of the least common element?

import file from "../day14/source_14.txt";
import testFile from "../day14/test_14.txt";

let polymer = ''
let instructions = []
let countedChars = []
let polymersPairs = []

const addNewInstruction = (countOfIterations) => {
    let length
    let currentPolymer
    let addString
    let currentInstruction = []
    while(countOfIterations > 0) {
        currentPolymer = polymer.split('')
        addString = 0
        length = 1
        while (length <= polymer.length) {
            let searchString = polymer[length - 1] + polymer[length]
            // console.log('searchString', searchString)
            currentInstruction = instructions.filter(instruction => instruction[0] === searchString)
            // console.log('currentInstruction', currentInstruction)
            if (currentInstruction.length > 0) {
                currentPolymer.splice(length + addString, 0, currentInstruction[0][1])
                addString++
            }
            length++
        }
        // console.log('currentPolymer', currentPolymer)
        polymer = currentPolymer.join('')
        console.log('polymer ', polymer)
        countOfIterations--
        countChars()
    }
}

const countChars = () => {
    for(let char of polymer) {
        if(countedChars[char] ) {
            countedChars[char]++
        } else {
            countedChars[char] = 1
        }
    }
    console.log(countedChars)

    let min
    let max

    for (const [key, value] of Object.entries(countedChars)) {
        if(!min || value < min) {
            min = value
        }

        if(!max || max < value) {
            max=value
        }
    }

    console.log('min max', min, max)

    console.log('sum: ', max - min)
}

export const exercise_27 = async () => {
    fetch(file)
        .then( r => r.text() )
        .then( t => {
            let input = t.split('\n');
            polymer = input[0]

            instructions = input.map(row => row.split(' -> ')).slice(2)

            addNewInstruction(10)
            countChars()

            // console.log('polymer: ', polymer)
            // console.log('instructions: ', instructions)

        } )
}

const addToMap = (map, key, val = 1) => {
    if(!map.has(key)) {
        map.set(key, 0)
    }
    map.set(key, map.get(key) + val)
}


export const exercise_28 = async () => {
    fetch(file)
        .then( r => r.text() )
        .then( t => {
            let input = t.split('\n');
            polymer = input[0]

            let map = new Map();

            for (let i = 0; i < polymer.length - 1; i++) {
                const pair = polymer[i] + polymer[i+1]
                addToMap(map, pair)
            }

            instructions = input.map(row => row.split(' -> ')).slice(2)
            const pairRulesMap = new Map();

            for(const instruction of instructions) {
                pairRulesMap
                    .set(instruction[0], [instruction[0][0] + instruction[1], instruction[1] + instruction[0][1]])
            }
            // console.log('pair rules map: ', {pairRulesMap})

            const lastChar = polymer[polymer.length - 1]

            for(let step = 0; step < 40; step++) {
                let current = new Map();
                const keys = map.keys()
                for(const key of keys) {
                    const next = pairRulesMap.get(key)
                    addToMap(current, next[0], map.get(key))
                    addToMap(current, next[1], map.get(key))
                }

                map = current;
                // console.log(map)
            }

            const elementCount = new Map();
            addToMap(elementCount, lastChar)
            const keys = map.keys()
            for(const key of keys) {
                addToMap(elementCount, key[0], map.get(key))
            }

            // console.log('elementCount: ', elementCount)

            const values = [...elementCount.values()]
            const min = Math.min(...values)
            const max = Math.max(...values)

            console.log('sum: ', max - min)
        } )
}