const TelegrafTest = require('telegraf-test')
const port = 3000
const test = new TelegrafTest({
    url: `http://127.0.0.1:${port}/webhook`
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

})