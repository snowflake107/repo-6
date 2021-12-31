const action = require('./action');

describe('action', () => {

  test('to validate valid json', async () => {
    expect(await action(
      'test_data/schema.json',
      ['test_data/valid.json']
    )).toEqual(null);
  });

  test('to validate invalid json', async () => {
    expect(await action(
      'test_data/schema.json',
      ['test_data/invalid.json']
    )).not.toEqual(null);
  });

  test('to validate valid yaml', async () => {
    expect(await action(
      'test_data/schema.json',
      ['test_data/valid.yaml']
    )).toEqual(null);
  });

  test('to validate invalid yaml', async () => {
    expect(await action(
      'test_data/schema.json',
      ['test_data/invalid.yaml']
    )).not.toEqual(null);
  });

});
