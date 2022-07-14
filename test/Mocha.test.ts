describe('class', () => {
  before(async () => {
    console.log('before');
  });
  after(async () => {
    console.log('after');
  });

  beforeEach(async () => {
    console.log('beforeEach');
  });
  afterEach(async () => {
    console.log('afterEach');
  });

  it('class1', async () => {
    console.log('class1');
  });
  it('class2', async () => {
    console.log('class2');
  });

  describe('function', function () {
    beforeEach(async () => {
      console.log('beforeEach in describe');
    });
    afterEach(async () => {
      console.log('afterEach in describe');
    });
    it('function1', async () => {
      console.log('function1');
    });
    it('function2', async () => {
      console.log('function2');
    });
  });
});
