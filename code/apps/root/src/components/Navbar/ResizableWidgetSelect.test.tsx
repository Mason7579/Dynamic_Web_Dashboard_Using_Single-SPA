import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import ResizableWidgetSelect from './ResizableWidgetSelect';
import { ClearDashboardProvider } from '../../utils/ClearDashboardContext';
import { WidgetComponentProvider } from '../../utils/LoadAppContext';

describe('ResizableWidgetSelect', () => {
  it('renders the component correctly', () => {
    render(
      <BrowserRouter>
        <WidgetComponentProvider>
          <ClearDashboardProvider>
            <ResizableWidgetSelect />
          </ClearDashboardProvider>
        </WidgetComponentProvider>
      </BrowserRouter>,
    );
    const resizableWidgetSelect = screen.getByTestId('popUpButton');
    expect(resizableWidgetSelect).toBeInTheDocument();
  });

  it('toggles layout selection popup on click', async () => {
    render(
      <BrowserRouter>
        <WidgetComponentProvider>
          <ClearDashboardProvider>
            <ResizableWidgetSelect />
          </ClearDashboardProvider>
        </WidgetComponentProvider>
      </BrowserRouter>,
    );
    const resizableWidgetSelect = screen.getByTestId('popUpButton');
    fireEvent.click(resizableWidgetSelect);
    const selectLayout = screen.getByText('Change Layout');
    expect(selectLayout).toBeTruthy();
  });

  it('select layout 1', async () => {
    render(
      <MemoryRouter initialEntries={['/resizable']}>
        <WidgetComponentProvider>
          <ClearDashboardProvider>
            <ResizableWidgetSelect />
          </ClearDashboardProvider>
        </WidgetComponentProvider>
      </MemoryRouter>,
    );
    const resizableWidgetSelect = screen.getByTestId('popUpButton');
    fireEvent.click(resizableWidgetSelect);
    const layoutButtons = screen.getAllByRole('button');

    fireEvent.click(layoutButtons[0]);
    expect(layoutButtons).toBeTruthy();
  });
  it('select layout 2', async () => {
    render(
      <MemoryRouter initialEntries={['/resizable']}>
        <WidgetComponentProvider>
          <ClearDashboardProvider>
            <ResizableWidgetSelect />
          </ClearDashboardProvider>
        </WidgetComponentProvider>
      </MemoryRouter>,
    );
    const resizableWidgetSelect = screen.getByTestId('popUpButton');
    fireEvent.click(resizableWidgetSelect);
    const layoutButtons = screen.getAllByRole('button');

    fireEvent.click(layoutButtons[1]);
    expect(layoutButtons).toBeTruthy();
  });
  it('select layout 3', async () => {
    render(
      <MemoryRouter initialEntries={['/resizable?cols=1&w=1']}>
        <WidgetComponentProvider>
          <ClearDashboardProvider>
            <ResizableWidgetSelect />
          </ClearDashboardProvider>
        </WidgetComponentProvider>
      </MemoryRouter>,
    );
    const resizableWidgetSelect = screen.getByTestId('popUpButton');
    fireEvent.click(resizableWidgetSelect);
    const layoutButtons = screen.getAllByRole('button');

    fireEvent.click(layoutButtons[2]);

    expect(layoutButtons).toBeTruthy();
  });
  it('select layout 4', async () => {
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/not',
        search: '?cols=1',
      },
      writable: true,
    });

    render(
      <MemoryRouter initialEntries={['/?cols=1']}>
        <WidgetComponentProvider>
          <ClearDashboardProvider>
            <ResizableWidgetSelect />
          </ClearDashboardProvider>
        </WidgetComponentProvider>
      </MemoryRouter>,
    );
    const resizableWidgetSelect = screen.getByTestId('popUpButton');
    fireEvent.click(resizableWidgetSelect);
    const layoutButtons = screen.getAllByRole('button');

    fireEvent.click(layoutButtons[3]);

    expect(layoutButtons).toBeTruthy();
  });

  it('select layout 5', async () => {
    render(
      <MemoryRouter initialEntries={['/resizable?cols=1&w=1']}>
        <WidgetComponentProvider>
          <ClearDashboardProvider>
            <ResizableWidgetSelect />
          </ClearDashboardProvider>
        </WidgetComponentProvider>
      </MemoryRouter>,
    );
    const resizableWidgetSelect = screen.getByTestId('popUpButton');
    fireEvent.click(resizableWidgetSelect);
    const layoutButtons = screen.getAllByRole('button');

    fireEvent.click(layoutButtons[4]);

    expect(layoutButtons).toBeTruthy();
  });

  it('select the same layout', async () => {
    render(
      <MemoryRouter initialEntries={['/resizable?cols=1&w=1']}>
        <WidgetComponentProvider>
          <ClearDashboardProvider>
            <ResizableWidgetSelect />
          </ClearDashboardProvider>
        </WidgetComponentProvider>
      </MemoryRouter>,
    );
    const resizableWidgetSelect = screen.getByTestId('popUpButton');
    fireEvent.click(resizableWidgetSelect);
    const layoutButtons = screen.getAllByRole('button');

    fireEvent.click(layoutButtons[0]);

    expect(layoutButtons).toBeTruthy();
  });

  it('select the same layout', async () => {
    render(
      <MemoryRouter initialEntries={['/resizable?cols=1&rows1=1&rows2=0&w=0']}>
        <WidgetComponentProvider>
          <ClearDashboardProvider>
            <ResizableWidgetSelect />
          </ClearDashboardProvider>
        </WidgetComponentProvider>
      </MemoryRouter>,
    );
    const resizableWidgetSelect = screen.getByTestId('popUpButton');
    fireEvent.click(resizableWidgetSelect);
    const layoutButtons = screen.getAllByRole('button');

    fireEvent.click(layoutButtons[0]);

    expect(layoutButtons).toBeTruthy();
  });

  it('click the bg of the modal to close warning', async () => {
    render(
      <MemoryRouter initialEntries={['/resizable?cols=1&w=1']}>
        <WidgetComponentProvider>
          <ClearDashboardProvider>
            <ResizableWidgetSelect />
          </ClearDashboardProvider>
        </WidgetComponentProvider>
      </MemoryRouter>,
    );
    const resizableWidgetSelect = await screen.findByTestId('popUpButton');
    fireEvent.click(resizableWidgetSelect);

    const layoutButtons = await screen.findAllByRole('button');

    fireEvent.click(layoutButtons[2]);

    const bg = await screen.findByTestId('warning-background-parent-div');

    fireEvent.click(bg);
    fireEvent.click(bg);

    expect(bg).not.toBeInTheDocument();
  });

  it('click Cancel of the warning modal', async () => {
    render(
      <MemoryRouter initialEntries={['/resizable?cols=1&w=1']}>
        <WidgetComponentProvider>
          <ClearDashboardProvider>
            <ResizableWidgetSelect />
          </ClearDashboardProvider>
        </WidgetComponentProvider>
      </MemoryRouter>,
    );
    const resizableWidgetSelect = screen.getByTestId('popUpButton');
    fireEvent.click(resizableWidgetSelect);
    const layoutButtons = screen.getAllByRole('button');

    fireEvent.click(layoutButtons[2]);

    const cancelButton = await screen.findByText('Cancel');

    fireEvent.click(cancelButton);

    expect(cancelButton).not.toBeInTheDocument();
  });

  it('click Continue of the warning modal', async () => {
    render(
      <MemoryRouter initialEntries={['/resizable?cols=1&w=1']}>
        <WidgetComponentProvider>
          <ClearDashboardProvider>
            <ResizableWidgetSelect />
          </ClearDashboardProvider>
        </WidgetComponentProvider>
      </MemoryRouter>,
    );
    const resizableWidgetSelect = screen.getByTestId('popUpButton');
    fireEvent.click(resizableWidgetSelect);
    const layoutButtons = screen.getAllByRole('button');

    fireEvent.click(layoutButtons[2]);

    const contButton = await screen.findByText('Continue');

    fireEvent.click(contButton);

    expect(contButton).not.toBeInTheDocument();
  });

  it('have widget no numbers in url', async () => {
    render(
      <MemoryRouter initialEntries={['/resizable?cols=2&rows1=3&rows2=1']}>
        <WidgetComponentProvider>
          <ClearDashboardProvider>
            <ResizableWidgetSelect />
          </ClearDashboardProvider>
        </WidgetComponentProvider>
      </MemoryRouter>,
    );
    const resizableWidgetSelect = screen.getByTestId('popUpButton');

    expect(resizableWidgetSelect).toBeTruthy();
  });

  it('have widget no numbers in url', async () => {
    render(
      <MemoryRouter initialEntries={['/resizable?cols=2&rows1=1&rows2=1']}>
        <WidgetComponentProvider>
          <ClearDashboardProvider>
            <ResizableWidgetSelect />
          </ClearDashboardProvider>
        </WidgetComponentProvider>
      </MemoryRouter>,
    );
    const resizableWidgetSelect = screen.getByTestId('popUpButton');

    expect(resizableWidgetSelect).toBeTruthy();
  });

  it('have widget max numbers in url', async () => {
    render(
      <MemoryRouter
        initialEntries={['/resizable?cols=3&rows1=3&rows2=3&rows3=3']}
      >
        <WidgetComponentProvider>
          <ClearDashboardProvider>
            <ResizableWidgetSelect />
          </ClearDashboardProvider>
        </WidgetComponentProvider>
      </MemoryRouter>,
    );
    const resizableWidgetSelect = screen.getByTestId('popUpButton');

    expect(resizableWidgetSelect).toBeTruthy();
  });

  it('will hover over the layout button', async () => {
    render(
      <MemoryRouter
        initialEntries={['/resizable?cols=3&rows1=3&rows2=3&rows3=3']}
      >
        <WidgetComponentProvider>
          <ClearDashboardProvider>
            <ResizableWidgetSelect />
          </ClearDashboardProvider>
        </WidgetComponentProvider>
      </MemoryRouter>,
    );
    const resizableWidgetSelect = screen.getByTestId('resizable-layout-select');

    expect(resizableWidgetSelect).toBeTruthy();

    fireEvent.mouseEnter(resizableWidgetSelect);

    const tooltip = await screen.findByText('Change Layout');

    expect(tooltip).toBeInTheDocument();

    fireEvent.mouseLeave(resizableWidgetSelect);
  });

  it('should make a custom layout', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <WidgetComponentProvider>
          <ClearDashboardProvider>
            <ResizableWidgetSelect />
          </ClearDashboardProvider>
        </WidgetComponentProvider>
      </MemoryRouter>,
    );

    const resizableWidgetSelect = screen.getByTestId('popUpButton');
    fireEvent.click(resizableWidgetSelect);

    const rowsPlus = await screen.findByTestId('row-plus');
    expect(rowsPlus).toBeInTheDocument();
    fireEvent.click(rowsPlus);
    fireEvent.click(rowsPlus);
    fireEvent.click(rowsPlus);
    fireEvent.click(rowsPlus);

    const col1Plus = await screen.findByTestId('col-0-plus');
    expect(col1Plus).toBeInTheDocument();
    fireEvent.click(col1Plus);
    fireEvent.click(col1Plus);
    fireEvent.click(col1Plus);
    fireEvent.click(col1Plus);
    const col2Plus = await screen.findByTestId('col-1-plus');
    expect(col2Plus).toBeInTheDocument();
    fireEvent.click(col2Plus);

    const col3Plus = await screen.findByTestId('col-2-plus');
    expect(col3Plus).toBeInTheDocument();
    fireEvent.click(col3Plus);
    fireEvent.click(col3Plus);
    fireEvent.click(col3Plus);
    fireEvent.click(col3Plus);

    const col3Minu = await screen.findByTestId('col-2-minus');
    expect(col3Minu).toBeInTheDocument();
    fireEvent.click(col3Minu);
    fireEvent.click(col3Minu);
    fireEvent.click(col3Minu);
    fireEvent.click(col3Minu);

    const rowMinus = await screen.findByTestId('row-minus');
    expect(rowMinus).toBeInTheDocument();
    fireEvent.click(rowMinus);
    fireEvent.click(rowMinus);
    fireEvent.click(rowMinus);
    fireEvent.click(rowMinus);

    const applyLayout = await screen.findByText(/Apply/);
    expect(applyLayout).toBeInTheDocument();
    fireEvent.click(applyLayout);
  });
});
