import { AddComponentRendererDirective } from './add-component-renderer.directive';

describe('AddComponentRendererDirective', () => {
  it('should create an instance', () => {
    let vcf: any;
    const directive = new AddComponentRendererDirective(vcf);
    expect(directive).toBeTruthy();
  });
});
