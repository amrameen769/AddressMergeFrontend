
//Create and Return Data Array
export const returnArrayData = (data) => {
    return data.map(item => ({
        ...item
    }))
};

export const handleBackClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
        anchor.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
};