import helpers from 'ui-helpers';
import Avatar from 'aio-global-ui/atoms/avatar';
import LayerHolder from 'aio-global-ui/atoms/layer-holder';
import TitleWithDescription from 'aio-global-ui/molecules/title-with-description';

import React, { useEffect, createElement, useMemo} from 'react';

const AvatarWithDetails = (dprops) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

    return (
        <>
            <LayerHolder
                attrs={props.attrs || {}}
                dataAttrs={props.dataAttrs || {}}
                layerDs={helpers.json.val(props, 'layerDs', {})}
                contentDs={helpers.json.val(props, 'contentDs', {})}
                layer={
                    <Avatar
                        {...helpers.json.val(props, 'avatarDs', {})}
                        ds={helpers.json.val(props, 'avatarDs', {})}
                    />
                }
                content={
                    <TitleWithDescription
                        title={props.title || ''}
                        description={props.description || ''}
                        titleDs={helpers.json.val(props, 'titleDs', {})}
                        descriptionDs={helpers.json.val(props, 'descriptionDs', {})}
                        descriptionMoreLess={helpers.json.val(props, 'descriptionMoreLess', {})}
                    />
                }
            />
        </>
    )
}

AvatarWithDetails.__PROP__TYPES__

AvatarWithDetails.__DEFAULT__PROP__

export default AvatarWithDetails;