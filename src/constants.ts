export const ITEMS = {
  fleece: {
    name: 'fleece',
    title: "Women's Galtymore Fleece",
    price: 16000,
    image: '/products/fleece.png',
  },
  puffer: {
    name: 'puffer',
    title: "Men's Errigal Puffer Jacket",
    price: 31500,
    image: '/products/puffer.png',
  },
  'sleeping-bag': {
    name: 'sleeping-bag',
    title: 'Croagh Sleeping Bag -40F Down',
    price: 13000,
    image: '/products/sleeping-bag.png',
  },
};

export const SHIPPING_OPTIONS = [
  {
    name: 'Free standard shipping',
    price: 0,
    min: {
      unit: 'day',
      value: 10,
    },
    max: undefined,
  },
  {
    name: 'Express shipping',
    price: 1700,
    min: {
      unit: 'day',
      value: 2,
    },
    max: {
      unit: 'day',
      value: 5,
    },
  },
  {
    name: 'Overnight shipping',
    price: 4000,
    min: undefined,
    max: {
      unit: 'day',
      value: 1,
    },
  },
] as const;
