const redis = require('redis');

const client = redis.createClient({
    host : 'localhost',
    port : 6379
});

//event listener
client.on("error", (error) => 
    console.log("Redis client error occurred", error)
);

async function redisDataStructures() {
    try {
        await client.connect()
        // Strings -> SET, GET, MSET, MGET
        //await client.set("user:name", "Kolawole Olaribigbe");
        //const name = await client.get("user:name")
        //console.log(name); 

        // await client.mSet(["user:email","sangam@gmail.com","user:age", "60", "user:country", "India"])
        // const [email, age, country] = await client.mGet([
        //     "user:email", 
        //     "user:age", 
        //     "user:country"
        // ]);
        //console.log(email, age, country);
        
        //lists -> LPUSH, RPUSH, LRANGE, LPOP, RPOP
        //await client.lPush("notes", ["note 1", "note 2", "note 3"])
        // const extractAllNotes = await client.lRange("notes", 0, -1);
        // console.log(extractAllNotes);

        // const firstNote = await client.lPop("notes");
        // console.log(firstNote);

        // const remainingNotes = await client.lRange("notes", 0, -1);
        // console.log(remainingNotes, "remainingNotes");

        //Sets -> SADD, SMEMBERS, SISMEMBER, SREM
        // await client.sAdd("user:nickName", ["john", "varun", "xyz"]);
        // const extractUserNicknames = client.sMembers("user:nickName");
        // console.log(extractUserNicknames);

        // const isVarunOneOfUserNicknames = await client.sIsMember("user:nickname","varun");
        // console.log(isVarunOneOfUserNicknames);

        // await client.sRem("user:nickname", 'xyz');
        // const getUpdatedUserNickname = await client.sMembers("user:nickname");
        // console.log(getUpdatedUserNickname);


        //sorted sets
        //ZADD, ZRANGE, ZRANK, ZREM
        // await client.zAdd('cart', [
        //     {
        //         score : 100, 
        //         value : 'cart 1'
        //     },
        //     {
        //         score : 150, 
        //         value : 'cart 2'
        //     },
        //     {
        //         score : 10, 
        //         value : 'cart 3'
        //     }
        // ]);
        //  const getTopCartItems = await client.zRange("cart", 0, -1);
        //  console.log(getTopCartItems);

        //  const extractAllCartItemsWithScore = await client.zRangeWithScores('cart', 0, -1);
        //  console.log(extractAllCartItemsWithScore);

        //  const cartTwoRank = await client.zRank("cart", "cart 2");
        //  console.log(cartTwoRank);

        //Hashes -> HSET, HGET, HGETALL, HDEL
        await client.hSet('product: 1', {
            name : 'Product 1',
            description : 'product one description',
            rating : '5'
        });
        const getProductRating = await client.hGet('product: 1', 'rating');
        console.log(getProductRating);

        const getProductDetails = await client.hGetAll('product: 1');
        console.log(getProductDetails);

        await client.hDel('product: 1', 'rating');
        const updatedProductDetails = await client.hGetAll('product: 1');
        console.log(updatedProductDetails);
    } catch (e) {
        console.error(e)
    } finally {
        client.quit()
    }
}
redisDataStructures()