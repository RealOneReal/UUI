import React from 'react';
import { LinkButton } from '../LinkButton';
import { renderSnapshotWithContextAsync } from '@epam/uui-test-utils';
import { ReactComponent as CalendarIcon } from '../../../icons/calendar-18.svg';

describe('LinkButton', () => {
    it('should be rendered correctly', async () => {
        const tree = await renderSnapshotWithContextAsync(<LinkButton />);
        expect(tree).toMatchSnapshot();
    });

    it('should be rendered correctly with props', async () => {
        const tree = await renderSnapshotWithContextAsync(
            <LinkButton
                onClick={ jest.fn }
                icon={ CalendarIcon }
                isDisabled={ false }
                isDropdown
                size="30"
            />,
        );
        expect(tree).toMatchSnapshot();
    });
});
