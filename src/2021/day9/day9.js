// --- Day 9: Smoke Basin ---
// These caves seem to be lava tubes. Parts are even still volcanically active; small hydrothermal vents release smoke into the caves that slowly settles like rain.
//
//     If you can model how the smoke flows through the caves, you might be able to avoid it and be that much safer. The submarine generates a heightmap of the floor of the nearby caves for you (your puzzle input).
//
// Smoke flows to the lowest point of the area it's in. For example, consider the following heightmap:
//
// 2199943210
// 3987894921
// 9856789892
// 8767896789
// 9899965678
// Each number corresponds to the height of a particular location, where 9 is the highest and 0 is the lowest a location can be.
//
//     Your first goal is to find the low points - the locations that are lower than any of its adjacent locations. Most locations have four adjacent locations (up, down, left, and right); locations on the edge or corner of the map have three or two adjacent locations, respectively. (Diagonal locations do not count as adjacent.)
//
// In the above example, there are four low points, all highlighted: two are in the first row (a 1 and a 0), one is in the third row (a 5), and one is in the bottom row (also a 5). All other locations on the heightmap have some lower adjacent location, and so are not low points.
//
//     The risk level of a low point is 1 plus its height. In the above example, the risk levels of the low points are 2, 1, 6, and 6. The sum of the risk levels of all low points in the heightmap is therefore 15.
//
// Find all of the low points on your heightmap. What is the sum of the risk levels of all low points on your heightmap?

// --- Part Two ---
// Next, you need to find the largest basins so you know what areas are most important to avoid.
//
//     A basin is all locations that eventually flow downward to a single low point. Therefore, every low point has a basin, although some basins are very small. Locations of height 9 do not count as being in any basin, and all other locations will always be part of exactly one basin.
//
//     The size of a basin is the number of locations within the basin, including the low point. The example above has four basins.
//
//     The top-left basin, size 3:
//
// 2199943210
// 3987894921
// 9856789892
// 8767896789
// 9899965678
// The top-right basin, size 9:
//
// 2199943210
// 3987894921
// 9856789892
// 8767896789
// 9899965678
// The middle basin, size 14:
//
// 2199943210
// 3987894921
// 9856789892
// 8767896789
// 9899965678
// The bottom-right basin, size 9:
//
// 2199943210
// 3987894921
// 9856789892
// 8767896789
// 9899965678
// Find the three largest basins and multiply their sizes together. In the above example, this is 9 * 14 * 9 = 1134.
//
// What do you get if you multiply together the sizes of the three largest basins?

import file from "./source_9.txt";
import testFile from "./test_9.txt"

const lowPoints = []
let heightmap
let basins = []
let basinsLength = []
let helpBasin = []

const DIRECTION = {
    up: "up",
    down: "down",
    right: "right",
    left: "left"
}
const isItLowPoint = (point, x, y) => {
    // console.log('point: ', point, ' x: ', x, 'y: ', y)
    if ( x === heightmap[0].length - 1 &&  y === heightmap.length - 1) {
        return Number(point) < Number(heightmap[y][x - 1]) &&
            Number(point) < Number(heightmap[y - 1][x])
    } else if ( x === heightmap[0].length - 1 && y < 1) {
        return Number(point) < Number(heightmap[y + 1][x]) &&
            Number(point) < Number(heightmap[y][x - 1])
    } else if ( x < 1 && y === heightmap.length - 1) {
        return Number(point) < Number(heightmap[y - 1][x]) &&
            Number(point) < Number(heightmap[y][x + 1])
    } else if ( x >= 1 && x < heightmap[0].length - 1 && y < 1 ) {
        return Number(point) < Number(heightmap[y][x-1]) &&
            Number(point) < Number(heightmap[y + 1][x]) &&
            Number(point) < Number(heightmap[y][x + 1])
    } else if (x >= 1 && x < heightmap[0].length - 1 && y === heightmap.length - 1) {
        return Number(point) < Number(heightmap[y][x-1]) &&
            Number(point) < Number(heightmap[y - 1][x]) &&
            Number(point) < Number(heightmap[y][x + 1])
    } else if ( x < 1 && y >= 1  && y < heightmap.length - 1) {
        return Number(point) < Number(heightmap[y - 1][x]) &&
            Number(point) < Number(heightmap[y + 1][x]) &&
            Number(point) < Number(heightmap[y][x + 1])
    } else if  ( x === heightmap[0].length - 1 && y >= 1  && y < heightmap.length - 1) {
        return Number(point) < Number(heightmap[y][x-1]) &&
        Number(point) < Number(heightmap[y - 1][x]) &&
        Number(point) < Number(heightmap[y + 1][x])
    } else if ( x < 1 && y < 1){
        return Number(point) < Number(heightmap[y + 1][x]) &&
            Number(point) < Number(heightmap[y][x + 1])
    } else if(x >= 1 && x < heightmap[0].length - 1 && y >= 1  && y < heightmap.length - 1) {
        return Number(point) < Number(heightmap[y][x-1]) &&
            Number(point) < Number(heightmap[y - 1][x]) &&
            Number(point) < Number(heightmap[y + 1][x]) &&
            Number(point) < Number(heightmap[y][x + 1])
    } else {
        console.error('non defined condition. point: ', point, ' x: ', x, 'y: ', y)
    }

}

