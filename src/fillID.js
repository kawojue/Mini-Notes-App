export const fillID = (array) => {
    let id = 0
    const [IDList, newArr] = [
        [],
        []
    ]
    array.forEach(arr => {
        IDList.push(arr.id)
    })

    const getMax = Math.max(...IDList)
    for (let i = 1; i <= getMax; i++) {
        if (!IDList.includes(i)) {
            newArr.push(i)
        }
    }

    if (array.length === getMax || array.length === 0) {
        id = array.length + 1
    } else {
        id = newArr[0]
    }

    return id
}