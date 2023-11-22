import { PureComponent, useMemo, createRef } from 'react';
import NativeVideoModule from './NativeVideoModule';
import NativeVideoView from './NativeVideoView';
export function useVideoPlayer(source = null) {
    return useMemo(() => {
        return new NativeVideoModule.VideoPlayer(source);
    }, []);
}
export class VideoView extends PureComponent {
    nativeRef = createRef();
    enterFullscreen() {
        this.nativeRef.current?.enterFullscreen();
    }
    exitFullscreen() {
        this.nativeRef.current?.exitFullscreen();
    }
    async startPictureInPicture() {
        return this.nativeRef.current?.startPictureInPicture();
    }
    async stopPictureInPicture() {
        return this.nativeRef.current?.stopPictureInPicture();
    }
    render() {
        const { player, ...props } = this.props;
        const playerId = getPlayerId(player);
        return <NativeVideoView {...props} player={playerId} ref={this.nativeRef}/>;
    }
}
// Temporary solution to pass the shared object ID instead of the player object.
// We can't really pass it as an object in the old architecture.
// Technically we can in the new architecture, but it's not possible yet.
function getPlayerId(player) {
    if (player instanceof NativeVideoModule.VideoPlayer) {
        // @ts-expect-error
        return player.__expo_shared_object_id__;
    }
    if (typeof player === 'number') {
        return player;
    }
    return null;
}
//# sourceMappingURL=VideoView.js.map