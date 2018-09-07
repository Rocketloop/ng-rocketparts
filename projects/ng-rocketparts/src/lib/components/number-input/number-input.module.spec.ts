import { NumberInputModule } from './number-input.module';

describe('NumberInputModule', () => {
    let numberInputModule: NumberInputModule;

    beforeEach(() => {
        numberInputModule = new NumberInputModule();
    });

    it('should create an instance', () => {
        expect(numberInputModule).toBeTruthy();
    });
});
