import React, { forwardRef } from 'react';
import cx from 'classnames';
import { IHasCX } from '@epam/uui-core';
import css from './StatusIndicator.module.scss';

export type StatusIndicatorColors = 'neutral' | 'info' | 'success' | 'warning' | 'critical';

export interface StatusIndicatorProps extends IHasCX {
    size?: '24' | '18' | '12';
    color?: StatusIndicatorColors;
    fill?: 'solid' | 'outline';
    caption: string;
}

export const StatusIndicator = forwardRef<HTMLDivElement, StatusIndicatorProps>((props, ref) => {
    return (
        <div
            ref={ ref }
            className={ cx([
                css.root,
                css[`size-${props.size || 24}`],
                'uui-status_indicator',
                `uui-color-${props.color || 'neutral'}`,
                `fill-${props.fill || 'solid'}`,
                props.cx,
            ]) }
        >
            <div className="uui-status_indicator_dot"></div>
            <p className="uui-status_indicator_caption">{props.caption}</p>
        </div>
    );
});
