const mysql = require('../mysql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signUp = async (req, res, next) => {

    try {

        let result = await mysql.execute('SELECT * FROM users WHERE email_user = ?', [req.body.email])

        if (result.length > 0) {
    
            res.status(401).send({ message: 'User already exists'})

        } else {
                
            const hash = await bcrypt.hash(req.body.pass, 10) 
            result = await mysql.execute(`INSERT INTO users (name_user, email_user, pass_user) values (?, ?, ?)`, [req.body.name, req.body.email, hash])
            
            let token = jwt.sign({
                id:  result.insertId,
                email: req.body.email,
                name: req.body.name
            }, "JSRBM1@49bS#2",
            {
                expiresIn: "24h"
            })

            response = {
                message: 'User created with sucess!!',
                user: {
                    id: result.insertId,
                    email: req.body.email,
                    name: req.body.name
                },
                token: token
            }
    
            return res.status(201).send(response)
        }

    } catch (error) {

        return res.status(500).send({error: error})
    }

}

exports.signIn = async (req, res, next) => {

    try {

        let result = await mysql.execute('SELECT * FROM users WHERE email_user = ?', [req.body.email])

        if (result.length < 1) {
    
            res.status(401).send({ message: 'User already exists'})
        }
        
        if (await bcrypt.compareSync(req.body.pass, result[0].pass_user)) {

            let token = jwt.sign({
                id: result[0].id_user,
                email: result[0].email_user,
                name: result[0].name_user
            }, "JSRBM1@49bS#2",
            {
                expiresIn: "600s"
            })
    
            return res.status(200).send({ 
                message: 'User authenticated with success', 
                user: {
                    id: result[0].id_user,
                    email: result[0].email_user,
                    name: result[0].name_user
                },
                token: token
            })
        } 
                    
        return res.status(401).send({ message: 'Authentication Failure'})

    } catch (error) {

        return res.status(401).send({ message: 'Authentication Failure'})
    }
}

exports.validate = async (req, res, next) => {

    try {

        const decode = jwt.verify(req.body.token, "JSRBM1@49bS#2")
        
        return res.status(200).send({ 
            message: 'User authenticated with success', 
            user: decode,
            token: req.body.token})

    } catch (error) {
        console.log(error)
        return res.status(401).send({ message: 'Authentication Failure'})
    }
}