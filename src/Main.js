import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import cloudinary from 'cloudinary-react';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';

class Main extends Component {
  constructor(props) {
         super(props);
         this.state = {
             gallery: []
         }
     }
     uploadWidget() {
       let _this = this;
         window.cloudinary.openUploadWidget({ cloud_name: 'dj6ppswvb', upload_preset: 'ztpqftef', tags:['b']},
             function(error, result) {
                 console.log(result);
                 // Update gallery state with newly uploaded image
                _this.setState({gallery: _this.state.gallery.concat(result)})
             });
     }
     componentDidMount() {
       // Request for images tagged xmas
       axios.get('https://res.cloudinary.com/dj6ppswvb/image/list/b.json')
           .then(res => {
               console.log(res.data.resources);
               this.setState({gallery: res.data.resources});
           });
   }

    render(){
        return (
            <div className="main">
                <h1>Galleria</h1>
                <div className="upload">
                    <button onClick={this.uploadWidget.bind(this)} className="upload-button">
                        Add Image
                    </button>
                </div>
                <div className="gallery">
                   <CloudinaryContext cloudName="dj6ppswvb">
                       {
                           this.state.gallery.map(data => {
                               return (
                                   <div className="responsive" key={data.public_id}>
                                       <div className="img">
                                           <a target="_blank" href={`https://res.cloudinary.com/dj6ppswvb/image/upload/${data.public_id}.jpg`}>
                                               <Image publicId={data.public_id}>
                                                   <Transformation
                                                       crop="scale"
                                                       width="300"
                                                       height="200"
                                                       dpr="auto"
                                                       responsive_placeholder="blank"
                                                   />
                                               </Image>
                                                 <Image publicId="f72nemuvtmg0mj75jdmn.jpg"></Image>
                                           </a>
                                           <div className="desc">Created at {data.created_at}</div>
                                       </div>
                                   </div>
                               )
                           })
                       }
                   </CloudinaryContext>
                   <div className="clearfix"></div>
               </div>
            </div>

        );
    }
}
export default Main;
