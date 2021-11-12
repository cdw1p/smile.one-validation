
const express = require('express')
const fetch = require('node-fetch')
const app = express()
const port = process.env.PORT || 801

app.get('/', function (req, res) {
  res.json({
    usage: '/v1/check?user_id=16100000&zone_id=1234',
    method: 'GET'
  })
})

app.get('/v1/check', async function (req, res) {
  try {
    const getData = await (await fetch('https://www.smile.one/merchant/mobilelegends/checkrole', {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `user_id=${req.query.user_id || '000'}&zone_id=${req.query.zone_id || '000'}&pid=13&checkrole=1&pay_methond=`
    })).json()
    if (getData.code === 200) {
      const { username, flowid } = getData
      const normalizeData = { userId: req.query.user_id, zoneId: req.query.zone_id, username, flowId: flowid }
      res.json({ success: true, data: normalizeData })
    } else {
      throw new Error('User is not exists')
    }
  } catch (err) {
    res.json({ success: false, message: err.message })
  }
})

app.use('*', function (req, res) {
  return res.status(200).json({ hello: '😀' })
})

app.listen(port, () => console.log(`Server is running on port ${port}!`))