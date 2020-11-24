const mysql = require('../mysql')

exports.post = async (req, res, next) => {

    try {

        let  result = await mysql.execute(`INSERT INTO poupador.transaction (type_transaction, date_transaction, 
            category_transaction, description_transaction, value_transaction, id_user) VALUES (?, ?, ?, ?, ?, ?)`, 
            [req.body.type, new Date(req.body.date), req.body.category, req.body.description, req.body.value, req.body.id_user])
            
            response = {
                message: 'Transaction created with sucess!!',
                trasaction: {
                    id: result.insertId,
                    type: req.body.type,
                    date: req.body.date,
                    category: req.body.category,
                    description: req.body.description,
                    value: req.body.value,
                    id_user: req.body.id_user
                }
            }
    
            return res.status(201).send(response)

    } catch (error) {

        return res.status(500).send({error: error})
    }

}