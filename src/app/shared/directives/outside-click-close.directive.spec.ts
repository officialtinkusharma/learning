import { OutsideClickCloseDirective } from './outside-click-close.directive';

describe('OutsideClickCloseDirective', () => {
  it('should create an instance', () => {
    let el: any
    const directive = new OutsideClickCloseDirective(el);
    expect(directive).toBeTruthy();
  });
});
