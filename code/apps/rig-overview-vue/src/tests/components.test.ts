import { render } from '@testing-library/vue';
import EnvironmentVue from '../components/Cards/Environment.vue';
import MachineVue from '../components/Cards/Machine.vue';
import RigOutputVue from '../components/Cards/RigOutput.vue';
import { mockConnection } from './InfoCard.test';

vi.mock('@microsoft/signalr', () => ({
  HubConnectionBuilder: vi.fn(() => ({
    withUrl: vi.fn().mockReturnThis(),
    build: vi.fn().mockReturnValue(mockConnection),
  })),
}));

describe('Environment.vue Card', () => {
  it('renders Environment Card', async () => {
    const wrapper = render(EnvironmentVue, {
      props: {
        connection: mockConnection,
      },
    });
    const title = wrapper.findByText('Environment');
    expect(title).toBeTruthy();

    expect(wrapper.html()).toBeTruthy();
  });

  const EnvironmentSampleData = {
    temperature: 75,
    noiseLevel: 60,
    airQuality: 80,
    co2Level: 1000,
  };
  it('should render correctly with sample data', () => {
    mockConnection.on.mockClear();

    const wrapper = render(EnvironmentVue, {
      props: {
        connection: mockConnection,
      },
    });
    const callback = mockConnection.on.mock.calls[0][1];
    callback(EnvironmentSampleData);

    expect(wrapper.html()).toBeTruthy();
  });
});

describe('RigOutput.vue Card', () => {
  it('renders RigOutput Card', async () => {
    const wrapper = render(RigOutputVue, {
      props: {
        connection: mockConnection,
      },
    });
    const title = wrapper.findByText('Overview');
    expect(title).toBeTruthy();

    expect(wrapper.html()).toBeTruthy();
  });

  const RigOutputSampleData = {
    activeDrills: 100,
    efficiency: 100,
  };

  it('should render correctly with sample data', () => {
    mockConnection.on.mockClear();
    const wrapper = render(RigOutputVue, {
      props: {
        connection: mockConnection,
      },
    });
    const callback = mockConnection.on.mock.calls[0][1];
    callback(RigOutputSampleData);

    expect(wrapper.html()).toBeTruthy();
  });
});

describe('Machine.vue Card', () => {
  it('renders RigOutputVue Card', async () => {
    const wrapper = render(MachineVue, {
      props: {
        connection: mockConnection,
      },
    });
    const title = wrapper.findByText('Machine Status');
    expect(title).toBeTruthy();

    expect(wrapper.html()).toBeTruthy();
  });

  const MachineSampleData = {
    drillingSpeed: 1223,
    pressure: 100,
    failures: 0,
    fluidLevels: 100,
  };

  it('should render correctly with sample data', () => {
    mockConnection.on.mockClear();
    const wrapper = render(MachineVue, {
      props: {
        connection: mockConnection,
      },
    });
    const callback = mockConnection.on.mock.calls[0][1];
    callback(MachineSampleData);

    expect(wrapper.html()).toBeTruthy();
  });
});
