import React, { Component } from 'react';
import NoResults from './NoResults';
import Photo from './Photos'

class PhotoContainer extends Component {
       
    render() { 
        const results = this.props.pictures;
        let finalPictures;
        const title = this.props.match.params.searchTag;
        
        if(results.length > 0) {
            finalPictures = results.map( photoInfo =>
                <Photo url={ `https://farm${photoInfo.farm}.staticflickr.com/${photoInfo.server}/${photoInfo.id}_${photoInfo.secret}.jpg` } key={photoInfo.id} />
            );
        } else {
            finalPictures = <NoResults />
        }
                
        return ( 
            <div className="photo-container">
                <h2>{title}</h2>
                <ul>
                    {finalPictures}
                </ul>
            </div>
        ); 
    } 
};

export default PhotoContainer;