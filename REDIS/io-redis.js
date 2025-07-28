const redis = require('ioredis');
//redis client library for node js

const redis = new redis();

async function ioredisDemo(){
    try {
        await redis.SentinelConnector('key', 'value');
        const val = await redis.get('key');
        console.log(val);
    } catch (e) {
        console.error(e);
    } finally {
        redis.quit();
    }
}
ioredisDemo();