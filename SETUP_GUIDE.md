# Quran Academee • Serverless Leads Setup & Vercel Deployment Guide

This guide provides the complete step-by-step instructions to connect your frontend contact form to a secure **Vercel Serverless Function** using **Resend** for premium HTML emails and **Google Sheets API** for storing lead data, featuring advanced security policies, serverless rate limiting, and standard Google Service Account setups.

---

## Part 1: Resend Email Setup

Resend is used to dispatch high-quality, professional, responsive transactional emails.

### 1. Create a Resend Account
* Go to [resend.com](https://resend.com) and sign up for a free account.

### 2. Add and Verify Your Domain
* In the Resend dashboard, navigate to **Domains** and click **Add Domain**.
* Enter your domain name: `quranacademee.com`
* Select your region and click **Add**.
* Resend will generate a set of DNS records (**SPF**, **DKIM**, and **MX** records).
* Log into your domain registrar/DNS provider (e.g., Hostinger, GoDaddy, Cloudflare).
* Add these DNS records exactly as provided by Resend.
* Once added, click **Verify** in your Resend dashboard. Verification usually takes 2–10 minutes.

### 3. Generate an API Key
* Navigate to **API Keys** in Resend.
* Click **Create API Key**.
* Name it (e.g., `Quran Academee Prod`), set permissions to **Full Access**, and click **Create**.
* Copy the API key immediately (it looks like `re_...`). Store it securely as `RESEND_API_KEY`.

---

## Part 2: Google Cloud Platform & Service Account Setup

We use a Google Service Account to interact with the Google Sheets API securely from our serverless backend. It automatically generates and refreshes access tokens in the background on behalf of your application without needing a manual refresh token or interactive login.

### 1. Enable the Google Sheets API
* Go to the [Google Cloud Console](https://console.cloud.google.com/).
* Ensure you are in the correct project: `quranacademee`.
* Navigate to **APIs & Services** > **Library**.
* Search for **Google Sheets API** and click **Enable**.

### 2. Create a Google Service Account
* Navigate to **IAM & Admin** > **Service Accounts**.
* Click **Create Service Account** at the top.
* Enter a Service Account Name (e.g., `quranacademee-leads`).
* Click **Create and Continue**.
* (Optional) For Role, you don't need any special IAM roles, as access will be granted directly at the spreadsheet level.
* Click **Done** to finish.

### 3. Generate and Download Service Account Credentials (JSON Key)
* In the Service Accounts list, click on your newly created service account.
* Go to the **Keys** tab.
* Click **Add Key** > **Create New Key**.
* Select **JSON** as the key type and click **Create**.
* A JSON file containing your credentials will automatically download to your computer.

### 4. Extract Environment Variables
Open the downloaded JSON file. You will need to copy the following values to your Vercel or environment file:
* **`project_id`**: Copy this value to `GOOGLE_PROJECT_ID`.
* **`client_email`**: Copy this email address (looks like `quranacademee-leads@...gserviceaccount.com`). You will use this for `GOOGLE_CLIENT_EMAIL` and to share your spreadsheet.
* **`private_key`**: Copy the entire multiline string starting with `-----BEGIN PRIVATE KEY-----` and ending with `-----END PRIVATE KEY-----\n`. Keep the `\n` characters intact as they are parsed correctly by our serverless helper. You will use this for `GOOGLE_PRIVATE_KEY`.

---

## Part 3: Google Sheets Setup

### 1. Find Your Spreadsheet ID
* Create a blank Google Sheet or open an existing one.
* Extract the spreadsheet ID from the URL:
  `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`

### 2. Share the Spreadsheet with Your Service Account
* Click the **Share** button in the top right corner of your Google Sheet.
* Paste your Service Account's **`client_email`** (copied in Part 2, step 4) into the email list.
* Ensure the permission is set to **Editor**.
* Uncheck "Notify people" to prevent bounce notifications and click **Share**.

*Note: The serverless function automatically checks if a tab named `Quran Academee Leads` exists. If not, it creates it with standard column headers: `Timestamp`, `Full Name`, `Email`, `Phone`, `Country`, `Course Interest`, and `Message`.*

---

## Part 4: Upstash Redis (Reliable Serverless Rate Limiting)

On Vercel, serverless containers are ephemeral, scaling up/down and spinning up isolated instances for concurrent traffic. This makes standard in-memory rate limiting **unreliable** (as state resets and is not synchronized across concurrent containers).

To prevent spam abuse reliably, our upgraded backend supports **Upstash Redis** (which provides a global, extremely fast, serverless-optimized REST database with millisecond latencies).

### 1. Create a Redis Instance
* Go to [upstash.com](https://upstash.com) and log in.
* Click **Create Database**.
* Set a name (e.g., `quranacademee-ratelimit`) and select your closest region (e.g., US East / N. Virginia for Vercel).
* Click **Create**.

### 2. Retrieve REST Variables
* Scroll down to the **REST API** section of your database dashboard.
* Copy the following:
  * `UPSTASH_REDIS_REST_URL`
  * `UPSTASH_REDIS_REST_TOKEN`

*If these keys are left empty, the application automatically falls back to an in-memory Map in local development mode without crashing.*

---

## Part 5: Complete Environment Variables Reference

Add the following under Vercel **Settings** > **Environment Variables** or to a local `.env` file:

| Environment Variable | Description | Example Value |
| :--- | :--- | :--- |
| `RESEND_API_KEY` | Resend API credential | `re_PbH3m75u_JH2RBviPSwjNWddrVKbtVLGX` |
| `RESEND_FROM` | Verified sender email | `contact@quranacademee.com` |
| `ADMIN_EMAIL` | Admin recipient email | `contact@quranacademee.com` |
| `GOOGLE_PROJECT_ID` | GCP Project ID | `quranacademee` |
| `GOOGLE_CLIENT_EMAIL` | GCP Service Account Email | `quranacademee-leads@quranacademee.iam.gserviceaccount.com` |
| `GOOGLE_PRIVATE_KEY` | GCP Private Key | `-----BEGIN PRIVATE KEY-----\nMIIEvQIBAD...` |
| `GOOGLE_SHEET_ID` | Google Spreadsheet ID | `1qQfNK4v-4-SEd_RdAH76V26_RGTMASg9ueGCZw...` |
| `UPSTASH_REDIS_REST_URL` | Upstash API URL (Optional) | `https://chosen-endpoint-1234.upstash.io` |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash API Token (Optional) | `AbCdEfGhIjKlMnOpQrStUvWxYz...` |

---

## Part 6: Local Verification

Start the local development server:
```bash
npm run dev
```
Calling your local `/api/contact` API endpoint will now fully execute all configured email retries, rate limiting blocks, and Google Sheets updates.
