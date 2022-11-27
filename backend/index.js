const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors({
    origin: 'http://localhost:3000'
}))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Firebase

const { collection, addDoc, getDocs } = require('firebase/firestore')
const { db } = require('./config/firebaseConfig')

// Routing

app.get('/api/items', async (req, res) => {
    const response = {
        code: 200,
        status: 'OK',
        data: []
    }

    const querySnapshot = await getDocs(collection(db, 'items'))
    querySnapshot.forEach((doc) => {
        response.data.push(doc.data())
    })
    res.status(200).json(response)
})

app.post('/api/add', async (req, res) => {
    console.log(req.body.name, req.body.number)
    try {
        const docRef = await addDoc(collection(db, 'items'), {
            name: req.body.name,
            number: req.body.number
        })
        console.log('Document written with id ', docRef.id)

        const successResponse = {
            code: 200,
            status: 'OK',
            success: {
                message: 'Successfully Add New Item'
            }
        }
        res.status(200).json(successResponse)

    } catch (error) {
        console.error('Error adding document: ', error)
        const failureResponse = {
            code: 500,
            status: 'Internal Server Error',
            errors: {
                message: error.message
            }
        }
        res.status(500).json(failureResponse)
    }

})

app.delete('/api/delete', (req, res) => {
    res.status().json()
})

app.use((req, res) => {
    const notFound = {
        code: 404,
        status: 'Not Found',
        errors: {
            message: `There is no available API with path ${req.path} and method ${req.method}`
        }
    }
    res.status(404).json(notFound)
})


app.listen(process.env.PORT || 5050, () => {
    if (process.env.PORT != null) {
        console.log(`Listening on port ${process.env.PORT}...`)
    } else {
        console.log('Listening on port 5050...')
    }
})