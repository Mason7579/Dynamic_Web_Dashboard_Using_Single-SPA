import { mount } from '@vue/test-utils';
import { fireEvent, render, screen } from '@testing-library/vue';
import '@testing-library/jest-dom';
import App from '../App.vue';
import { vi } from 'vitest';

export const mockConnection = {
  start: vi.fn().mockResolvedValue(undefined),
  on: vi.fn(),
  onclose: vi.fn(),
};
vi.mock('@microsoft/signalr', () => ({
  HubConnectionBuilder: vi.fn(() => ({
    withUrl: vi.fn().mockReturnThis(),
    build: vi.fn().mockReturnValue(mockConnection),
  })),
}));

describe('App.vue Render InfoCard', () => {
  it('renders InfoCard', () => {
    const wrapper = render(App);
    const title = wrapper.findByText('Rig Status');
    expect(title).toBeTruthy();
    expect(wrapper.html()).toBeTruthy();
  });

  it('makes sure connection is closed', async () => {
    const wrapper = mount(App);

    await wrapper.vm.$nextTick();
    wrapper.unmount();
    expect(mockConnection.onclose).toHaveBeenCalled();
  });
});

describe('App.vue signalR connection tests', () => {
  it('mocks SignalR connection', async () => {
    mockConnection.start.mockResolvedValue(undefined);

    const wrapper = mount(App);

    await wrapper.vm.$nextTick();

    expect(mockConnection.start).toHaveBeenCalled();
  });

  it('fails to connect to SignalR', async () => {
    mockConnection.start.mockRejectedValue(new Error('Connection failed'));

    const wrapper = mount(App);

    await wrapper.vm.$nextTick();
    expect(mockConnection.start).toHaveBeenCalled();
  });

  it('reloads SignalR connection and handles animation', async () => {
    render(App);

    mockConnection.onclose.mock.calls[0][0]();
    const reloadButton = await screen.findByTestId('reload-connection');

    await fireEvent.click(reloadButton);

    expect(mockConnection.start).toHaveBeenCalled();
  });

  it('tests animation reload 1 when clicking on reload', async () => {
    vi.useFakeTimers();

    render(App);

    // screen.debug();

    const reloadButton = screen.getByTestId('reload-connection');

    fireEvent.click(reloadButton);

    mockConnection.onclose.mock.calls[0][0]();
    vi.advanceTimersByTime(2000);

    expect(mockConnection.start).toHaveBeenCalled();
  });

  it('should click the unload-button', async () => {
    const { getByTestId } = render(App);

    await fireEvent.click(getByTestId('unload-button'));

    expect(getByTestId('unload-button')).toBeInTheDocument();
  });
});
