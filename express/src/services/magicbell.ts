import { Http } from './httpService';

type Platform = 'ios' | 'android' | 'safari';

type EmailRecipient = { email: string };
type ExternalRecipient = { external_id: string };
type MatchesRecipient = { matches: string };

type MagicBellRecipient = EmailRecipient | ExternalRecipient | MatchesRecipient;

interface MagicBellNotification {
  title: string;
  content?: string;
  category?: string;
  topic?: string;
  action_url?: string;
  custom_attributes: { [key: string]: string };
}

interface MagicBellNotificationPayload extends MagicBellNotification {
  recipients: MagicBellRecipient[];
}

class MagicBellNotifications {
  async register(key: string, platform: Platform = 'android') {
    const payload = {
      push_subscription: {
        device_token: key,
        platform
      }
    };
    const opts = {
      headers: {
        'X-MAGICBELL-API-KEY': process.env['MAGIC_BELL_API_KEY'],
        'X-MAGICBELL-USER-EMAIL': process.env['MAGIC_BELL_USER_EMAIL']
      }
    };

    await Http.post('https://api.magicbell.com/push_subscriptions', payload, opts);

    console.log(`[MagicBell] registered ${key}`);
  }

  async unregister(key: string) {
    const opts = {
      headers: {
        'X-MAGICBELL-API-KEY': process.env['MAGIC_BELL_API_KEY'],
        'X-MAGICBELL-USER-EMAIL': process.env['MAGIC_BELL_USER_EMAIL']
      }
    };

    const resp = await Http.delete(`https://api.magicbell.com/push_subscriptions/${key}`, opts);

    if (resp !== '' && !resp.includes('No subscription with the provided device token was found')) {
      throw 'Unable to unregister from magic bell';
    }

    console.log(`[MagicBell] Unregistered ${key}`);
  }

  async sendToDevice(email: string, notification: MagicBellNotification) {
    const opts = {
      headers: {
        'X-MAGICBELL-API-KEY': process.env['MAGIC_BELL_API_KEY'],
        'X-MAGICBELL-API-SECRET': process.env['MAGIC_BELL_SECRET_KEY']
      }
    };

    const payload: MagicBellNotificationPayload = {
      ...notification,
      recipients: [{ email }]
    };

    return Http.post('https://api.magicbell.com/notifications', { notification: payload }, opts);
  }
}

export const MagicBell = new MagicBellNotifications();