const createBasins = (point) => {
    helpBasin = []
    helpBasin.push({...point, direction: [DIRECTION.right, DIRECTION.left, DIRECTION.down, DIRECTION.up]})

    // helpBasin.forEach( (item, index) => {
    for(let i = 0; i < helpBasin.length; i++) {
        let item = helpBasin[i]
        let currentDirection
        while(item.direction.length > 0) {
            currentDirection = item.direction.shift()
            console.log('currentDirection', currentDirection)
            let heightmapPoint
            let duplicate = null
            switch(currentDirection){
                case DIRECTION.right:
                    heightmapPoint = item.x + 1 < heightmap[item.y].length ? Number(heightmap[item.y][item.x + 1]) : null
                    if(heightmapPoint && Number(heightmapPoint) < 9 && Number(heightmapPoint) > item.number) {
                        duplicate = helpBasin
                            .find(num => num.number === heightmapPoint && num.x === item.x + 1 && num.y === item.y)
                        if(duplicate) {
                            console.error('duplicate !!!!!!!!!!')
                        } else {
                            helpBasin.push({
                                number: heightmapPoint,
                                x: item.x + 1,
                                y: item.y,
                                direction: [DIRECTION.right, DIRECTION.down, DIRECTION.up]
                            })
                        }

                    }
                    break
                case DIRECTION.left:
                    heightmapPoint = item.x - 1 >= 0 ? Number(heightmap[item.y][item.x - 1]) : null
                    if (heightmapPoint && Number(heightmapPoint) < 9 && Number(heightmapPoint) > item.number) {
                        duplicate = helpBasin
                            .find(num => num.number === heightmapPoint && num.x === item.x - 1  && num.y === item.y)
                        if (duplicate) {
                            console.error('duplicate !!!!!!!!!!')
                        } else {
                            helpBasin.push({
                                number: heightmapPoint,
                                x: item.x - 1,
                                y: item.y,
                                direction: [DIRECTION.left, DIRECTION.down, DIRECTION.up]
                            })
                        }

                    }
                    break
                case DIRECTION.up:
                    heightmapPoint = item.y - 1 >= 0 ?  Number(heightmap[item.y - 1][item.x]) : null
                    if (heightmapPoint && Number(heightmapPoint) < 9 && Number(heightmapPoint) > item.number) {
                        duplicate = helpBasin
                            .find(num => {
                                if(Number(heightmapPoint) === 8){
                                    console.log('num: ', num)
                                    console.log('num x: ', num.x, 'item x: ', item.x, ' num y: ', num.y, ' item y - 1', item.y - 1)
                                }

                                return num.number === heightmapPoint && num.x === item.x  && num.y === item.y - 1
                            })
                        if (duplicate) {
                            console.error('duplicate !!!!!!!!!!')
                        } else {
                            helpBasin.push({
                                number: heightmapPoint,
                                x: item.x,
                                y: item.y - 1,
                                direction: [DIRECTION.left, DIRECTION.right, DIRECTION.up]
                            })
                        }

                    }
                    break
                case DIRECTION.down:
                    heightmapPoint = item.y + 1 < heightmap.length ? Number(heightmap[item.y + 1][item.x]) : null
                    if (heightmapPoint && Number(heightmapPoint) < 9 && Number(heightmapPoint) > item.number) {
                        duplicate = helpBasin
                            .find(num => num.number === heightmapPoint && num.x === item.x  && num.y === item.y + 1)
                        if (duplicate) {
                            console.error('duplicate !!!!!!!!!!')
                        } else {
                            helpBasin.push({
                                number: heightmapPoint,
                                x: item.x,
                                y: item.y + 1,
                                direction: [DIRECTION.left, DIRECTION.right, DIRECTION.down]
                            })
                        }

                    }
                    break
            }
        }
    }
    console.log(helpBasin)
    return helpBasin
}

export const exercise_17 = async () => {

    fetch(file)
        .then( r => r.text() )
        .then( t => {
            heightmap = t.split('\n');
            heightmap = heightmap.map( row => row.split(''))

            console.log('heightmap: ', heightmap)

            heightmap.forEach( (row, indexY) => {
                row.forEach( (number, indexX) => {
                    // if(isItLowPoint(number, indexX, indexY)) lowPoints.push(Number(number) + 1)
                    if(isItLowPoint(number, indexX, indexY)) lowPoints.push({number: Number(number), x: indexX, y: indexY})
                })
            })

            console.log('heightmap: ', heightmap)
            // console.log('lowPoints: ', lowPoints)

            // let sum = lowPoints.reduce( (previous, next) => previous + next)
            //
            // console.log('sum: ', sum)

            lowPoints.forEach( lowPoint => {
                console.log('lowPoint: ', lowPoint)
                basins.push(createBasins(lowPoint))
            })

            console.log('basins: ', basins)

            basins.forEach( base => {
                basinsLength.push(base.length)
            })

            basinsLength = basinsLength.sort((a, b) => b - a)

            console.log('basinsLength: ', basinsLength)

            console.log('multiply [0, 2] ', basinsLength[0] * basinsLength[1] * basinsLength[2])

        } )
}
