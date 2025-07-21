const { resolve } = require('path');
const redis = require('redis');

const client = redis.createClient({
    host : 'localhost',
    port : 6379
});

client.on("error", (error) => 
    console.log("Redis client error occurred", error)
);

async function testAdditionalFeatures() {
    try {
        await client.connect();
        // const subscriber = client.duplicate() //create a new client -> but shares the same connection
        // await subscriber.connect() // connect to redis server for the subscriber

        // await subscriber.subscribe('dummy-channel', (message, channel)=> {
        //     console.log(`Received message from ${channel}: ${message}`)
        // });
        //Publish message to the dummy channel
        // await client.publish('dummy-channel', 'Some dummy data from publisher')
        // await client.publish('dummy-channel', 'Some new message from publisher')

        // await new Promise((resolve)=>setTimeout(resolve, 1000));
        // await subscriber.unsubscribe('dummy-channel')
        // await subscriber.quit() //closes subscriber connection

        //Pipelining & transactions
        const multi = client.multi();

        multi.set('key-transaction1', 'value1')
        multi.set('key-transaction2', 'value2')
        multi.get('key-transaction1')
        multi.get('key-transaction2')

        const results = await multi.exec()
        console.log(results);
    } catch (error) {
        console.error(e);
    } finally {
        client.quit();
    }
}
testAdditionalFeatures();