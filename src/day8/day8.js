// --- Day 8: Seven Segment Search ---
// You barely reach the safety of the cave when the whale smashes into the cave mouth, collapsing it. Sensors indicate another exit to this cave at a much greater depth, so you have no choice but to press on.
//
//     As your submarine slowly makes its way through the cave system, you notice that the four-digit seven-segment displays in your submarine are malfunctioning; they must have been damaged during the escape. You'll be in a lot of trouble without them, so you'd better figure out what's wrong.
//
// Each digit of a seven-segment display is rendered by turning on or off any of seven segments named a through g:
//
//     0:      1:      2:      3:      4:
// aaaa    ....    aaaa    aaaa    ....
// b    c  .    c  .    c  .    c  b    c
// b    c  .    c  .    c  .    c  b    c
// ....    ....    dddd    dddd    dddd
// e    f  .    f  e    .  .    f  .    f
// e    f  .    f  e    .  .    f  .    f
// gggg    ....    gggg    gggg    ....
//
// 5:      6:      7:      8:      9:
// aaaa    aaaa    aaaa    aaaa    aaaa
// b    .  b    .  .    c  b    c  b    c
// b    .  b    .  .    c  b    c  b    c
// dddd    dddd    ....    dddd    dddd
//     .    f  e    f  .    f  e    f  .    f
//     .    f  e    f  .    f  e    f  .    f
// gggg    gggg    ....    gggg    gggg
// So, to render a 1, only segments c and f would be turned on; the rest would be off. To render a 7, only segments a, c, and f would be turned on.
//
//     The problem is that the signals which control the segments have been mixed up on each display. The submarine is still trying to display numbers by producing output on signal wires a through g, but those wires are connected to segments randomly. Worse, the wire/segment connections are mixed up separately for each four-digit display! (All of the digits within a display use the same connections, though.)
//
// So, you might know that only signal wires b and g are turned on, but that doesn't mean segments b and g are turned on: the only digit that uses two segments is 1, so it must mean segments c and f are meant to be on. With just that information, you still can't tell which wire (b/g) goes to which segment (c/f). For that, you'll need to collect more information.
//
// For each display, you watch the changing signals for a while, make a note of all ten unique signal patterns you see, and then write down a single four digit output value (your puzzle input). Using the signal patterns, you should be able to work out which pattern corresponds to which digit.
//
//     For example, here is what you might see in a single entry in your notes:
//
//     acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab |
// cdfeb fcadb cdfeb cdbaf
// (The entry is wrapped here to two lines so it fits; in your notes, it will all be on a single line.)
//
// Each entry consists of ten unique signal patterns, a | delimiter, and finally the four digit output value. Within an entry, the same wire/segment connections are used (but you don't know what the connections actually are). The unique signal patterns correspond to the ten different ways the submarine tries to render a digit using the current wire/segment connections. Because 7 is the only digit that uses three segments, dab in the above example means that to render a 7, signal lines d, a, and b are on. Because 4 is the only digit that uses four segments, eafb means that to render a 4, signal lines e, a, f, and b are on.
//
// Using this information, you should be able to work out which combination of signal wires corresponds to each of the ten digits. Then, you can decode the four digit output value. Unfortunately, in the above example, all of the digits in the output value (cdfeb fcadb cdfeb cdbaf) use five segments and are more difficult to deduce.
//
//     For now, focus on the easy digits. Consider this larger example:
//
// be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb |
// fdgacbe cefdb cefbgd gcbe
// edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec |
// fcgedb cgb dgebacf gc
// fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef |
// cg cg fdcagb cbg
// fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega |
// efabcd cedba gadfec cb
// aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga |
// gecf egdcabf bgf bfgea
// fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf |
// gebdcfa ecba ca fadegcb
// dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf |
// cefg dcbef fcge gbcadfe
// bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd |
// ed bcgafe cdgba cbgef
// egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg |
// gbdfcae bgc cg cgb
// gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc |
// fgae cfgab fg bagce
// Because the digits 1, 4, 7, and 8 each use a unique number of segments, you should be able to tell which combinations of signals correspond to those digits. Counting only digits in the output values (the part after | on each line), in the above example, there are 26 instances of digits that use a unique number of segments (highlighted above).
//
// In the output values, how many times do digits 1, 4, 7, or 8 appear?

