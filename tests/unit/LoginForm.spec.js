import LoginForm from '@/components/LoginForm'
import { mount } from '@vue/test-utils'

describe('LoginForm', () => {
  it('emits an event with a user data payload', () => {
    const wrapper = mount(LoginForm)
    const input = wrapper.find('[data-testid=name-input]')

    input.setValue('User Name')
    wrapper.trigger('submit')

    const formSubmitterdCalls = wrapper.emitted('formSubmitted')
    expect(formSubmitterdCalls).toHaveLength(1)

    const expectedPayload = { name: 'User Name' }
    expect(wrapper.emitted('formSubmitted')[0][0]).toMatchObject(
      expectedPayload
    )
  })
})
