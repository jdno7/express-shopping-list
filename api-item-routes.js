const express = require('express')
const ExpressError = require('./expressError')
// const { append } = require('express/lib/response')
const router = new express.Router()
const items = require('./fakeDb')



router.get('/', function (req, res){
    return res.json(items)
})

router.post('/', function (req, res){
    const item = req.body
    items.push(item)
   
    return res.json({added:item})
})

router.get('/:name', function (req, res, next){
    
    // console.log(item)
    try {
        const item = items.find(item => item.name === req.params.name)
        if (item === undefined){
            throw new ExpressError(`Item NOT found`, 404)
        }
        return res.json(item)
    }catch (e) {
        
        next(e)
    }

    
})

router.patch('/:name', function (req, res, next){
    try{
        const item = items.find(item => item.name === req.params.name)
        if (item === undefined){
            throw new ExpressError(`Item NOT found`, 404)
        }
        const updatedItem = req.body
        items[items.indexOf(item)]= updatedItem
        return res.json(items)
    }catch (e) {
        next(e)
    }
    
})

router.delete('/:name', function (req, res){
    try{
        const item = items.find(() => req.params.name)
        if (item === undefined){
            throw new ExpressError(`Item NOT found`, 404)
        }
        items.splice(items.indexOf(item), 1)
        console.log(items)
        return res.json({deleted: item.name})
    }catch (e) {
        next (e)
    }
    
    // return res.json(items)
})

module.exports = router