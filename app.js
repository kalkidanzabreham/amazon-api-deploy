const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const stripe = require("stripe")(process.env.STRIPE_KEY)

const app = express()
app.use(cors({origin:true}))

app.use(express.json())

app.get("/",(req,res)=>{
    res.json({
        message:"success"
    })
})
app.post("/payment/create",async(req,res)=>{
    const total = parseInt(req.query.total)
    if(total) {
        const paymentIntent = await stripe.paymentIntents.create({
            amount:total,
            currency:"usd"
        })
        // console.log(paymentIntent);
        res.status(201).json({
          clientSecret: paymentIntent.client_secret,
        });
    }else{
        res.status(403).json({
            message:"total must be greater then 0"
        })
    }

})

app.listen(7777,(err)=>{
    if(err){
        console.log(err);
    }
    else{
     console.log("http://localhost:7777"); 
    }
})