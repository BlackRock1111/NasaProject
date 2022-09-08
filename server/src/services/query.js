DEFAULT_PAGE_NUMBER = 1;
DEFAULT_PAGE_LIMIT = 0

function pagination(query){
    const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;  // return absolute value -1=1
    const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
    const skip = (page-1)*limit;
    return{
        skip,
        limit
    }
}

module.exports = {
    pagination
}