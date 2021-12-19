// --- Day 15: Chiton ---
// You've almost reached the exit of the cave, but the walls are getting closer together. Your submarine can barely still fit, though; the main problem is that the walls of the cave are covered in chitons, and it would be best not to bump any of them.
//
// The cavern is large, but has a very low ceiling, restricting your motion to two dimensions. The shape of the cavern resembles a square; a quick scan of chiton density produces a map of risk level throughout the cave (your puzzle input). For example:
//
//     1163751742
// 1381373672
// 2136511328
// 3694931569
// 7463417111
// 1319128137
// 1359912421
// 3125421639
// 1293138521
// 2311944581
// You start in the top left position, your destination is the bottom right position, and you cannot move diagonally. The number at each position is its risk level; to determine the total risk of an entire path, add up the risk levels of each position you enter (that is, don't count the risk level of your starting position unless you enter it; leaving it adds no risk to your total).
//
// Your goal is to find a path with the lowest total risk. In this example, a path with the lowest total risk is highlighted here:
//
//     1163751742
// 1381373672
// 2136511328
// 3694931569
// 7463417111
// 1319128137
// 1359912421
// 3125421639
// 1293138521
// 2311944581
// The total risk of this path is 40 (the starting position is never entered, so its risk is not counted).
//
// What is the lowest total risk of any path from the top left to the bottom right?


import file from "../day15/source_15.txt";
import testFile from "../day15/test_15.txt"

const coordinatesToIndex = ({x, y}, map) => {
    return x + y * map.length
}

const indexToCoordinates = (index, map) => {
    const x = index % map.length
    const y = (index - x)/map.length
    return {
        x,
        y
    }
}

const getNeighbors = (index, map) => {
    const {x , y} = indexToCoordinates(index, map)
    return [
        { x: x - 1, y },
        { x: x + 1, y },
        { x, y: y - 1 },
        { x, y: y + 1 },

    ].filter(({x, y}) => x >= 0 && y >= 0 && x < map.length && y <map.length)
}

/**
 *  1   function Dijkstra(Graph, source):
 *  2
 *  3      create vertex set Q
 *  4
 *  5      for each vertex v in Graph:
 *  6          dist[v] ← INFINITY
 *  7          prev[v] ← UNDEFINED
 *  8          add v to Q
 *  9      dist[source] ← 0
 * 10
 * 11      while Q is not empty:
 * 12          u ← vertex in Q with min dist[u]
 * 13
 * 14          remove u from Q
 * 15
 * 16          for each neighbor v of u still in Q:
 * 17              alt ← dist[u] + length(u, v)
 * 18              if alt < dist[v]:
 * 19                  dist[v] ← alt
 * 20                  prev[v] ← u
 * 21
 * 22      return dist[], prev[]
 *
 * If we are only interested in a shortest path between vertices source and target, we can terminate the search
 * after line 15 if u = target. Now we can read the shortest path from source to target by reverse iteration:
 *
 * 1  S ← empty sequence
 * 2  u ← target
 * 3  if prev[u] is defined or u = source:          // Do something only if the vertex is reachable
 * 4      while u is defined:                       // Construct the shortest path with a stack S
 * 5          insert u at the beginning of S        // Push the vertex onto the stack
 * 6          u ← prev[u]                           // Traverse from target to source
 */

export const exercise_29 = async () => {
    fetch(file)
        .then( r => r.text() )
        .then( t => {
            let map = t.split('\n').map( x => [...x].map(Number))
            console.log(map)
            const from = {x:0, y:0}
            const to = {x: map.length - 1, y: map.length - 1}

            const Q = Array(map.length * map.length).fill(0).map( (x, index) => index);
            const dist = Array(map.length * map.length).fill(Infinity)
            const prev = Array(map.length * map.length).fill(null)

            dist[0] = 0

            while(Q.length > 0) {
                let min = Infinity
                let minIndex = 0
                for(let i = 0; i < Q.length; i++) {
                    const element = Q[i]
                    if(dist[element] < min) {
                        min = dist[element]
                        minIndex = i
                    }
                }

                const [u] = Q.splice(minIndex, 1)

                const neighbors = getNeighbors(u, map)
                for (const neighbor of neighbors) {
                    const neighborIndex = coordinatesToIndex(neighbor, map)
                    const alt = dist[u] + map[neighbor.y][neighbor.x]
                    if(alt < dist[neighborIndex]) {
                        dist[neighborIndex] = alt
                        prev[neighborIndex] = u
                    }
                }
            }

            console.log('prev ', prev, ' dist ', dist)

            console.log('shortest way: ', dist[coordinatesToIndex(to, map)])

        })
}