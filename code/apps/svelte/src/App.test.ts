import { render, cleanup, fireEvent, screen } from '@testing-library/svelte';
import App from './App.svelte';
import DropDown from './DropDown.svelte';
import LiveIndicator from './LiveIndicator.svelte';
import '@testing-library/jest-dom';

afterEach(cleanup);

describe('App Component Tests', () => {
  test('renders App component', async () => {
    const { container } = render(App);

    expect(container).toBeInTheDocument();
  });

  it('Expect to have the title', async () => {
    render(App);

    expect(screen.getByText('Oil Well Chart')).toBeInTheDocument();
  });

  it('Expect to render live', async () => {
    render(LiveIndicator, {
      liveView: true,
      signalRConnection: 'Live',
    });

    const live = screen.getByTestId('LiveViewIsTrue');

    expect(live).toBeInTheDocument();
  });

  it('toggles dropDownMenuToggle when button is clicked', async () => {
    const { getByTestId } = render(DropDown);

    expect(getByTestId('chartSettings')).toBeInTheDocument();

    await fireEvent.click(getByTestId('chartSettings'));

    expect(getByTestId('LiveDataCheckBox')).toBeInTheDocument();
  });

  it('toggles dropDownMenuToggle when button is clicked', async () => {
    const { getByTestId } = render(DropDown, {
      dropDownMenuToggle: true,
      liveData: true,
    });

    expect(getByTestId('LiveDataCheckBox')).toBeInTheDocument();
  });

  it('tests a good connection', async () => {
    vi.mock('@microsoft/signalr', () => ({
      HubConnectionBuilder: vi.fn(() => ({
        withUrl: vi.fn().mockReturnThis(),
        build: vi.fn().mockReturnValue(mockConnection),
      })),
    }));

    render(App);

    expect(mockConnection.start).toHaveBeenCalled();
  });

  it('should click the unload-button', async () => {
    const { getByTestId } = render(App);

    await fireEvent.click(getByTestId('unload-button'));

    expect(getByTestId('unload-button')).toBeInTheDocument();
  });
});

const mockConnection = {
  start: vi.fn().mockResolvedValue(undefined),
  on: vi.fn(),
  onclose: vi.fn(),
};
