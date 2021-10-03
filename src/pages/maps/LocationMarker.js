import React from 'react';
import {Icon} from '@iconify/react';
import locationIcon from '@iconify/icons-mdi/rv-truck';
import locationIcon2 from '@iconify/icons-mdi/account';

import './map.css';


function LocationMarker({lat,lng,onClick,userType}) {
    if(userType=="vendor"){
        return (
            <div className='location-marker' onClick={onClick}>
                <Icon icon={locationIcon} className="location-icon" />
            </div>
        )
    }else{
        return (
            <div className='location-marker' onClick={onClick}>
                <Icon icon={locationIcon2} className="location-icon-customer" />
            </div>
        )
    }
    
}

export default LocationMarker
