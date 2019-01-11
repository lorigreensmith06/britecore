// Assuming you have already done "npm install fernet"
let fernet = require('./../node_modules/fernet')
let secret = new fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=')

// Oh no! The code is going over the edge! What are you going to do?
let message = 'gAAAAABcNg0_KgWNlSsZ4hXCgn65PhII1pT6GFmhKNBwIpH5MIgWVhdrC3iVe0' +
    'uJZ1_-Gqy4OKG2IRbPDR1z4TOvAd7ay7fh58jRbC-l2iq2pVmfJ3Ig1eTnhYKdkgohIjy9iXuoOHguI0LTr' +
    '-xs_WE_BS8mCfLMFYl-aTPWSq8V59ubYJeTNlRzLVpDjXzZtI9HlJ3qquGQ'
    
let token = new fernet.Token({secret: secret, token: message, ttl:0})
token.decode()

console.log (token.decode())