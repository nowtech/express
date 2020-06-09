const express = require("express");
const { postgraphile } = require("postgraphile");

require('dotenv').config()


const app = express();

app.use(
    postgraphile(
        process.env.DATABASE_URL || "postgres://postgres:@localhost:5432/pggql",
        "public",
        {
          watchPg: true,
          graphiql: true,
          enhanceGraphiql: true,
        }
    )
);

app.listen(process.env.PORT || 3000);