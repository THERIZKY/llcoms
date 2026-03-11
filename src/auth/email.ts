import "server-only";
import nodemailer from "nodemailer";

const EMAIL_VERIFICATION_SUBJECT =
  "Verify your Love Live Concert Archive account";

function getEmailTransportConfig() {
  const host = process.env.EMAIL_SERVER_HOST;
  const port = process.env.EMAIL_SERVER_PORT;
  const user = process.env.EMAIL_SERVER_USER;
  const pass = process.env.EMAIL_SERVER_PASSWORD;
  const from = process.env.EMAIL_FROM;

  if (!host || !port || !user || !pass || !from) {
    return null;
  }

  return {
    from,
    host,
    port: Number(port),
    secure:
      process.env.EMAIL_SERVER_SECURE === "true" || Number(port) === 465,
    auth: {
      user,
      pass,
    },
  };
}

export function getAppBaseUrl() {
  return process.env.AUTH_URL ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000";
}

export function isGoogleAuthEnabled() {
  return Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);
}

export function isEmailVerificationEnabled() {
  return Boolean(getEmailTransportConfig());
}

type SendVerificationEmailParams = {
  email: string;
  name?: string | null;
  verificationUrl: string;
};

export async function sendVerificationEmail({
  email,
  name,
  verificationUrl,
}: SendVerificationEmailParams) {
  const transportConfig = getEmailTransportConfig();
  const greeting = name?.trim() ? `Halo ${name},` : "Halo,";
  const text = [
    greeting,
    "",
    "Terima kasih telah mendaftar di Love Live Concert Archive.",
    "Verifikasi email Anda dengan membuka tautan berikut:",
    verificationUrl,
    "",
    "Tautan ini berlaku selama 24 jam.",
  ].join("\n");

  const html = `
    <div style="margin:0;padding:32px;background:#040816;color:#eef2ff;font-family:Geist,system-ui,sans-serif;">
      <div style="max-width:560px;margin:0 auto;border:1px solid rgba(255,255,255,0.12);border-radius:28px;padding:32px;background:linear-gradient(180deg,rgba(16,24,40,0.96),rgba(7,10,18,0.98));box-shadow:0 24px 80px rgba(0,0,0,0.45);">
        <div style="display:inline-flex;align-items:center;gap:10px;padding:8px 14px;border-radius:999px;background:rgba(244,114,182,0.12);border:1px solid rgba(244,114,182,0.24);font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#fecdd3;">
          Streaming Archive
        </div>
        <h1 style="margin:20px 0 12px;font-size:28px;line-height:1.2;">Verify your email</h1>
        <p style="margin:0 0 18px;color:#cbd5e1;font-size:15px;line-height:1.7;">${greeting}</p>
        <p style="margin:0 0 24px;color:#cbd5e1;font-size:15px;line-height:1.7;">
          Aktifkan akun Anda untuk masuk dan menyimpan live archive favorit.
        </p>
        <a href="${verificationUrl}" style="display:inline-flex;align-items:center;justify-content:center;padding:14px 22px;border-radius:999px;background:linear-gradient(135deg,#fda4af,#f9a8d4,#93c5fd);color:#08111f;text-decoration:none;font-weight:700;">
          Verify email
        </a>
        <p style="margin:24px 0 0;color:#94a3b8;font-size:13px;line-height:1.7;">
          Tautan ini berlaku selama 24 jam. Jika tombol tidak bekerja, buka URL berikut:
        </p>
        <p style="margin:8px 0 0;word-break:break-all;color:#e2e8f0;font-size:13px;">${verificationUrl}</p>
      </div>
    </div>
  `;

  if (!transportConfig) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Email verification transport is not configured.");
    }

    console.info(`[auth] Verification email for ${email}: ${verificationUrl}`);
    return;
  }

  const transport = nodemailer.createTransport({
    host: transportConfig.host,
    port: transportConfig.port,
    secure: transportConfig.secure,
    auth: transportConfig.auth,
  });

  await transport.sendMail({
    from: transportConfig.from,
    to: email,
    subject: EMAIL_VERIFICATION_SUBJECT,
    text,
    html,
  });
}