// --- Part Two ---
// Through a little deduction, you should now be able to determine the remaining digits. Consider again the first example above:
//
//     acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab |
// cdfeb fcadb cdfeb cdbaf
// After some careful analysis, the mapping between signal wires and segments only make sense in the following configuration:
//
//     dddd
// e    a
// e    a
// ffff
// g    b
// g    b
// cccc
// So, the unique signal patterns would correspond to the following digits:
//
//     acedgfb: 8
// cdfbe: 5
// gcdfa: 2
// fbcad: 3
// dab: 7
// cefabd: 9
// cdfgeb: 6
// eafb: 4
// cagedb: 0
// ab: 1
// Then, the four digits of the output value can be decoded:
//
//     cdfeb: 5
// fcadb: 3
// cdfeb: 5
// cdbaf: 3
// Therefore, the output value for this entry is 5353.
//
// Following this same process for each entry in the second, larger example above, the output value of each entry can be determined:
//
//     fdgacbe cefdb cefbgd gcbe: 8394
// fcgedb cgb dgebacf gc: 9781
// cg cg fdcagb cbg: 1197
// efabcd cedba gadfec cb: 9361
// gecf egdcabf bgf bfgea: 4873
// gebdcfa ecba ca fadegcb: 8418
// cefg dcbef fcge gbcadfe: 4548
// ed bcgafe cdgba cbgef: 1625
// gbdfcae bgc cg cgb: 8717
// fgae cfgab fg bagce: 4315
// Adding all of the output values in this larger example produces 61229.
//
// For each entry, determine all of the wire/segment connections and decode the four-digit output values. What do you get if you add up all of the output values?


import file from "../day8/source_8.txt";
import testFile from "../day8/test_8.txt"

let pattern = {
    eight: '',
    four: '',
    one: '',
}

let sumNum = {
    zero: 0,
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
    six: 0,
    seven: 0,
    eight: 0,
    nine: 0
}

let number = ''

let sumAllNumbers = 0

const decide = function(text) {
    let letters = text.split('')

};

