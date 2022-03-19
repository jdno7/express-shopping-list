process.env.NODE_ENV = "test"

const request = require('supertest')

const app = require('./app')

const items = [] 

beforeEach (function(){
    items.push({name: 'popsicle', price: 1.45},{name: 'cheerios', price: 3.40})
})

afterEach (function(){
    items.length = 0
})

describe("GET /items", function (){
    test('Get list of items', async function (){
        const response = await request(app).get('/items')

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(items)
    })
})

describe("GET /items/:name", function (){
    test('Get item info', async function (){
        const response = await request(app).get('/items/popsicle')

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(items[0])
    })
})

describe("POST /items", function (){
    test('Create new Item', async function (){
        const newItem = {name: 'Kit Kat', price: 1.55}
        const response = await request(app).post('/items').send(newItem)

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({added:newItem})
    })
})

describe("PATCH /items/:name", function (){
    test('Update Item', async function (){
        const updatedItem = {name: 'lick stick', price: 5.35}
        const response = await request(app).patch('/items/popsicle').send(updatedItem)
        console.log(items)

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({updated : updatedItem})
    })
})

describe("DELETE /items/:name", function (){
    test('Delete Item', async function (){
        console.log(items)
        const response = await request(app).delete('/items/popsicle')
        console.log(items)
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({deleted : 'popsicle'})
    })
})