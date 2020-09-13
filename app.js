const express = require("express")
const {postgraphile} = require("postgraphile")
const moment = require('moment')
const { run, quickAddJob } = require("graphile-worker");

require('dotenv').config()


const app = express()

app.use(
    postgraphile(
        process.env.DATABASE_URL || "postgres://postgres:@localhost:5432/pggql",
        "public",
        {
            watchPg: true,
            graphiql: true,
            enhanceGraphiql: true,
            subscriptions: true
        }
    )
)

app.listen(process.env.PORT || 3000)

setInterval(async ()=>{
    const time = moment().format('hh:mm')
    console.log(time)
    await quickAddJob(
        // makeWorkerUtils options
        { connectionString: "postgres://postgres:@localhost:5432/pggql" },

        // Task identifier
        "hello",

        // Payload
        { name: `Bobby Tables ${time}` },
    );},60000)

async function main() {
    // Run a worker to execute jobs:
    const runner = await run({
        connectionString: "postgres://postgres:@localhost:5432/pggql",
        concurrency: 5,
        // Install signal handlers for graceful shutdown on SIGINT, SIGTERM, etc
        noHandleSignals: false,
        pollInterval: 1000,
        // you can set the taskList or taskDirectory but not both
        taskList: {
            hello: async (payload, helpers) => {
                const { name } = payload;
                helpers.logger.info(`Hello, ${name}`);
            },
        },
        // or:
        //   taskDirectory: `${__dirname}/tasks`,
    });

}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