const decideNumber = (number) => {
     if(pattern.eight.length === 0) {
         console.error('pattern is empty')
         return null
     }

     if(number.length === 2) {
         return 1
     } else if (number.length === 3) {
         return 7
     } else if (number.length === 4) {
         return 4
     } else if (number.length === 7) {
         return 8
     } else if( number.length === 6) {
         // if( number[2] === pattern.[3]) {
         //     return 6
         // } else if ( number[3] === pattern[3]) {
         //     return 0
         // } else {
         //     return 9
         // }

         // let splitNumber = number.split('')
         let splitFour = pattern.four.split('')
         let splitOne =  pattern.one.split('')
         // console.log('split four: ', splitFour)
         // console.log('number: ', number)

         const notIncludesOnFour = []
         while(splitFour.length > 0) {
             if(number.includes(splitFour[0])) {
                 splitFour.shift()
             } else {
                 notIncludesOnFour.push(splitFour[0])
                 splitFour.shift()
             }
         }

         // console.log('notIncludesOnFour: ', notIncludesOnFour)
         // console.log('notIncludesFour.length: ', notIncludesOnFour.length)
         if(notIncludesOnFour.length > 0) {
             if(pattern.one.includes(notIncludesOnFour[0])) return 6
             return 0
         }


         const notIncludesOnOne = []
         while(splitOne.length > 0) {
             if(number.includes(splitOne[0])) {
                 splitOne.shift()
             } else {
                 notIncludesOnOne.push(splitOne[0])
                 splitOne.shift()
             }
         }

         // console.log('notIncludesOnOne: ', notIncludesOnOne)
         if(notIncludesOnOne.length > 0) return 6

         // console.log('letters: ', letters)

         return 9


     } else {
         // if( number[1] === pattern[1]) {
         //     return 5
         // } else if(number[4] === pattern[5]) {
         //     return 2
         // } else {
         //     return 3
         // }

         let splitFour = pattern.four.split('')
         let splitOne =  pattern.one.split('')

         const includesOnOne = []
         while(splitOne.length > 0) {
             if(number.includes(splitOne[0])) {
                 includesOnOne.push(splitOne[0])
                 splitOne.shift()
             } else {
                 splitOne.shift()
             }
         }

         if(includesOnOne.length === 2) return 3

         console.log('split four: ', splitFour, ' one ', pattern.one)
         console.log('number:  ', number)
         let notIncludesOnNumber = 0
         for(let i = 0; i < splitFour.length; i++) {
             if(number.includes(splitFour[i]) && !pattern.one.includes(splitFour[i])) notIncludesOnNumber++
         }
         // if(number.includes(splitFour[0])) notIncludesOnNumber++
         // if(number.includes(splitFour[1])) notIncludesOnNumber++

         if(notIncludesOnNumber > 1) return 5

         return 2

         // const notIncludesOnOne = []
         // while(splitOne.length > 0) {
         //     if(number.includes(splitOne[0])) {
         //         splitOne.shift()
         //     } else {
         //         notIncludesOnOne.push(splitOne[0])
         //         splitOne.shift()
         //     }
         // }
         //
         // if(notIncludesOnOne.length <= 0) return 6
     }
}

export const exercise_15 = async () => {
    fetch(file)
        .then( r => r.text() )
        .then( t => {
            let signals = t.split('\n');
            signals = signals.map(signal => signal.split(" | "))

            signals = signals.map( signal => signal.map( s => s.split(" ")))

            signals.forEach( signal => {
                let couldBePattern = signal[0].filter( num => num.length === 7)
                if(couldBePattern.length >= 1) pattern.eight = couldBePattern[0]
                couldBePattern = signal[0].filter( num => num.length === 4)
                if(couldBePattern.length >= 1) pattern.four = couldBePattern[0]
                couldBePattern = signal[0].filter( num => num.length === 2)
                if(couldBePattern.length >= 1) pattern.one = couldBePattern[0]


                if(pattern.length === 0) {
                    // couldBePattern = signal[0].filter( num => num.length === 4 || num.length === 3)

                    console.error('need to implement other wat: ', couldBePattern)
                }
                // console.log('signal 0 ' , pattern)
                console.log('signal: ', signal[1])
                signal[1].forEach( num => {
                    let lookingNumber = decideNumber(num)

                    // switch(lookingNumber) {
                    //     case 0:
                    //         sumNum.zero++
                    //         break
                    //     case 1:
                    //         sumNum.one++
                    //         break
                    //     case 2:
                    //         sumNum.two++
                    //         break
                    //     case 3:
                    //         sumNum.three++
                    //         break
                    //     case 4:
                    //         sumNum.four++
                    //         break
                    //     case 5:
                    //         sumNum.five++
                    //         break
                    //     case 6:
                    //         sumNum.six++
                    //         break
                    //     case 7:
                    //         sumNum.seven++
                    //         break
                    //     case 8:
                    //         sumNum.eight++
                    //         break
                    //     case 9:
                    //         sumNum.nine++
                    //         break
                    //     default:
                    //         console.error('not matching num: ', lookingNumber)
                    // }

                    number += lookingNumber.toString()
                })
                console.log('number: ', number)
                sumAllNumbers += Number(number)
                number = ''

            })

            // console.log('sum: ', sumNum.one + sumNum.four + sumNum.seven + sumNum.eight)
            console.log('sum: ', sumAllNumbers)



        } )
}