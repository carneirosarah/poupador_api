const mysql = require('../mysql')

exports.post = async (req, res, next) => {

    try {

        let  result = await mysql.execute(`INSERT INTO poupador.transaction (type_transaction, date_transaction, 
            category_transaction, description_transaction, value_transaction, id_user) VALUES (?, ?, ?, ?, ?, ?)`, 
            [req.body.type, new Date(req.body.date), req.body.category, req.body.description, req.body.value, req.body.id_user])
            
            response = {
                message: 'Transaction created with sucess!!',
                transaction: {
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

exports.getByUser = async (req, res, next) => {

    try {

        let result = await mysql.execute('SELECT * FROM transaction where id_user = ?', [req.params.id_user])
            
            response = {
                transactions: result
            }
    
            return res.status(201).send(response)

    } catch (error) {

        return res.status(500).send({error: error})
    }
}

exports.totalReceivedByUser = async (req, res, next) => {

    try {

        let result = await mysql.execute('SELECT sum(value_transaction) as \'valor_total_recebido\' FROM transaction where id_user = ? and type_transaction=\'R\' group by id_user', [req.params.id_user])
            
            response = {
                transaction: result
            }
    
            return res.status(201).send(response)

    } catch (error) {

        return res.status(500).send({error: error})
    }

}

exports.totalSpentByUser = async (req, res, next) => {

    try {

        let result = await mysql.execute('SELECT sum(value_transaction) as \'valor_total_gasto\' FROM transaction where id_user = ? and type_transaction=\'D\' group by id_user', [req.params.id_user])
            
            response = {
                transaction: result
            }
    
            return res.status(201).send(response)

    } catch (error) {

        return res.status(500).send({error: error})
    }
}

exports.balanceByUser = async (req, res, next) => {

    try {

        let result = await mysql.execute('SELECT (valor_total_recebido - valor_total_gasto) as saldo FROM ' + 
            '(select id_user, sum(value_transaction) as \'valor_total_recebido\' from `poupador`.`transaction` where id_user = ? and type_transaction=\'R\' group by id_user) as t1 ' +
            'join (select id_user, sum(value_transaction) as \'valor_total_gasto\' from `poupador`.`transaction` where id_user = ? and type_transaction=\'D\' group by id_user) as t2 ' +
            'on t1.id_user = t2.id_user', [req.params.id_user, req.params.id_user])
            
            response = {
                transaction: result
            }
    
            return res.status(201).send(response)

    } catch (error) {

        return res.status(500).send({error: error})
    }
}

exports.update = async (req, res, next) => {

    try {

        let result = await mysql.execute('SELECT * FROM transaction WHERE id_transaction = ?', [req.body.id_transaction])

        if (result.length < 1) {
    
            res.status(401).send({ message: 'Transaction doesn\'t exists'})
        }
        
        result = await mysql.execute('UPDATE transaction set ' +
            '`type_transaction` = ?, ' +
            '`date_transaction` = ?, ' +
            '`category_transaction` = ?, ' +
            '`description_transaction` = ?, ' +
            '`value_transaction` = ? ' +
            'WHERE `id_transaction` = ?', [req.body.type, req.body.date, req.body.category, req.body.description, req.body.value, req.body.id_transaction])

        return res.status(200).send({ 
            message: 'Transaction updated with success',
            status: 200
        })
                    
    } catch (error) {
        console.log(error)
        return res.status(401).send({ message: 'Update Failure', status: 401})
    }
}

exports.delete = async (req, res, next) => {

    try {

        let result = await mysql.execute('DELETE FROM transaction WHERE `id_transaction` = ?', [req.params.id])

        return res.status(200).send({ 
            message: 'Transaction deleted with success',
            status: 200
        })
                    
    } catch (error) {

        return res.status(401).send({ message: 'Delete Failure', status: 401})
    }
}

exports.getByUserAndPeriod = async (req, res, next) => {

    try {

        let result = await mysql.execute('SELECT * FROM transaction where id_user = ? and date_transaction between ? and ?', 
            [req.params.id_user, req.params.date_begin, req.params.date_finish])
            
            response = {
                transactions: result
            }
    
            return res.status(201).send(response)

    } catch (error) {

        return res.status(500).send({error: error})
    }
}

exports.totalReceivedByUserAndPeriod = async (req, res, next) => {

    try {

        let result = await mysql.execute('SELECT sum(value_transaction) as \'valor_total_recebido\' FROM transaction where id_user = ? and type_transaction=\'R\' and date_transaction between ? and ? group by id_user', 
            [req.params.id_user, req.params.date_begin, req.params.date_finish])
            
            response = {
                transaction: result
            }
    
            return res.status(201).send(response)

    } catch (error) {

        return res.status(500).send({error: error})
    }
}

exports.totalSpentByUserAndPeriod = async (req, res, next) => {

    try {

        let result = await mysql.execute('SELECT sum(value_transaction) as \'valor_total_gasto\' FROM transaction where id_user = ? and type_transaction=\'D\' and date_transaction between ? and ? group by id_user', 
            [req.params.id_user, req.params.date_begin, req.params.date_finish])
            
            response = {
                transaction: result
            }
    
            return res.status(201).send(response)

    } catch (error) {

        return res.status(500).send({error: error})
    }
}

exports.balanceByUserAndPeriod = async (req, res, next) => {

    try {

        let result = await mysql.execute('SELECT (valor_total_recebido - valor_total_gasto) as saldo FROM ' + 
            '(select id_user, sum(value_transaction) as \'valor_total_recebido\' from `poupador`.`transaction` where id_user = ? and type_transaction=\'R\' and date_transaction between ? and ? group by id_user) as t1 ' +
            'join (select id_user, sum(value_transaction) as \'valor_total_gasto\' from `poupador`.`transaction` where id_user = ? and type_transaction=\'D\' and date_transaction between ? and ? group by id_user) as t2 ' +
            'on t1.id_user = t2.id_user', [req.params.id_user, req.params.date_begin, req.params.date_finish, req.params.id_user, req.params.date_begin, req.params.date_finish])
            
            response = {
                transaction: result
            }
    
            return res.status(201).send(response)

    } catch (error) {

        return res.status(500).send({error: error})
    }
}