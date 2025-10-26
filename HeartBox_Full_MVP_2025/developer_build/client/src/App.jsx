import React, { useState } from 'react'

export default function App(){
  const [status, setStatus] = useState('Idle')
  const [blob, setBlob] = useState(null)
  const [chunks, setChunks] = useState([])
  const [mediaRecorder, setMediaRecorder] = useState(null)

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const rec = new MediaRecorder(stream)
    rec.ondataavailable = e => setChunks(c => [...c, e.data])
    rec.onstop = () => {
      const b = new Blob(chunks, {type:'audio/ogg'})
      setBlob(b); setChunks([])
    }
    rec.start()
    setMediaRecorder(rec)
    setStatus('Recording…')
  }

  const stop = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop()
      setStatus('Stopped')
    }
  }

  const save = async () => {
    if(!blob) return setStatus('Nothing to save')
    const buf = await blob.arrayBuffer()
    const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)))
    const res = await fetch(import.meta.env.VITE_API_URL + '/api/messages', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ data:b64, mime:'audio/ogg' })
    })
    const json = await res.json()
    setStatus('Saved: ' + (json.id || 'ok'))
  }

  return (
    <div style={{padding:24,fontFamily:'system-ui, Arial'}}>
      <h1>HeartBox</h1>
      <p>{status}</p>
      <div style={{display:'flex', gap:8}}>
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <button onClick={save}>Save</button>
      </div>
    </div>
  )
}
