class APIFeatures {
    
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    //replace req.query into this.queryString , query into this.query
    filter() {
        
        const queryObj = {...this.queryString};
        const excludeFields = ['page','sort','limit','fields'];
        excludeFields.forEach(el => delete queryObj[el]);
        
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        console.log(JSON.parse(queryStr));
        //let query = Tour.find(JSON.parse(queryStr));
        this.query.find(JSON.parse(queryStr));
        return this;
    }
    //replace req.query into this.queryString , query into this.query
    sort() {
        if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            console.log(sortBy);
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }
    //replace req.query into this.queryString , query into this.query
    limitFields() {
        if(this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }
        return this;
    }
    //replace req.query into this.queryString , query into this.query
    paginate() {
        const page = this.queryString.page * 1 || 1;
        //hundred data each request
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
        };
    
};

module.exports = APIFeatures;