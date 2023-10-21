// --- Day 5: Hydrothermal Venture ---
// You come across a field of hydrothermal vents on the ocean floor! These vents constantly produce large, opaque clouds, so it would be best to avoid them if possible.
//
//     They tend to form in lines; the submarine helpfully produces a list of nearby lines of vents (your puzzle input) for you to review. For example:
//
//     0,9 -> 5,9
// 8,0 -> 0,8
// 9,4 -> 3,4
// 2,2 -> 2,1
// 7,0 -> 7,4
// 6,4 -> 2,0
// 0,9 -> 2,9
// 3,4 -> 1,4
// 0,0 -> 8,8
// 5,5 -> 8,2
// Each line of vents is given as a line segment in the format x1,y1 -> x2,y2 where x1,y1 are the coordinates of one end the line segment and x2,y2 are the coordinates of the other end. These line segments include the points at both ends. In other words:
//
//     An entry like 1,1 -> 1,3 covers points 1,1, 1,2, and 1,3.
// An entry like 9,7 -> 7,7 covers points 9,7, 8,7, and 7,7.
// For now, only consider horizontal and vertical lines: lines where either x1 = x2 or y1 = y2.
//
//     So, the horizontal and vertical lines from the above list would produce the following diagram:
//
// .......1..
// ..1....1..
// ..1....1..
// .......1..
// .112111211
// ..........
// ..........
// ..........
// ..........
// 222111....
// In this diagram, the top left corner is 0,0 and the bottom right corner is 9,9. Each position is shown as the number of lines which cover that point or . if no line covers that point. The top-left pair of 1s, for example, comes from 2,2 -> 2,1; the very bottom row is formed by the overlapping lines 0,9 -> 5,9 and 0,9 -> 2,9.
//
// To avoid the most dangerous areas, you need to determine the number of points where at least two lines overlap. In the above example, this is anywhere in the diagram with a 2 or larger - a total of 5 points.
//
//     Consider only horizontal and vertical lines. At how many points do at least two lines overlap?

// --- Part Two ---
// Unfortunately, considering only horizontal and vertical lines doesn't give you the full picture; you need to also consider diagonal lines.
//
// Because of the limits of the hydrothermal vent mapping system, the lines in your list will only ever be horizontal, vertical, or a diagonal line at exactly 45 degrees. In other words:
//
// An entry like 1,1 -> 3,3 covers points 1,1, 2,2, and 3,3.
// An entry like 9,7 -> 7,9 covers points 9,7, 8,8, and 7,9.
// Considering all lines from the above example would now produce the following diagram:
//
// 1.1....11.
// .111...2..
// ..2.1.111.
// ...1.2.2..
// .112313211
// ...1.2....
// ..1...1...
// .1.....1..
// 1.......1.
// 222111....
// You still need to determine the number of points where at least two lines overlap. In the above example, this is still anywhere in the diagram with a 2 or larger - now a total of 12 points.
//
//  Consider all of the lines. At how many points do at least two lines overlap?

import file from "./source_5.txt";
import testFile from "./test_5.txt";

let map = []
let hydrothermalVentsCoordinates

const stringAt = (string, index, value) => {
    let newString
    console.log('string, index, value ', string, index, ' ', value);
    //
    // let firstPart = string.substring(0, index)
    // console.log('firstPart', firstPart)
    // let secondPart = string.substring(index + 1, 9)
    // console.log('secondPart', secondPart)
    // console.log('new string: ', firstPart + value.toString() + secondPart)
    // return  firstPart + value.toString() + secondPart
    newString = string.split('');
    newString[index] = value;
    newString = newString.join('');
    // console.log('new string: ', newString);
    return newString
}

const countNumberLargerAsOne = () => {
    let sum = 0
    map.forEach( lineOfMap => {
        for(let  char of lineOfMap) {
            if( char !== '.' && Number(char) >= 2) sum++
        }
    })
    return sum
}

const writeCoordinatesToMap = (startPoint, lengthOfLine, isHorizontal) => {
    // console.log('startPoint:', startPoint)
    // console.log('lengthOfLine:', lengthOfLine)
    // console.log('isHorizontal:', isHorizontal)
    if(isHorizontal) {
        for(let i = Number(startPoint[0]); i <= lengthOfLine; i++) {
            console.log(map[Number(startPoint[1])][i])
            if(map[Number(startPoint[1])][i] === '.') {
                const row = map[Number(startPoint[1])]
                map[Number(startPoint[1])] = stringAt(row, i, 1)
            } else {
                let currentValue = Number(map[Number(startPoint[1])][i]) + 1
                const row = map[Number(startPoint[1])]
                map[Number(startPoint[1])] = stringAt(row, i, currentValue)
            }
        }
    } else {
        // console.log('[start point]: ', startPoint)
        // console.log('length ', lengthOfLine)
        for(let i = Number(startPoint[1]); i <= lengthOfLine; i++) {
            // console.log('map[i][Number(startPoint[0])] ',
            //     map[i][Number(startPoint[0])] ,' i ', i, ' startpoint ', Number(startPoint[0]))
            if(map[i][Number(startPoint[0])] === '.') {
                const row = map[i]
                map[i] = stringAt(row, Number(startPoint[0]), 1)
            } else {
                let currentValue = Number(map[i][Number(startPoint[0])]) + 1
                // console.log('current value: ', currentValue)
                const row = map[i]
                map[i] = stringAt(row, Number(startPoint[0]), currentValue)
            }
        }
    }

}

