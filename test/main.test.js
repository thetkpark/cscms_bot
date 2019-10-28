const TelegrafTest = require('telegraf-test')
const port = process.env.PORT || 3000

require('dotenv').config()

const test = new TelegrafTest({
    url: `http://127.0.0.1:${port}/telegraf`
})

test.setUser({
    id: 1234,
    username: '@testBot'
})


describe('Basic text message', () => {
    it('should respone with HELLO message',async () => {
        const reply = await test.sendMessageWithText('random thing')
        expect(reply.data.text).toBe(`HELLO`)
    })
    it('should respon with server status', async () => {
        const reply = await test.sendMessageWithText('/status')
        expect(reply.data.text).toContain('Server status')
    })

})