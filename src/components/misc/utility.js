
//Create and Return Data Array
export const returnArrayData = (data) => {
    return data.map(item => ({
        ...item
    }))
};