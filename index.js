const RPC_URL = 'https://api.node.glif.io/'

const miners = [
  'f02118066',
  'f0142637',
  'f02851470',
  'f02365956',
  'f02370792',
  'f02035252',
  'f02933563',
  'f02933536'
]

console.log('FULL INFO FOR MINER', miners[0])
console.log(await rpc('Filecoin.StateMinerInfo', miners[0], null))
console.log('\n===\n')

for (const m of miners) {
  const { PeerId } = await rpc('Filecoin.StateMinerInfo', m, null)
  const found =
    PeerId === '12D3KooW9pcSn5RbbAtG3A3PTzewM2JRongceqvWewHyGj7qp6Ha'
      ? 'FOUND: first advertisement'
      : PeerId === '12D3KooWKa1NQKxveFmppQAjkHG8RGpjoQ2ivubeNuEUgZGgc2T6'
        ? 'FOUND: second advertisement'
        : ''
  console.log('miner: %s provider id: %s', m, PeerId, found)
}

/**
 * @param {string} method
 * @param {unknown[]} params
 */
async function rpc (method, ...params) {
  const res = await fetch(RPC_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accepts: 'application/json'
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method,
      params
    })
  })

  if (!res.ok) {
    throw new Error(`JSON RPC failed with ${res.code}: ${await res.text()}`)
  }

  const body = await res.json()
  return body.result
}
