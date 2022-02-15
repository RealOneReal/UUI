import React from 'react';
import { AvatarStack as uuiAvatarStack, AvatarStackProps } from "@epam/uui-components";
import { withMods } from "@epam/uui-core";
import * as css from "./AvatarStack.scss";

export const AvatarStack = withMods<AvatarStackProps>(
    uuiAvatarStack,
    (mods) => [css.root],
);

