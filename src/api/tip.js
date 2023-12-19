import request from '@/utils/request'

export function getRandomTip() {
    return request({
        url: '/tip/random',
        method: 'get'
    })
}