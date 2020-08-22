import React from 'react';
import { shallow, mount } from 'enzyme';
import LydiaApp from './LydiaApp';

it('renders without crashing', () => {
  shallow(<LydiaApp />);
});

it('full rendering without crashing', () => {
  mount(<LydiaApp />);
});
