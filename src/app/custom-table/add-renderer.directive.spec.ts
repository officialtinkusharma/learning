import { AddRendererDirective } from './add-renderer.directive';

describe('AddRendererDirective', () => {
  it('should create an instance', () => {
    let el: any;
    const directive = new AddRendererDirective(el);
    expect(directive).toBeTruthy();
  });
});
