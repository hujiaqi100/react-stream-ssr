import 'babel-polyfill'
import express from 'express';
import React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './src/app.jsx'
import bodyParse from 'body-parser'
import build from './dist/built.css'
const app = express()
app.use(bodyParse.json())
app.use(express.static('dist'))
app.get('*', (req, res) => {
  const styleStr = build._getContent().default[0][1]
  const context = {}
  res.write(
    `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!-- <link rel="shortcut icon" href="02_06_58.jpg" /> -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="text/javascript" src="index.bundle.js" async></script>
        <style>${styleStr}</style>
        <title>iWanna</title>
      </head>
      <body>
        <div id="app">
      `
  )
  const stream = renderToNodeStream(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>)
  stream.pipe(res, { end: false })
  stream.on('end', () => {
    res.end(`</div> 
        </body></html>`)
  })
})
app.listen(3000, () => {
})