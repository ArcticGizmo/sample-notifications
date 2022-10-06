import { isNative } from '@/helpers/util';
import { NotificationNativeClient } from './native';
import { NotificationWebClient } from './web';

const client = isNative ? new NotificationNativeClient() : new NotificationWebClient();

export { client as NotificationClient };
