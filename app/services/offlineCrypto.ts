/**
 * NIRAMAYA SETU - CLIENT-SIDE OFFLINE ENVELOPE ENCRYPTION (AES-GCM / Web Crypto)
 *
 * Implements authenticated envelope encryption for offline patient queues and vitals.
 * Uses Web Crypto API when in browser; falls back to structured representation.
 */

export interface EncryptedOfflineRecord {
  version: number;
  algorithm: string;
  salt: string;
  iv: string;
  tag: string;
  ciphertext: string;
}

export class ClientOfflineCrypto {
  private static readonly ITERATIONS = 100000;

  private static arrayBufferToHex(buffer: ArrayBuffer): string {
    return Array.from(new Uint8Array(buffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  private static hexToArrayBuffer(hex: string): ArrayBuffer {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    }
    return bytes.buffer;
  }

  /**
   * Encrypt sensitive offline JSON data with worker passphrase/PIN
   */
  public static async encryptData(
    data: any,
    pinOrSecret: string
  ): Promise<EncryptedOfflineRecord> {
    const jsonStr = typeof data === "string" ? data : JSON.stringify(data);
    const encoder = new TextEncoder();
    const dataBytes = encoder.encode(jsonStr);

    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(pinOrSecret),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );

    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: this.ITERATIONS,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );

    const encryptedBuffer = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv,
      },
      key,
      dataBytes
    );

    // In Web Crypto AES-GCM, the last 16 bytes are the auth tag
    const totalBytes = new Uint8Array(encryptedBuffer);
    const ciphertextBytes = totalBytes.subarray(0, totalBytes.length - 16);
    const tagBytes = totalBytes.subarray(totalBytes.length - 16);

    return {
      version: 1,
      algorithm: "AES-256-GCM-PBKDF2-SHA256",
      salt: this.arrayBufferToHex(salt.buffer),
      iv: this.arrayBufferToHex(iv.buffer),
      tag: this.arrayBufferToHex(tagBytes.buffer),
      ciphertext: this.arrayBufferToHex(ciphertextBytes.buffer),
    };
  }

  /**
   * Decrypt sensitive offline JSON data verifying integrity tag
   */
  public static async decryptData<T = any>(
    envelope: EncryptedOfflineRecord,
    pinOrSecret: string
  ): Promise<T> {
    if (!envelope || envelope.version !== 1) {
      throw new Error("Invalid or unsupported envelope format");
    }

    const encoder = new TextEncoder();
    const salt = new Uint8Array(this.hexToArrayBuffer(envelope.salt));
    const iv = new Uint8Array(this.hexToArrayBuffer(envelope.iv));
    const ciphertextBytes = new Uint8Array(this.hexToArrayBuffer(envelope.ciphertext));
    const tagBytes = new Uint8Array(this.hexToArrayBuffer(envelope.tag));

    // Combine ciphertext and tag for Web Crypto AES-GCM
    const combined = new Uint8Array(ciphertextBytes.length + tagBytes.length);
    combined.set(ciphertextBytes, 0);
    combined.set(tagBytes, ciphertextBytes.length);

    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(pinOrSecret),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );

    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: this.ITERATIONS,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );

    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv,
      },
      key,
      combined.buffer
    );

    const decoder = new TextDecoder();
    const jsonStr = decoder.decode(decryptedBuffer);
    try {
      return JSON.parse(jsonStr);
    } catch {
      return jsonStr as unknown as T;
    }
  }
}
