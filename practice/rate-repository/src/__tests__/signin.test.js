import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../components/SignIn';

describe('SignIn', () => {
    describe('SignInContainer', () => {
      it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
        const signIn = jest.fn()

        // render the SignInContainer component, fill the text inputs and press the submit button
        render(<SignInContainer signIn={signIn}/>)
        screen.debug()

        fireEvent.changeText(screen.getByPlaceholderText('Username'), 'leeroyjenkins')
        fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password')
        fireEvent.press(screen.getByText('Sign In'))
  
        await waitFor(() => {
          // expect the onSubmit function to have been called once and with a correct first argument
          expect(signIn).toHaveBeenCalledTimes(1)
          expect(signIn.mock.calls[0][0]).toEqual({
            username: 'leeroyjenkins',
            password: 'password'
          })

        });
      });
    });
 });