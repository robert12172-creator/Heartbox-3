import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json({ limit: '15mb' }))

const uri = process.env.MONGODB_URI
if(!uri){
  console.warn('MONGODB_URI not set. API will accept messages but not persist them.')
}else{
  try {
    await mongoose.connect(uri)
    console.log('MongoDB connected')
  } catch (e) {
    console.error('MongoDB connection error:', e.message)
  }
}

const MessageSchema = new mongoose.Schema({
  mime: String,
  data: String,
  createdAt: { type: Date, default: Date.now }
})
const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema)

app.get('/healthz', (_, res) => res.json({ ok:true }))

app.post('/api/messages', async (req, res) => {
  const { data, mime } = req.body || {}
  if(!data) return res.status(400).json({ ok:false, error:'Missing data' })
  if(!uri){
    return res.json({ ok:true, id: String(Date.now()), stored:false })
  }
  const doc = await Message.create({ data, mime: mime || 'audio/ogg' })
  return res.json({ ok:true, id: String(doc._id), stored:true })
})

const PORT = process.env.PORT || 10000
app.listen(PORT, () => console.log('HeartBox API on :' + PORT))
