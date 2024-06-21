interface DataItem {
  id: number;
  datetime: string;
  wellID: number;
  status: string;
}

const data: DataItem[] = [
  {
    id: 0,
    datetime: '2024-02-28 12:00:00',
    wellID: 25,
    status: 'Rig is online',
  },
  {
    id: 2,
    datetime: '2-28-2024 12:00:38',
    wellID: 26,
    status: 'Rig is online',
  },
  {
    id: 3,
    datetime: '2-28-2024 12:01:00',
    wellID: 27,
    status: 'Rig is online',
  },
  {
    id: 4,
    datetime: '2-28-2024 12:01:38',
    wellID: 28,
    status: 'Rig is online',
  },
  {
    id: 5,
    datetime: '2-28-2024 12:02:00',
    wellID: 29,
    status: 'Rig is online',
  },
  {
    id: 6,
    datetime: '2-28-2024 12:02:38',
    wellID: 26,
    status: 'Rig is in critical condition',
  },
  {
    id: 7,
    datetime: '2-28-2024 12:03:00',
    wellID: 31,
    status: 'Rig is online',
  },
  {
    id: 8,
    datetime: '2-28-2024 12:03:38',
    wellID: 32,
    status: 'Rig is online',
  },
  {
    id: 9,
    datetime: '2-28-2024 12:04:00',
    wellID: 32,
    status: 'Rig is shutting down',
  },
  {
    id: 10,
    datetime: '2-28-2024 12:04:38',
    wellID: 27,
    status: 'Rig is shutting down',
  },
  {
    id: 11,
    datetime: '2-28-2024 12:05:00',
    wellID: 27,
    status: 'Rig is offline',
  },
  {
    id: 12,
    datetime: '2-28-2024 12:05:38',
    wellID: 32,
    status: 'Rig is offline',
  },
];

export default data;
