import { URL } from 'react-native-url-polyfill';

import { LOCAL_DOCUMENT_DIRECTORY } from '../handleMediaDownload';

function setParamInUrl({ url, token, userId }: { url: string; token: string; userId: string }) {
	const urlObj = new URL(url);
	urlObj.searchParams.set('rc_token', token);
	urlObj.searchParams.set('rc_uid', userId);
	return urlObj.toString();
}

export const formatAttachmentUrl = (attachmentUrl: string | undefined, userId: string, token: string, server: string): string => {
	if (LOCAL_DOCUMENT_DIRECTORY && attachmentUrl?.startsWith(LOCAL_DOCUMENT_DIRECTORY)) {
		return attachmentUrl;
	}
	if (attachmentUrl && attachmentUrl.startsWith('http')) {
		if (attachmentUrl.includes('rc_token')) {
			return encodeURI(attachmentUrl);
		}
		return setParamInUrl({ url: attachmentUrl, token, userId });
	}
	return setParamInUrl({ url: `${server}${attachmentUrl}`, token, userId });
};
