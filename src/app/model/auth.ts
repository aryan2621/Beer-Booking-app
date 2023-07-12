export class UserData {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  isAnonymous: boolean;
  photoURL: string;
  providerData: ProviderData[];
  stsTokenManager: StsTokenManager;
  lastLoginAt: string;
  createdAt: string;
  apiKey: string;
  appName: string;

  constructor(json: any) {
    if (json) {
      const _json = exactJson(json);
      this.uid = _json.uid;
      this.email = _json.email;
      this.emailVerified = _json.emailVerified;
      this.displayName = _json.displayName;
      this.isAnonymous = _json.isAnonymous;
      this.photoURL = _json.photoURL;
      this.providerData = (_json.providerData as any[]).map(
        (providerData: any) => new ProviderData(providerData)
      );
      this.stsTokenManager = new StsTokenManager(_json.stsTokenManager);
      this.lastLoginAt = _json.lastLoginAt;
      this.createdAt = _json.createdAt;
      this.apiKey = _json.apiKey;
      this.appName = _json.appName;
    }
  }
}

class ProviderData {
  providerId: string;
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  phoneNumber: string;

  constructor(json: any) {
    if (json) {
      this.providerId = json.providerId;
      this.uid = json.uid;
      this.displayName = json.displayName;
      this.photoURL = json.photoURL;
      this.email = json.email;
      this.phoneNumber = json.phoneNumber;
    }
  }
}

class StsTokenManager {
  refreshToken: string;
  accessToken: string;
  expirationTime: number;

  constructor(json: any) {
    if (json) {
      this.refreshToken = json.refreshToken;
      this.accessToken = json.accessToken;
      this.expirationTime = json.expirationTime;
    }
  }
}

function exactJson(json: any) {
  const _josn = JSON.parse(JSON.stringify(json));
  return _josn;
}
