
const RECORDER_STATE = {
    INACTIVE: 'inactive',
    RECORDING: 'recording',
    PAUSED: 'paused',
}

const navigator = window.navigator;
if (!navigator.mediaDevices) {
    navigator.mediaDevices = {};
}

if (typeof navigator.mediaDevices.getUserMedia !== 'function') {
    navigator.mediaDevices.getUserMedia = function (constraints) {
        const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }

        return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
        });
    };
}

class Recorder {

    constructor () {
        this.mediaRecorder = null;
        this.mediaNode = null;
        this.stream = null;
        this.chunks = [];
        this.videoFile = null;
    }

    /**
     * Request media devices user permission and setup recorder
     *
     * @returns {Promise}
     */
    init = async ({ type, mimeType, video, audio }) => {
        if (!this.stream) {
            this.stream = await navigator.mediaDevices.getUserMedia({
                audio,
                video,
            });
        }

        if (this.mediaNode) {
            this.mediaNode.srcObject = this.stream;
            this.mediaNode.onloadedmetadata = event => this.mediaNode.play();
        }

        if (!this.mediaRecorder) {
            this.mediaRecorder = new MediaRecorder(this.stream, {
                type,
                mimeType,
            });

            this.mediaRecorder.ondataavailable = ({ data }) => {
                this.chunks.push(data)
            };

            this.mediaRecorder.onstop = event => {
                if (this.chunks.length) {
                    this.videoFile = new File([this.chunks[0]], 'video.webm', { type: 'video/webm' });
                    this.chunks = [];
                }
            }
        }
    };

    /**
     *
     * @param {HTMLVideoElement} node
     */
    setMediaNode = node => this.mediaNode = node;

    // Start recording video from web camera
    startRecording = () => {
        switch (this.mediaRecorder.state) {
            case RECORDER_STATE.PAUSED:
                this.mediaRecorder.resume();
                break;
            case RECORDER_STATE.INACTIVE:
                this.mediaRecorder.start();
                break;
            default:
                console.error('Unknown RECORDER_STATE: ', this.mediaRecorder.state);
                break;
        }
    };
    // Pause recording video from web camera
    pauseRecording = () => {
        this.mediaRecorder.pause();
    };
    // Stop recording video from web camera
    stopRecording = async () => {
        await this.mediaRecorder.stop();
        this.closeStream();
    };

    /**
     * Close video stream from web camera
     */
    closeStream = () => {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            if (this.mediaNode) {
                this.mediaNode.srcObject = null;
            }
            this.stream = null;
        }
    };

    /**
     * Close recorder and clear all resources
     */
    close = () => {
        this.closeStream();
        this.mediaNode = null;
        this.mediaRecorder = null;
    }

}

export default Recorder;
