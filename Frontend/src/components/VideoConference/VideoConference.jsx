    import React from 'react';
    import 'bootstrap/dist/css/bootstrap.min.css';

    const VideoConference = () => {
    return (
        <div className="d-flex flex-column flex-md-row vh-100">
        {/* Video Section (Now on Left Side) */}
        <div className="flex-grow-1 bg-dark d-flex flex-column p-3">
            <h4 className="text-white mb-4 text-center">Video Conference</h4>

            {/* Video Grid */}
            <div className="row g-2 flex-grow-1">
            <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                <div className="bg-secondary rounded h-100 d-flex align-items-center justify-content-center" style={{ minHeight: '150px' }}>
                <p className="text-white">Video 1</p>
                </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                <div className="bg-secondary rounded h-100 d-flex align-items-center justify-content-center" style={{ minHeight: '150px' }}>
                <p className="text-white">Video 2</p>
                </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                <div className="bg-secondary rounded h-100 d-flex align-items-center justify-content-center" style={{ minHeight: '150px' }}>
                <p className="text-white">Video 3</p>
                </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                <div className="bg-secondary rounded h-100 d-flex align-items-center justify-content-center" style={{ minHeight: '150px' }}>
                <p className="text-white">Video 4</p>
                </div>
            </div>
            </div>

            {/* Bottom Controls */}
            <div className="mt-3 d-flex justify-content-center flex-wrap gap-2">
            <button className="btn btn-danger">End Call</button>
            <button className="btn btn-secondary">Mute</button>
            <button className="btn btn-secondary">Stop Video</button>
            </div>
        </div>

        {/* Chat Section (Now on Right Side) */}
        <div className="bg-light border-start w-100 w-md-25" style={{ maxWidth: '350px', minWidth: '250px', overflowY: 'auto' }}>
            <div className="p-3 d-flex flex-column h-100">
            <h4 className="mb-4 text-center">Chat</h4>

            {/* Chat Messages */}
            <div className="flex-grow-1 mb-3 overflow-auto">
                <div className="bg-white p-2 rounded shadow-sm mb-2">
                <strong>User 1:</strong> Hello!
                </div>
                <div className="bg-white p-2 rounded shadow-sm mb-2">
                <strong>User 2:</strong> Hi there!
                </div>
                {/* More messages */}
            </div>

            {/* Chat Input */}
            <form className="d-flex">
                <input 
                type="text" 
                className="form-control me-2" 
                placeholder="Type a message..."
                />
                <button className="btn btn-primary" type="submit">
                Send
                </button>
            </form>
            </div>
        </div>
        </div>
    );
    };

    export default VideoConference;
