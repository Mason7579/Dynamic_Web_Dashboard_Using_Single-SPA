jest.mock('./src/parcels/WellInfoChartSvelte', () => () => {
  return <div>Mock Oil Well Info</div>;
});

jest.mock('./src/parcels/angular', () => () => {
  return <div>Mock Angular App</div>;
});

jest.mock('./src/parcels/DrillingReact', () => () => {
  return <div>Mock Drilling React App</div>;
});

jest.mock('./src/parcels/RigInfoVue', () => () => {
  return <div>Mock Rig Status</div>;
});

jest.mock('./src/parcels/StatusBarSvelte', () => () => {
  return <div>Mock Status Bar</div>;
});
