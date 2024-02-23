import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import { useEffect, useState } from 'react';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const PlayVideo = () => {
    const { videoId } = useParams();

    const [apiData, setApiData] = useState(null); //null vì trả về 1 object
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]); //array vì trả về một mảng có nhiều object

    const fetchVideoData = async () => {
        //Fetching Videos Data
        const videoDetail_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        await fetch(videoDetail_url)
            .then((response) => response.json())
            .then((data) => setApiData(data.items[0]));
    };

    const fetchOtherData = async () => {
        //Fetching Channel Data
        const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        await fetch(channelData_url)
            .then((response) => response.json())
            .then((data) => setChannelData(data.items[0]));

        //Fetching Comment Data
        const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
        await fetch(comment_url)
            .then((response) => response.json())
            .then((data) => setCommentData(data.items[0]));
    };

    useEffect(() => {
        fetchVideoData();
    }, [videoId]);

    useEffect(() => {
        fetchOtherData;
    }, [apiData]);

    return (
        <div className="play-video">
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
            ></iframe>
            <h3>{apiData ? apiData.snippet.title : 'Title here'}</h3>
            <div className="play-video-info">
                <p>
                    {apiData ? value_converter(apiData.statistics.viewCount) : 'view count'} Views &bull;{' '}
                    {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ''}
                </p>
                <div className="">
                    <span>
                        <img src={like} alt="img" />
                        {apiData ? value_converter(apiData.statistics.likeCount) : ''}
                    </span>
                    <span>
                        <img src={dislike} alt="img" />
                    </span>
                    <span>
                        <img src={share} alt="img" />
                        Share
                    </span>
                    <span>
                        <img src={save} alt="img" />
                        Save
                    </span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channelData ? channelData.snippet.thumbnails.default.url : ''} alt="user" />
                <div className="">
                    <p>{apiData ? apiData.snippet.channelTitle : ''}</p>
                    <span>
                        {channelData ? value_converter(channelData.statistics.subscriberCount) : ''} Subscribers
                    </span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-description">
                <p>{apiData ? apiData.snippet.description.slice(0, 250) : 'Description here'}</p>
                <hr />
                <h4>{apiData ? value_converter(apiData.statistics.commentCount) : ''} Comments</h4>
                {commentData.map((item, index) => {
                    return (
                        <div className="comment" key={index}>
                            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="user" />
                            <div className="">
                                <h3>
                                    {item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span>{' '}
                                </h3>
                                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                                <div className="comment-action">
                                    <img src={like} alt="like" />
                                    <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                    <img src={dislike} alt="dislike" />
                                </div>
                            </div>
                        </div>
                    );
                })}
                {/* Commemt */}
                <div className="comment">
                    <img src="" alt="user" />
                    <div className="">
                        <h3>
                            Marry <span>1 day ago</span>{' '}
                        </h3>
                        <p>
                            Khúc này em không biết vì sao không lấy được api của youtube nữa nó báo (The request cannot
                            be completed because you have exceeded), em cũng đã thử lấy một tài khoản google khác và vẫn
                            không được
                        </p>
                        <div className="comment-action">
                            <img src={like} alt="like" />
                            <span>55</span>
                            <img src={dislike} alt="dislike" />
                        </div>
                    </div>
                </div>
                <div className="comment">
                    <img src="" alt="user" />
                    <div className="">
                        <h3>
                            Marry <span>1 day ago</span>{' '}
                        </h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, autem?</p>
                        <div className="comment-action">
                            <img src={like} alt="like" />
                            <span>55</span>
                            <img src={dislike} alt="dislike" />
                        </div>
                    </div>
                </div>
                <div className="comment">
                    <img src="" alt="user" />
                    <div className="">
                        <h3>
                            Marry <span>1 day ago</span>{' '}
                        </h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, autem?</p>
                        <div className="comment-action">
                            <img src={like} alt="like" />
                            <span>55</span>
                            <img src={dislike} alt="dislike" />
                        </div>
                    </div>
                </div>
                <div className="comment">
                    <img src="" alt="user" />
                    <div className="">
                        <h3>
                            Marry <span>1 day ago</span>{' '}
                        </h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, autem?</p>
                        <div className="comment-action">
                            <img src={like} alt="like" />
                            <span>55</span>
                            <img src={dislike} alt="dislike" />
                        </div>
                    </div>
                </div>
                <div className="comment">
                    <img src="" alt="user" />
                    <div className="">
                        <h3>
                            Marry <span>1 day ago</span>{' '}
                        </h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, autem?</p>
                        <div className="comment-action">
                            <img src={like} alt="like" />
                            <span>55</span>
                            <img src={dislike} alt="dislike" />
                        </div>
                    </div>
                </div>
                <div className="comment">
                    <img src="" alt="user" />
                    <div className="">
                        <h3>
                            Marry <span>1 day ago</span>{' '}
                        </h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, autem?</p>
                        <div className="comment-action">
                            <img src={like} alt="like" />
                            <span>55</span>
                            <img src={dislike} alt="dislike" />
                        </div>
                    </div>
                </div>
                <div className="comment">
                    <img src="" alt="user" />
                    <div className="">
                        <h3>
                            Marry <span>1 day ago</span>{' '}
                        </h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, autem?</p>
                        <div className="comment-action">
                            <img src={like} alt="like" />
                            <span>55</span>
                            <img src={dislike} alt="dislike" />
                        </div>
                    </div>
                </div>
                <div className="comment">
                    <img src="" alt="user" />
                    <div className="">
                        <h3>
                            Marry <span>1 day ago</span>{' '}
                        </h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, autem?</p>
                        <div className="comment-action">
                            <img src={like} alt="like" />
                            <span>55</span>
                            <img src={dislike} alt="dislike" />
                        </div>
                    </div>
                </div>
                {/* ./Comment */}
            </div>
        </div>
    );
};

export default PlayVideo;
