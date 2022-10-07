const express = require("express");
const router = express.Router();
const Yup = require("yup");
const pool = require("../src/db");
//const bcrypt = require("bcrypt");

router
    .get('/users', async (req, res) => {
        const client = await pool.connect()
        try {
            const result = await client.query(`
                SELECT u.id, u.first_name, u.last_name 
                FROM users u
            `)
            res.send(result.rows)
        } catch (err) {
            console.log(err.stack)
        } finally {
            client.release()
        }
    })
    .post('/users', async (req, res) => {
        const client = await pool.connect()
        try {
            const userId = Number(req.body.userId)
            const result = await client.query(`
                SELECT u.id, u.first_name, u.last_name, 
                    CASE WHEN ((f.user_id = ${ userId } OR f.other_user_id = ${ userId })
                    OR (f2.other_user_id = ${ userId } OR f2.user_id = ${ userId })) 
                        THEN 'true' ELSE 'false' END 
                FROM users u 
                LEFT JOIN friends f ON u.id = f.other_user_id 
                LEFT JOIN friends f2 ON u.id = f2.user_id 
                WHERE u.id != ${ userId }
                ;
            `)
            res.send(result.rows)
        } catch (err) {
            console.log(err.stack)
        } finally {
            client.release()
        }
    })
    .post('/friendRequests', async (req, res) => {
            const client = await pool.connect()
            try {
                const userId = Number(req.body.userId)
                const result = await client.query(`
                    SELECT fr.id, fr.request_from_id, fr.date_created
                    FROM friend_requests fr 
                    WHERE fr.decision IS NULL 
                    AND fr.user_id = ${ userId }
                    ;
                `)
                res.send(result.rows)
            } catch (err) {
                console.log(err.stack)
            } finally {
                client.release()
            }
    })

module.exports = router;