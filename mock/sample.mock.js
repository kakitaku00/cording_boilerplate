const mocks = [
  {
    pattern: '/_api/sample',
    handle: (req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.write('sample api')
      res.end()
    },
  },
]

export default mocks
