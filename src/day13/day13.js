// --- Day 13: Transparent Origami ---
// You reach another volcanically active part of the cave. It would be nice if you could do some kind of thermal imaging so you could tell ahead of time which caves are too hot to safely enter.
//
//     Fortunately, the submarine seems to be equipped with a thermal camera! When you activate it, you are greeted with:
//
// Congratulations on your purchase! To activate this infrared thermal imaging
// camera system, please enter the code found on page 1 of the manual.
//     Apparently, the Elves have never used this feature. To your surprise, you manage to find the manual; as you go to open it, page 1 falls out. It's a large sheet of transparent paper! The transparent paper is marked with random dots and includes instructions on how to fold it up (your puzzle input). For example:
//
// 6,10
// 0,14
// 9,10
// 0,3
// 10,4
// 4,11
// 6,0
// 6,12
// 4,1
// 0,13
// 10,12
// 3,4
// 3,0
// 8,4
// 1,10
// 2,14
// 8,10
// 9,0
//
// fold along y=7
// fold along x=5
// The first section is a list of dots on the transparent paper. 0,0 represents the top-left coordinate. The first value, x, increases to the right. The second value, y, increases downward. So, the coordinate 3,0 is to the right of 0,0, and the coordinate 0,7 is below 0,0. The coordinates in this example form the following pattern, where # is a dot on the paper and . is an empty, unmarked position:
//
//     ...#..#..#.
// ....#......
// ...........
// #..........
// ...#....#.#
// ...........
// ...........
// ...........
// ...........
// ...........
// .#....#.##.
// ....#......
// ......#...#
// #..........
// #.#........
// Then, there is a list of fold instructions. Each instruction indicates a line on the transparent paper and wants you to fold the paper up (for horizontal y=... lines) or left (for vertical x=... lines). In this example, the first fold instruction is fold along y=7, which designates the line formed by all of the positions where y is 7 (marked here with -):
//
// ...#..#..#.
// ....#......
// ...........
// #..........
// ...#....#.#
// ...........
// ...........
// -----------
// ...........
// ...........
// .#....#.##.
// ....#......
// ......#...#
// #..........
// #.#........
// Because this is a horizontal line, fold the bottom half up. Some of the dots might end up overlapping after the fold is complete, but dots will never appear exactly on a fold line. The result of doing this fold looks like this:
//
// #.##..#..#.
// #...#......
// ......#...#
// #...#......
// .#.#..#.###
// ...........
// ...........
// Now, only 17 dots are visible.
//
//     Notice, for example, the two dots in the bottom left corner before the transparent paper is folded; after the fold is complete, those dots appear in the top left corner (at 0,0 and 0,1). Because the paper is transparent, the dot just below them in the result (at 0,3) remains visible, as it can be seen through the transparent paper.
//
//     Also notice that some dots can end up overlapping; in this case, the dots merge together and become a single dot.
//
//     The second fold instruction is fold along x=5, which indicates this line:
//
//     #.##.|#..#.
// #...#|.....
// .....|#...#
// #...#|.....
// .#.#.|#.###
// .....|.....
// .....|.....
// Because this is a vertical line, fold left:
//
//     #####
// #...#
// #...#
// #...#
// #####
// .....
// .....
// The instructions made a square!
//
//     The transparent paper is pretty big, so for now, focus on just completing the first fold. After the first fold in the example above, 17 dots are visible - dots that end up overlapping after the fold is completed count as a single dot.
//
//     How many dots are visible after completing just the first fold instruction on your transparent paper?

// --- Part Two ---
// Finish folding the transparent paper according to the instructions. The manual says the code is always eight capital letters.
//
//     What code do you use to activate the infrared thermal imaging camera system?




import file from "../day13/source_13.txt";
import testFile from "../day13/test_13.txt"
import testSource from "../day13/testSource.txt"