const findLine = (startPoint, endPoint) => {
    let isHorizontal = Number(startPoint[1]) === Number(endPoint[1])
    let lengthOfLine = 0
    if(isHorizontal) {
        if(Number(endPoint[0]) > Number(startPoint[0])) {
            lengthOfLine = Number(endPoint[0])
            writeCoordinatesToMap(startPoint, lengthOfLine, isHorizontal)
        } else {
            lengthOfLine = Number(startPoint[0])
            writeCoordinatesToMap(endPoint, lengthOfLine, isHorizontal)
        }

    } else {
        if(Number(endPoint[1]) > Number(startPoint[1])) {
            lengthOfLine = Number(endPoint[1])
            writeCoordinatesToMap(startPoint, lengthOfLine, isHorizontal)
        } else {
            lengthOfLine = Number(startPoint[1])
            writeCoordinatesToMap(endPoint, lengthOfLine, isHorizontal)
        }

    }
}

const findDiagonalLine = (startPoint, endPoint) => {
    const start_row = Number(startPoint[1])
    const end_row = Number(endPoint[1])
    const start_column = Number(startPoint[0])
    const end_column = Number(endPoint[0])

    let start_index_row
    let end_index_row
    let start_index_column
    let end_index_column
    if(start_row > end_row) {
        start_index_row = end_row
        end_index_row = start_row
        start_index_column =  end_column
        end_index_column = start_column
    } else {
        start_index_row = start_row
        end_index_row = end_row
        start_index_column = start_column
        end_index_column = end_column
    }

    // let end_index_column
    // if(start_column > end_column) {
    //     start_index_column = end_column
    //     end_index_column = start_column
    // } else {
    //     start_index_column = start_column
    //     end_index_column = end_column
    // }
    let current_column_index = start_index_column
    let isBigger = start_index_column > end_index_column
    console.log('start point: ', startPoint, ' end point: ', endPoint)
    for( let index_row = start_index_row; index_row <= end_index_row; index_row++) {
        console.log('index row: ', index_row)
        console.log('current column: ', current_column_index)
        if(map[index_row][current_column_index] === '.') {
            const row = map[index_row]
            map[index_row] = stringAt(row, current_column_index, 1)
        } else {
            let currentValue = Number(map[index_row][current_column_index]) + 1
            // console.log('current value: ', currentValue)
            const row = map[index_row]
            map[index_row] = stringAt(row,current_column_index, currentValue)

        }
        isBigger ? current_column_index-- : current_column_index++

    }
}

const isVerticalOrHorizontalLine = (startPoint, endPoint) => {
   return Number(startPoint[0]) === Number(endPoint[0]) || Number(startPoint[1]) === Number(endPoint[1])
}


export const exercise_9 = async () => {

    fetch(file)
        .then( r => r.text() )
        .then( t => {
             hydrothermalVentsCoordinates = t.split('\n');
             hydrothermalVentsCoordinates = hydrothermalVentsCoordinates
                 .map(lineOfCoordinates => lineOfCoordinates.split(' -> '));
             hydrothermalVentsCoordinates.forEach( lineOfCoordinates =>  {
                 lineOfCoordinates[0] = lineOfCoordinates[0].split(',')
                 lineOfCoordinates[1] = lineOfCoordinates[1].split(',')
             })
            // console.log(hydrothermalVentsCoordinates)
            let row = ""
            for(let i = 0; i <= 999; i++) {
                row += "."
            }

            for(let i= 0; i <= 999; i++) {
                map.push(row)
            }
            // console.log(map)
            const diagonalsLine =  hydrothermalVentsCoordinates
                .filter( lineOfCoordinates => !isVerticalOrHorizontalLine(lineOfCoordinates[0], lineOfCoordinates[1]))
            hydrothermalVentsCoordinates = hydrothermalVentsCoordinates
                .filter( lineOfCoordinates => isVerticalOrHorizontalLine(lineOfCoordinates[0], lineOfCoordinates[1]))
            console.log(hydrothermalVentsCoordinates)
            hydrothermalVentsCoordinates
                .forEach( lineOfCoordinates => {
                    findLine(lineOfCoordinates[0], lineOfCoordinates[1])
                })
            diagonalsLine.forEach( lineOfCoordinates =>
                findDiagonalLine(lineOfCoordinates[0], lineOfCoordinates[1])
            )

            console.log('final map: ', map)
            console.log('sum: ', countNumberLargerAsOne())


        } )

}