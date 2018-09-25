import { PasswordInputModule } from './password-input.module';

describe('PasswordInputModule', () => {
    let passwordInputModule: PasswordInputModule;

    beforeEach(() => {
        passwordInputModule = new PasswordInputModule();
    });

    it('should create an instance', () => {
        expect(passwordInputModule).toBeTruthy();
    });
});
