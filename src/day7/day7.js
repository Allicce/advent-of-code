// --- Day 7: The Treachery of Whales ---
// A giant whale has decided your submarine is its next meal, and it's much faster than you are. There's nowhere to run!
//
//     Suddenly, a swarm of crabs (each in its own tiny submarine - it's too deep for them otherwise) zooms in to rescue you! They seem to be preparing to blast a hole in the ocean floor; sensors indicate a massive underground cave system just beyond where they're aiming!
//
//     The crab submarines all need to be aligned before they'll have enough power to blast a large enough hole for your submarine to get through. However, it doesn't look like they'll be aligned before the whale catches you! Maybe you can help?
//
// There's one major catch - crab submarines can only move horizontally.
//
// You quickly make a list of the horizontal position of each crab (your puzzle input). Crab submarines have limited fuel, so you need to find a way to make all of their horizontal positions match while requiring them to spend as little fuel as possible.
//
//     For example, consider the following horizontal positions:
//
//     16,1,2,0,4,2,7,1,2,14
// This means there's a crab with horizontal position 16, a crab with horizontal position 1, and so on.
//
// Each change of 1 step in horizontal position of a single crab costs 1 fuel. You could choose any horizontal position to align them all on, but the one that costs the least fuel is horizontal position 2:
//
// Move from 16 to 2: 14 fuel
// Move from 1 to 2: 1 fuel
// Move from 2 to 2: 0 fuel
// Move from 0 to 2: 2 fuel
// Move from 4 to 2: 2 fuel
// Move from 2 to 2: 0 fuel
// Move from 7 to 2: 5 fuel
// Move from 1 to 2: 1 fuel
// Move from 2 to 2: 0 fuel
// Move from 14 to 2: 12 fuel
// This costs a total of 37 fuel. This is the cheapest possible outcome; more expensive outcomes include aligning at position 1 (41 fuel), position 3 (39 fuel), or position 10 (71 fuel).
//
// Determine the horizontal position that the crabs can align to using the least fuel possible. How much fuel must they spend to align to that position?

// --- Part Two ---
// The crabs don't seem interested in your proposed solution. Perhaps you misunderstand crab engineering?
//
// As it turns out, crab submarine engines don't burn fuel at a constant rate. Instead, each change of 1 step in horizontal position costs 1 more unit of fuel than the last: the first step costs 1, the second step costs 2, the third step costs 3, and so on.
//
// As each crab moves, moving further becomes more expensive. This changes the best horizontal position to align them all on; in the example above, this becomes 5:
//
// Move from 16 to 5: 66 fuel
// Move from 1 to 5: 10 fuel
// Move from 2 to 5: 6 fuel
// Move from 0 to 5: 15 fuel
// Move from 4 to 5: 1 fuel
// Move from 2 to 5: 6 fuel
// Move from 7 to 5: 3 fuel
// Move from 1 to 5: 10 fuel
// Move from 2 to 5: 6 fuel
// Move from 14 to 5: 45 fuel
// This costs a total of 168 fuel. This is the new cheapest possible outcome; the old alignment position (2) now costs 206 fuel instead.
//
//     Determine the horizontal position that the crabs can align to using the least fuel possible so they can make you an escape route! How much fuel must they spend to align to that position?

import file from "../day7/source_7.txt";
import testFile from "../day7/test_7.txt"

let splitNumber = 0
let horizontalPositions = []
let sumArray = []
let maximum = 0
let minimumFuel = 99999999999999999

// export const clearHelpArray= () => {
//     while(sumArray.length !== 0) {
//         sumArray.pop()
//     }
// }
//
// const findSplitNumber = (number) => {
//     let middle
//
//     if (number < splitNumber) {
//         middle = Math.floor(number / 2)
//     } else {
//         middle = Math.floor(splitNumber + maximum / 2)
//     }
//     console.log('middle ', middle)
//     if( middle <= 1) {
//         return 1
//     } else if ( middle >= maximum - 1) {
//         return maximum - 1
//     }
//     return middle
// }
//
const countSum = (i) => {
    let sum = 0
    //
    // for (let i = splitNumber - 1; i <= splitNumber + 1; i++) {
    //     // sum = horizontalPositions
    //     //     .reduce( ( current, next) => Math.abs(current - i) + Math.abs(next - i))
    //     for (let j = 0; j < horizontalPositions.length; j++) {
    //         sum += Math.abs(horizontalPositions[j] - i)
    //     }
    //     sumArray.push({number: i, sum: sum})
    //     sum = 0
    // }
    let actualSum = 0
    horizontalPositions.forEach( position => {
        actualSum =  Math.abs(position - i)
        for( let index = 0; index < actualSum; index++ ) {
                sum += index + 1
        }
        // sum += actualSum
        // if(i > 1) sum ++
    })

    return sum
}
//
// const findMinimumSum = () => {
//     let minimumCount = { sum: sumArray[0].sum, number: sumArray[0].number, position: 0}
//     sumArray.forEach( (item, index) => {
//         if(item.sum < minimumCount.sum) minimumCount = {...item, position: index}
//     })
//     console.log('minimumCount: ', minimumCount)
//     console.log('sumArray: ', sumArray)
//     // clearHelpArray()
//     return minimumCount
// }

export const exercise_13 = async () => {

    fetch(file)
        .then( r => r.text() )
        .then( t => {
            horizontalPositions = t.split(',').map(function(item) {
                return parseInt(item, 10);
            });

            maximum = Math.max(...horizontalPositions)
            console.log('maximum ', maximum)
            console.log(horizontalPositions)
            let sum
            for(let i = 0; i <= maximum; i++) {
                sum = countSum(i)
                if(sum < minimumFuel) minimumFuel = sum
            }

            console.log('minimumFuel ', minimumFuel)


            // splitNumber = findSplitNumber(maximum)
            // let test = 0
            // // while(splitNumber !== 1 && splitNumber !== maximum - 1) {
            // while(test !== 10) {
            //     countSum()
            //     minimumFuel = findMinimumSum()
            //     splitNumber = findSplitNumber(minimumFuel.number)
            //     console.log('splitNumber ', splitNumber)
            //     test++
            // }
            //
            // console.log('minimumFuel', minimumFuel)

        } )
}