module.exports = {
    SLEEP_TIME_OUT: 15000,
    MAX_CONCURRENCY: 3,
    MAX_RETRIES: 1,
    DB: {
        name: 'xiaozhuSpider',
        host: '127.0.0.1',
        user: 'root',
        passwd: 'cosine',
        port: 3307
    },
    REDIS: {
        host: '127.0.0.1',
        redis: '',
        port: 6379        
    },
}