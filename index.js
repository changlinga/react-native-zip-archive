import ReactNative from 'react-native'

const {DeviceEventEmitter, NativeEventEmitter, Platform, NativeModules} = ReactNative

const RNZipArchive = NativeModules.RNZipArchive

export const unzip = (source, target) => {
    return RNZipArchive.unzip(source, target)
}
export const zip = (source, target) => {
    return RNZipArchive.zip(source, target)
}

export const unzipAssets = (source, target) => {
    if (!RNZipArchive.unzipAssets) {
        throw new Error('unzipAssets not supported on this platform')
    }

    return RNZipArchive.unzipAssets(source, target)
}

export const subscribe = callback => {
    const emitter = Platform.OS === 'ios' ? new NativeEventEmitter(RNZipArchive) : DeviceEventEmitter
    return emitter.addListener('zipArchiveProgressEvent', callback)
}
