import fs from 'fs/promises' // 오래 걸리는 작업

// const write = async () => {
//     const buffer = await fs.writeFile(
//         './public/data.json',
//         '[{ "name": "Aqua" }, { "name": "Kazuma" }]'
//     )
// }

// write()

// const read = async () => {
//     const buffer = await fs.readFile('./public/data.json')
//     const stringData = buffer.toString()
//     const data = JSON.parse(stringData)
//     console.log('data : ', data)
// }

// read()

const readNum = async () => {
    const nums = [1, 2, 3, 4]
    const results = []
    for (const num of nums) {
        // 동기
        const result = await fs.readFile(`./public/${num}.json`)
        results.push(result)
    }
    console.log('results : ', results)

    const parsedDatas = []
    for (const result of results) {
        const parsedData = JSON.parse(result.toString())
        parsedDatas.push(parsedData)
    }
    console.log('parsedDatas : ', parsedDatas)

    const promiseResults = []
    for (const num of nums) {
        // 비동기
        const promiseResult = fs.readFile(`./public/${num}.json`)
        promiseResults.push(promiseResult)
    }
    console.log('promiseResults : ', promiseResults)

    const parsedPromiseDatas = []
    for (const result of results) {
        const parsedData = JSON.parse(result.toString())
        parsedPromiseDatas.push(parsedData)
    }
    console.log('parsedPromiseDatas : ', parsedDatas)
}

readNum()

// 네트워크 통신
// 무거운 파일들을 로컬로 직접 작업
// 오래걸리고 무거운 작업 (동기 => 비동기)
