import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import cloudinary from 'cloudinary-react';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import Masonry from 'react-mason';

class Main extends Component {
  constructor(props) {
		 super(props);
		 this.state = {
			 gallery: [],
		 }
	 }
	 uploadWidget() {
	   let _this = this;
		 window.cloudinary.openUploadWidget({ cloud_name: 'cloud-name', upload_preset: 'preset-name', tags:['tag']},
			 function(error, result) {
				 console.log(result);
				 // Update gallery state with newly uploaded image
				_this.setState({gallery: _this.state.gallery.concat(result)})
			 });
	 }
	 componentDidMount() {
	   // Request for images tagged xmas
	   axios.get('api-url')
		   .then(res => {
			  //  console.log(res.data.resources);
			   this.setState({gallery: res.data.resources});
		   });

   }
	// handleClick() {
	// 	console.log('img', this.state.gallery[1]);
	// }

	render(){
		return (
			// <div className="main">
			//     <h1>Galleria</h1>
			//     <div className="upload">
			//         <button onClick={this.uploadWidget.bind(this)} className="upload-button">
			//             Add Image
			//         </button>
			//     </div>
				<div className="gallery" >
				<CloudinaryContext cloudName="dj6ppswvb">
					<Masonry>
					   {
						   this.state.gallery.map(data => {
							   return (
								   <div className="responsive" key={data.public_id}>
										   {/* <a target="_blank" href={``}> */}
											   <Image onClick={() => this.handleClick()} publicId={data.public_id}>
												   <Transformation

														 width='400'
													   crop = "scale"
													  //  height="200"
													  //  dpr="auto"
													//    responsive_placeholder="blank"
												   />
											   </Image>
										   {/* </a> */}
										   {/* <div className="desc">Created at {data.created_at}</div> */}
								   </div>
							   )
						   })
					   }
					 </Masonry>
				   </CloudinaryContext>
				   <div className="clearfix"></div>
			   </div>
			// </div>

		);
	}
}
export default Main;
