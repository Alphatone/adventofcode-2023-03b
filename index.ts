import { input } from "./input.js"

const testData: string[] = [
	'467..114..',
	'...*......',
	'..35..633.',
	'......#...',
	'617*......',
	'.....+.58.',
	'..592.....',
	'......755.',
	'...$.*....',
	'.664.598..',
]

const test: string[] = [
	'...',
	'.3-',
	'3*.',
]

let res = 0
let data = test

function isNeighbouringPartNumberAboveOrBelow(partNumberMatch: RegExpMatchArray, match: RegExpMatchArray) {
	const startOfMatchIndex = partNumberMatch.index
	const endOfMatchIndex = partNumberMatch.index + partNumberMatch[0].length - 1
	if(startOfMatchIndex >= match.index - 1 && startOfMatchIndex <= match.index + 1) {
		return true
	}
	if(endOfMatchIndex >= match.index - 1 && endOfMatchIndex <= match.index + 1) {
		return true
	}
	if(startOfMatchIndex <= match.index && endOfMatchIndex >= match.index) {
		return true
	}
}

function isNeighbouringPartNumberLeft(partnumberMatch: RegExpMatchArray, match: RegExpMatchArray): boolean {
	return match.index === partnumberMatch.index + partnumberMatch.length
}

function isNeighbouringPartNumberRight(partnumberMatch: RegExpMatchArray, match: RegExpMatchArray): boolean {
	return match.index + 1 === partnumberMatch.index
}


function algo(match: RegExpMatchArray, line: string, lineAbove: string | undefined, lineBelow: string | undefined) {
	const lines = [lineAbove, lineBelow]
	const validLines = lines.filter((line: any) => line !== undefined)
	const neighbouringPartNumbers: string[] = []

	//get neighbouring part numbers above and below
	validLines.forEach(line => {
		const partNumbersAboveOrBelow = [...line.matchAll(/\d+/g)]
		partNumbersAboveOrBelow.forEach(partNumberMatch => {
			if(isNeighbouringPartNumberAboveOrBelow(partNumberMatch, match)) {
				neighbouringPartNumbers.push(partNumberMatch[0])
			}
		})
	})

	//get neighbouring part numbers right ang left
	const partNumbersSameLine = [...line.matchAll(/\d+/g)]
	partNumbersSameLine.forEach(partNumber => {
		if(isNeighbouringPartNumberLeft(partNumber, match) || isNeighbouringPartNumberRight(partNumber, match)) {
			neighbouringPartNumbers.push(partNumber[0])
		}
	})

	if(neighbouringPartNumbers.length === 2) {
		res += parseInt(neighbouringPartNumbers[0]) * parseInt(neighbouringPartNumbers[1])
	}
}

for(let i = 0; i < data.length; i++) {
	const currentLine = data[i]
	const matches = [...currentLine.matchAll(/\*/g)]

	matches.forEach((match) => {
		algo(match, currentLine, data[i - 1], data[i + 1])
	})
}

console.log(res)

