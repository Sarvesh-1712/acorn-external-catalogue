import React from 'react';
import { render, screen } from '@testing-library/react';
import { Item } from '../Model/Content';
import CardsContainer from '../Component/CardsContainer';

jest.mock('../Component/CardItem', () => {
    return jest.fn(({item}) => <div>CardItem for {item.fullname}</div>);
});

describe('ItemGrid Component', () => {
    const items: Item[] = [
        {
            contentid: '1',
            fullname: 'fullname1',
            summary: 'summary1',
            imageurl: 'image1',
            contenttype: 'contenttype1',
            badgecolor: 'grey'
        },
        {
            contentid: '2',
            fullname: 'fullname2',
            summary: 'summary2',
            imageurl: 'image2',
            contenttype: 'contenttype2',
            badgecolor: 'grey'
        }
    ];

    test('renders the correct number of CardItems', () => {
        render(<CardsContainer items={items} loading={false} error={''} />);
        const cardItems = screen.queryAllByText(/CardItem for/i);
        expect(cardItems).toHaveLength(items.length);
        items.forEach(item => {
            expect(screen.getByText(`CardItem for ${item.fullname}`)).toBeTruthy();
        });
    });

    test('renders correctly with no items', () => {
        render(<CardsContainer items={[]} loading={false} error={''} />);        
        const cardItems = screen.queryAllByText(/Mocked CardItem/i);
        expect(cardItems).toHaveLength(0);
    });
});