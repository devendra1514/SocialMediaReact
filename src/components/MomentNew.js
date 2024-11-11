import { useState } from "react";
import apiCall from "./apiService";
import { useNavigate } from "react-router-dom";

function MomentNew() {
	const [title, setTitle] = useState();
	const [media, setMedia] = useState();
	const [loading, setLoading] = useState();
  const [errorMessages, setErrorMessages] = useState({});
	const navigate = useNavigate();

	const uploadMoment = async (e) => {
		e.preventDefault();
		setLoading(true)
		const momentForm = new FormData();
		momentForm.append('title', title)
    if(media){
      momentForm.append('media', media)
    }

		const response = await apiCall('api/v1/moments', 'POST', momentForm, true)
		const body = await response.data
		setLoading(false)
		if(response.status === 200){
      console.log(body)
      navigate('/moments')
    }else if (response.status === 422) {
      setErrorMessages(response.data.error);
    }
	}

	return(
		<div className="container d-flex align-items-center justify-content-center vh-95 mt-5">
			<form onSubmit={uploadMoment}>
        <div className="form-group mb-3">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="tile"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {errorMessages.title && (
            <p className="text-danger">{errorMessages.title[0]}</p>
          )}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="media">Media:</label>
          <input
            type="file"
            id="media"
            className="form-control"
            onChange={(e) => setMedia(e.target.files[0])}
          />
          {errorMessages.media && (
            <p className="text-danger">{errorMessages.media[0]}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary w-100">{loading ? 'Uploading...' : 'Upload'}</button>
      </form>
		</div>
	);
}

export default MomentNew;