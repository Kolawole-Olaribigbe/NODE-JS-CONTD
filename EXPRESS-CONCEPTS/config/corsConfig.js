const cors = require('cors');

const configureCors = () => {
    return cors({
        //origin -> this will determine which origin the user can access the API from
        origin : (origin, callback)=>{
            const allowedOrigins = [
                'https://localhost', //local dev
                'https://yourcustomdomain.com', //production domain
            ]
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true) //giving permission so the request can be allowed
            } else {
                callback(new Error('Not allowed by cors'))
            }
        },
        methods : ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders : [
            'Content-Type',
            'Authorization',
            'Accept-Version'
        ],
        exposedHeaders : ['X-Total-Count', 'Content-Range'],
        credentials : true, //enables support for cookies
        preflightContinue : false,
        maxAge : 600, // cache pre flight responses for 10 mins (600 seconds) -> avoid sending options requests multiple times
        optionsSuccessStatus : 204
    });
}
module.exports = {configureCors}