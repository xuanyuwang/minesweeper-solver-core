import { desktopCapturer } from  'electron';

class ScreenParser {

    public async CaptureScreen(): Promise<any> {
        return await desktopCapturer.getSources(
            {
                types: ['window', 'screen']
            }
        ).then(async (desktopCapturerSources) => {
            for (const source of desktopCapturerSources) {
                const streamConstraints = {
                    audio: false,
                    video: true
                };
                try {
                    const stream = await navigator.mediaDevices.getUserMedia(streamConstraints);
                    this.handleCaptureStream(stream);
                } catch (error) {
                    console.log('the steam source is not available', error);
                }
            }
        })
    }

    handleCaptureStream(stream: MediaStream): void {
        const videoEl = document.querySelector('video');
        videoEl.srcObject = stream;
        videoEl.onloadedmetadata = () => videoEl.play();
    }
}

export default ScreenParser;