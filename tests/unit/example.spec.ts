import { mount } from '@vue/test-utils'
import DashboardPage from '@/views/DashboardPage.vue'

describe('DashboardPage.vue', () => {
  it('renders home vue', () => {
    const wrapper = mount(DashboardPage)
    expect(wrapper.text()).toMatch('Ready to create an app?')
  })
})
