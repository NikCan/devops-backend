describe('Debug pg in Jest', () => {
  it('should print pg module keys', () => {
    const pg = require('pg');
    console.log('JEST KEYS OF PG:', Object.keys(pg));
    console.log('JEST PG DEFAULT:', pg.default);
    console.log('JEST PG TYPE:', typeof pg);
    console.log('JEST PG POOL:', typeof pg.Pool);
  });
});
