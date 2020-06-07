//Constants
export const apiDataUrl = 'http://127.0.0.1:8000/api/core';
export const apiAuthUrl = 'http://127.0.0.1:8000/api/clients/auth';

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


export function returnSponsorObjects(sponsor) {
    return {
        id: sponsor.id,
        name: sponsor.firstName + " " + sponsor.lastName
    }
}

export function returnCandidateObjects(candidate) {
    return {
        id: candidate.id,
        name: candidate.firstName + " " + candidate.lastName
    }
}