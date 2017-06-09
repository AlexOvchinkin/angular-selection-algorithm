import { SelectionPage } from './app.po';

describe('selection App', () => {
  let page: SelectionPage;

  beforeEach(() => {
    page = new SelectionPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
