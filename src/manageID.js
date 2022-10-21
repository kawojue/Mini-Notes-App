export const manageID = (ID, arrays) => {
    const getIDS = []
    arrays.forEach(arr => {
        getIDS.push(arr.id)
    })

    const manageID = getIDS.includes(parseInt(ID))

    return manageID
}