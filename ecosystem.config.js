import 'dotenv/config'

export default {
  apps: [{
    name: 'app1',
    script: './dist/index.js',
    env: {
      secret: '$secret',
      ...process.env
    }
  }]
}