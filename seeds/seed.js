const {v4:uuid} = require('uuid')

exports.seed = async function(knex) {

    const numSuppliers = 5
    const numProducts = 2
    const numOptions = 4

    await knex('suppliers').del()
    await knex('products').del()
    await knex('options').del()

    for (let i=0; i<numSuppliers; i++){
console.log(i)
        const supplierId = uuid()
        await knex('suppliers').insert({id:supplierId, name:'supplier'+supplierId.substr(0,8)})

        for (let j=0; j<numProducts;j++){
            const productId = uuid()
            await knex('products').insert({id_suppliers:supplierId, id:productId, name:'product'+productId.substr(0,8)})
        }



    }



};