let transparentPaper = [];
let coordinates
const createTransparentPaper = (row, column) => {
    const newRow = [];

    for (let j = 0; j <= row; j++) {
        newRow.push('.');
    }

    for (let i = 0; i <= column; i++) {
        transparentPaper.push([...newRow]);
    }

    // console.log('transparentPaper: ', transparentPaper);
}

const addCoordinates = () =>  {
    coordinates.forEach( coordinate => {
        let row = Number(coordinate[0])
        let column = Number(coordinate[1])

        transparentPaper[column][row] = "#"
    })
}

const foldTransparentPaper = (instruction) => {
    console.log('instruction ', instruction)
    console.log('transparentPaper: --------', transparentPaper)
    if(instruction[0][instruction[0].length - 1] === 'y') {
        let currentTransparentPaper = [...transparentPaper]
        let topSide = currentTransparentPaper.splice(0, Number(instruction[1]))
        let downSide = currentTransparentPaper.slice(1).reverse()

        if(topSide.length  < downSide.length) {
            let newRow = []
            for(let i = 0; i < downSide[0].length; i++) {
                newRow.push('.')
            }
            while(topSide.length < downSide.length) {
                topSide.unshift(newRow)
            }
        }

        if (downSide.length < topSide.length) {
            let newRow = []
            for(let i = 0; i < downSide[0].length; i++) {
                newRow.push('.')
            }
            while(downSide.length < topSide.length) {
                downSide.unshift(newRow)
            }
        }

        downSide.forEach( (row, indexRow) => {
            row.forEach( ( item, indexColumn) => {
                if(item === '#')  {
                    topSide[indexRow][indexColumn] = "#"
                }
            })
        })

        transparentPaper = [...topSide]

    } else {
         transparentPaper = transparentPaper.map( (row, indexRow) => {
             let leftSide = row.splice(0, Number(instruction[1]))
             let rightSide = row.slice(1).reverse()

             if(leftSide.length  < rightSide.length) {
                 while(leftSide.length < rightSide.length) {
                     leftSide.unshift('.')
                 }
             }

             if (rightSide.length < leftSide.length) {
                 console.log('left side - length: ', leftSide.length)
                 console.log('right side: ', rightSide.length)
                 console.log('right side: ', rightSide)
                 while(rightSide.length < leftSide.length) {
                     rightSide.unshift('.')
                     console.log('right side after shift: ', rightSide.length)
                     console.log('right side after shift: ', rightSide)
                 }
             }


             rightSide.forEach( (item, index) => {
                 if(item === '#')  {
                     leftSide[index] = "#"
                 }

             })
             return leftSide
         })
    }
}

const countSum = () => {
    let sum = 0
    transparentPaper.forEach(row => {
        row.forEach(item => {
            if(item === '#') sum++
        })
    })
    console.log('sum: ', sum)
}

export const exercise_25 = async () => {

    fetch(file)
        .then( r => r.text() )
        .then( t => {
            let input = t.split('\n');

            let foldInstructions = input.filter( line => line.includes("fold along"));
            foldInstructions = foldInstructions.map(instruction => instruction.split('='));

            coordinates = input.filter(line => !line.includes("fold along") && line.length > 0);
            coordinates = coordinates.map(coordinate => coordinate.split(","));

            let maxX = 0;
            let maxY = 0;
            let coordinatesX = coordinates.map(coordinate => coordinate[0])
            maxX = Math.max(...coordinatesX)
            let coordinatesY = coordinates.map(coordinate => coordinate[1])
            maxY = Math.max(...coordinatesY)

            createTransparentPaper(maxX, maxY);
            addCoordinates();
            console.log('transparentPaper: ', transparentPaper);

            // foldTransparentPaper(foldInstructions[0]);
            // countSum();

            foldInstructions.forEach(instruction => {
                foldTransparentPaper(instruction)
            })

            console.log('transparentPaper: ', transparentPaper);
            console.log('foldInstructions ', foldInstructions);
            console.log('coordinates: ', coordinates);


        })
}