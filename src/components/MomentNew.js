import { useState } from "react";
import apiCall from "./apiService";
import { useNavigate } from "react-router-dom";

function MomentNew() {
	const [title, setTitle] = useState();
	const [media, setMedia] = useState();
	const [loading, setLoading] = useState();
	const navigate = useNavigate();

	const uploadMoment = async (e) => {
			e.preventDefault();
			setLoading(true)
			const momentForm = new FormData();
			momentForm.append('title', title)
			momentForm.append('media', media)

			const response = await apiCall('api/v1/moments', 'POST', momentForm, true)
			const body = await response.data
			setLoading(false)
			console.log(body)
			navigate('/moments')
	}

	return(
		<div className=".mt-100">
			<form className="container" onSubmit={uploadMoment}>
				<input 
					id='title'
					type="text"
					value={title}
					onChange={(e) => { setTitle(e.target.value) }}
					required={true}
				/>
				<input
					id="media"
					type="file"
					onChange={(e) => setMedia(e.target.files[0]) }
					required={true}
				/>
				<button type='submit'>{loading ? 'Uploading' : 'Upload'}</button>
			</form>
		</div>
	);
}

export default MomentNew;