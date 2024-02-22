import { useParams } from 'react-router-dom';
import { PlayVideo, Recommended } from '../../Components';
import './Video.css';

const Video = () => {
    const { videoId, categoryId } = useParams();

    return (
        <div className="play-container">
            {/* videoId, id được lấy ở bên feed chỗ Link có id của video */}
            <PlayVideo videoId={videoId} />
            <Recommended categoryId={categoryId} />
        </div>
    );
};

export default Video;
